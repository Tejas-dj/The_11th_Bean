'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { createReward, updateReward, deleteReward } from '@/app/actions/loyalty';
import type { Reward } from '@/lib/loyalty-types';

export default function RewardManager() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm]       = useState({ name: '', points_required: '', description: '' });
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = () => {
    supabase
      .from('rewards')
      .select('*')
      .order('points_required')
      .then(({ data }) => {
        setRewards((data as Reward[]) ?? []);
        setLoading(false);
      });
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.points_required) { setError('Name and points required.'); return; }
    setSaving(true); setError('');
    const result = await createReward({
      name: form.name.trim(),
      points_required: parseInt(form.points_required, 10),
      description: form.description.trim(),
    });
    setSaving(false);
    if ('error' in result) {
      setError(result.error);
    } else {
      setRewards((prev) => [...prev, result.reward].sort((a, b) => a.points_required - b.points_required));
      setForm({ name: '', points_required: '', description: '' });
      setShowForm(false);
    }
  };

  const handleToggle = async (r: Reward) => {
    const result = await updateReward(r.id, { is_active: !r.is_active });
    if ('reward' in result) {
      setRewards((prev) => prev.map((x) => (x.id === r.id ? result.reward : x)));
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(id);
    const result = await deleteReward(id);
    setDeleting(null);
    if ('ok' in result) {
      setRewards((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const inp: React.CSSProperties = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(200,169,110,0.25)',
    color: '#F2E8D9',
    borderRadius: '10px',
    padding: '8px 12px',
    outline: 'none',
    fontSize: '14px',
    width: '100%',
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6" style={{ minHeight: '100vh', background: '#1E1916' }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium" style={{ color: '#F2E8D9', fontFamily: 'var(--font-lora), Georgia, serif' }}>
          Rewards
        </h2>
        <button
          onClick={() => { setShowForm((v) => !v); setError(''); }}
          className="text-sm px-4 py-2 rounded-xl font-medium"
          style={{ background: 'rgba(200,169,110,0.15)', color: '#C8A96E', border: '1px solid rgba(200,169,110,0.3)' }}
        >
          {showForm ? 'Cancel' : '+ New Reward'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate}
              className="p-4 rounded-xl mb-6 space-y-3"
              style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)' }}>
          <p className="text-xs font-medium" style={{ color: '#C8A96E' }}>New Reward</p>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Reward name"
            style={inp}
          />
          <input
            type="number"
            min="1"
            value={form.points_required}
            onChange={(e) => setForm((f) => ({ ...f, points_required: e.target.value }))}
            placeholder="Points required"
            style={inp}
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Description (what the customer gets)"
            rows={2}
            style={{ ...inp, resize: 'vertical' }}
          />
          {error && <p className="text-xs" style={{ color: '#C4453A' }}>{error}</p>}
          <button
            type="submit"
            disabled={saving}
            className="w-full py-2.5 rounded-xl text-sm font-medium disabled:opacity-40"
            style={{ background: '#C8A96E', color: '#2A2320' }}
          >
            {saving ? 'Adding…' : 'Add Reward'}
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-center py-10 text-sm" style={{ color: 'rgba(242,232,217,0.3)' }}>Loading…</p>
      ) : rewards.length === 0 ? (
        <p className="text-center py-10 text-sm" style={{ color: 'rgba(242,232,217,0.3)' }}>No rewards yet.</p>
      ) : (
        <div className="space-y-3">
          {rewards.map((r) => (
            <div
              key={r.id}
              className="p-4 rounded-xl"
              style={{
                background: r.is_active ? 'rgba(200,169,110,0.06)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${r.is_active ? 'rgba(200,169,110,0.2)' : 'rgba(255,255,255,0.06)'}`,
                opacity: r.is_active ? 1 : 0.6,
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-sm" style={{ color: '#F2E8D9' }}>{r.name}</p>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(200,169,110,0.15)', color: '#C8A96E' }}
                    >
                      {r.points_required} pts
                    </span>
                    {!r.is_active && (
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(196,69,58,0.15)', color: '#C4453A' }}>
                        Inactive
                      </span>
                    )}
                  </div>
                  {r.description && (
                    <p className="text-xs mt-1" style={{ color: 'rgba(242,232,217,0.5)' }}>{r.description}</p>
                  )}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleToggle(r)}
                    className="text-xs px-2.5 py-1 rounded-lg transition-opacity hover:opacity-80"
                    style={{
                      background: r.is_active ? 'rgba(196,69,58,0.1)' : 'rgba(200,169,110,0.12)',
                      color: r.is_active ? '#C4453A' : '#C8A96E',
                      border: `1px solid ${r.is_active ? 'rgba(196,69,58,0.2)' : 'rgba(200,169,110,0.2)'}`,
                    }}
                  >
                    {r.is_active ? 'Disable' : 'Enable'}
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    disabled={deleting === r.id}
                    className="text-xs px-2.5 py-1 rounded-lg transition-opacity hover:opacity-80 disabled:opacity-40"
                    style={{ background: 'rgba(196,69,58,0.1)', color: '#C4453A', border: '1px solid rgba(196,69,58,0.2)' }}
                  >
                    {deleting === r.id ? '…' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
