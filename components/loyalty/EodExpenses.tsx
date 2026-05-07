'use client';

import { useState, useEffect, useMemo } from 'react';
import { 
  logExpense, closeRegister, getTodayCashSummary, 
  startShift, getTodayShift, getYesterdayClosure, 
  getTodayExpenses, deleteExpense 
} from '@/app/actions/loyalty';
import type { PinLevel, Expense } from '@/lib/loyalty-types';

interface Props {
  pinLevel: PinLevel;
  onClose: () => void;
}

export default function EodExpenses({ pinLevel, onClose }: Props) {
  const [tab, setTab] = useState<'start' | 'expense' | 'eod'>('start');
  
  // Start Shift states
  const [startFloatAmount, setStartFloatAmount] = useState('');
  
  // Expense states
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [expenses, setExpenses] = useState<Expense[]>([]);
  
  // EOD states
  const [floatAmount, setFloatAmount] = useState('0');
  const [actualCash, setActualCash] = useState('');
  const [notes, setNotes] = useState('');
  
  const [cashSales, setCashSales] = useState(0);
  const [cashExpenses, setCashExpenses] = useState(0);
  
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Initial load: check if shift is started
  useEffect(() => {
    async function loadInitial() {
      setLoadingData(true);
      const res = await getTodayShift();
      if ('error' in res) {
        setError(res.error);
      } else if (res.startingFloat !== null) {
        setFloatAmount(res.startingFloat.toString());
        setStartFloatAmount(res.startingFloat.toString());
        setTab('expense'); // if started, default to expense
      }
      setLoadingData(false);
    }
    loadInitial();
  }, []);

  const loadExpenses = async () => {
    const res = await getTodayExpenses();
    if (!('error' in res)) {
      setExpenses(res.expenses);
    }
  };

  const loadSummary = async () => {
    setLoadingData(true);
    const res = await getTodayCashSummary();
    if ('error' in res) {
      setError(res.error);
    } else {
      setCashSales(res.cashSales);
      setCashExpenses(res.expenses);
    }
    setLoadingData(false);
  };

  useEffect(() => {
    if (tab === 'expense') loadExpenses();
    if (tab === 'eod') loadSummary();
  }, [tab]);

  const expectedCash = useMemo(() => {
    return Number(floatAmount) + cashSales - cashExpenses;
  }, [floatAmount, cashSales, cashExpenses]);

  // Handlers
  const handleStartShift = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');
    const res = await startShift(Number(startFloatAmount), pinLevel);
    setLoading(false);
    if ('error' in res) {
      setError(res.error);
    } else {
      setFloatAmount(startFloatAmount);
      setSuccess('Shift started successfully!');
      setTimeout(() => { setSuccess(''); setTab('expense'); }, 1500);
    }
  };

  const handleUseYesterday = async () => {
    setLoading(true); setError(''); setSuccess('');
    const res = await getYesterdayClosure();
    setLoading(false);
    if (res.actualCash !== null) {
      setStartFloatAmount(res.actualCash.toString());
      setSuccess("Yesterday's closing amount loaded.");
    } else {
      setError("No previous closure found.");
    }
  };

  const handleExpenseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');
    const res = await logExpense(Number(amount), description, pinLevel);
    setLoading(false);
    if ('error' in res) {
      setError(res.error);
    } else {
      setSuccess('Expense logged successfully!');
      setAmount('');
      setDescription('');
      loadExpenses();
    }
  };

  const handleDeleteExpense = async (id: string) => {
    if (!confirm('Are you sure you want to delete this expense?')) return;
    setLoading(true); setError('');
    const res = await deleteExpense(id);
    setLoading(false);
    if ('error' in res) setError(res.error);
    else loadExpenses();
  };

  const handleEodSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');
    const res = await closeRegister(expectedCash, Number(actualCash), notes, pinLevel);
    setLoading(false);
    if ('error' in res) {
      setError(res.error);
    } else {
      setSuccess('Register closed successfully! Z-Report data saved.');
      setActualCash('');
      setNotes('');
    }
  };

  const inpStyle = { width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#F2E8D9', boxSizing: 'border-box' as const };
  const labelStyle = { display: 'block', color: '#F2E8D9', fontSize: '12px', marginBottom: '4px' };
  const btnStyle = (active: boolean) => ({
    flex: 1, padding: '8px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', fontSize: '13px',
    background: active ? 'rgba(200,169,110,0.15)' : 'transparent',
    border: active ? '1px solid rgba(200,169,110,0.3)' : '1px solid rgba(255,255,255,0.1)',
    color: active ? '#C8A96E' : 'rgba(242,232,217,0.5)',
  });

  return (
    <div style={{ padding: '24px', background: '#1E1916', borderRadius: '16px', border: '1px solid rgba(200,169,110,0.12)', maxWidth: '440px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#F2E8D9', fontSize: '18px', margin: 0 }}>Register & EOD</h2>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(242,232,217,0.5)', cursor: 'pointer', fontSize: '20px' }}>&times;</button>
      </div>

      <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
        <button onClick={() => { setTab('start'); setError(''); setSuccess(''); }} style={btnStyle(tab === 'start')}>
          1. Start Day
        </button>
        <button onClick={() => { setTab('expense'); setError(''); setSuccess(''); }} style={btnStyle(tab === 'expense')}>
          2. Expenses
        </button>
        <button onClick={() => { setTab('eod'); setError(''); setSuccess(''); }} style={btnStyle(tab === 'eod')}>
          3. Close Day
        </button>
      </div>

      {error && <p style={{ color: '#C86E6E', fontSize: '13px', marginBottom: '16px', background: 'rgba(200,110,110,0.1)', padding: '8px', borderRadius: '6px' }}>{error}</p>}
      {success && <p style={{ color: '#6EC87E', fontSize: '13px', marginBottom: '16px', background: 'rgba(110,200,126,0.1)', padding: '8px', borderRadius: '6px' }}>{success}</p>}

      {loadingData ? (
        <p style={{ color: 'rgba(242,232,217,0.5)', fontSize: '13px', textAlign: 'center', padding: '20px 0' }}>Loading data...</p>
      ) : (
        <>
          {tab === 'start' && (
            <form onSubmit={handleStartShift} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'rgba(200,169,110,0.05)', border: '1px solid rgba(200,169,110,0.2)', padding: '12px', borderRadius: '8px' }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#C8A96E' }}>Start your shift by recording the opening cash.</p>
                <button type="button" onClick={handleUseYesterday} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#F2E8D9', padding: '6px 10px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>
                  Use yesterday&apos;s closing amount
                </button>
              </div>
              <div>
                <label style={labelStyle}>Starting Cash in Drawer (₹)</label>
                <input type="number" required min="0" step="0.01" value={startFloatAmount} onChange={(e) => setStartFloatAmount(e.target.value)} style={{...inpStyle, fontSize: '16px'}} placeholder="0.00" />
              </div>
              <button disabled={loading} type="submit" style={{ padding: '12px', borderRadius: '8px', background: '#C8A96E', color: '#1E1916', fontWeight: 600, border: 'none', cursor: 'pointer', marginTop: '8px', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Starting...' : 'Confirm Starting Cash'}
              </button>
            </form>
          )}

          {tab === 'expense' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <form onSubmit={handleExpenseSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 style={{ fontSize: '13px', color: '#C8A96E', margin: 0 }}>Add New Expense</h3>
                <div>
                  <label style={labelStyle}>Amount (₹)</label>
                  <input type="number" required min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} style={inpStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Description / Reason</label>
                  <input type="text" required value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g., Milk restock" style={inpStyle} />
                </div>
                <button disabled={loading} type="submit" style={{ padding: '10px', borderRadius: '8px', background: 'rgba(200,169,110,0.15)', color: '#C8A96E', border: '1px solid rgba(200,169,110,0.3)', fontWeight: 500, cursor: 'pointer', marginTop: '4px' }}>
                  {loading ? 'Adding...' : '+ Add Expense'}
                </button>
              </form>

              <div>
                <h3 style={{ fontSize: '13px', color: 'rgba(242,232,217,0.7)', margin: '0 0 10px 0' }}>Today&apos;s Expenses</h3>
                {expenses.length === 0 ? (
                  <p style={{ fontSize: '12px', color: 'rgba(242,232,217,0.3)', fontStyle: 'italic' }}>No expenses logged today.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {expenses.map(exp => (
                      <div key={exp.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '10px 12px', borderRadius: '8px' }}>
                        <div>
                          <p style={{ fontSize: '13px', color: '#F2E8D9', margin: '0 0 2px 0' }}>{exp.description}</p>
                          <p style={{ fontSize: '11px', color: 'rgba(242,232,217,0.4)', margin: 0 }}>{new Date(exp.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ fontSize: '14px', fontWeight: 600, color: '#C86E6E' }}>₹{Number(exp.amount).toFixed(2)}</span>
                          <button onClick={() => handleDeleteExpense(exp.id)} style={{ background: 'none', border: 'none', color: 'rgba(242,232,217,0.3)', cursor: 'pointer', fontSize: '12px' }}>✕</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === 'eod' && (
            <form onSubmit={handleEodSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(200,169,110,0.15)', borderRadius: '12px', padding: '16px' }}>
                <h3 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#C8A96E', margin: '0 0 12px 0' }}>Shift Cash Summary</h3>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', color: 'rgba(242,232,217,0.7)' }}>Starting Float</span>
                  <span style={{ fontSize: '13px', color: '#F2E8D9' }}>₹{Number(floatAmount).toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', color: 'rgba(242,232,217,0.7)' }}>Today&apos;s Cash Sales</span>
                  <span style={{ fontSize: '13px', color: '#F2E8D9' }}>+ ₹{cashSales.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px dashed rgba(200,169,110,0.2)' }}>
                  <span style={{ fontSize: '13px', color: 'rgba(242,232,217,0.7)' }}>Today&apos;s Cash Expenses</span>
                  <span style={{ fontSize: '13px', color: '#C86E6E' }}>- ₹{cashExpenses.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: '#C8A96E' }}>Expected Cash in Drawer</span>
                  <span style={{ fontSize: '18px', fontWeight: 700, color: '#C8A96E' }}>₹{expectedCash.toFixed(2)}</span>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Actual Cash in Drawer (Counted)</label>
                <input type="number" required min="0" step="0.01" value={actualCash} onChange={(e) => setActualCash(e.target.value)} style={{...inpStyle, fontSize: '16px', fontWeight: 600, color: '#C8A96E'}} placeholder="0.00" />
              </div>
              
              {actualCash !== '' && (
                <div style={{ padding: '10px 14px', borderRadius: '8px', background: Number(actualCash) === expectedCash ? 'rgba(110,200,126,0.1)' : 'rgba(200,110,110,0.1)' }}>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: 500, color: Number(actualCash) === expectedCash ? '#6EC87E' : '#C86E6E' }}>
                    Difference: ₹{Math.abs(Number(actualCash) - expectedCash).toFixed(2)} {Number(actualCash) < expectedCash ? '(Short)' : Number(actualCash) > expectedCash ? '(Over)' : '(Perfect match)'}
                  </p>
                </div>
              )}

              <div>
                <label style={labelStyle}>Closing Notes (Optional)</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Reason for shortage/overage, or general notes" style={{ ...inpStyle, minHeight: '60px' }} />
              </div>

              <button disabled={loading} type="submit" style={{ padding: '12px', borderRadius: '8px', background: '#C8A96E', color: '#1E1916', fontWeight: 600, border: 'none', cursor: 'pointer', marginTop: '4px', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Closing Register...' : 'Close Register'}
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
}
