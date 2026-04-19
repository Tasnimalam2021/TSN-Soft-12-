import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const ContactForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    restaurant_name: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: submitError } = await supabase
        .from('inquiries')
        .insert([formData]);

      if (submitError) throw submitError;

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        restaurant_name: '',
        message: ''
      });
    } catch (err: any) {
      console.error('Error submitting inquiry:', err);
      setError(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-3xl font-bold text-black mb-4">Inquiry Received!</h3>
        <p className="text-gray-600 text-lg mb-8">
          Thank you for reaching out. Our Quantum Strategy team will contact you within 24 hours.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="text-orange-500 font-bold uppercase tracking-widest text-xs hover:underline"
        >
          Send another inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Full Name</label>
          <input
            required
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full bg-black/5 border border-black/10 rounded-2xl px-6 py-4 text-black placeholder:text-gray-400 focus:outline-none focus:border-orange-500/50 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Email Address</label>
          <input
            required
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@restaurant.com"
            className="w-full bg-black/5 border border-black/10 rounded-2xl px-6 py-4 text-black placeholder:text-gray-400 focus:outline-none focus:border-orange-500/50 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="phone" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className="w-full bg-black/5 border border-black/10 rounded-2xl px-6 py-4 text-black placeholder:text-gray-400 focus:outline-none focus:border-orange-500/50 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="restaurant_name" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Restaurant Name</label>
          <input
            type="text"
            id="restaurant_name"
            name="restaurant_name"
            value={formData.restaurant_name}
            onChange={handleChange}
            placeholder="Aurora Dining"
            className="w-full bg-black/5 border border-black/10 rounded-2xl px-6 py-4 text-black placeholder:text-gray-400 focus:outline-none focus:border-orange-500/50 transition-all"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">How can we help you scale?</label>
        <textarea
          required
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us about your goals..."
          className="w-full bg-black/5 border border-black/10 rounded-2xl px-6 py-4 text-black placeholder:text-gray-400 focus:outline-none focus:border-orange-500/50 transition-all resize-none"
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm font-bold bg-red-500/10 p-4 rounded-xl border border-red-500/20">
          {error}
        </div>
      )}

      <button
        disabled={loading}
        type="submit"
        className="w-full bg-black text-white py-6 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-gray-800 transition-all shadow-2xl shadow-black/10 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Send size={18} />
            <span>Send Inquiry</span>
          </>
        )}
      </button>
    </form>
  );
};
