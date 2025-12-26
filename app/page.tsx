'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Rocket, Shield, Coins, Users, Code, Zap, 
  ChevronRight, Github, Twitter, MessageCircle,
  Lock, Globe, Database, Cpu, ExternalLink,
  CheckCircle, ArrowRight, Star, Trophy,
  DollarSign, Share2, Wallet
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const LAUNCH_DATE = new Date('2025-12-26T10:00:00Z');
const TOTAL_BETA_SPOTS = 50;
const CURRENT_SIGNUPS = 0; // Dynamic in production

const PRODUCTS = [
  {
    id: 'platform',
    name: '24HRMVP Platform',
    tagline: 'Community Ideas → Products in 24hrs',
    description: 'Vote on ideas, watch them build live, shape the future of software.',
    icon: Rocket,
    features: ['Community Voting', 'Real-time Forums', 'Livestream Builds', 'Multichain Auth'],
    color: '#04D9FF',
    url: 'https://24hrmvp.xyz'
  },
  {
    id: 'wallet',
    name: 'Dogendary Wallet',
    tagline: 'Self-Custody Doge & Doginals',
    description: 'The wallet Dogecoin deserves. Browser extension with full Doginals support.',
    icon: Wallet,
    features: ['HD Wallets', 'Doginals NFTs', 'dApp Integration', 'AES-256 Encrypted'],
    color: '#FB48C4',
    url: '#'
  },
  {
    id: 'nft',
    name: 'Cypherpunks NFT',
    tagline: 'Governance Rights On-Chain Forever',
    description: '1,000 limited collection. Voting power. Treasury access. Advisory seats.',
    icon: Shield,
    features: ['Voting Power', 'DAO Treasury Access', 'Advisory Eligibility', 'On-Chain Forever'],
    color: '#8A00C4',
    url: 'https://punks.24hrmvp.xyz'
  }
];

const BETA_TIERS = [
  {
    tier: 1,
    range: '1-10',
    tokens: '$20 HOPE',
    perks: ['Genesis Badge', 'NFT Whitelist (50% off)', 'Advisory Vote', 'Private Discord'],
    highlight: true
  },
  {
    tier: 2,
    range: '11-50',
    tokens: '$10 HOPE',
    perks: ['Pioneer Badge', 'NFT Whitelist (25% off)', 'Beta Features', 'Community Discord'],
    highlight: false
  }
];

const ROADMAP = [
  { phase: 1, title: 'Beta Launch', date: 'Dec 26, 2025', status: 'current', icon: Zap, items: ['Launch Page Live', 'Beta Recruitment', 'Community Formation'] },
  { phase: 2, title: 'NFT Mint', date: 'Jan 2026', status: 'upcoming', icon: Shield, items: ['Cypherpunks Mint', 'Governance Setup', 'Advisory Council'] },
  { phase: 3, title: 'Smart Contracts', date: 'Mar 2026', status: 'upcoming', icon: Code, items: ['HOPE Token Launch', 'On-chain DAO', 'Multi-sig Treasury'] },
  { phase: 4, title: 'Public Launch', date: 'May 2026', status: 'upcoming', icon: Rocket, items: ['Full Platform', 'Autonomous DAO', 'First MVPs Shipped'] }
];

const TECH_STACK = [
  { name: 'TypeScript', icon: Code },
  { name: 'Next.js 14', icon: Globe },
  { name: 'PostgreSQL', icon: Database },
  { name: 'Railway', icon: Cpu },
  { name: 'Farcaster', icon: MessageCircle },
  { name: 'Dogecoin', icon: Coins }
];

// ============================================================================
// UTILITY HOOKS
// ============================================================================

function useCountdown(targetDate: Date): CountdownTime {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition;
}

// ============================================================================
// COMPONENTS
// ============================================================================

