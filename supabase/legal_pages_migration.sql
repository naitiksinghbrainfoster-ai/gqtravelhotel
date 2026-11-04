insert into public.site_content as existing_content (page_key, page_title, key, value)
values
  ('terms', 'Terms & conditions', 'terms_page_title', 'General Terms & Conditions'),
  ('terms', 'Terms & conditions', 'terms_page_subtitle', 'GQ Travel & Hotels'),
  ('terms', 'Terms & conditions', 'terms_page_body', ''),
  ('terms', 'Terms & conditions', 'terms_seo_title', 'Terms & Conditions | GQ Travel & Hotels'),
  ('terms', 'Terms & conditions', 'terms_seo_description', 'Read the terms and conditions for services and bookings with GQ Travel & Hotels.'),
  ('terms', 'Terms & conditions', 'terms_seo_keywords', 'terms and conditions, travel booking, GQ Travel & Hotels'),
  ('imprint', 'Imprint', 'imprint_page_title', 'Imprint'),
  ('imprint', 'Imprint', 'imprint_page_subtitle', 'Information pursuant to Section 5 DDG'),
  ('imprint', 'Imprint', 'imprint_page_body', ''),
  ('imprint', 'Imprint', 'imprint_seo_title', 'Imprint | GQ Travel & Hotels'),
  ('imprint', 'Imprint', 'imprint_seo_description', 'Legal notice and contact information for GQ Travel & Hotels.'),
  ('imprint', 'Imprint', 'imprint_seo_keywords', 'imprint, legal notice, GQ Travel & Hotels'),
  ('privacy-policy', 'Privacy policy', 'privacy_policy_page_title', 'Privacy Policy'),
  ('privacy-policy', 'Privacy policy', 'privacy_policy_page_subtitle', 'GQ Travel & Hotels'),
  ('privacy-policy', 'Privacy policy', 'privacy_policy_page_body', ''),
  ('privacy-policy', 'Privacy policy', 'privacy_policy_seo_title', 'Privacy Policy | GQ Travel & Hotels'),
  ('privacy-policy', 'Privacy policy', 'privacy_policy_seo_description', 'Learn how GQ Travel & Hotels collects, uses, and protects personal data.'),
  ('privacy-policy', 'Privacy policy', 'privacy_policy_seo_keywords', 'privacy policy, GDPR, data protection, GQ Travel & Hotels'),
  ('airport-transfer-terms', 'Airport Transfer Terms', 'airport_transfer_terms_page_title', 'Airport Transfer Terms'),
  ('airport-transfer-terms', 'Airport Transfer Terms', 'airport_transfer_terms_page_subtitle', 'Terms for airport pickup and transfer services'),
  ('airport-transfer-terms', 'Airport Transfer Terms', 'airport_transfer_terms_page_body', ''),
  ('airport-transfer-terms', 'Airport Transfer Terms', 'airport_transfer_terms_seo_title', 'Airport Transfer Terms | GQ Travel & Hotels'),
  ('airport-transfer-terms', 'Airport Transfer Terms', 'airport_transfer_terms_seo_description', 'Terms and conditions for airport transfer services arranged by GQ Travel & Hotels.'),
  ('airport-transfer-terms', 'Airport Transfer Terms', 'airport_transfer_terms_seo_keywords', 'airport transfer terms, airport pickup, GQ Travel & Hotels'),
  ('accra-transfer-terms', 'Accra Transfers Terms', 'accra_transfer_terms_page_title', 'Accra Transfers Terms'),
  ('accra-transfer-terms', 'Accra Transfers Terms', 'accra_transfer_terms_page_subtitle', 'Terms for transfers in Accra, Ghana'),
  ('accra-transfer-terms', 'Accra Transfers Terms', 'accra_transfer_terms_page_body', ''),
  ('accra-transfer-terms', 'Accra Transfers Terms', 'accra_transfer_terms_seo_title', 'Accra Transfers Terms | GQ Travel & Hotels'),
  ('accra-transfer-terms', 'Accra Transfers Terms', 'accra_transfer_terms_seo_description', 'Terms and conditions for Accra transfer services arranged by GQ Travel & Hotels.'),
  ('accra-transfer-terms', 'Accra Transfers Terms', 'accra_transfer_terms_seo_keywords', 'Accra transfers, Ghana airport transfer, GQ Travel & Hotels')
on conflict (key) do update
set page_key = excluded.page_key,
    page_title = excluded.page_title,
    value = excluded.value,
    updated_at = now()
where nullif(btrim(existing_content.value), '') is null;

notify pgrst, 'reload schema';
