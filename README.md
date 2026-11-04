<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/9c22957b-18d0-466c-81ad-663fd9f419b4

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

On Windows, if the project folder path contains `&`, run scripts with PowerShell as npm's shell:
`npm --script-shell=powershell.exe run dev`

## Admin panel

The admin panel is available at `/admin`. Configure the public Supabase project URL and anon/publishable key in `.env.local`:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_OR_PUBLISHABLE_KEY
```

The admin login uses Supabase Auth email/password credentials. Create the account in Supabase; the website does not create accounts or store passwords in its own tables.

1. In the Supabase Dashboard, open **Authentication → Users** and select **Add user**. Create a user with an email and a strong password, or send an invite and have the administrator set their password from the email.
2. Do not rerun [`supabase/admin_setup.sql`](./supabase/admin_setup.sql) against the existing production project. It describes a different schema and is intended only for a new database created specifically for that setup. The current project uses normalized property and booking tables.
3. Assign the `admin` role to the new user's profile in the SQL Editor, or keep an existing `super_admin` role. Both roles can access the admin panel. Replace the example email with the exact email used in Authentication:

```sql
update public.profiles
set role = 'admin'
where id = (
  select id
  from auth.users
  where lower(email) = lower('admin@example.com')
);

select auth_user.email, profile.role
from auth.users as auth_user
join public.profiles as profile on profile.id = auth_user.id
where lower(auth_user.email) = lower('admin@example.com');
```

The verification query should return the administrator email with `role = 'admin'` or `role = 'super_admin'`. For a project where the existing admin policies are already installed, execute [`supabase/admin_role_policies.sql`](./supabase/admin_role_policies.sql) once in the SQL Editor. This updates the admin-check function used by those policies, allowing both roles without changing the user's profile role. They can then sign in at `/admin` using that Supabase Auth email and password. If they cannot sign in, check **Authentication → Users** for the account and confirm that the password or invite setup is complete.

### Property management database setup

The admin property manager and public property listings use the existing `properties`, `property_images`, `property_amenities`, `property_units`, `property_rates`, and `bookings` tables. The additive migration [`supabase/property_management_migration.sql`](./supabase/property_management_migration.sql) adds the property-management columns, creates `property_amenities` if needed, adds the `property-images` Storage bucket if it does not exist, and configures its related policies. It also defines published-property read policies and admin write policies for properties, images, and amenities.

If the admin reports a missing property column while loading or saving properties, open the Supabase SQL Editor and run [`supabase/property_management_migration.sql`](./supabase/property_management_migration.sql). At minimum, the property manager requires its added fields (including `postal_code`, `slug`, `property_type`, and `status`); an older schema also has a required `title` column, which the app fills from the property name.

After applying the migration, refresh the admin page. Supabase/PostgREST reloads the schema from the migration notification.

For the full property-management setup, first inspect the existing table columns, constraints, RLS policies, and `profiles.role` values in the SQL Editor. The migration replaces policies with its specific names and updates `public.is_admin()`; existing policies with other names remain in place and may grant broader access. Do not apply it until those existing policies have been reviewed. The migration has not been run by this application setup.

The browser upload code expects a public Storage bucket whose ID is `property-images`, with authenticated admin insert/update/delete permissions. If you use another bucket ID, update the application consistently rather than creating duplicate buckets. Never use a Supabase `service_role` key in this browser application.

Never use a Supabase `service_role` key in this browser application. The setup script assumes existing tables use `id` identifiers and adds the columns used by this application; review existing table constraints and policies before applying it to production. Supabase combines permissive policies with OR, so remove any legacy policies that grant broader access than these admin rules.

The panel provides property and apartment CRUD, featured and gallery image uploads, booking review/status updates, contact enquiries, dashboard counts, and page-separated website content editing. CMS content uses the `site_content` `key`/`value` fields; every homepage section and banner is editable, and every public page has separate SEO title, description, and keywords. Changes are reflected on public pages without requiring a full browser reload. Contact forms create enquiry records. Accommodation checkout currently submits a **pending booking request** for admin review; it does not process payments or confirm availability.

Run [`supabase/website_content_migration.sql`](./supabase/website_content_migration.sql) in the Supabase SQL Editor to create/align `site_content`, create the `blog_posts` table and its public/admin access policies, and seed the homepage, Services, About, Contact, Hotels & apartments, Airport transfers, Global auto rent, Sixt car rent, Car rental, Private jet, Global tours, Holidays, Vacation, Flights, Cruise, Railway tickets, Blog, and legal pages. If the site-content table already exists and you only need the legal-page fields, run [`supabase/legal_pages_migration.sql`](./supabase/legal_pages_migration.sql). If website enquiries are not appearing in Admin, run [`supabase/contact_enquiries_migration.sql`](./supabase/contact_enquiries_migration.sql) to align `contact_messages` and its public-submit/admin-read policies. Contact and service quote forms submit to that same inbox; successful contact submissions show a confirmation and a separate WhatsApp action. The Terms, Imprint, Privacy Policy, Airport Transfer Terms, and Accra Transfers Terms pages have admin-editable page headings, body text, and individual SEO settings; the two transfer-terms pages are linked from the footer. Existing Terms, Imprint, and Privacy Policy content remains as the default until a custom body is saved. To create only the article table, run [`supabase/blog_posts_migration.sql`](./supabase/blog_posts_migration.sql) instead. It creates `public.blog_posts` with article slugs and per-article SEO title, description, and keywords, enables public reads only for published posts, and restricts writes to admins. Existing articles receive generated unique slugs and metadata defaults when the migration runs. Each published article has its own `/blog/{slug}` page; its stored SEO metadata is applied on that page. In the Blog admin page, create, edit, publish/unpublish, or delete articles and manage each article's URL slug and SEO metadata; draft articles are not shown publicly. Blog banner text and article-list labels are editable independently from homepage news. The seed fills missing or blank `site_content` values only, preserving non-empty values already customized in the CMS, and inserts the initial travel guides only once by fixed IDs. Run the required migration in the Supabase SQL Editor, then refresh the admin page.

Website content pages are selected from the admin sidebar submenu. Homepage sections, individual services-page sections, About-page sections, and service booking details are editable separately; all listed pages have independent SEO title, description, and keywords.
