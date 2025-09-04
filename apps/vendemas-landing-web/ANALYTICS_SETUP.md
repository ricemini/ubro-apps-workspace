# Analytics Setup Guide for VendeMás Landing Web

This guide explains how to set up Google Analytics and Firebase Analytics for the VendeMás landing web application deployed on Vercel.

## 🎯 Overview

The application includes:

- **Google Analytics 4 (GA4)** for web analytics and conversion tracking
- **Firebase Analytics** for enhanced user behavior tracking
- **Custom event tracking** for business-specific metrics
- **Performance monitoring** with Firebase Performance
- **Privacy-compliant implementation** with environment-based configuration

## 📋 Prerequisites

1. **Google Analytics 4 Property**
2. **Firebase Project** with Analytics enabled
3. **Vercel Account** with project deployed
4. **Environment variables** configured

## 🔧 Setup Instructions

### 1. Google Analytics Setup

#### Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property for `vendemas.mx`
3. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

#### Configure Enhanced Ecommerce

1. Enable **Enhanced Ecommerce** in GA4
2. Set up **Conversion Events**:
   - `signup`
   - `trial_start`
   - `contact_form`
   - `demo_request`

### 2. Firebase Setup

#### Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project: `vendemas-analytics`
3. Enable **Google Analytics** in project settings
4. Link to your GA4 property

#### Get Firebase Configuration

1. Go to **Project Settings** → **General**
2. Scroll to **Your apps** section
3. Add a **Web app** with nickname: `vendemas-landing-web`
4. Copy the Firebase configuration object

### 3. Vercel Environment Variables

#### Set Environment Variables in Vercel

```bash
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Environment
NEXT_PUBLIC_ENVIRONMENT=production
```

#### Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Set environment variables
vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID
vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
vercel env add NEXT_PUBLIC_FIREBASE_APP_ID
vercel env add NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
vercel env add NEXT_PUBLIC_ENVIRONMENT
```

### 4. Local Development Setup

#### Create `.env.local` file

```bash
# Copy the example file
cp .env.local.example .env.local

# Edit with your actual values
nano .env.local
```

#### Example `.env.local`

```env
# Google Analytics Configuration
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Environment
NEXT_PUBLIC_ENVIRONMENT=development
```

## 🚀 Deployment

### Deploy to Vercel

```bash
# Deploy with environment variables
vercel --prod

# Or push to GitHub (if connected)
git add .
git commit -m "Add analytics tracking"
git push origin main
```

### Verify Deployment

1. Check **Vercel Dashboard** → **Environment Variables**
2. Verify all variables are set correctly
3. Test analytics in production

## 📊 Analytics Features

### Automatic Tracking

- **Page views** on route changes
- **Scroll depth** tracking
- **Time on page** metrics
- **User engagement** events

### Custom Events

- **Value proposition views**
- **CTA button clicks**
- **Form submissions**
- **Feature exploration**
- **Conversion events**

### Business Metrics

- **Trial signups**
- **Contact form submissions**
- **Demo requests**
- **Pricing page views**

## 🔍 Monitoring & Debugging

### Google Analytics

1. Go to **GA4** → **Reports** → **Realtime**
2. Check **Events** for custom tracking
3. Verify **Conversions** are being recorded

### Firebase Analytics

1. Go to **Firebase Console** → **Analytics**
2. Check **Events** tab for custom events
3. Monitor **Audiences** and **Conversions**

### Debug Mode

```javascript
// Enable debug mode in development
localStorage.setItem('debug', 'true');
```

## 🛠️ Customization

### Adding New Events

```typescript
// In your component
const { trackCustomEvent } = useAnalytics();

const handleCustomAction = () => {
  trackCustomEvent('custom_action', {
    section: 'pricing',
    action: 'plan_selected',
    plan: 'pro',
  });
};
```

### Custom Conversions

```typescript
// Track business conversions
const { trackConversionEvent } = useAnalytics();

const handleSignup = () => {
  trackConversionEvent('signup', 0, 'MXN');
};
```

## 🔒 Privacy & Compliance

### GDPR Compliance

- Analytics only loads in production
- No personal data is collected
- Users can opt-out via browser settings

### Data Retention

- **Google Analytics**: 26 months (configurable)
- **Firebase Analytics**: 25 months (configurable)

## 📈 Performance Impact

### Optimizations

- **Lazy loading** of analytics scripts
- **Non-blocking** script execution
- **Minimal bundle size** impact
- **Efficient event batching**

### Monitoring

- **Core Web Vitals** tracking
- **Performance metrics** in Firebase
- **Real User Monitoring (RUM)**

## 🆘 Troubleshooting

### Common Issues

#### Analytics Not Loading

1. Check environment variables are set
2. Verify measurement IDs are correct
3. Check browser console for errors

#### Events Not Tracking

1. Verify `isAnalyticsEnabled()` returns true
2. Check network tab for analytics requests
3. Ensure events are fired after page load

#### Firebase Connection Issues

1. Check Firebase configuration
2. Verify project permissions
3. Check Firebase console for errors

### Debug Commands

```bash
# Check environment variables
vercel env ls

# View deployment logs
vercel logs

# Test analytics locally
npm run dev
```

## 📚 Resources

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Firebase Analytics Documentation](https://firebase.google.com/docs/analytics)
- [Next.js Analytics Guide](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

## 🎉 Success Metrics

After setup, you should see:

- ✅ Page views in GA4 Realtime
- ✅ Custom events in Firebase Analytics
- ✅ Conversion tracking working
- ✅ Performance metrics available
- ✅ No console errors

---

**Need Help?** Contact the development team or check the troubleshooting section above.
