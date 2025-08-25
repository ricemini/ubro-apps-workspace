# VendeMás Landing Web - Simple CI/CD Pipeline

This document outlines the **simple and practical** CI/CD pipeline setup for the `vendemas-landing-web` application, designed for the current development stage.

## 🚀 Current Pipeline Overview

The current CI/CD pipeline implements **essential practices** for your development stage:

- **Nx Affected Commands**: Only run tasks on changed projects
- **Basic Caching**: Nx cache for build acceleration
- **Simple Deployment**: Direct deployment to Vercel
- **Code Quality**: Basic linting and building

## 📋 Current Pipeline Steps

### 1. Build & Test

- Environment preparation with Node.js 20 and pnpm
- Intelligent caching for dependencies and build artifacts
- Linting with ESLint
- Production build with Next.js

### 2. Deploy to Vercel

- **Zero-downtime**: Blue-green deployment strategy
- **Preview URLs**: Automatic PR preview generation
- **Environment management**: Production deployments

## 🔧 Configuration Requirements

### Required GitHub Secrets

```bash
# Vercel Deployment (Only these are needed for now)
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=team_l9jyr5yrGPLrTal47hEE1uuq
VERCEL_PROJECT_ID=prj_Ht3KzxBsYLYxxJRXcaclSdizoZ04
```

### Optional Secrets (For Future Use)

```bash
# These are NOT needed for the current simple pipeline
# NX_CLOUD_ACCESS_TOKEN=your_nx_cloud_token
# SNYK_TOKEN=your_snyk_token
# CODECOV_TOKEN=your_codecov_token
```

## 🛠️ Setup Instructions

### 1. Vercel Setup (Required)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Link your project
cd apps/vendemas-landing-web
vercel link --yes

# Add tokens to GitHub secrets
```

### 2. Test the Pipeline

```bash
# Test build locally
npx nx build vendemas-landing-web

# Test lint locally
npx nx lint vendemas-landing-web

# Test serve locally
npx nx serve vendemas-landing-web
```

## 📊 Performance Targets

### Current Focus

- **Build Success**: ✅ Ensures code compiles
- **Lint Pass**: ✅ Ensures code quality
- **Deploy Success**: ✅ Ensures deployment works

### Future Targets (When You Scale)

- **Performance**: Core Web Vitals monitoring
- **Security**: Vulnerability scanning
- **Testing**: Unit and E2E test coverage

## 🔄 Migration Path

### When to Upgrade to FAANG-Grade Pipeline

**Current Simple Pipeline** → **FAANG-Grade Pipeline**

#### Upgrade Triggers:

- **10+ daily active users**
- **Multiple developers** working on the codebase
- **Revenue generation** (when downtime = lost money)
- **Security requirements** (handling user data)

#### Upgrade Steps:

1. **Enable Nx Cloud**: Add `NX_CLOUD_ACCESS_TOKEN`
2. **Add Security**: Add `SNYK_TOKEN`
3. **Add Testing**: Enable unit and E2E tests
4. **Add Performance**: Enable Lighthouse CI
5. **Add Self-Healing**: Enable Nx Cloud AI features

## 📚 FAANG-Grade Pipeline Documentation

For reference, the **FAANG-grade pipeline** is available in:

- **Backup File**: `.github/workflows/vendemas-landing-web-ci-faang-backup.yml`
- **Documentation**: `docs/ci-cd-pipeline-summary.md`

### FAANG-Grade Features (For Future Use):

- **Self-Healing CI**: AI-powered failure detection and fixes
- **Security Scanning**: Dependency vulnerability analysis
- **Performance Monitoring**: Core Web Vitals and Lighthouse CI
- **Advanced Testing**: Sharded E2E tests and coverage reporting
- **Distributed Execution**: Nx Cloud for build acceleration

## 🚨 Troubleshooting

### Common Issues

#### Build Failures

```bash
# Check build locally
npx nx build vendemas-landing-web

# Check for dependency issues
pnpm install --frozen-lockfile
```

#### Lint Failures

```bash
# Fix lint issues locally
npx nx lint vendemas-landing-web

# Auto-fix when possible
npx nx lint vendemas-landing-web --fix
```

#### Deployment Issues

```bash
# Check Vercel status
vercel status

# Verify project linking
vercel project ls
```

## 📞 Support

For issues with the CI/CD pipeline:

1. **Check logs**: Review GitHub Actions logs
2. **Verify configuration**: Ensure Vercel secrets are set
3. **Test locally**: Run commands locally first
4. **Document issues**: Create detailed bug reports

## 🎯 Best Practices

### Development Workflow

1. **Feature branches**: Create from develop branch
2. **Small PRs**: Keep changes focused and reviewable
3. **Test locally**: Always test before pushing
4. **Monitor deployments**: Check deployment status

### CI/CD Optimization

1. **Keep it simple**: Don't over-engineer for your current stage
2. **Focus on reliability**: Ensure builds and deployments work
3. **Monitor metrics**: Track build times and success rates
4. **Upgrade gradually**: Add complexity as you scale

---

**Current Pipeline**: ✅ Simple & Practical
**FAANG-Grade Pipeline**: 🔄 Available for future use
**Last Updated**: January 2025
**Version**: 1.0.0 (Simple)
**Maintainer**: DevOps Team
