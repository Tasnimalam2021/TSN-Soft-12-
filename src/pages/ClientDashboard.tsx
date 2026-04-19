import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Order } from '../types';
import { Package, Clock, CheckCircle2, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ClientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserOrders();
    }
  }, [user]);

  const fetchUserOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      console.error('Error fetching user orders:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back!</h1>
          <p className="text-gray-500">Track your restaurant's growth solutions and orders</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-orange-500" size={40} />
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No active orders</h2>
            <p className="text-gray-600 mb-8">You haven't selected any growth packages yet.</p>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-all"
            >
              <span>View Solutions</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                  <Package size={24} />
                </div>
                <p className="text-sm text-gray-500 font-medium mb-1">Total Packages</p>
                <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-4">
                  <Clock size={24} />
                </div>
                <p className="text-sm text-gray-500 font-medium mb-1">In Progress</p>
                <p className="text-3xl font-bold text-gray-900">
                  {orders.filter(o => o.status !== 'completed').length}
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 size={24} />
                </div>
                <p className="text-sm text-gray-500 font-medium mb-1">Completed</p>
                <p className="text-3xl font-bold text-gray-900">
                  {orders.filter(o => o.status === 'completed').length}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
              <div className="p-8 border-b border-gray-50">
                <h2 className="text-xl font-bold text-gray-900">Order History</h2>
              </div>
              <div className="divide-y divide-gray-50">
                {orders.map((order) => (
                  <div key={order.id} className="p-8 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center space-x-6">
                        <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-500">
                          <Package size={24} />
                        </div>
                        <div>
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className="text-lg font-bold text-gray-900">Order #{order.id.slice(0, 8)}</h3>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              order.status === 'completed' ? 'bg-green-100 text-green-600' :
                              order.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                              order.status === 'processing' ? 'bg-blue-100 text-blue-600' :
                              order.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            {new Date(order.created_at).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between md:justify-end md:space-x-12">
                        <div className="text-right">
                          <p className="text-xs text-gray-400 font-bold uppercase mb-1">Total Amount</p>
                          <p className="text-xl font-bold text-gray-900">${order.total_amount}</p>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                          <ArrowRight size={20} />
                        </button>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {order.items.map((item, i) => (
                        <span key={i} className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs font-medium rounded-lg border border-gray-100">
                          {item.title}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
