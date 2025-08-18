# Firebase App Hosting Setup for Vendemás Landing Web

This document outlines the setup for deploying the `vendemas-landing-web` Next.js application to Firebase App Hosting with CI/CD.

## Overview

Firebase App Hosting provides a modern hosting solution for dynamic web applications with built-in support for Next.js and Angular. It offers:

- **GitHub Integration**: Automatic deployments on push to specified branches
- **Google Cloud Backend**: Built with Cloud Build, served on Cloud Run, cached in Cloud CDN
- **AI-Powered Features**: Built-in support for Gemini and AI features
- **Firebase Console Integration**: Monitor builds and rollouts

## ✅ Deployment Status

**The app is successfully deployed and accessible at:**
**https://vendemas-landing--bistreet-cd883.us-central1.hosted.app**

## Current Setup

### Project Configuration

- **Firebase Project**: `bistreet-cd883` (Production)
- **App**: `vendemas-landing-web` (Next.js)
- **Build Output**: `dist/vendemas-landing-web`
- **Backend ID**: `vendemas-landing`
- **Deployed URL**: https://vendemas-landing--bistreet-cd883.us-central1.hosted.app
- **Environment**: Production (main branch only)

### Configuration Files

1. **firebase.json**: Main Firebase configuration
2. **.firebaserc**: Project association
3. **dist/vendemas-landing-web/apphosting.yaml**: App Hosting specific settings
4. **.github/workflows/vendemas-landing-prod.yml**: Production CI/CD workflow

## Setup Instructions

### 1. Firebase Project Setup

The Firebase project `bistreet-cd883` is already configured and the App Hosting backend `vendemas-landing` is created and deployed.

### 2. Local Development

```bash
# Build the application locally
nx build vendemas-landing-web

# Deploy to Firebase App Hosting
firebase deploy --only apphosting
```

### 3. CI/CD Setup

#### GitHub Secrets Required

Add the following secrets to your GitHub repository:

1. **FIREBASE_TOKEN**: Firebase CLI token for authentication
   ```bash
   # Generate token locally
   firebase login:ci
   ```

#### Workflow Configuration

The GitHub Actions workflow (`.github/workflows/vendemas-landing-prod.yml`) is configured for **production deployment only**:

- **Trigger**: On push to `main` branch only
- **Path Filters**: Only runs when these paths are modified:
  - `apps/vendemas-landing-web/**` (main app)
  - `libs/vendemas-shared-design/**` (design system)
  - `libs/vendemas-shared-styles/**` (shared styles)
  - `libs/vendemas-shared-i18n/**` (internationalization)
  - `package.json` and `pnpm-lock.yaml` (dependencies)
- **Environment**: Production with enhanced security
- **Test**: Run linting and tests
- **Build**: Build the Next.js application with production optimizations
- **Deploy**: Deploy to Firebase App Hosting (Production)

#### Environment Strategy

- **Production**: `main` branch → `bistreet-cd883` project
- **Development**: `develop` branch → Separate dev project (to be configured)

#### Production-Specific Features

- **Environment Variables**: `NODE_ENV=production`
- **Firebase Project**: Explicitly specified (`bistreet-cd883`)
- **Deployment Verification**: Post-deployment verification step
- **Live URL**: Included in workflow environment for easy access

### 4. Environment Configuration

#### App Hosting Settings

The `apphosting.yaml` file in the build directory contains:

```yaml
runConfig:
  minInstances: 0
  # maxInstances: 100
  # concurrency: 80
  # cpu: 1
  # memoryMiB: 512

env:
  - variable: NODE_ENV
    value: 'production'
    availability:
      - BUILD
      - RUNTIME
```

#### Environment Variables

To add environment variables or secrets:

```yaml
env:
  - variable: NEXT_PUBLIC_API_URL
    value: https://api.vendemas.com
    availability:
      - BUILD
      - RUNTIME

  - variable: DATABASE_URL
    secret: database-secret-ref
```

### 5. Custom Domain Setup

To add a custom domain:

1. Go to Firebase Console → App Hosting
2. Select your backend
3. Go to Settings → Custom domains
4. Add your domain and follow the verification steps

## Deployment Process

### How It Works

1. **GitHub Push**: When code is pushed to `main` branch
2. **Path Filtering**: Only triggers if relevant files are modified
3. **GitHub Actions**: Triggers the production CI/CD workflow
4. **Test**: Run linting and tests
5. **Build**: Next.js app is built using Nx with production optimizations
6. **Firebase Deploy**: App is deployed to Firebase App Hosting (Production)
7. **Cloud Build**: Firebase creates a container using buildpacks
8. **Cloud Run**: App runs on Cloud Run with traffic routing
9. **CDN**: Content is cached in Cloud CDN for performance
10. **Verification**: Post-deployment verification and URL output

### Rollout Strategy

- **Default**: 100% traffic to new version immediately
- **Custom**: Can be configured for gradual rollouts

## Monitoring and Logs

### Firebase Console

- **App Hosting Dashboard**: Monitor deployments and performance
- **Build Logs**: View build process and errors
- **Traffic Metrics**: Monitor request patterns

### Google Cloud Console

- **Cloud Run**: View service logs and metrics
- **Cloud Build**: Monitor build processes
- **Cloud CDN**: View caching performance

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Next.js build logs
   - Verify dependencies in package.json
   - Ensure all required environment variables are set

2. **Deployment Failures**
   - Verify Firebase token is valid
   - Check Firebase project permissions
   - Ensure backend ID matches configuration

3. **Runtime Errors**
   - Check Cloud Run logs
   - Verify environment variables
   - Check apphosting.yaml configuration

### Debug Commands

```bash
# Check Firebase project status
firebase projects:list

# View deployment status
firebase apphosting:backends:list

# Get backend details
firebase apphosting:backends:get vendemas-landing

# Test local deployment
firebase serve --only apphosting
```

## Security Considerations

### Environment Variables

- Use Cloud Secret Manager for sensitive data
- Never commit secrets to version control
- Use different secrets for different environments

### Access Control

- Limit Firebase project access
- Use service accounts with minimal permissions
- Regularly rotate Firebase tokens

## Performance Optimization

### Next.js Configuration

The Next.js app is configured with:

- **Image Optimization**: WebP and AVIF formats
- **Compression**: Enabled for all responses
- **Security Headers**: XSS protection, content type options
- **Caching**: Optimized cache TTL settings

### App Hosting Optimization

- **CDN**: Automatic caching in Cloud CDN
- **Auto-scaling**: Based on traffic patterns
- **Cold Start Optimization**: Configurable minimum instances

## Next Steps

1. **Environment Variables**: Add production environment variables
2. **Custom Domain**: Configure custom domain for production
3. **Monitoring**: Set up alerts and monitoring
4. **Development Environment**: Set up separate dev project for `develop` branch
5. **Performance Monitoring**: Enable Firebase Performance Monitoring

## References

- [Firebase App Hosting Documentation](https://firebase.google.com/docs/app-hosting)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
