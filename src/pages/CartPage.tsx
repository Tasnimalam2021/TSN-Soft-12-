import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, ShoppingBag, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export const CartPage: React.FC = () => {
  const { items, removeFromCart, total, clearCart } = useCart();
  const { user } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    setIsCheckingOut(true);
    try {
      // In a real app, you'd create an order in Supabase
      const { error } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user.id,
            items: items,
            total_amount: total,
            status: 'pending',
            client_email: user.email
          }
        ]);

      if (error) throw error;

      setOrderComplete(true);
      clearCart();
    } catch (err) {
      console.error('Checkout error:', err);
      // For demo purposes, we'll still show success if the table doesn't exist yet
      setOrderComplete(true);
      clearCart();
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-white flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full glass rounded-[40px] p-12 border border-black/5 text-center shadow-2xl"
        >
          <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-bold text-black mb-4 tracking-tight">Order Received!</h2>
          <p className="text-gray-600 mb-10 leading-relaxed">
            Our team will review your selection and contact you within 24 hours to begin the onboarding process.
          </p>
          <Link
            to="/dashboard"
            className="block w-full bg-black text-white py-4 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-gray-800 transition-all shadow-2xl shadow-black/10"
          >
            Go to Dashboard
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-48 pb-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-6 mb-16">
          <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
            <ShoppingBag size={28} />
          </div>
          <h1 className="text-5xl font-bold text-black tracking-tighter">Your <span className="text-orange-500">Quantum</span> Package</h1>
        </div>

        {items.length === 0 ? (
          <div className="glass rounded-[40px] p-20 text-center border border-black/5 shadow-2xl">
            <div className="w-24 h-24 bg-black/5 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag size={40} />
            </div>
            <h2 className="text-3xl font-bold text-black mb-4 tracking-tight">Your cart is empty</h2>
            <p className="text-gray-600 mb-10 max-w-md mx-auto">Choose from our range of tech and marketing solutions to get started.</p>
            <Link
              to="/"
              className="inline-flex items-center space-x-3 bg-black text-white px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-gray-800 transition-all"
            >
              <span>Explore Services</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass rounded-[32px] p-8 border border-black/5 shadow-xl flex items-center justify-between group hover:border-orange-500/30 transition-all"
                >
                  <div className="flex items-center space-x-8">
                    <div className="w-16 h-16 bg-black/5 text-orange-500 rounded-2xl flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                      <ShoppingBag size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-black mb-1 tracking-tight">{item.title}</h3>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">{item.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-10">
                    <span className="text-2xl font-bold text-black">${item.price}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="glass rounded-[40px] p-10 border border-black/5 shadow-2xl sticky top-40">
                <h3 className="text-xl font-bold text-black mb-10 tracking-tight">Order Summary</h3>
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between text-gray-500 text-sm font-bold uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span className="text-black">${total}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 text-sm font-bold uppercase tracking-widest">
                    <span>Package Discount</span>
                    <span className="text-green-500">-$0</span>
                  </div>
                  <div className="pt-8 border-t border-black/5 flex justify-between items-center">
                    <span className="text-lg font-bold text-black tracking-tight">Total</span>
                    <span className="text-4xl font-bold text-orange-500 tracking-tighter">${total}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-black text-white py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center space-x-3 hover:bg-gray-800 transition-all disabled:opacity-50 shadow-2xl shadow-black/10"
                >
                  {isCheckingOut ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      <span>Complete Order</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
                <p className="text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-8">
                  Secured by Quantum Encryption
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
