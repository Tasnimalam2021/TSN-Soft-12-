export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'Tech' | 'Marketing' | 'Strategy' | 'Consulting';
  icon: string;
  procedure?: string[];
}

export interface CartItem extends Service {
  quantity: number;
}

export interface Order {
  id: string;
  created_at: string;
  user_id: string;
  items: CartItem[];
  total_amount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  client_email: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'client' | 'admin';
}

export interface Inquiry {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  restaurant_name?: string;
  message: string;
  status: 'pending' | 'contacted' | 'closed';
}

export interface Project {
  id: string;
  title: string;
  location: string;
  result: string;
  description: string;
  image: string;
  tags: string[];
  challenge: string;
  solution: string;
  impact: {
    label: string;
    value: string;
  }[];
}
