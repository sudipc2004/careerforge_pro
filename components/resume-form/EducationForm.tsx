'use client';

import { useResume } from '@/lib/resume-context';
import { Plus, Trash2 } from 'lucide-react';

const inputClass = `w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl px-3 py-2 text-sm
  focus:outline-none focus:border-indigo-500/60 transition-all duration-200`;

export default function EducationForm() {
  const { state, dispatch } = useResume();
  const { education } = state.resume;

  return (
    <div className="space-y-3">
      {education.map((edu, idx) => (
        <div key={edu.id} className="border border-white/10 rounded-xl p-4 bg-black/20 space-y-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-gray-400">Education {idx + 1}</span>
            <button
              onClick={() => dispatch({ type: 'REMOVE_EDUCATION', payload: edu.id })}
              className="p-1.5 hover:bg-red-500/20 text-gray-500 hover:text-red-400 rounded-lg transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1 block">Institution *</label>
            <input
              type="text"
              value={edu.institution}
              onChange={(e) => dispatch({ type: 'UPDATE_EDUCATION', payload: { id: edu.id, data: { institution: e.target.value } } })}
              placeholder="Massachusetts Institute of Technology"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Degree</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => dispatch({ type: 'UPDATE_EDUCATION', payload: { id: edu.id, data: { degree: e.target.value } } })}
                placeholder="Bachelor of Science"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Field of Study</label>
              <input
                type="text"
                value={edu.field}
                onChange={(e) => dispatch({ type: 'UPDATE_EDUCATION', payload: { id: edu.id, data: { field: e.target.value } } })}
                placeholder="Computer Science"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Start</label>
              <input
                type="month"
                value={edu.startDate}
                onChange={(e) => dispatch({ type: 'UPDATE_EDUCATION', payload: { id: edu.id, data: { startDate: e.target.value } } })}
                className={`${inputClass} [color-scheme:dark]`}
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">End</label>
              <input
                type="month"
                value={edu.endDate}
                onChange={(e) => dispatch({ type: 'UPDATE_EDUCATION', payload: { id: edu.id, data: { endDate: e.target.value } } })}
                className={`${inputClass} [color-scheme:dark]`}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">GPA (optional)</label>
              <input
                type="text"
                value={edu.gpa || ''}
                onChange={(e) => dispatch({ type: 'UPDATE_EDUCATION', payload: { id: edu.id, data: { gpa: e.target.value } } })}
                placeholder="3.9 / 4.0"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Honors</label>
              <input
                type="text"
                value={edu.honors || ''}
                onChange={(e) => dispatch({ type: 'UPDATE_EDUCATION', payload: { id: edu.id, data: { honors: e.target.value } } })}
                placeholder="Magna Cum Laude"
                className={inputClass}
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() => dispatch({ type: 'ADD_EDUCATION' })}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-white/20 hover:border-indigo-500/50 text-gray-400 hover:text-indigo-300 text-sm rounded-xl transition-all duration-200 hover:bg-indigo-500/5"
      >
        <Plus className="w-4 h-4" /> Add Education
      </button>
    </div>
  );
}
