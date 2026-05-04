'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { createMenuItem, updateMenuItem } from '@/app/actions/loyalty';
import type { MenuItem } from '@/lib/loyalty-types';

interface EditState {
  id: string;
  name: string;
  price: string;
}

export default function MenuManager() {
  const [items, setItems]       = useState<MenuItem[]>([]);
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName]   = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState('');
  const [edit, setEdit]         = useState<EditState | null>(null);
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError]   = useState('');
  const nameRef = useRef<HTMLInputElement>(null);

  const load = () => {
    supabase
      .from('menu_items')
      .select('*')
      .order('name')
      .then(({ data }) => {
        setItems((data as MenuItem[]) ?? []);
        setLoading(false);
      });
  };

  useEffect(() => { load(); }, []);

  // Focus the name field whenever edit row opens
  useEffect(() => {
    if (edit) setTimeout(() => nameRef.current?.focus(), 50);
  }, [edit?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPrice) { setError('Name and price required.'); return; }
    setSaving(true); setError('');
    const result = await createMenuItem(newName.trim(), parseFloat(newPrice));
    setSaving(false);
    if ('error' in result) {
      setError(result.error);
    } else {
      setItems((prev) => [...prev, result.item].sort((a, b) => a.name.localeCompare(b.name)));
      setNewName(''); setNewPrice(''); setShowForm(false);
    }
  };

  const handleToggleActive = async (item: MenuItem) => {
    const result = await updateMenuItem(item.id, { is_active: !item.is_active });
    if ('item' in result) {
      setItems((prev) => prev.map((i) => (i.id === item.id ? result.item : i)));
    }
  };

  const startEdit = (item: MenuItem) => {
    setEdit({ id: item.id, name: item.name, price: String(item.price) });
    setEditError('');
  };

  const cancelEdit = () => { setEdit(null); setEditError(''); };

  const handleSaveEdit = async () => {
    if (!edit) return;
    if (!edit.name.trim()) { setEditError('Name cannot be empty.'); return; }
    const priceNum = parseFloat(edit.price);
    if (isNaN(priceNum) || priceNum < 0) { setEditError('Enter a valid price.'); return; }
    setEditSaving(true); setEditError('');
    const result = await updateMenuItem(edit.id, { name: edit.name.trim(), price: priceNum });
    setEditSaving(false);
    if ('error' in result) {
      setEditError(result.error);
    } else {
      setItems((prev) =>
        prev.map((i) => (i.id === edit.id ? result.item : i)).sort((a, b) => a.name.localeCompare(b.name)),
      );
      setEdit(null);
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
  };

  const editInp: React.CSSProperties = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(200,169,110,0.3)',
    color: '#F2E8D9',
    borderRadius: '8px',
    padding: '6px 10px',
    outline: 'none',
    fontSize: '13px',
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6" style={{ minHeight: '100vh', background: '#1E1916' }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium" style={{ color: '#F2E8D9', fontFamily: 'var(--font-lora), Georgia, serif' }}>
          Menu Items
        </h2>
        <button
          onClick={() => { setShowForm((v) => !v); setError(''); }}
          className="text-sm px-4 py-2 rounded-xl font-medium"
          style={{ background: 'rgba(200,169,110,0.15)', color: '#C8A96E', border: '1px solid rgba(200,169,110,0.3)' }}
        >
          {showForm ? 'Cancel' : '+ New Item'}
        </button>
      </div>

      {/* ── New item form ── */}
      {showForm && (
        <form onSubmit={handleCreate}
              className="p-4 rounded-xl mb-6 space-y-3"
              style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)' }}>
          <p className="text-xs font-medium" style={{ color: '#C8A96E' }}>New Menu Item</p>
          <div className="flex gap-3">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Item name"
              style={{ ...inp, flex: 2 }}
            />
            <div className="relative flex items-center" style={{ flex: 1 }}>
              <span className="absolute left-3 text-sm" style={{ color: 'rgba(242,232,217,0.5)' }}>₹</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="Price"
                style={{ ...inp, paddingLeft: '24px', width: '100%' }}
              />
            </div>
          </div>
          {error && <p className="text-xs" style={{ color: '#C4453A' }}>{error}</p>}
          <button
            type="submit"
            disabled={saving}
            className="w-full py-2.5 rounded-xl text-sm font-medium disabled:opacity-40"
            style={{ background: '#C8A96E', color: '#2A2320' }}
          >
            {saving ? 'Adding…' : 'Add Item'}
          </button>
        </form>
      )}

      {/* ── Item list ── */}
      {loading ? (
        <p className="text-center py-10 text-sm" style={{ color: 'rgba(242,232,217,0.3)' }}>Loading…</p>
      ) : (
        <div className="space-y-2">
          {items.map((item) => {
            const isEditing = edit?.id === item.id;

            if (isEditing) {
              /* ── Inline edit row ── */
              return (
                <div
                  key={item.id}
                  className="rounded-xl overflow-hidden"
                  style={{ border: '1px solid rgba(200,169,110,0.35)', background: 'rgba(200,169,110,0.06)' }}
                >
                  <div className="px-4 py-3 flex items-center gap-2 flex-wrap">
                    {/* Name input */}
                    <input
                      ref={nameRef}
                      type="text"
                      value={edit.name}
                      onChange={(e) => setEdit((s) => s ? { ...s, name: e.target.value } : s)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleSaveEdit(); if (e.key === 'Escape') cancelEdit(); }}
                      placeholder="Item name"
                      style={{ ...editInp, flex: '2 1 140px' }}
                    />
                    {/* Price input */}
                    <div className="relative flex items-center" style={{ flex: '1 1 80px' }}>
                      <span className="absolute left-2 text-xs" style={{ color: 'rgba(242,232,217,0.5)' }}>₹</span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={edit.price}
                        onChange={(e) => setEdit((s) => s ? { ...s, price: e.target.value } : s)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSaveEdit(); if (e.key === 'Escape') cancelEdit(); }}
                        style={{ ...editInp, paddingLeft: '22px', width: '100%' }}
                      />
                    </div>
                    {/* Save */}
                    <button
                      onClick={handleSaveEdit}
                      disabled={editSaving}
                      className="text-xs px-3 py-1.5 rounded-lg font-medium disabled:opacity-40 flex-shrink-0"
                      style={{ background: '#C8A96E', color: '#2A2320' }}
                    >
                      {editSaving ? '…' : 'Save'}
                    </button>
                    {/* Cancel */}
                    <button
                      onClick={cancelEdit}
                      className="text-xs px-3 py-1.5 rounded-lg flex-shrink-0"
                      style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(242,232,217,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      Cancel
                    </button>
                  </div>
                  {editError && (
                    <p className="px-4 pb-3 text-xs" style={{ color: '#C4453A' }}>{editError}</p>
                  )}
                </div>
              );
            }

            /* ── Normal row ── */
            return (
              <div
                key={item.id}
                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{
                  background: item.is_active ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(200,169,110,0.1)',
                  opacity: item.is_active ? 1 : 0.55,
                }}
              >
                {/* Name */}
                <span className="flex-1 text-sm min-w-0 truncate" style={{ color: item.is_active ? '#F2E8D9' : 'rgba(242,232,217,0.5)' }}>
                  {item.name}
                </span>

                {/* Price badge */}
                <span
                  className="text-sm font-medium flex-shrink-0"
                  style={{ color: '#C8A96E', minWidth: '56px', textAlign: 'right' }}
                >
                  ₹{item.price}
                </span>

                {/* Edit pencil button */}
                <button
                  onClick={() => startEdit(item)}
                  title="Edit name &amp; price"
                  className="flex-shrink-0 p-1.5 rounded-lg transition-opacity hover:opacity-80"
                  style={{ background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.2)', color: '#C8A96E' }}
                >
                  {/* Pencil icon */}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>

                {/* Active / Inactive toggle */}
                <button
                  onClick={() => handleToggleActive(item)}
                  className="text-xs px-3 py-1 rounded-lg transition-opacity hover:opacity-80 flex-shrink-0"
                  style={{
                    background: item.is_active ? 'rgba(196,69,58,0.12)' : 'rgba(200,169,110,0.12)',
                    color: item.is_active ? '#C4453A' : '#C8A96E',
                    border: `1px solid ${item.is_active ? 'rgba(196,69,58,0.2)' : 'rgba(200,169,110,0.2)'}`,
                  }}
                >
                  {item.is_active ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
