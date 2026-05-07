export type PinLevel = 'cashier' | 'owner';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  total_points: number;
  lifetime_points: number;
  created_at: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  is_active: boolean;
  category: string;
  created_at: string;
}

export interface Transaction {
  id: string;
  customer_id: string;
  type: 'earn' | 'redeem';
  points: number;
  bill_amount: number | null;
  pin_level: PinLevel;
  payment_mode: 'cash' | 'upi' | 'card' | null;
  bill_number: number | null;
  tax_amount: number | null;
  discount_amount: number | null;
  created_at: string;
  customers?: Pick<Customer, 'name' | 'phone'>;
}

export interface TransactionItem {
  id: string;
  transaction_id: string;
  menu_item_id: string;
  quantity: number;
  unit_price: number;
  menu_items?: Pick<MenuItem, 'name'>;
}

export interface Reward {
  id: string;
  name: string;
  points_required: number;
  description: string;
  is_active: boolean;
}

export interface BillLineItem {
  menuItem: MenuItem;
  quantity: number;
}

export type PaymentMode = 'cash' | 'upi' | 'card';

export interface Expense {
  id: string;
  amount: number;
  description: string;
  logged_by: PinLevel;
  created_at: string;
}

export interface RegisterClosure {
  id: string;
  expected_cash: number;
  actual_cash: number;
  difference: number;
  closed_by: PinLevel;
  notes: string | null;
  created_at: string;
}

export interface ParkedBill {
  id: string;
  customer_id: string;
  cashier_pin_level: string;
  line_items: BillLineItem[];
  created_at: string;
  customers?: Pick<Customer, 'name' | 'phone' | 'total_points'>;
}
