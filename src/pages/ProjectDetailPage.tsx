import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, TrendingUp, Target, Lightbulb } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Navbar } from '../components/Navbar';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = PROJECTS.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project not found</h2>
          <Link to="/" className="text-orange-500 hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-black mb-12 transition-colors group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Back to Projects</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
              <Target size={14} />
              Case Study
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter mb-6 leading-tight">
              {project.title}
            </h1>
            <p className="text-gray-400 text-sm font-bold uppercase tracking-[0.2em] mb-8">
              {project.location} • {project.result}
            </p>
            <p className="text-gray-600 text-xl leading-relaxed mb-12">
              {project.description}
            </p>

            <div className="grid grid-cols-3 gap-6 mb-12">
              {project.impact.map((item, i) => (
                <div key={i} className="bg-black/5 p-6 rounded-3xl border border-black/5">
                  <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">{item.label}</p>
                  <p className="text-2xl font-bold text-orange-500">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mb-12">
              {project.tags.map(tag => (
                <span key={tag} className="text-[10px] uppercase font-black tracking-widest text-gray-500 bg-black/5 px-3 py-1.5 rounded-lg border border-black/5">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="rounded-[40px] overflow-hidden shadow-2xl border border-black/5 aspect-[4/5]">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[40px] shadow-2xl border border-black/5 max-w-xs hidden md:block">
              <TrendingUp className="text-orange-500 mb-4" size={32} />
              <p className="text-sm font-bold text-black mb-2">Quantum Impact</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Our AI-driven approach delivered measurable results within the first 90 days of implementation.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-32 grid md:grid-cols-2 gap-12">
          <div className="bg-white p-12 rounded-[40px] border border-black/5 shadow-sm">
            <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 mb-8">
              <Target size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-6">The Challenge</h3>
            <p className="text-gray-600 leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="bg-white p-12 rounded-[40px] border border-black/5 shadow-sm">
            <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 mb-8">
              <Lightbulb size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-6">The Solution</h3>
            <p className="text-gray-600 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        <div className="mt-32 text-center">
          <div className="bg-black text-white p-16 rounded-[60px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-[100px]"></div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 tracking-tighter">Want similar <span className="text-orange-500">Results?</span></h2>
            <Link to="/auth" className="bg-white text-black px-12 py-6 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-gray-200 transition-all inline-flex items-center gap-3">
              Start Your Project <CheckCircle2 size={18} />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
