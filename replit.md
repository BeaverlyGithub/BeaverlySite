# Beaverly® - AI Wealth Co-Pilot Platform

## Overview

Beaverly® is a fintech company that provides AI-powered wealth management automation through their flagship product Chilla™, an AI wealth co-pilot. The platform connects to users' existing broker accounts and executes trades automatically using intelligent strategies powered by their proprietary M-II™ (Market Infra Intelligence) engine. The system operates in the background, requiring minimal user intervention while providing adaptive trading automation across multiple broker platforms including Deriv, Robinhood, TradingView, cTrader, MT4/MT5, Alpaca, Binance, and Bybit.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Static Website Structure**: Multi-page static HTML website with dedicated pages for main product (Chilla), technology platform (M-II), and legal documents
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox layouts, optimized for all device sizes
- **Progressive Enhancement**: Vanilla JavaScript with no framework dependencies, focusing on performance and accessibility
- **Animation System**: Custom CSS animations with Intersection Observer API for scroll-triggered effects and smooth user interactions

### Content Management
- **Static Content Delivery**: All content served as static HTML/CSS/JS files for optimal performance and SEO
- **SEO Optimization**: Comprehensive meta tags, Open Graph, Twitter Cards, and structured data markup for search engine visibility
- **Analytics Integration**: Google Analytics 4 implementation with custom event tracking for user engagement metrics

### Asset Management
- **Image Optimization**: Favicon sets, touch icons, and web manifest for PWA-like experience
- **Font Strategy**: Google Fonts (Inter, Outfit) with preload optimization for performance
- **CSS Architecture**: Modular CSS files for each major page (style.css, chilla.css, m-ii.css) with shared base styles

### User Experience Design
- **Navigation System**: Sticky navigation with scroll effects and mobile hamburger menu
- **Interactive Elements**: Smooth scrolling, hover effects, and progressive animation reveals
- **Performance Focus**: Lazy loading, efficient DOM manipulation, and minimal JavaScript bundle size

## External Dependencies

### Analytics and Tracking
- **Google Analytics 4**: User behavior tracking, conversion metrics, and engagement analysis
- **Custom Event Tracking**: Scroll depth monitoring, button click analytics, and time-on-site measurements

### Font Services
- **Google Fonts**: Inter and Outfit font families with display optimization and fallback strategies

### SEO and Social
- **Open Graph Protocol**: Social media sharing optimization for Facebook, LinkedIn
- **Twitter Cards**: Enhanced Twitter sharing with large image cards
- **Structured Data**: Schema.org organization markup for search engine understanding

### Browser APIs
- **Intersection Observer**: Scroll-based animation triggers and viewport detection
- **Web Manifest**: Progressive web app capabilities and mobile installation prompts
- **Performance APIs**: Navigation timing and resource loading optimization