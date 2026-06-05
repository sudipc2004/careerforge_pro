'use client';

import { useResume } from '@/lib/resume-context';
import { Plus, Trash2 } from 'lucide-react';
import { Certification } from '@/lib/resume-schema';

const inputClass = `w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl px-3 py-2 text-sm
  focus:outline-none focus:border-indigo-500/60 transition-all duration-200`;

export default function CertificationsForm() {
  const { state, dispatch } = useResume();
  const { certifications } = state.resume;

  const updateCert = (id: string, data: Partial<Certification>) => {
    dispatch({ type: 'UPDATE_CERTIFICATION', payload: { id, data } });
  };

  return (
    <div className="space-y-3">
      {certifications.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-3">
            <Plus className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-sm">Add your certifications</p>
        </div>
      )}

      {certifications.map((cert, idx) => (
        <div key={cert.id} className="border border-white/10 rounded-xl p-4 bg-black/20 space-y-3 animate-fade-in">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-gray-400">Certification {idx + 1}</span>
            <button
              onClick={() => dispatch({ type: 'REMOVE_CERTIFICATION', payload: cert.id })}
              className="p-1.5 hover:bg-red-500/20 text-gray-500 hover:text-red-400 rounded-lg transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1 block">Certification Name *</label>
            <input
              type="text"
              value={cert.name}
              onChange={(e) => updateCert(cert.id, { name: e.target.value })}
              placeholder="AWS Certified Solutions Architect"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Issuer *</label>
              <input
                type="text"
                value={cert.issuer}
                onChange={(e) => updateCert(cert.id, { issuer: e.target.value })}
                placeholder="Amazon Web Services"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Date</label>
              <input
                type="text"
                value={cert.date}
                onChange={(e) => updateCert(cert.id, { date: e.target.value })}
                placeholder="Jan 2025"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Credential ID (optional)</label>
              <input
                type="text"
                value={cert.credentialId || ''}
                onChange={(e) => updateCert(cert.id, { credentialId: e.target.value })}
                placeholder="AWS-12345"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Credential URL (optional)</label>
              <input
                type="text"
                value={cert.url || ''}
                onChange={(e) => updateCert(cert.id, { url: e.target.value })}
                placeholder="https://creds.com/aws-123"
                className={inputClass}
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() => dispatch({ type: 'ADD_CERTIFICATION' })}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-white/20 hover:border-indigo-500/50 text-gray-400 hover:text-indigo-300 text-sm rounded-xl transition-all duration-200 hover:bg-indigo-500/5"
      >
        <Plus className="w-4 h-4" /> Add Certification
      </button>
    </div>
  );
}
