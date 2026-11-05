import React from 'react';

const IconWrapper = ({ children, size = 24, className = '' }) => (
  <span
    className={className}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  </span>
);

export const ShoppingCart = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </IconWrapper>
);

export const User = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </IconWrapper>
);

export const Search = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </IconWrapper>
);

export const MapPin = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </IconWrapper>
);

export const ChevronDown = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <path d="m6 9 6 6 6-6" />
  </IconWrapper>
);

export const ChevronRight = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <path d="m9 18 6-6-6-6" />
  </IconWrapper>
);

export const ChevronLeft = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <path d="m15 18-6-6 6-6" />
  </IconWrapper>
);

export const Clock = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </IconWrapper>
);

export const Phone = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </IconWrapper>
);

export const Mail = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </IconWrapper>
);

export const X = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </IconWrapper>
);

export const Plus = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </IconWrapper>
);

export const Minus = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <path d="M5 12h14" />
  </IconWrapper>
);

export const Trash2 = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </IconWrapper>
);

export const Navigation = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <polygon points="3 11 22 2 13 21 11 13 3 11" />
  </IconWrapper>
);

export const Check = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <polyline points="20 6 9 17 4 12" />
  </IconWrapper>
);

export const CheckCircle = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </IconWrapper>
);

export const Package = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <path d="m16.5 9.4-9-5.19" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </IconWrapper>
);

export const ChefHat = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z" />
    <path d="M6 17h12" />
  </IconWrapper>
);

export const Fish = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <path d="M6.5 12c.94-3.46 4.94-6 8.5-7 3.56.95 7.56 3.48 8.5 7-.94 3.54-4.94 6.07-8.5 7-3.56-.93-7.56-3.46-8.5-7Z" />
    <path d="M18 12v.5" />
    <path d="M16 17.93a9.77 9.77 0 0 0 0-11.86" />
    <path d="M7 10.67 7 8" />
    <path d="M7 16v-2.67" />
  </IconWrapper>
);

export const Truck = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
    <circle cx="17" cy="18" r="2" />
    <circle cx="7" cy="18" r="2" />
  </IconWrapper>
);

export const Star = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </IconWrapper>
);

export const Timer = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <line x1="10" y1="2" x2="14" y2="2" />
    <line x1="12" y1="14" x2="15" y2="11" />
    <circle cx="12" cy="14" r="8" />
    <line x1="12" y1="10" x2="12" y2="14" />
  </IconWrapper>
);

export const CreditCard = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </IconWrapper>
);

export const Banknote = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <rect width="20" height="12" x="2" y="6" rx="2" />
    <circle cx="12" cy="12" r="2" />
    <path d="M6 12h.01M18 12h.01" />
  </IconWrapper>
);

export const Home = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </IconWrapper>
);

export const Info = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </IconWrapper>
);

export const Menu = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </IconWrapper>
);

export const Heart = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </IconWrapper>
);

export const LogOut = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </IconWrapper>
);

export const ExternalLink = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </IconWrapper>
);

export const Copy = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </IconWrapper>
);

export const Utensils = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3v7" />
  </IconWrapper>
);

export const Packages = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <path d="m12.89 1.45 8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4a2 2 0 0 1-1.1-1.8V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0Z" />
    <path d="M2.32 6.16 12 11l9.68-4.84" />
    <path d="M12 22.76V11" />
    <path d="M7 3.5 17 8.5" />
    <path d="M17 14.5V8.5" />
    <path d="M7 9.5v6" />
  </IconWrapper>
);

export const Sandwich = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <path d="M6 14c0 3 2.7 5.5 6 5.5s6-2.5 6-5.5" />
    <path d="M6 14h12" />
    <rect x="8" y="10" width="8" height="4" rx="1" />
  </IconWrapper>
);

export const Flame = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </IconWrapper>
);

export const Ship = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.18.62 4.21 1.62 6" />
    <path d="M12 10v5" />
  </IconWrapper>
);

export const Pan = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <path d="M5 10a7 7 0 0 1 14 0v5H4v-4" />
    <path d="M18 10h4" />
    <line x1="4" y1="12" x2="18" y2="12" />
  </IconWrapper>
);

export const Soup = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <path d="M4 11h16a1 1 0 0 1 1 1v1a9 9 0 0 1-18 0v-1a1 1 0 0 1 1-1z" />
    <path d="M8 7V4" />
    <path d="M12 7V3" />
    <path d="M16 7V4" />
  </IconWrapper>
);

export const Cup = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <path d="M7 7h10v11a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V7Z" />
    <path d="M17 7h1a3 3 0 0 1 0 6h-1" />
    <path d="M7 7 6.5 3.5" />
    <path d="M17 7l.5-3.5" />
  </IconWrapper>
);

export const Vial = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <path d="M10 3h4" />
    <path d="M10 3v6.34a6 6 0 0 1-1.76 4.24L5.76 16.06A10 10 0 0 0 3 22h18a10 10 0 0 0-2.76-5.94l-2.48-2.48A6 6 0 0 1 14 9.34V3" />
    <line x1="12" y1="14" x2="12" y2="18" />
    <line x1="8" y1="18" x2="16" y2="18" />
  </IconWrapper>
);

export const Cake = ({ size, className }) => (
  <IconWrapper size={size} className={className}>
    <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
    <path d="M4 13s.5-3 2-5h12c1.5 2 2 5 2 5" />
    <path d="M7.5 8h.01" />
    <path d="M12 8h.01" />
    <path d="M16.5 8h.01" />
    <path d="M12 3v3" />
  </IconWrapper>
);

const iconMap = {
  'shopping-cart': ShoppingCart,
  'user': User,
  'search': Search,
  'map-pin': MapPin,
  'chevron-down': ChevronDown,
  'chevron-right': ChevronRight,
  'chevron-left': ChevronLeft,
  'clock': Clock,
  'phone': Phone,
  'mail': Mail,
  'x': X,
  'plus': Plus,
  'minus': Minus,
  'trash-2': Trash2,
  'navigation': Navigation,
  'check': Check,
  'check-circle': CheckCircle,
  'package': Package,
  'chef-hat': ChefHat,
  'fish': Fish,
  'truck': Truck,
  'star': Star,
  'timer': Timer,
  'credit-card': CreditCard,
  'banknote': Banknote,
  'home': Home,
  'info': Info,
  'menu': Menu,
  'heart': Heart,
  'log-out': LogOut,
  'external-link': ExternalLink,
  'copy': Copy,
  'utensils': Utensils,
  'packages': Packages,
  'sandwich': Sandwich,
  'flame': Flame,
  'ship': Ship,
  'pan': Pan,
  'soup': Soup,
  'cup': Cup,
  'vial': Vial,
  'cake': Cake,
};

export const Icon = ({ name, size, className }) => {
  const Component = iconMap[name];
  if (!Component) return null;
  return <Component size={size} className={className} />;
};

const Icons = {
  ShoppingCart,
  User,
  Search,
  MapPin,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Clock,
  Phone,
  Mail,
  X,
  Plus,
  Minus,
  Trash2,
  Navigation,
  Check,
  CheckCircle,
  Package,
  ChefHat,
  Fish,
  Truck,
  Star,
  Timer,
  CreditCard,
  Banknote,
  Home,
  Info,
  Menu,
  Heart,
  LogOut,
  ExternalLink,
  Copy,
  Utensils,
  Packages,
  Sandwich,
  Flame,
  Ship,
  Pan,
  Soup,
  Cup,
  Vial,
  Cake,
  Icon,
};

export default Icons;