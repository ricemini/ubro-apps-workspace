# Firebase Service Account Setup for CI/CD

## 🔐 Overview

This guide explains how to set up Firebase service account authentication for CI/CD pipelines, which is the recommended approach over the deprecated `firebase login:ci` method.

## 🚨 Current Issue

The Firebase CLI `login:ci` method is deprecated and will be removed in a future version. We need to migrate to service account authentication.

## 🏷️ Naming Conventions for Monorepo

### **Recommended Naming Patterns**

For a monorepo with multiple apps, use specific naming conventions:

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

#### **Pattern 2: Domain-Based Naming**

```
FIREBASE_TOKEN_LANDING_WEB_PROD
FIREBASE_TOKEN_CAJA_MOBILE_DEV
FIREBASE_TOKEN_NEGOCIO_WEB_PROD
```

#### **Pattern 3: Environment + App Naming**

```
FIREBASE_TOKEN_PROD_LANDING_WEB
FIREBASE_TOKEN_DEV_LANDING_WEB
FIREBASE_TOKEN_STAGING_LANDING_WEB
```

#### **Pattern 4: Service Account Approach**

```
FIREBASE_SERVICE_ACCOUNT_PROD_LANDING_WEB
FIREBASE_SERVICE_ACCOUNT_DEV_CAJA_MOBILE
FIREBASE_SERVICE_ACCOUNT_STAGING_NEGOCIO_WEB
```

### **Current App Configuration**

For the Vendemás Landing Web app:

- **App Name**: `vendemas-landing-web`
- **Firebase Project**: `bistreet-cd883`
- **Recommended Secret Name**: `VENDEMAS_LANDING_WEB_PROD_FIREBASE_TOKEN`

## 🔧 Setup Instructions

### 1. Create Service Account

1. **Go to Firebase Console**: https://console.firebase.google.com
2. **Select your project**: `bistreet-cd883`
3. **Go to Project Settings** (gear icon)
4. **Navigate to Service Accounts tab**
5. **Click "Generate new private key"**
6. **Download the JSON file**

### 2. Add Service Account to GitHub Secrets

1. **Go to your GitHub repository**
2. **Navigate to Settings → Secrets and variables → Actions**
3. **Click "New repository secret"**
4. **Add the secret:**
   - **Name**: `VENDEMAS_LANDING_WEB_PROD_FIREBASE_TOKEN` (or your preferred pattern)
   - **Value**: Copy the entire content of the downloaded JSON file

### 3. Update CI/CD Workflow

Replace the current Firebase deployment step with service account authentication:

```yaml
- name: Deploy to Firebase App Hosting (Production)
  run: firebase deploy --only apphosting --project ${{ env.FIREBASE_PROJECT }}
  env:
    GOOGLE_APPLICATION_CREDENTIALS: ${{ secrets.VENDEMAS_LANDING_WEB_PROD_FIREBASE_TOKEN }}
    NODE_ENV: production
```

## 🔄 Migration Steps

### Step 1: Update Workflow File

Update `.github/workflows/vendemas-landing-prod.yml`:

```yaml
- name: Deploy to Firebase App Hosting (Production)
  run: |
    echo '${{ secrets.VENDEMAS_LANDING_WEB_PROD_FIREBASE_TOKEN }}' > /tmp/firebase-service-account.json
    export GOOGLE_APPLICATION_CREDENTIALS=/tmp/firebase-service-account.json
    firebase deploy --only apphosting --project ${{ env.FIREBASE_PROJECT }}
  env:
    NODE_ENV: production
```

### Step 2: Remove Old Token

Once the service account is working, you can remove the old generic `FIREBASE_TOKEN` secret.

## 🛡️ Security Best Practices

### Service Account Permissions

1. **Minimal Permissions**: Only grant necessary permissions
2. **Project-Specific**: Use project-specific service accounts
3. **Regular Rotation**: Rotate service account keys regularly

### Required Permissions

The service account needs these roles:

- **Firebase Hosting Admin**
- **Cloud Run Admin** (for App Hosting)
- **Service Account User**

## 🔍 Troubleshooting

### Common Issues

1. **Permission Denied**
   - Check service account permissions
   - Verify project ID is correct

2. **Authentication Failed**
   - Ensure JSON file is properly formatted
   - Check secret is correctly set in GitHub

3. **Project Not Found**
   - Verify project ID in workflow
   - Check service account has access to project

## 📚 References

- [Firebase Service Account Documentation](https://firebase.google.com/docs/admin/setup#initialize-sdk)
- [Google Cloud IAM Documentation](https://cloud.google.com/iam/docs/service-accounts)
- [GitHub Actions Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

## 🔄 Current Status

- ⏳ **Token Generation**: Pending
- ⏳ **Service Account Setup**: Pending
- ⏳ **Workflow Update**: Pending

---

**Next Steps**:

1. Generate a new Firebase token using `firebase login:ci`
2. Add the token to GitHub secrets with the new naming convention
3. Set up service account for long-term solution
4. Update workflow to use service account authentication
