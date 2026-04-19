import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { SERVICES } from '../constants';
import { useCart } from '../context/CartContext';
import * as Icons from 'lucide-react';
import { ArrowRight } from 'lucide-react';

export const Services: React.FC = () => {
  const { addToCart, items } = useCart();
  const navigate = useNavigate();

  const getIcon = (name: string) => {
    const Icon = (Icons as any)[name];
    return Icon ? <Icon size={20} /> : null;
  };

  return (
    <section id="solutions" className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-xs font-black text-orange-500 uppercase tracking-[0.3em] mb-4">Our Solutions</h2>
          <h3 className="text-4xl lg:text-5xl font-bold text-black mb-6 tracking-tight">Built for Scale</h3>
          <p className="text-gray-600 text-lg">
            Select the modules you need to build your custom restaurant engine.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.filter(s => s.id !== 'consultancy-session').map((service, index) => {
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/services/${service.id}`)}
                className="bg-white p-8 rounded-[32px] border border-black/5 hover:border-orange-500/30 transition-all group relative overflow-hidden cursor-pointer shadow-sm"
              >
                <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center text-orange-500 mb-8 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                  {getIcon(service.icon)}
                </div>
                <h4 className="text-xl font-bold text-black mb-3 tracking-tight">{service.title}</h4>
                <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                  {service.description}
                </p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-black/5">
                  <span className="text-xs font-bold text-orange-500 uppercase tracking-widest group-hover:translate-x-2 transition-transform flex items-center">
                    View Procedure <ArrowRight size={14} className="ml-2" />
                  </span>
                </div>
                
                {/* Hover Glow */}
                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl group-hover:bg-orange-500/10 transition-all"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
