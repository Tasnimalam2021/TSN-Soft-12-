import { Service, Project } from './types';

export const SERVICES: Service[] = [
  {
    id: 'web-build',
    title: 'Custom Website Build',
    description: 'High-performance, SEO-optimized websites tailored for restaurants.',
    price: 1500,
    category: 'Tech',
    icon: 'Globe',
    procedure: [
      'Discovery Phase: Understanding your brand identity and business goals.',
      'Architecture & UI/UX Design: Creating a high-conversion user journey.',
      'Development: Building with cutting-edge technologies for speed and reliability.',
      'Content Integration: Professional food photography and menu digitization.',
      'SEO & Launch: Optimizing for local search and deploying on global edge networks.'
    ]
  },
  {
    id: 'full-marketing',
    title: 'Full Marketing Suite',
    description: 'Comprehensive marketing campaigns across all digital channels.',
    price: 2500,
    category: 'Marketing',
    icon: 'Megaphone',
    procedure: [
      'Market Analysis: Identifying your target audience and local competitors.',
      'Campaign Strategy: Developing a multi-channel roadmap for growth.',
      'Creative Production: High-impact visuals and compelling copy.',
      'Execution: Launching ads across Meta, Google, and local platforms.',
      'Analytics & Optimization: Continuous monitoring and ROI improvement.'
    ]
  },
  {
    id: 'social-media',
    title: 'Social Media Management',
    description: 'Engage your audience with curated content and community management.',
    price: 1200,
    category: 'Marketing',
    icon: 'Share2',
    procedure: [
      'Content Calendar: Planning a month of engaging, brand-aligned posts.',
      'Visual Storytelling: Professional photography and short-form video (Reels/TikTok).',
      'Community Engagement: Managing comments, messages, and reviews.',
      'Influencer Outreach: Connecting with local foodies and creators.',
      'Growth Reporting: Monthly insights on reach and engagement metrics.'
    ]
  },
  {
    id: 'seo-optimization',
    title: 'SEO & Local Search',
    description: 'Dominate local search results and drive organic traffic to your restaurant.',
    price: 1000,
    category: 'Marketing',
    icon: 'Search',
    procedure: [
      'Local SEO Audit: Analyzing current visibility and ranking factors.',
      'GMB Optimization: Maximizing your Google My Business profile impact.',
      'Keyword Research: Targeting high-intent local dining searches.',
      'On-Page & Technical SEO: Improving site structure and local relevance.',
      'Review Management: Strategies to build and maintain 5-star reputation.'
    ]
  },
  {
    id: 'strategy-dev',
    title: 'Strategy Development',
    description: 'Data-driven business strategies to scale your restaurant operations.',
    price: 1800,
    category: 'Strategy',
    icon: 'TrendingUp',
    procedure: [
      'Business Health Check: Deep dive into financial and operational metrics.',
      'Competitive Positioning: Defining your unique value proposition.',
      'Growth Roadmap: Step-by-step plan for expansion or scaling.',
      'Operational Efficiency: Streamlining workflows and supply chain.',
      'Financial Modeling: Forecasting and budgeting for long-term success.'
    ]
  },
  {
    id: 'consulting',
    title: 'Business Consulting',
    description: 'Expert advice on menu engineering, staff training, and cost control.',
    price: 2000,
    category: 'Consulting',
    icon: 'Users',
    procedure: [
      'Operational Audit: Comprehensive review of current restaurant performance.',
      'Menu Engineering: Analyzing profitability and popularity of menu items.',
      'Staff Training: Implementing service standards and upselling techniques.',
      'Cost Control: Optimizing inventory management and labor costs.',
      'Performance Monitoring: Ongoing support to ensure sustained growth.'
    ]
  },
  {
    id: 'consultancy-session',
    title: '30-Min Consultancy Session',
    description: 'A focused 30-minute strategy session to discuss your specific needs.',
    price: 5,
    category: 'Consulting',
    icon: 'Clock',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'italian-bistro',
    title: 'The Italian Bistro',
    location: 'Chicago, IL',
    result: '+45% Revenue',
    description: 'Transformed a traditional family-owned bistro into a digital powerhouse. Implemented a custom reservation system and AI-driven menu optimization that increased table turnover by 30%.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
    tags: ['Web Build', 'SEO', 'Lead Gen'],
    challenge: 'The Italian Bistro was struggling with manual reservations and a static menu that didn\'t adapt to seasonal trends or customer preferences. Their online presence was minimal, leading to missed opportunities in a competitive Chicago market.',
    solution: 'We deployed a full-stack digital ecosystem. This included a high-performance website with an integrated reservation engine, an AI-powered menu analytics dashboard, and a targeted local SEO campaign.',
    impact: [
      { label: 'Revenue Growth', value: '+45%' },
      { label: 'Table Turnover', value: '+30%' },
      { label: 'Online Bookings', value: '85%' }
    ]
  },
  {
    id: 'ocean-grill',
    title: 'Ocean Grill',
    location: 'Miami, FL',
    result: '3,000+ Leads',
    description: 'Scaled a beachfront grill to multiple locations using our Quantum Marketing Engine. Automated social media campaigns and predictive inventory management reduced food waste by 25%.',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800',
    tags: ['Full Marketing', 'Social Media'],
    challenge: 'Ocean Grill had great food but lacked a consistent way to attract new customers and manage inventory across their expanding locations. High food waste was eating into their margins.',
    solution: 'We implemented our Quantum Marketing Engine to automate lead generation and social media management. Additionally, we integrated a predictive inventory system that uses AI to forecast demand based on weather, local events, and historical data.',
    impact: [
      { label: 'New Leads', value: '3,000+' },
      { label: 'Waste Reduction', value: '-25%' },
      { label: 'Customer Retention', value: '+40%' }
    ]
  }
];

export const NAV_LINKS = [
  { name: 'About Us', href: '/#about' },
  { name: 'Features', href: '/#features' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Solutions', href: '/#solutions' },
  { name: 'Contact', href: '/#contact' },
];
