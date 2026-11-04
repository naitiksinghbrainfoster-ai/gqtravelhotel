import { useState, type FormEvent } from 'react';
import { ImagePlus, LoaderCircle, Save, Upload } from 'lucide-react';
import BlogPostsManager from '../components/BlogPostsManager';

import {
  aboutContentSections,
  contentFields,
  contactContentSections,
  airportTransfersContentSections,
  carRentalContentSections,
  globalAutoRentContentSections,
  homeContentSections,
  hotelApartmentsContentSections,
  sixtCarRentContentSections,
  privateJetContentSections,
  globalToursContentSections,
  holidaysContentSections,
  vacationContentSections,
  globalFlightContentSections,
  cruiseContentSections,
  railwayContentSections,
  blogContentSections,
  legalPageContentSections,
  imprintPageContentSections,
  privacyPageContentSections,
  airportTransferTermsContentSections,
  accraTransferTermsContentSections,
  managedServices,
  seoContentFields,
  serviceContentFields,
  websiteContentPages,
} from '../utils';

type EditableField = {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'image';
};

export default function WebsiteContentPage({
  content,
  selectedPageId,
  onChange,
  onSubmit,
  onUpload,
  saving,
}: {
  content: Record<string, string>;
  selectedPageId: string;
  onChange: (key: string, value: string) => void;
  onSubmit: (event: FormEvent, keys: string[]) => void;
  onUpload: (file: File, key: string) => Promise<void>;
  saving: boolean;
}) {
  const selectedPage = websiteContentPages.find((page) => page.id === selectedPageId) ?? websiteContentPages[0];
  const servicePageFields: EditableField[] = contentFields
    .filter((field) => field.group === 'Services page')
    .map((field) => ({
      key: field.key,
      label: field.label,
      type: field.key.endsWith('_image') ? 'image' : field.key.includes('description') ? 'textarea' : 'text',
    }));
  const serviceSections = managedServices.map((service) => ({
    ...service,
    fields: serviceContentFields
      .filter((field) => field.key.startsWith(`service_${service.id}_`))
      .map((field) => ({
        key: field.key,
        label: field.label,
        type: field.key.endsWith('_image') ? 'image' as const : field.key.includes('description') || field.key.includes('subtitle') ? 'textarea' as const : 'text' as const,
      })),
  }));
  const seoFields: EditableField[] = seoContentFields(selectedPage.seoPrefix);
  const managedPageSections = ({
    'private-jet-rentals': privateJetContentSections,
    'global-tours': globalToursContentSections,
    holidays: holidaysContentSections,
    vacation: vacationContentSections,
    'global-flight': globalFlightContentSections,
    cruise: cruiseContentSections,
    'railway-tickets': railwayContentSections,
    blog: blogContentSections,
    terms: legalPageContentSections,
    imprint: imprintPageContentSections,
    'privacy-policy': privacyPageContentSections,
    'airport-transfer-terms': airportTransferTermsContentSections,
    'accra-transfer-terms': accraTransferTermsContentSections,
  } as Record<string, Array<{ id: string; label: string; fields: EditableField[] }>>)[selectedPage.id] ?? [];

  return (
    <div className="space-y-5">
      {selectedPage.id === 'home' && homeContentSections.map((section, index) => (
        <details
          key={section.id}
          open={index === 0}
          className="group rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6">
            <span>
              <span className="block text-sm font-semibold text-slate-900">{section.label}</span>
              <span className="mt-1 block text-xs text-slate-500">{section.fields.length} editable fields</span>
            </span>
            <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 group-open:bg-teal-50 group-open:text-teal-900">
              Edit section
            </span>
          </summary>
          <form onSubmit={(event) => onSubmit(event, section.fields.map((field) => field.key))} className="border-t border-slate-100 p-5 sm:p-6">
            <div className="grid gap-5 md:grid-cols-2">
              {section.fields.map((field) => (
                <ContentField
                  key={field.key}
                  field={field}
                  value={content[field.key] ?? ''}
                  onChange={onChange}
                  onUpload={onUpload}
                />
              ))}
            </div>
            <div className="mt-5 flex justify-end">
              <button type="submit" disabled={saving} className="flex items-center gap-2 rounded-xl bg-teal-800 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-900 disabled:opacity-60">
                {saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save {section.label}
              </button>
            </div>
          </form>
        </details>
      ))}

      {selectedPage.id === 'about' && aboutContentSections.map((section, index) => (
        <details
          key={section.id}
          open={index === 0}
          className="group rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6">
            <span>
              <span className="block text-sm font-semibold text-slate-900">{section.label}</span>
              <span className="mt-1 block text-xs text-slate-500">{section.fields.length} editable fields</span>
            </span>
            <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 group-open:bg-teal-50 group-open:text-teal-900">
              Edit section
            </span>
          </summary>
          <form onSubmit={(event) => onSubmit(event, section.fields.map((field) => field.key))} className="border-t border-slate-100 p-5 sm:p-6">
            <div className="grid gap-5 md:grid-cols-2">
              {section.fields.map((field) => (
                <ContentField
                  key={field.key}
                  field={field}
                  value={content[field.key] ?? ''}
                  onChange={onChange}
                  onUpload={onUpload}
                />
              ))}
            </div>
            <div className="mt-5 flex justify-end">
              <SaveButton saving={saving} label={`Save ${section.label}`} />
            </div>
          </form>
        </details>
      ))}

      {selectedPage.id === 'contact' && contactContentSections.map((section, index) => (
        <details
          key={section.id}
          open={index === 0}
          className="group rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6">
            <span>
              <span className="block text-sm font-semibold text-slate-900">{section.label}</span>
              <span className="mt-1 block text-xs text-slate-500">{section.fields.length} editable fields</span>
            </span>
            <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 group-open:bg-teal-50 group-open:text-teal-900">
              Edit section
            </span>
          </summary>
          <form onSubmit={(event) => onSubmit(event, section.fields.map((field) => field.key))} className="border-t border-slate-100 p-5 sm:p-6">
            <div className="grid gap-5 md:grid-cols-2">
              {section.fields.map((field) => (
                <ContentField
                  key={field.key}
                  field={field}
                  value={content[field.key] ?? ''}
                  onChange={onChange}
                  onUpload={onUpload}
                />
              ))}
            </div>
            <div className="mt-5 flex justify-end">
              <SaveButton saving={saving} label={`Save ${section.label}`} />
            </div>
          </form>
        </details>
      ))}

      {selectedPage.id === 'hotel-apartments' && hotelApartmentsContentSections.map((section, index) => (
        <details
          key={section.id}
          open={index === 0}
          className="group rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6">
            <span>
              <span className="block text-sm font-semibold text-slate-900">{section.label}</span>
              <span className="mt-1 block text-xs text-slate-500">{section.fields.length} editable fields</span>
            </span>
            <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 group-open:bg-teal-50 group-open:text-teal-900">
              Edit section
            </span>
          </summary>
          <form onSubmit={(event) => onSubmit(event, section.fields.map((field) => field.key))} className="border-t border-slate-100 p-5 sm:p-6">
            <div className="grid gap-5 md:grid-cols-2">
              {section.fields.map((field) => (
                <ContentField
                  key={field.key}
                  field={field}
                  value={content[field.key] ?? ''}
                  onChange={onChange}
                  onUpload={onUpload}
                />
              ))}
            </div>
            <div className="mt-5 flex justify-end">
              <SaveButton saving={saving} label={`Save ${section.label}`} />
            </div>
          </form>
        </details>
      ))}

      {selectedPage.id === 'airport-transfers-saarland' && airportTransfersContentSections.map((section, index) => (
        <details
          key={section.id}
          open={index === 0}
          className="group rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6">
            <span>
              <span className="block text-sm font-semibold text-slate-900">{section.label}</span>
              <span className="mt-1 block text-xs text-slate-500">{section.fields.length} editable fields</span>
            </span>
            <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 group-open:bg-teal-50 group-open:text-teal-900">
              Edit section
            </span>
          </summary>
          <form onSubmit={(event) => onSubmit(event, section.fields.map((field) => field.key))} className="border-t border-slate-100 p-5 sm:p-6">
            <div className="grid gap-5 md:grid-cols-2">
              {section.fields.map((field) => (
                <ContentField
                  key={field.key}
                  field={field}
                  value={content[field.key] ?? ''}
                  onChange={onChange}
                  onUpload={onUpload}
                />
              ))}
            </div>
            <div className="mt-5 flex justify-end">
              <SaveButton saving={saving} label={`Save ${section.label}`} />
            </div>
          </form>
        </details>
      ))}

      {selectedPage.id === 'global-auto-rent' && globalAutoRentContentSections.map((section, index) => (
        <details
          key={section.id}
          open={index === 0}
          className="group rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6">
            <span>
              <span className="block text-sm font-semibold text-slate-900">{section.label}</span>
              <span className="mt-1 block text-xs text-slate-500">{section.fields.length} editable fields</span>
            </span>
            <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 group-open:bg-teal-50 group-open:text-teal-900">
              Edit section
            </span>
          </summary>
          <form onSubmit={(event) => onSubmit(event, section.fields.map((field) => field.key))} className="border-t border-slate-100 p-5 sm:p-6">
            <div className="grid gap-5 md:grid-cols-2">
              {section.fields.map((field) => (
                <ContentField
                  key={field.key}
                  field={field}
                  value={content[field.key] ?? ''}
                  onChange={onChange}
                  onUpload={onUpload}
                />
              ))}
            </div>
            <div className="mt-5 flex justify-end">
              <SaveButton saving={saving} label={`Save ${section.label}`} />
            </div>
          </form>
        </details>
      ))}

      {selectedPage.id === 'sixt-car-rent' && sixtCarRentContentSections.map((section, index) => (
        <details
          key={section.id}
          open={index === 0}
          className="group rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6">
            <span>
              <span className="block text-sm font-semibold text-slate-900">{section.label}</span>
              <span className="mt-1 block text-xs text-slate-500">{section.fields.length} editable fields</span>
            </span>
            <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 group-open:bg-teal-50 group-open:text-teal-900">
              Edit section
            </span>
          </summary>
          <form onSubmit={(event) => onSubmit(event, section.fields.map((field) => field.key))} className="border-t border-slate-100 p-5 sm:p-6">
            <div className="grid gap-5 md:grid-cols-2">
              {section.fields.map((field) => (
                <ContentField
                  key={field.key}
                  field={field}
                  value={content[field.key] ?? ''}
                  onChange={onChange}
                  onUpload={onUpload}
                />
              ))}
            </div>
            <div className="mt-5 flex justify-end">
              <SaveButton saving={saving} label={`Save ${section.label}`} />
            </div>
          </form>
        </details>
      ))}

      {selectedPage.id === 'car-rental' && carRentalContentSections.map((section, index) => (
        <details
          key={section.id}
          open={index === 0}
          className="group rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6">
            <span>
              <span className="block text-sm font-semibold text-slate-900">{section.label}</span>
              <span className="mt-1 block text-xs text-slate-500">{section.fields.length} editable fields</span>
            </span>
            <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 group-open:bg-teal-50 group-open:text-teal-900">
              Edit section
            </span>
          </summary>
          <form onSubmit={(event) => onSubmit(event, section.fields.map((field) => field.key))} className="border-t border-slate-100 p-5 sm:p-6">
            <div className="grid gap-5 md:grid-cols-2">
              {section.fields.map((field) => (
                <ContentField
                  key={field.key}
                  field={field}
                  value={content[field.key] ?? ''}
                  onChange={onChange}
                  onUpload={onUpload}
                />
              ))}
            </div>
            <div className="mt-5 flex justify-end">
              <SaveButton saving={saving} label={`Save ${section.label}`} />
            </div>
          </form>
        </details>
      ))}

      {managedPageSections.map((section, index) => (
        <details
          key={section.id}
          open={index === 0}
          className="group rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6">
            <span>
              <span className="block text-sm font-semibold text-slate-900">{section.label}</span>
              <span className="mt-1 block text-xs text-slate-500">{section.fields.length} editable fields</span>
            </span>
            <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 group-open:bg-teal-50 group-open:text-teal-900">
              Edit section
            </span>
          </summary>
          <form onSubmit={(event) => onSubmit(event, section.fields.map((field) => field.key))} className="border-t border-slate-100 p-5 sm:p-6">
            <div className="grid gap-5 md:grid-cols-2">
              {section.fields.map((field) => (
                <ContentField
                  key={field.key}
                  field={field}
                  value={content[field.key] ?? ''}
                  onChange={onChange}
                  onUpload={onUpload}
                />
              ))}
            </div>
            <div className="mt-5 flex justify-end">
              <SaveButton saving={saving} label={`Save ${section.label}`} />
            </div>
          </form>
        </details>
      ))}

      {selectedPage.id === 'blog' && <BlogPostsManager />}

      {selectedPage.id === 'services' && (
        <>
          <details open className="group rounded-2xl border border-slate-200 bg-white shadow-sm">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6">
              <span>
                <span className="block text-sm font-semibold text-slate-900">Services page banner & introduction</span>
                <span className="mt-1 block text-xs text-slate-500">{servicePageFields.length} editable fields</span>
              </span>
              <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 group-open:bg-teal-50 group-open:text-teal-900">
                Edit section
              </span>
            </summary>
            <form onSubmit={(event) => onSubmit(event, servicePageFields.map((field) => field.key))} className="border-t border-slate-100 p-5 sm:p-6">
              <div className="grid gap-5 md:grid-cols-2">
                {servicePageFields.map((field) => (
                  <ContentField key={field.key} field={field} value={content[field.key] ?? ''} onChange={onChange} onUpload={onUpload} />
                ))}
              </div>
              <div className="mt-5 flex justify-end">
                <SaveButton saving={saving} label="Save services page banner" />
              </div>
            </form>
          </details>

          {serviceSections.map((service) => (
            <details key={service.id} className="group rounded-2xl border border-slate-200 bg-white shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6">
                <span>
                  <span className="block text-sm font-semibold text-slate-900">{service.label}</span>
                  <span className="mt-1 block text-xs text-slate-500">{service.fields.length} editable fields</span>
                </span>
                <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 group-open:bg-teal-50 group-open:text-teal-900">
                  Edit section
                </span>
              </summary>
              <form onSubmit={(event) => onSubmit(event, service.fields.map((field) => field.key))} className="border-t border-slate-100 p-5 sm:p-6">
                <div className="grid gap-5 md:grid-cols-2">
                  {service.fields.map((field) => (
                    <ContentField key={field.key} field={field} value={content[field.key] ?? ''} onChange={onChange} onUpload={onUpload} />
                  ))}
                </div>
                <div className="mt-5 flex justify-end">
                  <SaveButton saving={saving} label={`Save ${service.label}`} />
                </div>
              </form>
            </details>
          ))}
        </>
      )}

      <form onSubmit={(event) => onSubmit(event, seoFields.map((field) => field.key))} className="space-y-5">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <h3 className="text-sm font-semibold text-slate-900">{selectedPage.label} SEO settings</h3>
            <p className="mt-1 text-xs text-slate-500">Used by search engines and social previews for {selectedPage.route === '/' ? 'the homepage' : selectedPage.route}.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {seoFields.map((field) => (
              <ContentField key={field.key} field={field} value={content[field.key] ?? ''} onChange={onChange} onUpload={onUpload} />
            ))}
          </div>
          <div className="mt-5 flex justify-end">
            <SaveButton saving={saving} label={`Save ${selectedPage.label} SEO`} />
          </div>
        </section>
      </form>
    </div>
  );
}

function SaveButton({ saving, label }: { saving: boolean; label: string }) {
  return (
    <button type="submit" disabled={saving} className="flex items-center gap-2 rounded-xl bg-teal-800 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-900 disabled:opacity-60">
      {saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
      {label}
    </button>
  );
}

function ContentField({
  field,
  value,
  onChange,
  onUpload,
}: {
  field: EditableField;
  value: string;
  onChange: (key: string, value: string) => void;
  onUpload: (file: File, key: string) => Promise<void>;
}) {
  const [uploading, setUploading] = useState(false);
  const wide = field.type !== 'text';

  const uploadFile = async (file?: File) => {
    if (!file) return;
    setUploading(true);
    try {
      await onUpload(file, field.key);
    } finally {
      setUploading(false);
    }
  };

  if (field.type === 'image') {
    return (
      <div className="block text-xs font-semibold text-slate-600 md:col-span-2">
        <span>{field.label}</span>
        <div className="mt-2 rounded-xl border border-dashed border-slate-300 p-3">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            aria-label={`Upload ${field.label.toLowerCase()}`}
            onChange={(event) => {
              void uploadFile(event.target.files?.[0]);
              event.target.value = '';
            }}
            className="sr-only"
            id={`upload-${field.key}`}
            disabled={uploading}
          />
          <label htmlFor={`upload-${field.key}`} className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-teal-50 px-3 py-2.5 text-sm font-semibold text-teal-900 hover:bg-teal-100">
            {uploading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : value ? <Upload className="h-4 w-4" /> : <ImagePlus className="h-4 w-4" />}
            {uploading ? 'Uploading image…' : value ? 'Replace image' : 'Upload image'}
          </label>
          <p className="mt-2 text-[11px] font-normal text-slate-400">JPG, PNG, WebP or AVIF · Maximum 10 MB</p>
          {value && (
            <div className="mt-3 flex items-start gap-3">
              <img src={value} alt={`${field.label} preview`} className="h-24 w-36 rounded-lg bg-slate-100 object-cover" />
              <button type="button" onClick={() => onChange(field.key, '')} className="text-xs font-semibold text-rose-700 hover:underline">
                Remove image
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <label className={`block text-xs font-semibold text-slate-600 ${wide ? 'md:col-span-2' : ''}`}>
      {field.label}
      {field.type === 'textarea' ? (
        <textarea
          rows={field.key.includes('keywords') ? 2 : field.key.endsWith('_body') ? 18 : 3}
          value={value}
          onChange={(event) => onChange(field.key, event.target.value)}
          placeholder={field.key.includes('keywords') ? 'travel, hotels, flights' : undefined}
          className="mt-2 w-full resize-y rounded-xl border border-slate-200 px-3.5 py-3 text-sm font-normal outline-none focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(field.key, event.target.value)}
          className="mt-2 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm font-normal outline-none focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10"
        />
      )}
      {field.key.endsWith('_body') && (
        <p className="mt-1.5 font-normal text-slate-400">
          Plain text: separate paragraphs with blank lines, start a heading with ##, and list items with -.
        </p>
      )}
      {field.key.includes('keywords') && <p className="mt-1.5 font-normal text-slate-400">Separate keywords with commas.</p>}
    </label>
  );
}
