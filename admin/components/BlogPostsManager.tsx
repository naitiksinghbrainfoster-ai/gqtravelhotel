import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { ImagePlus, LoaderCircle, Pencil, Plus, Save, Trash2, Upload, X } from 'lucide-react';
import { NEWS_ARTICLES } from '../../src/data/travelData';
import { supabase } from '../../src/lib/supabase';

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image_url: string;
  article_date: string;
  read_time: string;
  content: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  published: boolean;
  sort_order: number;
  created_at: string;
};

type BlogPostDraft = Omit<BlogPost, 'id' | 'sort_order' | 'created_at'>;

const createSlug = (value: string) =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const emptyDraft: BlogPostDraft = {
  slug: '',
  title: '',
  excerpt: '',
  category: '',
  image_url: '',
  article_date: new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }),
  read_time: '3 min read',
  content: '',
  meta_title: '',
  meta_description: '',
  meta_keywords: '',
  published: false,
};

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  if (typeof error === 'object' && error !== null && 'message' in error && typeof error.message === 'string') {
    return error.message;
  }
  return 'An unexpected error occurred.';
}

function getArticleDate(post: BlogPost) {
  return post.article_date || new Date(post.created_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function BlogPostsManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [draft, setDraft] = useState<BlogPostDraft>(emptyDraft);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const loadPosts = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      setError('Supabase is not configured.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const { data, error: queryError } = await supabase
        .from('blog_posts')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });
      if (queryError) throw queryError;
      setPosts((data ?? []) as BlogPost[]);
    } catch (caught) {
      setError(`${getErrorMessage(caught)}. Run the updated supabase/website_content_migration.sql migration and refresh this page.`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPosts();
  }, [loadPosts]);

  const updateDraft = (key: keyof BlogPostDraft, value: string | boolean) => {
    setDraft((current) => {
      if (key === 'title' && typeof value === 'string') {
        const previousSlug = createSlug(current.title);
        const nextSlug = createSlug(value);
        return {
          ...current,
          title: value,
          slug: !current.slug || current.slug === previousSlug ? nextSlug : current.slug,
          meta_title: !current.meta_title || current.meta_title === current.title
            ? value
            : current.meta_title,
        };
      }
      if (key === 'excerpt' && typeof value === 'string') {
        return {
          ...current,
          excerpt: value,
          meta_description: !current.meta_description || current.meta_description === current.excerpt
            ? value
            : current.meta_description,
        };
      }
      return { ...current, [key]: value };
    });
  };

  const startNewPost = () => {
    setEditingPostId(null);
    setEditorOpen(true);
    setDraft({ ...emptyDraft, article_date: new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }) });
    setError('');
    setNotice('');
  };

  const editPost = (post: BlogPost) => {
    setEditingPostId(post.id);
    setEditorOpen(true);
    setDraft({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      image_url: post.image_url,
      article_date: post.article_date,
      read_time: post.read_time,
      content: post.content,
      meta_title: post.meta_title || post.title,
      meta_description: post.meta_description || post.excerpt,
      meta_keywords: post.meta_keywords || post.category,
      published: post.published,
    });
    setError('');
    setNotice('');
  };

  const savePost = async (event: FormEvent) => {
    event.preventDefault();
    if (!supabase) {
      setError('Supabase is not configured.');
      return;
    }
    if (!draft.title.trim() || !draft.excerpt.trim() || !draft.category.trim() || !draft.content.trim()) {
      setError('Enter an article title, summary, category, and full article text.');
      return;
    }
    if (!createSlug(draft.slug || draft.title)) {
      setError('Enter a URL slug containing at least one English letter or number.');
      return;
    }

    setSaving(true);
    setError('');
    setNotice('');
    try {
      const existing = posts.find((post) => post.id === editingPostId);
      const payload = {
        ...draft,
        slug: createSlug(draft.slug || draft.title),
        title: draft.title.trim(),
        excerpt: draft.excerpt.trim(),
        category: draft.category.trim(),
        image_url: draft.image_url.trim(),
        article_date: draft.article_date.trim(),
        read_time: draft.read_time.trim(),
        content: draft.content.trim(),
        meta_title: draft.meta_title.trim() || draft.title.trim(),
        meta_description: draft.meta_description.trim() || draft.excerpt.trim(),
        meta_keywords: draft.meta_keywords.trim() || draft.category.trim(),
        sort_order: existing?.sort_order ?? (posts.reduce((max, post) => Math.max(max, post.sort_order), 0) + 1),
        updated_at: new Date().toISOString(),
      };

      if (editingPostId) {
        const { error: updateError } = await supabase.from('blog_posts').update(payload).eq('id', editingPostId).select('id').single();
        if (updateError) throw updateError;
        setNotice('Blog article updated.');
      } else {
        const { error: insertError } = await supabase.from('blog_posts').insert(payload);
        if (insertError) throw insertError;
        setNotice(draft.published ? 'Blog article added and published.' : 'Blog article added as a draft.');
      }

      setEditingPostId(null);
      setEditorOpen(false);
      setDraft(emptyDraft);
      await loadPosts();
    } catch (caught) {
      const isDuplicateSlug =
        typeof caught === 'object'
        && caught !== null
        && 'code' in caught
        && caught.code === '23505';
      setError(isDuplicateSlug
        ? 'Could not save blog article: this URL slug is already in use. Choose a unique slug.'
        : `Could not save blog article: ${getErrorMessage(caught)}`);
    } finally {
      setSaving(false);
    }
  };

  const deletePost = async (post: BlogPost) => {
    if (!supabase) {
      setError('Supabase is not configured.');
      return;
    }
    if (!window.confirm(`Delete “${post.title}”? This cannot be undone.`)) return;

    setError('');
    setNotice('');
    try {
      const { error: deleteError } = await supabase.from('blog_posts').delete().eq('id', post.id).select('id').single();
      if (deleteError) throw deleteError;
      if (editingPostId === post.id) {
        setEditingPostId(null);
        setEditorOpen(false);
        setDraft(emptyDraft);
      }
      setNotice('Blog article deleted.');
      await loadPosts();
    } catch (caught) {
      setError(`Could not delete blog article: ${getErrorMessage(caught)}`);
    }
  };

  const uploadImage = async (file?: File) => {
    if (!file || !supabase) return;
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(file.type)) {
      setError('Choose a JPG, PNG, WebP, or AVIF image.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('The selected image is larger than 10 MB.');
      return;
    }

    setUploading(true);
    setError('');
    try {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
      const path = `blog-posts/${crypto.randomUUID()}-${safeName}`;
      const { error: uploadError } = await supabase.storage.from('property-images').upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });
      if (uploadError) throw uploadError;
      const imageUrl = supabase.storage.from('property-images').getPublicUrl(path).data.publicUrl;
      updateDraft('image_url', imageUrl);
    } catch (caught) {
      setError(`Image upload failed: ${getErrorMessage(caught)}`);
    } finally {
      setUploading(false);
    }
  };

  const seedDefaultPosts = async () => {
    if (!supabase) return;
    setSaving(true);
    setError('');
    setNotice('');
    try {
      const defaults = NEWS_ARTICLES.map((article, index) => ({
        title: article.title,
        excerpt: article.excerpt,
        category: article.category,
        image_url: article.image,
        article_date: article.date,
        read_time: article.readTime,
        content: article.content.join('\n\n'),
        published: true,
        sort_order: index + 1,
      }));
      const { error: insertError } = await supabase.from('blog_posts').insert(defaults);
      if (insertError) throw insertError;
      setNotice('Default travel guides added and published.');
      await loadPosts();
    } catch (caught) {
      setError(`Could not add default articles: ${getErrorMessage(caught)}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Blog articles</h3>
          <p className="mt-1 text-xs text-slate-500">Add, edit, publish, or delete articles shown on the public Blog page.</p>
        </div>
        <button
          type="button"
          onClick={startNewPost}
          className="inline-flex items-center gap-2 rounded-xl bg-teal-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-900"
        >
          <Plus className="h-4 w-4" /> Add article
        </button>
      </div>

      {error && <p role="alert" className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">{error}</p>}
      {notice && <p role="status" className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{notice}</p>}

      {editorOpen && (
        <form onSubmit={savePost} className="mt-5 space-y-4 rounded-xl border border-teal-100 bg-teal-50/40 p-4">
          <div className="flex items-center justify-between gap-3">
            <h4 className="font-semibold text-slate-900">{editingPostId ? 'Edit article' : 'New article'}</h4>
            <button type="button" onClick={() => {
              setEditorOpen(false);
              setEditingPostId(null);
              setDraft(emptyDraft);
            }} aria-label="Close article editor" className="rounded-lg p-2 text-slate-500 hover:bg-white">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-xs font-semibold text-slate-600 md:col-span-2">
              Article title *
              <input value={draft.title} onChange={(event) => updateDraft('title', event.target.value)} required className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal" />
            </label>
            <label className="text-xs font-semibold text-slate-600 md:col-span-2">
              Article URL slug *
              <input value={draft.slug} onChange={(event) => updateDraft('slug', event.target.value)} required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" title="Use lowercase letters, numbers, and hyphens." placeholder="article-url-slug" className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal" />
              <span className="mt-1 block font-normal text-slate-400">Public URL: /blog/{draft.slug || 'article-url-slug'}</span>
            </label>
            <label className="text-xs font-semibold text-slate-600 md:col-span-2">
              Summary *
              <textarea value={draft.excerpt} onChange={(event) => updateDraft('excerpt', event.target.value)} required rows={2} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal" />
            </label>
            <label className="text-xs font-semibold text-slate-600">
              Category *
              <input value={draft.category} onChange={(event) => updateDraft('category', event.target.value)} required className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal" />
            </label>
            <label className="text-xs font-semibold text-slate-600">
              Article date
              <input value={draft.article_date} onChange={(event) => updateDraft('article_date', event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal" />
            </label>
            <label className="text-xs font-semibold text-slate-600">
              Reading time
              <input value={draft.read_time} onChange={(event) => updateDraft('read_time', event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal" />
            </label>
            <label className="text-xs font-semibold text-slate-600">
              Image URL
              <input value={draft.image_url} onChange={(event) => updateDraft('image_url', event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal" />
            </label>
            <div className="md:col-span-2">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                {uploading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : draft.image_url ? <Upload className="h-4 w-4" /> : <ImagePlus className="h-4 w-4" />}
                {uploading ? 'Uploading image…' : 'Upload article image'}
                <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="sr-only" disabled={uploading} onChange={(event) => {
                  void uploadImage(event.target.files?.[0]);
                  event.target.value = '';
                }} />
              </label>
              <p className="mt-1.5 text-[11px] text-slate-400">JPG, PNG, WebP, or AVIF · Maximum 10 MB</p>
            </div>
            {draft.image_url && <img src={draft.image_url} alt="Article image preview" className="h-36 w-full rounded-lg object-cover md:col-span-2" />}
            <label className="text-xs font-semibold text-slate-600 md:col-span-2">
              Full article text * <span className="font-normal text-slate-400">Separate paragraphs with a blank line.</span>
              <textarea value={draft.content} onChange={(event) => updateDraft('content', event.target.value)} required rows={8} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal" />
            </label>
            <div className="md:col-span-2">
              <h5 className="text-sm font-semibold text-slate-900">Search engine metadata</h5>
              <p className="mt-1 text-xs font-normal text-slate-500">Each article page has its own title, description, and keywords.</p>
            </div>
            <label className="text-xs font-semibold text-slate-600 md:col-span-2">
              Meta title
              <input value={draft.meta_title} onChange={(event) => updateDraft('meta_title', event.target.value)} placeholder={draft.title || 'Defaults to article title'} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal" />
            </label>
            <label className="text-xs font-semibold text-slate-600 md:col-span-2">
              Meta description
              <textarea value={draft.meta_description} onChange={(event) => updateDraft('meta_description', event.target.value)} rows={2} placeholder={draft.excerpt || 'Defaults to article summary'} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal" />
            </label>
            <label className="text-xs font-semibold text-slate-600 md:col-span-2">
              Meta keywords
              <textarea value={draft.meta_keywords} onChange={(event) => updateDraft('meta_keywords', event.target.value)} rows={2} placeholder="travel, destination, GQ Travel" className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal" />
            </label>
            <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 md:col-span-2">
              <input type="checkbox" checked={draft.published} onChange={(event) => updateDraft('published', event.target.checked)} className="h-4 w-4 rounded border-slate-300 text-teal-800 focus:ring-teal-700" />
              Publish on the public Blog page
            </label>
          </div>
          <div className="flex justify-end">
            <button type="submit" disabled={saving || uploading} className="inline-flex items-center gap-2 rounded-lg bg-teal-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-900 disabled:opacity-60">
              {saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {editingPostId ? 'Save changes' : 'Save article'}
            </button>
          </div>
        </form>
      )}

      <div className="mt-5 space-y-3">
        {loading ? (
          <p className="flex items-center gap-2 py-6 text-sm text-slate-500"><LoaderCircle className="h-4 w-4 animate-spin" /> Loading articles…</p>
        ) : posts.length ? posts.map((post) => (
          <article key={post.id} className="flex flex-col gap-4 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center">
            {post.image_url && <img src={post.image_url} alt="" className="h-20 w-28 rounded-lg object-cover" />}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-semibold text-slate-900">{post.title}</h4>
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${post.published ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-slate-500">{post.excerpt}</p>
              <p className="mt-1 text-xs text-slate-400">{post.category} · {getArticleDate(post)}</p>
              <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer" className="mt-1 inline-block text-xs font-semibold text-teal-700 hover:underline">
                /blog/{post.slug}
              </a>
            </div>
            <div className="flex shrink-0 gap-2">
              <button type="button" onClick={() => editPost(post)} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                <Pencil className="h-3.5 w-3.5" /> Edit
              </button>
              <button type="button" onClick={() => void deletePost(post)} className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50">
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </button>
            </div>
          </article>
        )) : (
          <div className="rounded-xl border border-dashed border-slate-300 px-5 py-8 text-center">
            <p className="text-sm font-medium text-slate-700">No blog articles yet.</p>
            <p className="mt-1 text-xs text-slate-500">Create your first article or add the current website guides.</p>
            <button type="button" onClick={() => void seedDefaultPosts()} disabled={saving} className="mt-4 inline-flex items-center gap-2 rounded-lg border border-teal-200 px-4 py-2 text-xs font-semibold text-teal-800 hover:bg-teal-50 disabled:opacity-60">
              {saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Add current travel guides
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
