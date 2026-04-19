import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { SERVICES } from '../constants';
import { useCart } from '../context/CartContext';
import * as Icons from 'lucide-react';
import { ArrowLeft, Check, Clock, ShoppingCart, Sparkles } from 'lucide-react';

export const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, items } = useCart();

  const service = SERVICES.find(s => s.id === id);
  const consultancySession = SERVICES.find(s => s.id === 'consultancy-session');

  if (!service) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black mb-4">Service Not Found</h1>
          <Link to="/" className="text-orange-500 hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  const getIcon = (name: string) => {
    const Icon = (Icons as any)[name];
    return Icon ? <Icon size={48} /> : null;
  };

  const isInCart = items.some(item => item.id === service.id);
  const isConsultancyInCart = items.some(item => item.id === 'consultancy-session');

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-cool/5 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-500 hover:text-black transition-colors mb-12 group"
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Solutions
        </button>

        <div className="grid lg:grid-cols-1 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-12 rounded-[40px] border border-black/5 relative overflow-hidden"
          >
            <div className="flex items-center space-x-6 mb-10">
              <div className="w-20 h-20 bg-orange-500/10 text-orange-500 rounded-3xl flex items-center justify-center shadow-lg shadow-orange-500/5">
                {getIcon(service.icon)}
              </div>
              <div>
                <span className="text-xs font-black text-orange-500 uppercase tracking-[0.3em] mb-2 block">
                  {service.category}
                </span>
                <h1 className="text-4xl lg:text-5xl font-bold text-black tracking-tight">
                  {service.title}
                </h1>
              </div>
            </div>

            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              {service.description}
            </p>

            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-black mb-8 flex items-center">
                  <Sparkles size={24} className="text-orange-500 mr-3" />
                  Our Procedure
                </h2>
                <div className="space-y-6">
                  {service.procedure?.map((step, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-6 group"
                    >
                      <div className="w-8 h-8 rounded-full bg-black/5 border border-black/10 flex items-center justify-center text-orange-500 font-bold text-sm flex-shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-all">
                        {index + 1}
                      </div>
                      <p className="text-gray-600 text-lg leading-relaxed pt-0.5">
                        {step}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="pt-12 border-t border-black/5 grid md:grid-cols-2 gap-8">
                {/* Consultancy Option */}
                <div className="glass p-8 rounded-3xl border border-black/5 hover:border-blue-500/30 transition-all">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-black">Strategy Session</h3>
                      <p className="text-xs text-gray-500 uppercase tracking-widest">30 Minutes</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-8">
                    Not ready to commit? Book a focused 30-minute session to discuss your specific needs for just $5.
                  </p>
                  <button
                    onClick={() => consultancySession && addToCart(consultancySession)}
                    className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center space-x-2 ${
                      isConsultancyInCart 
                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' 
                        : 'bg-black/5 text-black hover:bg-black/10'
                    }`}
                  >
                    {isConsultancyInCart ? (
                      <>
                        <Check size={16} />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={16} />
                        <span>Book for $5</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Main Order Option */}
                <div className="glass p-8 rounded-3xl border border-black/5 hover:border-orange-500/30 transition-all bg-gradient-to-br from-orange-500/5 to-transparent">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-orange-500/10 text-orange-500 rounded-2xl flex items-center justify-center">
                      <Sparkles size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-black">Full Implementation</h3>
                      <p className="text-xs text-gray-500 uppercase tracking-widest">Complete Package</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-8">
                    Ready to scale? Order the full {service.title} package and let our experts handle everything.
                  </p>
                  <button
                    onClick={() => addToCart(service)}
                    className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center space-x-2 ${
                      isInCart 
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
                        : 'bg-black text-white hover:bg-gray-800'
                    }`}
                  >
                    {isInCart ? (
                      <>
                        <Check size={16} />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={16} />
                        <span>Order Now</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
