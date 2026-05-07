'use client';

import React from 'react';
import type { Customer, BillLineItem, PaymentMode } from '@/lib/loyalty-types';

interface ReceiptProps {
  customer: Customer;
  lineItems: BillLineItem[];
  billAmount: number;
  pointsEarned: number;
  paymentMode: PaymentMode;
  billNumber: number | null;
  cashierName?: string;
}

export function Receipt({
  customer,
  lineItems,
  billAmount,
  pointsEarned,
  paymentMode,
  billNumber,
  cashierName,
}: ReceiptProps) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const modeLabel = { cash: 'Cash', upi: 'UPI', card: 'Card' }[paymentMode];

  return (
    <div className="receipt-root">
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          .receipt-root, .receipt-root * { visibility: visible !important; }
          .receipt-root {
            position: fixed !important;
            left: 0 !important; top: 0 !important;
            width: 80mm !important;
            padding: 0 !important;
            margin: 0 !important;
          }
        }
        .receipt-root {
          font-family: 'Courier New', Courier, monospace;
          font-size: 12px;
          width: 80mm;
          background: #fff;
          color: #000;
          padding: 12px 10px;
          line-height: 1.5;
        }
        .r-center  { text-align: center; }
        .r-bold    { font-weight: bold; }
        .r-lg      { font-size: 15px; }
        .r-sm      { font-size: 10px; }
        .r-divider { border: none; border-top: 1px dashed #000; margin: 6px 0; }
        .r-row     { display: flex; justify-content: space-between; }
        .r-row-name { flex: 1; padding-right: 6px; word-break: break-word; }
        .r-total-row {
          display: flex; justify-content: space-between;
          font-weight: bold; font-size: 14px;
          margin-top: 2px;
        }
        .r-points {
          text-align: center;
          font-size: 11px;
          margin-top: 4px;
        }
        .r-footer { text-align: center; margin-top: 8px; font-size: 10px; }
      `}</style>

      {/* Header */}
      <p className="r-center r-bold r-lg">The 11th Bean</p>
      <p className="r-center r-sm">☕ Specialty Coffee</p>
      <p className="r-center r-sm">Basavanagudi, Bengaluru, Karnataka 560028</p>
      <p className="r-center r-sm">@the11thbean</p>

      <hr className="r-divider" />

      {/* Meta */}
      <div className="r-row r-sm">
        <span>Bill No: #{billNumber ?? '—'}</span>
        <span>{dateStr}</span>
      </div>
      <div className="r-row r-sm">
        <span>Cashier: {cashierName ?? 'Staff'}</span>
        <span>{timeStr}</span>
      </div>
      <div className="r-sm">
        <span>Customer: {customer.name}</span>
      </div>

      <hr className="r-divider" />

      {/* Items */}
      <div style={{ marginBottom: '4px' }}>
        {lineItems.map((li) => (
          <div key={li.menuItem.id}>
            <div className="r-row">
              <span className="r-row-name">{li.menuItem.name}</span>
              <span>₹{(li.menuItem.price * li.quantity).toFixed(0)}</span>
            </div>
            {li.quantity > 1 && (
              <div className="r-sm" style={{ color: '#555' }}>
                &nbsp;&nbsp;{li.quantity} × ₹{li.menuItem.price}
              </div>
            )}
          </div>
        ))}
      </div>

      <hr className="r-divider" />

      {/* Totals */}
      <div className="r-total-row">
        <span>TOTAL</span>
        <span>₹{billAmount.toFixed(2)}</span>
      </div>
      <div className="r-row r-sm" style={{ marginTop: '2px' }}>
        <span>Payment Mode</span>
        <span>{modeLabel}</span>
      </div>

      <hr className="r-divider" />

      {/* Loyalty */}
      <p className="r-points">
        ⭐ {pointsEarned} pts earned · Balance: {customer.total_points + pointsEarned} pts
      </p>
      <p className="r-points r-sm">1 pt per ₹100 spent</p>

      <hr className="r-divider" />

      {/* Footer */}
      <p className="r-footer">Thank you for your visit!</p>
      <p className="r-footer">Share your experience on Instagram or leave us a review on Google Maps</p>
      <p className="r-footer r-bold">@the11thbean</p>
      <p className="r-footer" style={{ marginTop: '12px' }}>* * * * * * * * * * * * * * *</p>
    </div>
  );
}
