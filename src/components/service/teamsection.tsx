import React from 'react';
import ImageWithFallback from './ImageWithFallback';
import { btnPrimary, waLink } from './shared';
import { homeContentValue, HomeContent } from '../../lib/homeContent';

type Member = { name: string; role: string; image: string; initials: string };

const teamImage = (fileName: string) => encodeURI(`/assets/aboutus/${fileName}`);

const team: Member[] = [
  { name: 'Jim E. Baggiocy', role: 'Managing Director', image: teamImage('Jim B. Ennin-500kb.jpeg'), initials: 'JB' },
  { name: 'Remy Mantey', role: 'General Manager – Ghana', image: teamImage('Remy Mantey-500kb.jpeg'), initials: 'RM' },
  { name: 'Maxwell Antwi', role: 'Marketing & Tour Guide Manager – Ghana', image: teamImage('Maxwell Antwi-500kb.jpeg'), initials: 'MA' },
  { name: 'Helena O.', role: 'OP Marketing, UX/UI Manager', image: teamImage('Helena-500kb.jpeg'), initials: 'HO' },
];

const TeamSection: React.FC<{ content?: HomeContent }> = ({ content }) => {
  const displayedTeam = team.map((member, index) => ({
    ...member,
    name: homeContentValue(content, `about_team_member_${index + 1}_name`, member.name),
    role: homeContentValue(content, `about_team_member_${index + 1}_role`, member.role),
    image: homeContentValue(content, `about_team_member_${index + 1}_image`, member.image),
  }));

  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {homeContentValue(content, 'about_team_title', 'Dedicated Travel Experts')}
          </h2>
          <p className="mt-3 text-lg font-semibold text-gray-900">
            {homeContentValue(content, 'about_team_subtitle', 'From Travel Plans to Confirmed Bookings')}
          </p>
          <p className="mt-4 leading-relaxed text-gray-700">
            {homeContentValue(content, 'about_team_description', 'At GQ Travel & Hotels, we help you arrange flights, hotel reservations, tailor-made holidays, and corporate travel solutions that fit your needs, schedule, and budget.')}
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <p className="leading-relaxed text-gray-700">
            {homeContentValue(content, 'about_team_booking_description', 'Ready to book? Send us your destination, travel dates, and requirements. Our team will assist you with available options and guide you through the reservation process.')}
          </p>
          <p className="mt-4 font-semibold text-gray-900">
            {homeContentValue(content, 'about_team_booking_heading', 'Ready to make your booking?')}
          </p>
          <a
            href={waLink('Hello GQ Travel & Hotels, I would like to request a booking.')}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btnPrimary} mt-3`}
          >
            {homeContentValue(content, 'about_team_booking_cta', 'Request Your Booking Now')}
          </a>
          <p className="mt-4 text-sm italic text-gray-600">
            {homeContentValue(content, 'about_team_booking_note', 'Submit your travel details today to get your booking process started.')}
          </p>
        </div>
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {displayedTeam.map((m) => (
          <li key={m.name} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
            <ImageWithFallback
              src={m.image}
              alt={`${m.name}, ${m.role}`}
              fallback={m.initials}
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-900">{m.name}</h3>
              <p className="mt-1 text-sm text-gray-600">{m.role}</p>
            </div>
          </li>
        ))}
      </ul>
      </div>
    </section>
  );
};

export default TeamSection;