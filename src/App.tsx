import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { ContactForm } from './components/ContactForm';
import { CartPage } from './pages/CartPage';
import { AuthPage } from './pages/AuthPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { ClientDashboard } from './pages/ClientDashboard';
import { DemoPage } from './pages/DemoPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { PROJECTS } from './constants';
import { Loader2, ArrowRight, Check, Sparkles, Brain, Utensils, BarChart3, Globe, Zap, Shield, Rocket, ChefHat } from 'lucide-react';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  
  React.useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const scrollWithRetry = (retryCount = 0) => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else if (retryCount < 20) {
          setTimeout(() => scrollWithRetry(retryCount + 1), 50);
        }
      };
      scrollWithRetry();
    }
  }, [pathname, hash]);
  
  return null;
};

const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ children, adminOnly }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-orange-500" size={40} />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" />;
  if (adminOnly && !isAdmin) return <Navigate to="/dashboard" />;

  return <>{children}</>;
};

const HomePage = () => (
  <main className="bg-white">
    <Hero />
    
    <section id="features" className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-xs font-black text-orange-500 uppercase tracking-[0.3em] mb-4">Features</h2>
          <h3 className="text-4xl lg:text-5xl font-bold text-black mb-6 tracking-tight">Quantum Growth Ecosystem</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 glass p-10 rounded-[40px] border border-black/5 relative overflow-hidden group">
            <div className="relative z-10">
              <Globe className="text-brand-cool mb-6" size={32} />
              <h4 className="text-2xl font-bold text-black mb-4">Global Infrastructure</h4>
              <p className="text-gray-600 max-w-md">Deploy your restaurant's digital presence on a world-class edge network. Lightning fast load times for every customer, everywhere.</p>
            </div>
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-brand-cool/5 rounded-full blur-[100px] group-hover:bg-brand-cool/10 transition-all"></div>
          </div>
          
          <div className="glass p-10 rounded-[40px] border border-black/5 flex flex-col justify-between group">
            <Zap className="text-blue-500 mb-6" size={32} />
            <div>
              <h4 className="text-2xl font-bold text-black mb-4">Real-time Sync</h4>
              <p className="text-gray-600">Inventory, orders, and marketing data synced across all locations in milliseconds.</p>
            </div>
          </div>

          <div className="glass p-10 rounded-[40px] border border-black/5 flex flex-col justify-between group">
            <Shield className="text-green-500 mb-6" size={32} />
            <div>
              <h4 className="text-2xl font-bold text-black mb-4">Secure Core</h4>
              <p className="text-gray-600">Enterprise-grade security for your customer data and financial transactions.</p>
            </div>
          </div>

          <div className="md:col-span-2 glass p-10 rounded-[40px] border border-black/5 relative overflow-hidden group">
            <div className="relative z-10">
              <Rocket className="text-purple-500 mb-6" size={32} />
              <h4 className="text-2xl font-bold text-black mb-4">AI Marketing Engine</h4>
              <p className="text-gray-600 max-w-md">Automated lead generation and social media management powered by our proprietary Quantum AI models.</p>
            </div>
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[100px] group-hover:bg-purple-500/10 transition-all"></div>
          </div>
        </div>
      </div>
    </section>

    <Services />

    <section id="about" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-orange-500/10 to-brand-cool/10 rounded-[40px] blur-2xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1000" 
              alt="Restaurant" 
              className="relative rounded-[40px] shadow-2xl border border-black/5"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-12 -right-12 glass-dark p-10 rounded-[40px] border border-black/5 shadow-2xl text-black max-w-xs">
              <p className="text-4xl font-bold mb-2 text-brand-cool">10+ Years</p>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Industry Leadership</p>
            </div>
          </div>
          <div>
            <h2 className="text-xs font-black text-orange-500 uppercase tracking-[0.3em] mb-4">About Us</h2>
            <h3 className="text-4xl lg:text-5xl font-bold text-black mb-8 tracking-tight leading-tight">Bridging the Gap Between <span className="text-gradient">Tech and Taste.</span></h3>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              TSN Soft was founded to empower restaurant owners with the same high-level technology and marketing strategies used by global chains. We don't just build websites; we build growth engines.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                'Integrated Ecosystem',
                'AI-Driven Insights',
                'Scalable Solutions',
                'Expert Support'
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-3 glass p-4 rounded-2xl border border-black/5">
                  <div className="w-6 h-6 bg-orange-500/10 text-orange-500 rounded-full flex items-center justify-center">
                    <Check size={12} />
                  </div>
                  <span className="text-gray-700 text-sm font-bold">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="projects" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-xs font-black text-orange-500 uppercase tracking-[0.3em] mb-4">Success Stories</h2>
          <h3 className="text-4xl lg:text-5xl font-bold text-black mb-6 tracking-tight">Quantum Results</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          {PROJECTS.map((study, i) => (
            <Link 
              key={study.id} 
              to={`/projects/${study.id}`}
              className="group relative overflow-hidden rounded-[40px] bg-white border border-black/5 hover:border-orange-500/30 transition-all shadow-sm"
            >
              <div className="aspect-video overflow-hidden">
                <img src={study.image} alt={study.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className="p-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-2xl font-bold text-black mb-1">{study.title}</h4>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">{study.location}</p>
                  </div>
                  <span className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-500/20">{study.result}</span>
                </div>
                <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                  {study.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    {study.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase font-black tracking-widest text-gray-500 bg-black/5 px-3 py-1.5 rounded-lg border border-black/5">{tag}</span>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-orange-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                    View Details <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <section id="contact" className="py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-orange-500/5 -z-10"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center glass p-12 md:p-20 rounded-[60px] border border-black/5 relative">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-cool/5 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-orange-500/5 rounded-full blur-[100px]"></div>
        
        <div className="mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold text-black mb-8 tracking-tighter">Get a <span className="text-orange-500">Schedule</span></h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
            Join hundreds of successful restaurants using TSN Soft to dominate their local market with Quantum Intelligence.
          </p>
        </div>

        <ContactForm />
      </div>
    </section>
  </main>
);

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-white font-sans selection:bg-orange-500/30 selection:text-orange-200">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/demo" element={<DemoPage />} />
              <Route path="/projects/:id" element={<ProjectDetailPage />} />
              <Route path="/services/:id" element={<ServiceDetailPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <ClientDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute adminOnly>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
            <footer className="bg-white text-black py-32 border-t border-black/5">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-16 mb-24">
                  <div className="col-span-2">
                    <div className="flex items-center space-x-2 mb-8">
                      <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                        <ChefHat size={20} />
                      </div>
                      <span className="text-2xl font-bold tracking-tighter text-black">TSN <span className="text-orange-500">Soft</span></span>
                    </div>
                    <p className="text-gray-600 max-w-sm mb-10 leading-relaxed">
                      The next generation growth engine for the modern restaurant industry. Scaling taste with Quantum Intelligence.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-black mb-8 uppercase text-[10px] tracking-[0.3em] text-gray-500">Company</h4>
                    <ul className="space-y-4 text-sm text-gray-600">
                      <li><a href="#about" className="hover:text-black transition-colors">About Us</a></li>
                      <li><a href="#features" className="hover:text-black transition-colors">Features</a></li>
                      <li><a href="#solutions" className="hover:text-black transition-colors">Solutions</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-black mb-8 uppercase text-[10px] tracking-[0.3em] text-gray-500">Contact</h4>
                    <ul className="space-y-4 text-sm text-gray-600">
                      <li>tsn.soft@outlook.com</li>
                      <li>+880 1613-632339</li>
                      <li>Dhaka, Bangladesh</li>
                    </ul>
                  </div>
                </div>
                <div className="pt-12 border-t border-black/5 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  &copy; {new Date().getFullYear()} TSN Soft. Engineered for Excellence.
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
