# Monorepo Firebase Management Guide

## 🏗️ Overview

This guide explains how to manage multiple Firebase projects and authentication tokens in a monorepo with several applications.

## 📱 Current Applications

### **Vendemás Landing Web**

- **App Name**: `vendemas-landing-web`
- **Firebase Project**: `bistreet-cd883`
- **Secret Name**: `VENDEMAS_LANDING_WEB_PROD_FIREBASE_TOKEN`
- **Environment**: Production

### **Vendemás Caja Mobile**

- **App Name**: `vendemas-caja-mobile`
- **Firebase Project**: `[TBD]`
- **Secret Name**: `VENDEMAS_CAJA_MOBILE_DEV_FIREBASE_TOKEN`
- **Environment**: Development

### **Vendemás Negocio Web**

- **App Name**: `vendemas-negocio-web`
- **Firebase Project**: `[TBD]`
- **Secret Name**: `VENDEMAS_NEGOCIO_WEB_DEV_FIREBASE_TOKEN`
- **Environment**: Development

## 🏷️ Naming Conventions

### **Recommended Patterns**

#### **Pattern 1: App + Environment Naming (Recommended)**

```
VENDEMAS_LANDING_WEB_PROD_FIREBASE_TOKEN
VENDEMAS_LANDING_WEB_STAGING_FIREBASE_TOKEN
VENDEMAS_LANDING_WEB_DEV_FIREBASE_TOKEN
VENDEMAS_CAJA_MOBILE_PROD_FIREBASE_TOKEN
VENDEMAS_CAJA_MOBILE_DEV_FIREBASE_TOKEN
VENDEMAS_NEGOCIO_WEB_PROD_FIREBASE_TOKEN
VENDEMAS_NEGOCIO_WEB_DEV_FIREBASE_TOKEN
```

#### **Pattern 2: Environment + App Naming**

```
FIREBASE_TOKEN_PROD_LANDING_WEB
FIREBASE_TOKEN_STAGING_LANDING_WEB
FIREBASE_TOKEN_DEV_CAJA_MOBILE
FIREBASE_TOKEN_PROD_NEGOCIO_WEB
```

#### **Pattern 3: Service Account Approach**

```
FIREBASE_SERVICE_ACCOUNT_PROD_LANDING_WEB
FIREBASE_SERVICE_ACCOUNT_DEV_CAJA_MOBILE
FIREBASE_SERVICE_ACCOUNT_STAGING_NEGOCIO_WEB
```

## 🔐 GitHub Secrets Management

### **Current Secrets Structure**

```yaml
# Production Environment
VENDEMAS_LANDING_WEB_PROD_FIREBASE_TOKEN: '[TOKEN_VALUE]'

# Development Environment (Future)
VENDEMAS_CAJA_MOBILE_DEV_FIREBASE_TOKEN: '[TBD]'
VENDEMAS_NEGOCIO_WEB_DEV_FIREBASE_TOKEN: '[TBD]'

# Staging Environment (Future)
VENDEMAS_LANDING_WEB_STAGING_FIREBASE_TOKEN: '[TBD]'
```

### **Adding New Secrets**

1. **Generate Token**: `firebase login:ci`
2. **Go to GitHub**: Settings → Secrets and variables → Actions
3. **Add Secret**: Use the appropriate naming pattern
4. **Update Workflow**: Reference the new secret in the workflow file

## 🔄 Workflow Configuration

### **Current Workflow Structure**

Each app should have its own workflow file:

```
.github/workflows/
├── vendemas-landing-prod.yml      # Production landing web
├── vendemas-landing-staging.yml   # Staging landing web
├── vendemas-caja-mobile-dev.yml   # Development mobile app
├── vendemas-caja-mobile-prod.yml  # Production mobile app
├── vendemas-negocio-web-dev.yml   # Development business web
└── vendemas-negocio-web-prod.yml  # Production business web
```

### **Workflow Template**

