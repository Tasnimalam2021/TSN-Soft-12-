import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Order, Inquiry } from '../types';
import { Package, Clock, CheckCircle2, XCircle, User, Mail, DollarSign, Loader2, MessageSquare, Phone, Building2 } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'inquiries'>('orders');

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchOrders(), fetchInquiries()]);
    setLoading(false);
  };

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const fetchInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (err) {
      console.error('Error fetching inquiries:', err);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) throw error;
      fetchOrders();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const updateInquiryStatus = async (inquiryId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status })
        .eq('id', inquiryId);

      if (error) throw error;
      fetchInquiries();
    } catch (err) {
      console.error('Error updating inquiry status:', err);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <p className="text-xl font-bold text-red-500">Access Denied. Admin only.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Panel</h1>
            <p className="text-gray-500">Manage client orders and service delivery</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
              <User size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase">Logged in as</p>
              <p className="text-sm font-bold text-gray-900">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          {[
            { label: 'Total Orders', value: orders.length, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Pending Orders', value: orders.filter(o => o.status === 'pending').length, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
            { label: 'New Inquiries', value: inquiries.filter(i => i.status === 'pending').length, icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-50' },
            { label: 'Revenue', value: `$${orders.reduce((acc, o) => acc + o.total_amount, 0)}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
                <stat.icon size={24} />
              </div>
              <p className="text-sm text-gray-500 font-medium mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-8 py-4 rounded-2xl font-bold text-sm transition-all ${
              activeTab === 'orders' 
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
                : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'
            }`}
          >
            Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-8 py-4 rounded-2xl font-bold text-sm transition-all ${
              activeTab === 'inquiries' 
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
                : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'
            }`}
          >
            Inquiries ({inquiries.length})
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">
              {activeTab === 'orders' ? 'Recent Orders' : 'Recent Inquiries'}
            </h2>
            <button onClick={fetchData} className="text-sm text-orange-500 font-bold hover:underline">Refresh</button>
          </div>
          <div className="overflow-x-auto">
            {activeTab === 'orders' ? (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-gray-400 text-xs uppercase font-bold tracking-wider">
                    <th className="px-8 py-4">Client</th>
                    <th className="px-8 py-4">Services</th>
                    <th className="px-8 py-4">Total</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-8 py-12 text-center">
                        <Loader2 className="animate-spin mx-auto text-orange-500" size={32} />
                      </td>
                    </tr>
                  ) : orders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-8 py-12 text-center text-gray-500">No orders found.</td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                              <User size={18} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900">{order.client_email}</p>
                              <p className="text-[10px] text-gray-400 font-mono">{order.id.slice(0, 8)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-wrap gap-1">
                            {order.items.map((item, i) => (
                              <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-md">
                                {item.title}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-8 py-6 font-bold text-gray-900">${order.total_amount}</td>
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            order.status === 'completed' ? 'bg-green-100 text-green-600' :
                            order.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                            order.status === 'processing' ? 'bg-blue-100 text-blue-600' :
                            order.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right space-x-2">
                          <button
                            onClick={() => updateOrderStatus(order.id, 'processing')}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Mark as Processing"
                          >
                            <Clock size={18} />
                          </button>
                          <button
                            onClick={() => updateOrderStatus(order.id, 'completed')}
                            className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                            title="Mark as Completed"
                          >
                            <CheckCircle2 size={18} />
                          </button>
                          <button
                            onClick={() => updateOrderStatus(order.id, 'cancelled')}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Cancel Order"
                          >
                            <XCircle size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-gray-400 text-xs uppercase font-bold tracking-wider">
                    <th className="px-8 py-4">Inquirer</th>
                    <th className="px-8 py-4">Restaurant</th>
                    <th className="px-8 py-4">Message</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-8 py-12 text-center">
                        <Loader2 className="animate-spin mx-auto text-orange-500" size={32} />
                      </td>
                    </tr>
                  ) : inquiries.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-8 py-12 text-center text-gray-500">No inquiries found.</td>
                    </tr>
                  ) : (
                    inquiries.map((inquiry) => (
                      <tr key={inquiry.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                              <User size={18} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900">{inquiry.name}</p>
                              <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                <Mail size={10} />
                                <span>{inquiry.email}</span>
                              </div>
                              {inquiry.phone && (
                                <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                  <Phone size={10} />
                                  <span>{inquiry.phone}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Building2 size={14} className="text-gray-400" />
                            <span>{inquiry.restaurant_name || 'N/A'}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <p className="text-sm text-gray-600 line-clamp-2 max-w-xs">{inquiry.message}</p>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            inquiry.status === 'closed' ? 'bg-gray-100 text-gray-600' :
                            inquiry.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                            inquiry.status === 'contacted' ? 'bg-blue-100 text-blue-600' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {inquiry.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right space-x-2">
                          <button
                            onClick={() => updateInquiryStatus(inquiry.id, 'contacted')}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Mark as Contacted"
                          >
                            <Mail size={18} />
                          </button>
                          <button
                            onClick={() => updateInquiryStatus(inquiry.id, 'closed')}
                            className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                            title="Close Inquiry"
                          >
                            <CheckCircle2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
