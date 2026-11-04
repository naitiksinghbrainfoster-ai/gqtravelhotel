import React, { useEffect, useMemo, type FormEvent } from 'react';
import { Building2, Image as ImageIcon, LoaderCircle, Pencil, Save, Trash2, Upload, X } from 'lucide-react';

import type { DataRow, PropertyDraft } from '../utils';
import { asText, formatDate, propertyId } from '../utils';
import { EmptyState, InlineAlert } from '../components/AdminFeedback';

const fieldClass = 'mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10';
const imageTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);
const maxImageSize = 10 * 1024 * 1024;
const amenityOptions = [
  'Free Wi-Fi', 'Air conditioning', 'Kitchen', 'Parking', 'Swimming pool',
  'Breakfast', 'Pet friendly', 'Laundry', 'Work desk', 'Airport transfer',
];

export default function PropertiesPage({
  properties,
  busy,
  onEdit,
  onDelete,
  onToggleStatus,
}: {
  properties: DataRow[];
  busy: boolean;
  onEdit: (property: DataRow) => void;
  onDelete: (property: DataRow) => void;
  onToggleStatus: (property: DataRow) => void;
}) {
  const [typeFilter, setTypeFilter] = React.useState('all');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const filteredProperties = properties.filter((property) => (
    (typeFilter === 'all' || asText(property.property_type) === typeFilter)
    && (statusFilter === 'all' || asText(property.status) === statusFilter)
  ));

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Property catalog</h3>
          <p className="mt-1 text-xs text-slate-400">{filteredProperties.length} of {properties.length} properties</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <select aria-label="Filter by property type" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700">
            <option value="all">All types</option>
            {['Hotel', 'Apartment', 'Villa', 'Resort'].map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
          <select aria-label="Filter by publication status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700">
            <option value="all">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft / unpublished</option>
          </select>
          <span className="hidden items-center gap-1.5 text-xs text-slate-400 sm:flex"><ImageIcon className="h-3.5 w-3.5" /> Image uploads supported</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="bg-slate-50 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
            <tr><th className="px-5 py-3">Property</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Location</th><th className="px-4 py-3">Price/night</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Created</th><th className="px-5 py-3 text-right">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredProperties.map((property, index) => (
              <tr key={propertyId(property) || index} className="hover:bg-slate-50/60">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    {asText(property.featured_image) ? (
                      <img src={asText(property.featured_image)} alt="" className="h-11 w-14 rounded-lg bg-slate-100 object-cover" />
                    ) : (
                      <span className="grid h-11 w-14 place-items-center rounded-lg bg-slate-100 text-slate-400"><Building2 className="h-5 w-5" /></span>
                    )}
                    <div className="max-w-[230px]">
                      <p className="truncate text-xs font-semibold text-slate-800">{asText(property.name) || 'Untitled property'}{property.featured ? ' · Featured' : ''}</p>
                      <p className="mt-1 truncate text-[11px] text-slate-400">{asText(property.address)}</p>
                      <p className="mt-1 font-mono text-[11px] font-semibold text-teal-800">
                        Property ID: {asText(property.property_code) || 'Run property ID migration'}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-xs text-slate-600">{asText(property.property_type) || '—'}</td>
                <td className="px-4 py-3.5 text-xs text-slate-600">{[property.city, property.country].map(asText).filter(Boolean).join(', ') || '—'}</td>
                <td className="px-4 py-3.5 text-xs font-medium text-slate-700">€{Number(property.price_per_night ?? 0).toFixed(2)}</td>
                <td className="px-4 py-3.5">
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${property.status === 'published' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                    {asText(property.status) || 'draft'}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-xs text-slate-500">{formatDate(property.created_at)}</td>
                <td className="px-5 py-3.5">
                  <div className="flex justify-end gap-1">
                    <button type="button" disabled={busy} onClick={() => onToggleStatus(property)} className="rounded-lg px-2 py-1.5 text-[11px] font-semibold text-teal-800 hover:bg-teal-50 disabled:opacity-40">
                      {property.status === 'published' ? 'Unpublish' : 'Publish'}
                    </button>
                    <button type="button" title="Edit property" disabled={busy} onClick={() => onEdit(property)} className="rounded-lg p-2 text-slate-400 hover:bg-teal-50 hover:text-teal-800 disabled:opacity-40"><Pencil className="h-4 w-4" /></button>
                    <button type="button" title="Delete or archive property" disabled={busy} onClick={() => onDelete(property)} className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-700 disabled:opacity-40"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredProperties.length === 0 && (
          <EmptyState
            busy={busy}
            icon={Building2}
            title={properties.length ? 'No properties match these filters' : 'No properties yet'}
            detail={properties.length ? 'Change the property type or status filter.' : 'Add your first hotel, stay, or apartment to get started.'}
          />
        )}
      </div>
    </section>
  );
}

export function PropertyEditor({
  editing,
  draft,
  setDraft,
  featuredFile,
  galleryFiles,
  existingGallery,
  onFeaturedFile,
  onGalleryFiles,
  onRemoveExistingGallery,
  onRemoveGalleryFile,
  onFileError,
  error,
  onClose,
  onSubmit,
  saving,
}: {
  editing: boolean;
  draft: PropertyDraft;
  setDraft: React.Dispatch<React.SetStateAction<PropertyDraft>>;
  featuredFile: File | null;
  galleryFiles: File[];
  existingGallery: DataRow[];
  onFeaturedFile: (file: File | null) => void;
  onGalleryFiles: (files: File[]) => void;
  onRemoveExistingGallery: (image: DataRow) => void;
  onRemoveGalleryFile: (index: number) => void;
  onFileError: (message: string) => void;
  error: string;
  onClose: () => void;
  onSubmit: (event: FormEvent) => void;
  saving: boolean;
}) {
  const featuredPreview = useMemo(() => featuredFile ? URL.createObjectURL(featuredFile) : '', [featuredFile]);
  const galleryPreviews = useMemo(() => galleryFiles.map((file) => URL.createObjectURL(file)), [galleryFiles]);

  useEffect(() => () => {
    if (featuredPreview) URL.revokeObjectURL(featuredPreview);
    galleryPreviews.forEach((url) => URL.revokeObjectURL(url));
  }, [featuredPreview, galleryPreviews]);

  const updateField = <K extends keyof PropertyDraft,>(key: K, value: PropertyDraft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };
  const validateFile = (file: File) => {
    if (!imageTypes.has(file.type)) {
      onFileError(`${file.name}: choose a JPG, PNG, WebP, or AVIF image.`);
      return false;
    }
    if (file.size > maxImageSize) {
      onFileError(`${file.name}: image must be 10 MB or smaller.`);
      return false;
    }
    return true;
  };

  const setName = (name: string) => {
    setDraft((current) => ({
      ...current,
      name,
      slug: current.slug && current.slug !== slugify(current.name) ? current.slug : slugify(name),
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-labelledby="property-editor-title">
      <form onSubmit={onSubmit} className="max-h-[95vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 sm:px-7">
          <div><h2 id="property-editor-title" className="font-display text-lg font-semibold text-slate-900">{editing ? 'Edit property' : 'Add a property'}</h2><p className="mt-1 text-xs text-slate-400">Property details, availability and photos</p></div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100" aria-label="Close editor"><X className="h-5 w-5" /></button>
        </div>

        <div className="space-y-7 p-5 sm:p-7">
          <section>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Basic information</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-xs font-semibold text-slate-600">Property name *
                <input required value={draft.name} onChange={(event) => setName(event.target.value)} className={fieldClass} />
              </label>
              <label className="block text-xs font-semibold text-slate-600">Slug *
                <input required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" title="Use lowercase letters, numbers, and hyphens." value={draft.slug} onChange={(event) => updateField('slug', event.target.value)} className={fieldClass} />
              </label>
              <label className="block text-xs font-semibold text-slate-600">Property type
                <select value={draft.property_type} onChange={(event) => updateField('property_type', event.target.value as PropertyDraft['property_type'])} className={fieldClass}>
                  {['Hotel', 'Apartment', 'Villa', 'Resort'].map((type) => <option key={type}>{type}</option>)}
                </select>
              </label>
              <label className="block text-xs font-semibold text-slate-600">Short description
                <textarea rows={2} value={draft.short_description} onChange={(event) => updateField('short_description', event.target.value)} className={fieldClass} />
              </label>
              <label className="block text-xs font-semibold text-slate-600 sm:col-span-2">Full description
                <textarea rows={4} value={draft.description} onChange={(event) => updateField('description', event.target.value)} className={fieldClass} />
              </label>
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Location</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-xs font-semibold text-slate-600">Country *
                <input required value={draft.country} onChange={(event) => updateField('country', event.target.value)} className={fieldClass} />
              </label>
              <label className="block text-xs font-semibold text-slate-600">City *
                <input required value={draft.city} onChange={(event) => updateField('city', event.target.value)} className={fieldClass} />
              </label>
              <label className="block text-xs font-semibold text-slate-600 sm:col-span-2">Street address
                <input value={draft.address} onChange={(event) => updateField('address', event.target.value)} className={fieldClass} />
              </label>
              <label className="block text-xs font-semibold text-slate-600">ZIP / postal code
                <input value={draft.postal_code} onChange={(event) => updateField('postal_code', event.target.value)} className={fieldClass} />
              </label>
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Pricing and capacity</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <label className="block text-xs font-semibold text-slate-600">Base price per night (€) *
                <input required type="number" min="0" step="0.01" value={draft.price_per_night} onChange={(event) => updateField('price_per_night', event.target.value)} className={fieldClass} />
              </label>
              <label className="block text-xs font-semibold text-slate-600">Maximum adults
                <input type="number" min="1" step="1" value={draft.max_adults} onChange={(event) => updateField('max_adults', event.target.value)} className={fieldClass} />
              </label>
              <label className="block text-xs font-semibold text-slate-600">Maximum children
                <input type="number" min="0" step="1" value={draft.max_children} onChange={(event) => updateField('max_children', event.target.value)} className={fieldClass} />
              </label>
              <p className="text-xs text-slate-400 sm:col-span-3">Prices are stored and shown in EUR (€).</p>
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Amenities</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {amenityOptions.map((amenity) => (
                <label key={amenity} className="flex items-center gap-2 text-sm text-slate-700">
                  <input type="checkbox" checked={draft.amenities.includes(amenity)} onChange={(event) => updateField(
                    'amenities',
                    event.target.checked
                      ? [...draft.amenities, amenity]
                      : draft.amenities.filter((item) => item !== amenity),
                  )} className="h-4 w-4 rounded border-slate-300 text-teal-800 focus:ring-teal-700" />
                  {amenity}
                </label>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Property settings</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-xs font-semibold text-slate-600">Publication status
                <select value={draft.status} onChange={(event) => updateField('status', event.target.value as PropertyDraft['status'])} className={fieldClass}>
                  <option value="draft">Draft — hidden from public site</option>
                  <option value="published">Published — visible on public site</option>
                </select>
              </label>
              <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700">
                <input type="checkbox" checked={draft.featured} onChange={(event) => updateField('featured', event.target.checked)} className="h-4 w-4 rounded border-slate-300 text-teal-800 focus:ring-teal-700" />
                Featured property
              </label>
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Property images</h3>
            <label className="mt-3 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 p-4 text-xs text-slate-600 hover:border-teal-500">
              <Upload className="h-5 w-5 shrink-0 text-teal-800" />
              <span><b className="block text-slate-800">Upload featured image</b>{featuredFile?.name ?? 'JPG, PNG, WebP, AVIF · max 10 MB'}</span>
              <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="sr-only" onChange={(event) => {
                const file = event.target.files?.[0] ?? null;
                if (file && validateFile(file)) onFeaturedFile(file);
                event.target.value = '';
              }} />
            </label>
            {(featuredPreview || draft.featured_image) && (
              <div className="relative mt-3 inline-block">
                <img src={featuredPreview || draft.featured_image} alt="Featured image preview" className="h-36 w-56 rounded-xl bg-slate-100 object-cover" />
                <button type="button" onClick={() => { onFeaturedFile(null); updateField('featured_image', ''); }} aria-label="Remove featured image" className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-slate-600 shadow"><X className="h-4 w-4" /></button>
              </div>
            )}

            <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 p-4 text-xs text-slate-600 hover:border-teal-500">
              <ImageIcon className="h-5 w-5 shrink-0 text-teal-800" />
              <span><b className="block text-slate-800">Add gallery images</b>Choose multiple images · JPG, PNG, WebP, AVIF · max 10 MB each</span>
              <input type="file" multiple accept="image/jpeg,image/png,image/webp,image/avif" className="sr-only" onChange={(event) => {
                const valid = Array.from(event.target.files ?? []).filter(validateFile);
                if (valid.length) onGalleryFiles([...galleryFiles, ...valid]);
                event.target.value = '';
              }} />
            </label>

            {(existingGallery.length > 0 || galleryFiles.length > 0) && (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {existingGallery.map((image) => (
                  <div key={asText(image.id)} className="relative">
                    <img src={asText(image.image_url)} alt="Property gallery" className="h-28 w-full rounded-xl bg-slate-100 object-cover" />
                    <button type="button" onClick={() => onRemoveExistingGallery(image)} aria-label="Remove gallery image" className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-slate-600 shadow"><X className="h-4 w-4" /></button>
                  </div>
                ))}
                {galleryFiles.map((file, index) => (
                  <div key={`${file.name}-${index}`} className="relative">
                    <img src={galleryPreviews[index]} alt={file.name} className="h-28 w-full rounded-xl bg-slate-100 object-cover" />
                    <button type="button" onClick={() => onRemoveGalleryFile(index)} aria-label={`Remove ${file.name}`} className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-slate-600 shadow"><X className="h-4 w-4" /></button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="sticky bottom-0 border-t border-slate-100 bg-white px-5 py-4 sm:px-7">
          {error && <div className="mb-3"><InlineAlert message={error} /></div>}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
            <button type="submit" disabled={saving} className="flex items-center gap-2 rounded-xl bg-teal-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-900 disabled:opacity-60">{saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}{editing ? 'Save changes' : 'Create property'}</button>
          </div>
        </div>
      </form>
    </div>
  );
}

function slugify(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
