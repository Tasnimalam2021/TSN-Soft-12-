import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Brain, Utensils, BarChart3 } from 'lucide-react';

import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-40 pb-20 lg:pt-64 lg:pb-32 overflow-hidden bg-white">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-500/5 rounded-full filter blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-cool/5 rounded-full filter blur-[120px] animate-pulse animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-black/5 border border-black/10 px-4 py-1.5 rounded-full text-brand-cool text-xs font-bold uppercase tracking-widest mb-8">
              <Sparkles size={14} />
              <span>Create Your Quantum Restaurant</span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter text-black mb-8 leading-[0.9]">
              The Future of <span className="text-orange-500">Taste</span> is Digital.
            </h1>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-lg">
              TSN Soft delivers the next generation of restaurant scaling. Integrated tech, AI marketing, and strategic consulting in one seamless ecosystem.
            </p>
            <div className="flex flex-col sm:space-y-0 sm:flex-row sm:space-x-6">
              <Link to="/auth" className="bg-black text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-all shadow-2xl shadow-black/10 text-center">
                Get Started
              </Link>
              <Link to="/demo" className="glass text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black/5 transition-all text-center">
                View Demo
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            {/* Food AI Architecture Visualization - Quantum Style */}
            <div className="relative glass-dark rounded-[40px] p-10 shadow-2xl border border-black/5 overflow-hidden">
              <div className="absolute inset-0 bg-grid-slate-100 -z-10"></div>
              
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-brand-cool to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-cool/20">
                    <Brain size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg">Quantum Core</h3>
                    <p className="text-[10px] text-brand-cool uppercase font-black tracking-[0.2em]">Neural Engine v4.2</p>
                  </div>
                </div>
                <div className="flex space-x-1.5">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-1.5 h-1.5 bg-brand-cool rounded-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }}></div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Utensils size={18} className="text-orange-500" />
                      <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Menu Intelligence</span>
                    </div>
                    <span className="text-[10px] font-mono text-orange-500">Active</span>
                  </div>
                  <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '92%' }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse' }}
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-300"
                    ></motion.div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
                    <BarChart3 size={20} className="text-blue-500 mb-4" />
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Demand Prediction</p>
                    <p className="text-xl font-bold text-black">98.4%</p>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
                    <Sparkles size={20} className="text-purple-500 mb-4" />
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Optimization</p>
                    <p className="text-xl font-bold text-black">Live</p>
                  </div>
                </div>
              </div>

              {/* Decorative Glow */}
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
