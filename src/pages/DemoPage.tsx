import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from '../components/Navbar';
import { Play, CheckCircle2, BarChart3, Users, Zap, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DemoPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter mb-6">
            Quantum <span className="text-orange-500">Demo</span> Project
          </h1>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Experience the power of TSN Soft's integrated ecosystem. This demo showcases a real-world implementation of our AI-driven restaurant scaling technology.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          <div className="lg:col-span-2">
            <div className="relative aspect-video bg-black rounded-[40px] border border-black/5 overflow-hidden group shadow-2xl">
              <AnimatePresence mode="wait">
                {!isPlaying ? (
                  <motion.div
                    key="thumbnail"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80&w=1920" 
                      alt="Restaurant Demo" 
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsPlaying(true)}
                        className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-orange-500/50 z-10"
                      >
                        <Play size={40} fill="currentColor" />
                      </motion.button>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                      <div>
                        <h3 className="text-2xl font-bold mb-2 text-white drop-shadow-lg">Project: Aurora Dining</h3>
                        <p className="text-white/80 text-sm drop-shadow-md">Full Stack AI Implementation • 2024</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs font-bold uppercase tracking-widest text-white">
                        Live Preview
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="video"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0"
                  >
                    <video 
                      autoPlay 
                      controls 
                      className="w-full h-full object-cover"
                      onEnded={() => setIsPlaying(false)}
                    >
                      <source src="https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-dish-in-a-professional-kitchen-41621-large.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <button 
                      onClick={() => setIsPlaying(false)}
                      className="absolute top-6 right-6 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors z-20"
                    >
                      <X size={24} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-8">
            <div className="glass p-8 rounded-[40px] border border-black/5 shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CheckCircle2 className="text-orange-500" />
                Key Features
              </h3>
              <ul className="space-y-4">
                {[
                  "Dynamic Menu Optimization",
                  "Predictive Inventory Management",
                  "Automated Customer Retention",
                  "Real-time Revenue Analytics",
                  "Quantum Marketing Engine"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600 text-sm">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass p-8 rounded-[40px] border border-black/5 shadow-sm bg-gradient-to-br from-orange-500/5 to-transparent">
              <h3 className="text-xl font-bold mb-4">Performance Impact</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    <span>Efficiency</span>
                    <span className="text-orange-500">+85%</span>
                  </div>
                  <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 w-[85%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    <span>Revenue Growth</span>
                    <span className="text-orange-500">+120%</span>
                  </div>
                  <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 w-[92%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <BarChart3 className="text-blue-500" />, title: "Data Driven", desc: "Every decision is backed by quantum-level data analysis." },
            { icon: <Users className="text-purple-500" />, title: "User Centric", desc: "Seamless experience for both staff and customers." },
            { icon: <Zap className="text-orange-500" />, title: "Lightning Fast", desc: "Optimized performance across all digital touchpoints." }
          ].map((item, i) => (
            <div key={i} className="glass p-10 rounded-[40px] border border-black/5 hover:bg-black/5 transition-colors shadow-sm">
              <div className="w-14 h-14 bg-black/5 rounded-2xl flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h4 className="text-xl font-bold mb-4">{item.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-32 text-center">
          <div className="glass p-16 rounded-[60px] border border-black/5 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[100px]"></div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 tracking-tighter">Ready to build your <span className="text-orange-500">Success?</span></h2>
            <Link to="/auth" className="bg-black text-white px-12 py-6 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-gray-800 transition-all shadow-2xl shadow-black/10 inline-flex items-center gap-3">
              Start Your Journey <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