```yaml
name: CI/CD - [APP_NAME] [ENVIRONMENT]

env:
  FIREBASE_PROJECT: '[PROJECT_ID]'
  FIREBASE_TOKEN: ${{ secrets.[APP_NAME]_[ENV]_FIREBASE_TOKEN }}

jobs:
  deploy:
    steps:
      - name: Deploy to Firebase
        run: firebase deploy --only apphosting --project ${{ env.FIREBASE_PROJECT }}
        env:
          FIREBASE_TOKEN: ${{ secrets.[APP_NAME]_[ENV]_FIREBASE_TOKEN }}
```

## 🛡️ Security Best Practices

### **Token Management**

1. **App-Specific Tokens**: Each app should have its own token
2. **Environment Separation**: Different tokens for dev/staging/prod
3. **Regular Rotation**: Rotate tokens every 90 days
4. **Minimal Permissions**: Only grant necessary Firebase permissions

### **Access Control**

1. **Project Isolation**: Each app should have its own Firebase project
2. **Service Accounts**: Use service accounts instead of personal tokens
3. **IAM Roles**: Grant minimal required permissions
4. **Audit Logging**: Enable Firebase audit logs

## 📊 Environment Strategy

### **Development Environment**

- **Purpose**: Feature development and testing
- **Deployment**: Automatic on push to `develop` branch
- **URL Pattern**: `https://[app-name]--[project-id].us-central1.hosted.app`

### **Staging Environment**

- **Purpose**: Pre-production testing
- **Deployment**: Manual or on release branches
- **URL Pattern**: `https://[app-name]-staging--[project-id].us-central1.hosted.app`

### **Production Environment**

- **Purpose**: Live application
- **Deployment**: Manual or on `main` branch
- **URL Pattern**: `https://[app-name]--[project-id].us-central1.hosted.app`

## 🔧 Setup Instructions

### **For New Applications**

1. **Create Firebase Project**

   ```bash
   firebase projects:create [project-id]
   firebase use [project-id]
   ```

2. **Initialize App Hosting**

   ```bash
   firebase init apphosting
   ```

3. **Generate Token**

   ```bash
   firebase login:ci
   ```

4. **Add GitHub Secret**
   - Name: `[APP_NAME]_[ENV]_FIREBASE_TOKEN`
   - Value: Generated token

5. **Create Workflow File**
   - Copy template from existing workflow
   - Update app-specific configurations

### **For Existing Applications**

1. **Update Secret Names**
   - Rename generic secrets to app-specific names
   - Update workflow files to reference new secrets

2. **Test Deployment**
   - Verify deployment works with new secret names
   - Check that apps don't interfere with each other

## 🔍 Troubleshooting

### **Common Issues**

1. **Token Not Found**
   - Check secret name matches workflow reference
   - Verify secret is added to correct repository

2. **Permission Denied**
   - Check Firebase project permissions
   - Verify token has correct scopes

3. **Wrong Project**
   - Check `FIREBASE_PROJECT` environment variable
   - Verify `.firebaserc` configuration

### **Debugging Steps**

1. **Check Secret Names**

   ```bash
   # In workflow
   echo "Secret name: ${{ secrets.VENDEMAS_LANDING_WEB_PROD_FIREBASE_TOKEN }}"
   ```

2. **Verify Project ID**

   ```bash
   firebase projects:list
   firebase use [project-id]
   ```

3. **Test Token**

   ```bash
   firebase deploy --token "$FIREBASE_TOKEN" --project [project-id]
   ```

## 📚 References

- [Firebase CLI Documentation](https://firebase.google.com/docs/cli)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)

## 🔄 Migration Checklist

### **Immediate Actions**

- [x] Update `vendemas-landing-web` workflow to use specific token name
- [x] Add `VENDEMAS_LANDING_WEB_PROD_FIREBASE_TOKEN` to GitHub secrets
- [ ] Test deployment with new token name

### **Future Actions**

- [ ] Set up Firebase projects for other apps
- [ ] Create workflows for development environments
- [ ] Implement staging environment
- [ ] Set up service account authentication
- [ ] Configure monitoring and alerting

---

**Last Updated**: $(date)
**Status**: In Progress 🔄
