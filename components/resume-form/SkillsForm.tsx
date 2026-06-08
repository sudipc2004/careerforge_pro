'use client';

import { useResume } from '@/lib/resume-context';
import { Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';

const inputClass = `w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl px-3 py-2 text-sm
  focus:outline-none focus:border-indigo-500/60 transition-all duration-200`;

export default function SkillsForm() {
  const { state, dispatch } = useResume();
  const { skills } = state.resume;
  const [newSkills, setNewSkills] = useState<Record<string, string>>({});

  const addSkill = (groupId: string) => {
    const name = newSkills[groupId]?.trim();
    if (!name) return;
    dispatch({ type: 'ADD_SKILL', payload: { groupId, name } });
    setNewSkills((prev) => ({ ...prev, [groupId]: '' }));
  };

  const handleKeyDown = (e: React.KeyboardEvent, groupId: string) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill(groupId);
    }
  };

  const SKILL_SUGGESTIONS = [
    'JavaScript', 'TypeScript', 'Python', 'React', 'Node.js', 'AWS',
    'Docker', 'Kubernetes', 'SQL', 'Leadership', 'Agile', 'CI/CD',
  ];

  return (
    <div className="space-y-4">
      {skills.length === 0 && (
        <div className="text-center py-6 text-gray-500 text-sm">
          Add skill groups like &quot;Languages&quot;, &quot;Frameworks&quot;, &quot;Tools&quot;
        </div>
      )}

      {skills.map((group, idx) => (
        <div key={group.id} className="border border-white/10 rounded-xl p-4 bg-black/20 space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={group.category}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_SKILL_GROUP',
                  payload: { id: group.id, data: { category: e.target.value } },
                })
              }
              placeholder={`Category ${idx + 1} (e.g. Languages, Frameworks)`}
              className={`${inputClass} flex-1`}
            />
            <button
              onClick={() => dispatch({ type: 'REMOVE_SKILL_GROUP', payload: group.id })}
              className="p-2 hover:bg-red-500/20 text-gray-500 hover:text-red-400 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Skill tags */}
          {group.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="flex items-center gap-1 px-2.5 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full border border-indigo-500/30"
                >
                  {skill.name}
                  <button
                    onClick={() =>
                      dispatch({ type: 'REMOVE_SKILL', payload: { groupId: group.id, skillId: skill.id } })
                    }
                    className="hover:text-red-400 transition-colors ml-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Add skill input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkills[group.id] || ''}
              onChange={(e) => setNewSkills((prev) => ({ ...prev, [group.id]: e.target.value }))}
              onKeyDown={(e) => handleKeyDown(e, group.id)}
              placeholder="Type skill, press Enter or comma"
              className={`${inputClass} flex-1`}
            />
            <button
              onClick={() => addSkill(group.id)}
              className="px-3 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 rounded-xl text-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={() => dispatch({ type: 'ADD_SKILL_GROUP' })}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-white/20 hover:border-indigo-500/50 text-gray-400 hover:text-indigo-300 text-sm rounded-xl transition-all duration-200 hover:bg-indigo-500/5"
      >
        <Plus className="w-4 h-4" /> Add Skill Group
      </button>

      {/* Quick suggestions */}
      <div>
        <p className="text-xs text-gray-500 mb-2">💡 Quick add popular skills:</p>
        <div className="flex flex-wrap gap-1.5">
          {SKILL_SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => {
                if (skills.length === 0) return;
                dispatch({ type: 'ADD_SKILL', payload: { groupId: skills[skills.length - 1].id, name: s } });
              }}
              disabled={skills.length === 0}
              className="text-xs px-2.5 py-1 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-full border border-white/10 hover:border-white/20 transition-all disabled:opacity-30"
            >
              + {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
