'use client';

import { useResume } from '@/lib/resume-context';

const inputClass = `w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm
  focus:outline-none focus:border-indigo-500/60 focus:bg-white/8 transition-all duration-200`;

export default function ContactForm() {
  const { state, dispatch } = useResume();
  const { contact } = state.resume;

  const update = (field: string, value: string) => {
    dispatch({ type: 'UPDATE_CONTACT', payload: { [field]: value } });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-400 mb-1.5">Full Name *</label>
        <input
          id="contact-fullName"
          type="text"
          value={contact.fullName}
          onChange={(e) => update('fullName', e.target.value)}
          placeholder="Jane Smith"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Email *</label>
          <input
            id="contact-email"
            type="email"
            value={contact.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="jane@example.com"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Phone</label>
          <input
            id="contact-phone"
            type="tel"
            value={contact.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="+1 (555) 000-0000"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-400 mb-1.5">Location</label>
        <input
          id="contact-location"
          type="text"
          value={contact.location}
          onChange={(e) => update('location', e.target.value)}
          placeholder="San Francisco, CA"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-400 mb-1.5">LinkedIn URL</label>
        <input
          id="contact-linkedIn"
          type="text"
          value={contact.linkedIn}
          onChange={(e) => update('linkedIn', e.target.value)}
          placeholder="linkedin.com/in/janesmith"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Website</label>
          <input
            id="contact-website"
            type="text"
            value={contact.website}
            onChange={(e) => update('website', e.target.value)}
            placeholder="janesmith.dev"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">GitHub</label>
          <input
            id="contact-github"
            type="text"
            value={contact.github}
            onChange={(e) => update('github', e.target.value)}
            placeholder="github.com/janesmith"
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );
}
