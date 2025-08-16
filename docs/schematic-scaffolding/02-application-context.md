# Application Context: VendeMás

## Mission & Vision

### **Mission Statement**

Empower street vendors and micro-retail microbusinesses in Mexico and LATAM to sell more with less friction—by giving them a fast, offline-friendly, mobile toolkit for QR/barcode checkout, live location, simple promos, and clear daily sales insights.

### **Vision Statement**

Become the default mobile operating system for informal commerce in LATAM, where any puesto/tiendita can accept payments, manage inventory, broadcast its location, run promotions, and understand its business—regardless of device, connectivity, or technical skills.

## Product Description

### **Core Concept**

VendeMás (system name: Vendemas) is a mobile-first sales toolkit built with Angular + Ionic + Capacitor (one codebase → Android/iOS + PWA dashboard). It's offline-first (local SQLite + sync queue) and integrates with Firebase (Auth, Cloud Messaging, Hosting) and a pluggable backend (start with Cloud Functions; upgradeable to NestJS + PostgreSQL).

### **Target Users**

#### **Primary Users**

- **Street Vendors** (puestos, tienditas)
- **Micro-retail Businesses** (small shops, kiosks)
- **Food Truck Operators**
- **Market Stall Owners**

#### **Secondary Users**

- **Business Owners** (dashboard users)
- **Staff Members** (POS operators)
- **Customers** (end users)

### **User Characteristics**

- **Technical Skills**: Limited to basic smartphone usage
- **Connectivity**: Intermittent internet access
- **Devices**: Low-end Android smartphones
- **Language**: Spanish (primary), English (secondary)
- **Currency**: MXN (Mexican Peso)

## Core Modules

### **1. POS with QR/Barcode**

- **Purpose**: Instant checkout and inventory updates
- **Technology**: ML Kit for barcode scanning
- **Features**:
  - QR code generation and scanning
  - Barcode scanning for products
  - Quick product lookup
  - Price calculation

### **2. Catalog & Inventory**

- **Purpose**: Product management and stock tracking
- **Features**:
  - Product catalog with images
  - Stock level tracking
  - Low-stock alerts
  - Category organization
  - Price management

### **3. Location Broadcast**

- **Purpose**: Help customers find vendor locations
- **Features**:
  - Opt-in GPS pin sharing
  - Location-based discovery
  - Operating hours display
  - Route planning for customers

### **4. Promotions & Notifications**

- **Purpose**: Marketing and customer engagement
- **Features**:
  - Push notifications
  - Shareable promotion cards
  - Social media integration
  - Customer loyalty tracking

### **5. Sales Analytics**

- **Purpose**: Business intelligence and insights
- **Features**:
  - Daily sales totals
  - Top-selling products
  - Sales trends analysis
  - Revenue reporting
  - Customer analytics

### **6. Customer Ledger**

- **Purpose**: Credit tracking and customer management
- **Features**:
  - Optional tabs/fiado tracking
  - Customer profiles
  - Payment history
  - Credit limits

### **7. Roles & Devices**

- **Purpose**: Multi-user and multi-device support
- **Features**:
  - Owner and collaborator roles
  - Multi-device synchronization
  - User permissions
  - Activity logging

### **8. PWA Web Dashboard**

- **Purpose**: Reporting and bulk operations
- **Features**:
  - Sales reports
  - Inventory management
  - Customer database
  - Business analytics

## Technical Stack

### **Frontend Technologies**

- **Angular**: Primary application framework
- **Ionic**: Mobile UI components and native features
- **Capacitor**: Native device integration
- **TypeScript**: Type-safe development

### **Backend Technologies**

- **Firebase**: Authentication, messaging, hosting
- **Cloud Functions**: Serverless backend logic
- **Firestore**: NoSQL database
- **Future**: NestJS + PostgreSQL upgrade path

### **Mobile Technologies**

- **Android**: Native Android app
- **iOS**: Native iOS app
- **PWA**: Progressive Web App for web access

### **Offline Capabilities**

- **SQLite**: Local database storage
- **Sync Queue**: Offline operation queuing
- **Conflict Resolution**: Data synchronization logic

### **Development Tools**

- **Nx**: Monorepo management
- **Vitest**: Unit testing framework
- **Playwright**: E2E testing
- **ESLint**: Code quality enforcement

## Market Focus

### **Primary Market**

- **Geographic**: Mexico and LATAM
- **Demographic**: Small business owners and street vendors
- **Economic**: Micro-businesses with limited resources

### **Key Features for Market**

- **QR/Barcode Scanning**: Essential for inventory management
- **Geolocation**: Critical for customer discovery
- **Push Notifications**: Important for customer engagement
- **Offline Sync**: Vital for areas with poor connectivity

### **Non-Goals**

- **Heavy Accounting/ERP**: Keep it simple and focused
- **Complex Loyalty Systems**: Basic customer tracking only
- **Multi-warehouse**: Single location focus
- **Enterprise Features**: Small business focus

## Business Model

### **Revenue Streams**

- **Subscription Tiers**: Basic, Pro, Enterprise
- **Transaction Fees**: Small percentage of sales
- **Premium Features**: Advanced analytics and reporting
- **White-label Solutions**: Custom branding for larger clients

### **Pricing Strategy**

- **Freemium Model**: Basic features free, premium features paid
- **Market Appropriate**: Pricing suitable for small businesses
- **Flexible Plans**: Monthly and annual options
- **Regional Pricing**: Adjusted for local purchasing power

## Success Metrics

### **User Adoption**

- **Active Users**: Daily and monthly active users
- **Retention Rate**: User retention over time
- **Feature Usage**: Which features are most popular
- **User Satisfaction**: App store ratings and feedback

### **Business Impact**

- **Sales Increase**: Revenue growth for vendors
- **Time Savings**: Efficiency improvements
- **Customer Acquisition**: New customer growth
- **Business Growth**: Vendor business expansion

### **Technical Metrics**

- **App Performance**: Load times and responsiveness
- **Offline Reliability**: Sync success rates
- **Error Rates**: Application stability
- **Platform Coverage**: Android vs iOS adoption

---

_This context provides the foundation for all technical decisions and feature prioritization._
