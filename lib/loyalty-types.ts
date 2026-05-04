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
  created_at: string;
}

export interface Transaction {
  id: string;
  customer_id: string;
  type: 'earn' | 'redeem';
  points: number;
  bill_amount: number | null;
  pin_level: PinLevel;
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