// Static Background Grid (non-animated, subtle)
function LaserGrid() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B192A] via-[#0B192A]/95 to-[#0B192A]" />
      
      {/* Static Grid - No animation */}
      <div className="absolute inset-0" style={{ perspective: '1000px' }}>
        <div
          className="absolute w-[200%] h-[200%] -bottom-1/2 -left-1/2"
          style={{
            backgroundImage: `
              linear-gradient(rgba(4, 217, 255, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(4, 217, 255, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            transform: 'rotateX(60deg)',
          }}
        />
      </div>

      {/* Subtle radial glow in center */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(4, 217, 255, 0.15) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}

// Chrome Text Effect
function ChromeText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`relative inline-block ${className}`}
      style={{
        background: 'linear-gradient(135deg, #A8A9AD 0%, #E3E3E3 25%, #C0C0C3 50%, #E3E3E3 75%, #A8A9AD 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        filter: 'drop-shadow(0 0 20px rgba(4, 217, 255, 0.3))',
      }}
    >
      {children}
    </span>
  );
}

// Glowing Button
function GlowButton({ 
  children, 
  variant = 'primary', 
  href,
  onClick,
  className = '' 
}: { 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'chrome';
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const baseClasses = "inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-3 sm:py-4 font-semibold text-base sm:text-lg rounded-full transition-all duration-300 overflow-hidden max-w-full";
  
  const variants = {
    primary: "bg-gradient-to-r from-[#04D9FF] to-[#00B4D8] text-[#0B192A] hover:shadow-[0_0_30px_rgba(4,217,255,0.5)]",
    secondary: "border-2 border-[#04D9FF] text-[#04D9FF] hover:bg-[#04D9FF]/10 hover:shadow-[0_0_30px_rgba(4,217,255,0.3)]",
    chrome: `text-[#1E1E1E] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]`
  };

  const chromeStyle = variant === 'chrome' ? {
    background: 'linear-gradient(135deg, #A8A9AD 0%, #E3E3E3 25%, #C0C0C3 50%, #E3E3E3 75%, #A8A9AD 100%)',
  } : {};

  const content = (
    <>
      {children}
    </>
  );

  if (href) {
    const isExternal = href.startsWith('http');
    return (
      <a
        href={href}
        className={`${baseClasses} ${variants[variant]} ${className}`}
        style={chromeStyle}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      style={chromeStyle}
    >
      {content}
    </button>
  );
}

// Glass Card
function GlassCard({ 
  children, 
  className = '',
  glowColor = '#04D9FF',
  hover = true
}: { 
  children: React.ReactNode; 
  className?: string;
  glowColor?: string;
  hover?: boolean;
}) {
  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden ${className}`}
      whileHover={hover ? { y: -8, scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
    >
      {/* Glass Background */}
      <div 
        className="absolute inset-0 backdrop-blur-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(30, 30, 30, 0.8) 0%, rgba(30, 30, 30, 0.4) 100%)',
          border: `1px solid ${glowColor}33`,
        }}
      />
      
      {/* Glow Effect */}
      <motion.div
        className="absolute -inset-1 opacity-0 rounded-2xl blur-xl transition-opacity duration-300"
        style={{ background: glowColor }}
        whileHover={{ opacity: 0.15 }}
      />
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
    </motion.div>
  );
}

// Countdown Timer
function CountdownTimer() {
  const countdown = useCountdown(LAUNCH_DATE);

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div 
          className="w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 rounded-xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(180deg, rgba(4, 217, 255, 0.1) 0%, rgba(4, 217, 255, 0.05) 100%)',
            border: '1px solid rgba(4, 217, 255, 0.3)',
            boxShadow: '0 0 30px rgba(4, 217, 255, 0.1), inset 0 0 20px rgba(4, 217, 255, 0.05)',
          }}
        >
          <span className="font-mono text-2xl sm:text-4xl md:text-5xl font-bold text-[#04D9FF]">
            {String(value).padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className="mt-2 text-sm uppercase tracking-widest text-[#B0B0B0] font-mono">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex gap-2 sm:gap-3 md:gap-6 justify-center">
      <TimeBlock value={countdown.days} label="Days" />
      <div className="flex items-center text-[#04D9FF] text-xl sm:text-3xl font-bold">:</div>
      <TimeBlock value={countdown.hours} label="Hours" />
      <div className="flex items-center text-[#04D9FF] text-xl sm:text-3xl font-bold">:</div>
      <TimeBlock value={countdown.minutes} label="Min" />
      <div className="flex items-center text-[#04D9FF] text-xl sm:text-3xl font-bold">:</div>
      <TimeBlock value={countdown.seconds} label="Sec" />
    </div>
  );
}

// Progress Bar
function ProgressBar({ current, total }: { current: number; total: number }) {
  const percentage = (current / total) * 100;
  
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-2">
        <span className="text-[#B0B0B0]">Beta Spots Claimed</span>
        <span className="text-[#04D9FF] font-mono">{current}/{total}</span>
      </div>
      <div className="h-3 rounded-full bg-[#1E1E1E] overflow-hidden border border-[#04D9FF]/20">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #04D9FF, #00B4D8)',
            boxShadow: '0 0 20px rgba(4, 217, 255, 0.5)',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

// Signup Form
function SignupForm() {
  const [email, setEmail] = useState('');
  const [discord, setDiscord] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call - replace with actual endpoint
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2CFF05]/20 flex items-center justify-center"
        >
          <CheckCircle className="w-8 h-8 text-[#2CFF05]" />
        </motion.div>
        <h3 className="text-2xl font-bold text-white mb-2">You're In!</h3>
        <p className="text-[#B0B0B0]">Check your email for next steps.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="w-full px-5 py-4 rounded-xl bg-[#1E1E1E]/80 border border-[#04D9FF]/30 
                     text-white placeholder:text-[#808080] font-mono
                     focus:outline-none focus:border-[#04D9FF] focus:ring-2 focus:ring-[#04D9FF]/20
                     transition-all duration-300"
        />
      </div>
      <div>
        <input
          type="text"
          value={discord}
          onChange={(e) => setDiscord(e.target.value)}
          placeholder="Discord handle (optional)"
          className="w-full px-5 py-4 rounded-xl bg-[#1E1E1E]/80 border border-[#04D9FF]/30 
                     text-white placeholder:text-[#808080] font-mono
                     focus:outline-none focus:border-[#04D9FF] focus:ring-2 focus:ring-[#04D9FF]/20
                     transition-all duration-300"
        />
      </div>
      <GlowButton 
        variant="primary" 
        className="w-full justify-center"
        onClick={() => {}}
      >
        {loading ? (
          <motion.div
            className="w-6 h-6 border-2 border-[#0B192A] border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        ) : (
          <>
            Claim Your Spot <ArrowRight className="w-5 h-5" />
          </>
        )}
      </GlowButton>
      <p className="text-xs text-center text-[#808080]">
        By signing up, you agree to receive updates. No spam, ever.
      </p>
    </form>
  );
}

// Product Card
function ProductCard({ product }: { product: typeof PRODUCTS[0] }) {
  const Icon = product.icon;
  
  return (
    <GlassCard glowColor={product.color} className="h-full">
      <div className="flex flex-col h-full">
        {/* Icon */}
        <div 
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
          style={{
            background: `${product.color}20`,
            border: `1px solid ${product.color}40`,
          }}
        >
          <Icon className="w-7 h-7" style={{ color: product.color }} />
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
          {product.name}
        </h3>
        <p className="text-sm font-mono mb-3" style={{ color: product.color }}>
          {product.tagline}
        </p>
        <p className="text-[#B0B0B0] text-sm mb-4 flex-grow">
          {product.description}
        </p>
        
        {/* Features */}
        <ul className="space-y-2 mb-4">
          {product.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-[#E3E3E3]">
              <CheckCircle className="w-4 h-4" style={{ color: product.color }} />
              {feature}
            </li>
          ))}
        </ul>
        
        {/* CTA */}
        <a 
          href={product.url}
          className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-300 group"
          style={{ color: product.color }}
        >
          Explore <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </GlassCard>
  );
}

// Beta Tier Card
function BetaTierCard({ tier }: { tier: typeof BETA_TIERS[0] }) {
  return (
    <div 
      className={`relative p-4 rounded-xl border ${
        tier.highlight 
          ? 'border-[#04D9FF]/50 bg-[#04D9FF]/5' 
          : 'border-[#8A00C4]/30 bg-[#8A00C4]/5'
      }`}
    >
      {tier.highlight && (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
          <span className="px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#04D9FF] text-[#0B192A] rounded-full whitespace-nowrap">
            First 10
          </span>
        </div>
      )}
      
      <div className="text-center pt-1">
        <div className="text-[#808080] text-xs mb-1">Tier {tier.tier}</div>
        <div 
          className="text-2xl font-bold mb-1" 
          style={{ 
            fontFamily: 'var(--font-display)',
            color: tier.highlight ? '#04D9FF' : '#FB48C4'
          }}
        >
          {tier.tokens}
        </div>
        <div className="text-xs text-[#B0B0B0] mb-3">Spots {tier.range}</div>
        
        <ul className="space-y-1.5 text-left">
          {tier.perks.map((perk, i) => (
            <li key={i} className="flex items-center gap-2 text-[#E3E3E3]">
              <Star className="w-3 h-3 text-[#04D9FF] flex-shrink-0" />
              <span className="text-xs">{perk}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Section Header
function SectionHeader({ 
  badge, 
  title, 
  subtitle 
}: { 
  badge: string; 
  title: string; 
  subtitle: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-8"
    >
      <span className="inline-block px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest 
                       bg-[#04D9FF]/10 border border-[#04D9FF]/30 text-[#04D9FF] mb-3">
        {badge}
      </span>
      <h2 
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {title}
      </h2>
      <p className="text-[#B0B0B0] max-w-2xl mx-auto">
        {subtitle}
      </p>
    </motion.div>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function LaunchPage() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.95]);
  
  // Modal state
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#0B192A] text-white overflow-hidden">
      {/* Privacy Modal */}
      <AnimatePresence>
        {showPrivacy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowPrivacy(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl w-full max-h-[80vh] overflow-y-auto bg-[#1E1E1E] border border-[#04D9FF]/30 rounded-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowPrivacy(false)}
                className="absolute top-4 right-4 text-[#808080] hover:text-white transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
>
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-2xl font-bold text-[#04D9FF] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Privacy Policy
              </h2>
              <div className="text-[#B0B0B0] space-y-4 text-sm">
                <p><strong className="text-white">Last Updated:</strong> December 26, 2025</p>
                <p>24HRMVP ("we", "our", or "us") respects your privacy. This policy explains how we collect, use, and protect your information.</p>
                <h3 className="text-white font-semibold mt-4">Information We Collect</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Email addresses provided during beta signup</li>
                  <li>Discord handles (optional)</li>
                  <li>Wallet addresses for authentication</li>
                  <li>Usage data and analytics</li>
                </ul>
                <h3 className="text-white font-semibold mt-4">How We Use Your Information</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>To provide access to the 24HRMVP platform</li>
                  <li>To send updates about launches and features</li>
                  <li>To improve our services</li>
                  <li>To communicate about governance matters</li>
                </ul>
                <h3 className="text-white font-semibold mt-4">Data Protection</h3>
                <p>We implement industry-standard security measures. We never sell your personal data to third parties.</p>
                <h3 className="text-white font-semibold mt-4">Contact</h3>
                <p>For privacy inquiries: <a href="mailto:matthew@vt-infinite.com" className="text-[#04D9FF] hover:underline">matthew@vt-infinite.com</a></p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terms Modal */}
      <AnimatePresence>
        {showTerms && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowTerms(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl w-full max-h-[80vh] overflow-y-auto bg-[#1E1E1E] border border-[#04D9FF]/30 rounded-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowTerms(false)}
                className="absolute top-4 right-4 text-[#808080] hover:text-white transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-2xl font-bold text-[#04D9FF] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Terms of Service
              </h2>
              <div className="text-[#B0B0B0] space-y-4 text-sm">
                <p><strong className="text-white">Last Updated:</strong> December 26, 2025</p>
                <p>By using 24HRMVP, you agree to these terms. Please read them carefully.</p>
                <h3 className="text-white font-semibold mt-4">Acceptance of Terms</h3>
                <p>By accessing or using 24HRMVP, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
                <h3 className="text-white font-semibold mt-4">Beta Program</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Beta access is provided "as is" without warranties</li>
                  <li>Features may change without notice</li>
                  <li>HOPE token distributions are subject to platform launch</li>
                  <li>NFT benefits are subject to collection availability</li>
                </ul>
                <h3 className="text-white font-semibold mt-4">User Responsibilities</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Provide accurate information during signup</li>
                  <li>Maintain security of your wallet and credentials</li>
                  <li>Use the platform in compliance with applicable laws</li>
                  <li>Respect community guidelines</li>
                </ul>
                <h3 className="text-white font-semibold mt-4">Limitation of Liability</h3>
                <p>24HRMVP is not liable for any losses related to cryptocurrency, NFTs, or platform usage. Participate at your own risk.</p>
                <h3 className="text-white font-semibold mt-4">Contact</h3>
                <p>For questions about these terms: <a href="mailto:matthew@vt-infinite.com" className="text-[#04D9FF] hover:underline">matthew@vt-infinite.com</a></p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background */}
      <LaserGrid />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="backdrop-blur-xl bg-[#0B192A]/80 border-b border-[#04D9FF]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              {/* Logo - Text only, no rocket */}
              <a href="/" className="flex items-center">
                <span 
                  className="text-2xl font-black tracking-tight"
                  style={{ 
                    fontFamily: 'var(--font-display)',
                    background: 'linear-gradient(135deg, #04D9FF 0%, #00B4D8 50%, #04D9FF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 0 30px rgba(4, 217, 255, 0.3)',
                  }}
                >
                  24HRMVP
                </span>
              </a>
              
              {/* CTA - Futuristic styled button */}
              <a 
                href="#beta" 
                className="hidden sm:flex items-center gap-2 px-5 py-2 text-sm font-semibold
                           bg-gradient-to-r from-[#04D9FF]/20 to-[#8A00C4]/20
                           border border-[#04D9FF]/50 rounded-lg
                           text-[#04D9FF] hover:text-white
                           hover:border-[#04D9FF] hover:bg-[#04D9FF]/10
                           hover:shadow-[0_0_20px_rgba(4,217,255,0.3)]
                           transition-all duration-300"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#04D9FF] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#04D9FF]"></span>
                </span>
                Join Beta
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* ================================================================== */}
      {/* HERO SECTION */}
      {/* ================================================================== */}
      <section 
        className="relative pt-16 pb-8 px-4 sm:px-6 lg:px-8 min-h-[90vh] flex flex-col items-center justify-center"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                           bg-[#8A00C4]/20 border border-[#8A00C4]/40 text-[#FB48C4] text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FB48C4] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FB48C4]"></span>
              </span>
              Launching December 26, 2025
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <ChromeText>24HR</ChromeText>
            <br />
            <span className="text-[#04D9FF]">MVP DAO</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-[#B0B0B0] mb-6 max-w-3xl mx-auto">
            Where community ideas become{' '}
            <span className="text-[#04D9FF]">production-ready products</span>{' '}
            in 24 hours. Vote. Build. Ship. Govern.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <GlowButton variant="chrome" href="#beta">
              <Users className="w-5 h-5" />
              Join 50 Beta Testers
            </GlowButton>
            <GlowButton variant="secondary" href="https://punks.24hrmvp.xyz">
              <Shield className="w-5 h-5" />
              Mint NFT Governance
            </GlowButton>
          </div>

          {/* Countdown */}
          <div>
            <p className="text-sm uppercase tracking-widest text-[#808080] mb-4 font-mono">
              Time Until Launch
            </p>
            <CountdownTimer />
          </div>
        </div>

        {/* Scroll Indicator - Static, more visible */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-[#04D9FF]/60">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* ECOSYSTEM SECTION */}
      {/* ================================================================== */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            badge="Ecosystem"
            title="Three Products. One Vision."
            subtitle="A complete Web3 stack built by a solo architect in 3 weeks. What usually takes teams of 15+ over a year."
          />

          <div className="grid md:grid-cols-3 gap-6">
            {PRODUCTS.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* BETA RECRUITMENT SECTION */}
      {/* ================================================================== */}
      <section id="beta" className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            badge="Beta Program"
            title="Shape the Future of Building"
            subtitle="50 early testers get governance rights, $HOPE airdrops, and exclusive NFT access."
          />

          <div className="grid lg:grid-cols-5 gap-6 items-start">
            {/* Tiers - takes 2 columns */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BETA_TIERS.map((tier) => (
                <BetaTierCard key={tier.tier} tier={tier} />
              ))}
            </div>

            {/* Signup Form - takes 3 columns */}
            <GlassCard className="lg:col-span-3" hover={false}>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-2">
                  Claim Your Beta Spot
                </h3>
                <ProgressBar current={CURRENT_SIGNUPS} total={TOTAL_BETA_SPOTS} />
              </div>
              <SignupForm />
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* NFT GOVERNANCE SECTION */}
      {/* ================================================================== */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#8A00C4]/5 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative">
          <SectionHeader
            badge="Cypherpunks NFT"
            title="Governance That Means Something"
            subtitle="1,000 limited collection inscribed forever on Dogecoin. Real power, real ownership."
          />

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* NFT Preview - Now using actual image */}
            <div className="relative">
              <div 
                className="rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #8A00C4 0%, #FB48C4 50%, #04D9FF 100%)',
                  padding: '2px',
                }}
              >
                <div className="w-full bg-[#0B192A] rounded-2xl overflow-hidden">
                  <img 
                    src="/Cypherpunks_Examples.PNG" 
                    alt="Cypherpunks NFT Collection Preview"
                    className="w-full h-auto"
                  />
                </div>
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -top-3 -right-3 bg-[#1E1E1E] border border-[#8A00C4]/50 rounded-xl px-3 py-2">
                <div className="text-lg font-bold text-[#8A00C4]">Voting</div>
                <div className="text-xs text-[#808080]">Power</div>
              </div>
              
              <div className="absolute -bottom-3 -left-3 bg-[#1E1E1E] border border-[#04D9FF]/50 rounded-xl px-3 py-2">
                <div className="text-lg font-bold text-[#04D9FF]">1,000</div>
                <div className="text-xs text-[#808080]">Limited Supply</div>
              </div>
            </div>

            {/* Benefits */}
            <div>
              <ul className="space-y-5">
                {[
                  { icon: Trophy, title: 'Voting Power', desc: 'NFT holders get governance rights to vote on platform decisions and MVP selections.' },
                  { icon: Lock, title: 'Treasury Access', desc: 'Direct influence over how DAO funds are allocated and spent.' },
                  { icon: Users, title: 'Advisory Eligibility', desc: 'Top holders can be elected to the Advisory Council with monthly compensation.' },
                  { icon: Globe, title: 'On-Chain Forever', desc: 'Inscribed on Dogecoin Layer 1. No servers. No dependencies. Eternal.' },
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#8A00C4]/20 border border-[#8A00C4]/40 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[#8A00C4]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-[#B0B0B0]">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6">
                <GlowButton variant="primary" href="https://punks.24hrmvp.xyz">
                  <Shield className="w-5 h-5" />
                  View Collection
                </GlowButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* BUG BOUNTY SECTION */}
      {/* ================================================================== */}
      {/* AFFILIATE SECTION */}
      {/* ================================================================== */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-t from-[#2CFF05]/5 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative">
          <SectionHeader
            badge="Affiliates"
            title="Earn While You Share"
            subtitle="20-25% commission on every referral. Unlimited earning potential."
          />

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: DollarSign, title: '20-25% Commission', desc: 'Escalating tiers based on referral volume. No caps.' },
              { icon: Share2, title: 'Marketing Assets', desc: 'Banners, copy templates, and tutorials provided.' },
              { icon: Cpu, title: 'Real-Time Dashboard', desc: 'Track clicks, conversions, and earnings live.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard glowColor="#2CFF05">
                  <item.icon className="w-10 h-10 text-[#2CFF05] mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-[#B0B0B0]">{item.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <GlowButton variant="secondary" href="#beta">
              Become an Affiliate <ArrowRight className="w-5 h-5" />
            </GlowButton>
            {/* Neon Green Heart */}
            <div className="mt-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="mx-auto text-[#2CFF05]">
                <path 
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* ROADMAP SECTION */}
      {/* ================================================================== */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            badge="Roadmap"
            title="The Path to Autonomy"
            subtitle="From beta launch to fully autonomous DAO in 5 months."
          />

          {/* Horizontal Timeline */}
          <div className="relative">
            {/* Connector Line - Desktop */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-[#04D9FF] via-[#8A00C4] to-[#FB48C4]" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ROADMAP.map((item, i) => (
                <div key={item.phase} className="relative">
                  {/* Phase Icon */}
                  <div className={`
                    w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 relative z-10
                    ${item.status === 'current' 
                      ? 'bg-[#04D9FF] text-[#0B192A]' 
                      : 'bg-[#1E1E1E] border border-[#04D9FF]/30 text-[#04D9FF]'
                    }
                  `}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  
                  {/* Content Card */}
                  <div className={`
                    p-4 rounded-xl text-center
                    ${item.status === 'current'
                      ? 'bg-[#04D9FF]/10 border border-[#04D9FF]/50'
                      : 'bg-[#1E1E1E]/50 border border-[#3D4159]'
                    }
                  `}>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-[#04D9FF] font-mono text-sm">Phase {item.phase}</span>
                      <span className="text-[#808080] text-xs">{item.date}</span>
                    </div>
                    <h3 className="font-bold text-white mb-3">{item.title}</h3>
                    <ul className="space-y-1.5">
                      {item.items.map((subItem, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs text-[#B0B0B0]">
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                            item.status === 'current' ? 'bg-[#04D9FF]' : 'bg-[#808080]'
                          }`} />
                          {subItem}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* TRUST SECTION */}
      {/* ================================================================== */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            badge="Built Different"
            title="Technology You Can Trust"
            subtitle="Production-grade infrastructure. Open source. Community audited."
          />

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {TECH_STACK.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-[#1E1E1E]/50 border border-[#04D9FF]/20"
              >
                <tech.icon className="w-5 h-5 text-[#04D9FF]" />
                <span className="text-[#E3E3E3] font-mono text-sm">{tech.name}</span>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '3', label: 'Products Shipped' },
              { value: '3', label: 'Weeks of Development' },
              { value: '1', label: 'Solo Architect' },
              { value: '∞', label: 'Community Potential' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div 
                  className="text-4xl md:text-5xl font-black mb-2"
                  style={{ 
                    fontFamily: 'var(--font-display)',
                    background: 'linear-gradient(135deg, #04D9FF, #8A00C4)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-[#808080] uppercase tracking-wider font-mono">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* FOOTER CTA */}
      {/* ================================================================== */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Radial */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #04D9FF 0%, transparent 70%)',
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Ready to <ChromeText>Build the Future?</ChromeText>
            </h2>
            <p className="text-xl text-[#B0B0B0] mb-8">
              Join 50 pioneers shaping the first community-governed MVP platform.
            </p>
            <div className="flex flex-col items-center gap-4">
              <GlowButton variant="chrome" href="#beta" className="text-xl px-10 py-5">
                <Rocket className="w-6 h-6" />
                Join the Movement
              </GlowButton>
              {/* Cyan Heart */}
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-[#04D9FF]">
                <path 
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                  fill="currentColor"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* FOOTER */}
      {/* ================================================================== */}
      <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-[#04D9FF]/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Logo - Text only, cyan color */}
            <span 
              className="font-bold text-[#04D9FF] text-xl text-center md:text-left"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              24HRMVP
            </span>

            {/* Links - Privacy and Terms only - Centered */}
            <div className="flex items-center justify-center gap-6">
              <button 
                onClick={() => setShowPrivacy(true)}
                className="text-[#808080] hover:text-[#04D9FF] transition-colors text-sm"
              >
                Privacy
              </button>
              <button 
                onClick={() => setShowTerms(true)}
                className="text-[#808080] hover:text-[#04D9FF] transition-colors text-sm"
              >
                Terms
              </button>
            </div>

            {/* Socials with labels */}
            <div className="flex items-center justify-center md:justify-end gap-4">
              {/* X (Twitter) */}
              <a 
                href="https://x.com/mattyXmvp" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#1E1E1E] border border-[#04D9FF]/20
                           hover:border-[#04D9FF] hover:bg-[#04D9FF]/10 transition-all"
              >
                <svg className="w-4 h-4 text-[#04D9FF]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span className="text-[#808080] text-sm">X.com</span>
              </a>
              {/* GitHub */}
              <a 
                href="https://github.com/daftpixie/" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#1E1E1E] border border-[#04D9FF]/20
                           hover:border-[#04D9FF] hover:bg-[#04D9FF]/10 transition-all"
              >
                <Github className="w-4 h-4 text-[#04D9FF]" />
                <span className="text-[#808080] text-sm">GitHub</span>
              </a>
              {/* Discord */}
              <a 
                href="https://discord.gg/gjSRh44kwc" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#1E1E1E] border border-[#04D9FF]/20
                           hover:border-[#04D9FF] hover:bg-[#04D9FF]/10 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#04D9FF]" />
                <span className="text-[#808080] text-sm">Discord</span>
              </a>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-[#808080] flex items-center justify-center gap-1">
            © 2025 24HRMVP. Built with{' '}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#04D9FF] inline-block">
              <path 
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                fill="currentColor"
              />
            </svg>
            {' '}by Matty - an architect.
          </div>
        </div>
      </footer>
    </div>
  );
}
