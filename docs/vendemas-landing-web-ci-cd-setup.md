# VendeMás Landing Web - FAANG-Grade CI/CD Pipeline

This document outlines the comprehensive CI/CD pipeline setup for the `vendemas-landing-web` application, designed to meet FAANG-level engineering standards.

## 🚀 Pipeline Overview

The CI/CD pipeline implements industry-leading practices including:

- **Nx Affected Commands**: Only run tasks on changed projects
- **Self-Healing CI**: AI-powered failure detection and automatic fixes
- **Remote Caching**: Nx Cloud for build acceleration
- **Security Scanning**: Dependency vulnerability analysis
- **Performance Monitoring**: Core Web Vitals and Lighthouse CI
- **Zero-Downtime Deployment**: Blue-green deployment to Vercel

## 📋 Pipeline Steps

### 1. Setup & Cache

- Environment preparation with Node.js 20 and pnpm
- Nx Cloud integration for distributed task execution
- Intelligent caching for dependencies and build artifacts
- Affected project detection using `nrwl/nx-set-shas`

### 2. Security Scan

- **pnpm audit**: Dependency vulnerability scanning
- **Snyk**: Advanced security analysis with SARIF reporting
- **CodeQL**: GitHub's semantic code analysis
- **Fail-fast**: Pipeline stops on high-severity vulnerabilities

### 3. Code Quality

- **ESLint**: Code quality and style enforcement
- **Prettier**: Code formatting consistency
- **TypeScript**: Type checking and compilation validation
- **Parallel execution**: Optimized for speed

### 4. Unit Tests

- **Vitest**: Fast unit testing with coverage reporting
- **Codecov**: Coverage tracking and reporting
- **Parallel execution**: 3 concurrent test runners
- **Affected testing**: Only test changed projects

### 5. E2E Tests

- **Playwright**: Cross-browser end-to-end testing
- **Sharded execution**: 3 parallel test shards
- **Visual regression**: Screenshot comparison
- **Performance testing**: Load time and interaction testing

### 6. Build

- **Production optimization**: Tree-shaking, minification, code splitting
- **Artifact caching**: Build output preservation
- **Parallel builds**: Multiple projects built simultaneously
- **Dependency validation**: Ensures all dependencies are built

### 7. Performance Audit

- **Lighthouse CI**: Core Web Vitals measurement
- **Performance budgets**: Enforced performance targets
- **Accessibility audit**: WCAG compliance checking
- **SEO validation**: Search engine optimization checks

### 8. Deploy to Vercel

- **Zero-downtime**: Blue-green deployment strategy
- **Preview URLs**: Automatic PR preview generation
- **Environment management**: Production and staging separation
- **Rollback capability**: Quick rollback on issues

### 9. Post-Deploy Verification

- **Smoke tests**: Critical functionality validation
- **Health checks**: Application health monitoring
- **Performance validation**: Post-deploy performance verification
- **Monitoring integration**: Real-time alerting

### 10. Self-Healing CI

- **AI-powered analysis**: Automatic failure diagnosis
- **Fix generation**: Automated fix proposals
- **Editor integration**: VS Code/Cursor notifications
- **GitHub integration**: PR comment notifications

## 🔧 Configuration Requirements

### Required GitHub Secrets

```bash
# Nx Cloud (for caching and self-healing)
NX_CLOUD_ACCESS_TOKEN=your_nx_cloud_token

# Vercel Deployment
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_vercel_org_id
VERCEL_PROJECT_ID=your_vercel_project_id

# Security Scanning
SNYK_TOKEN=your_snyk_token

# Coverage Reporting
CODECOV_TOKEN=your_codecov_token
```

### Required Environment Variables

```bash
# Node.js and pnpm versions
NODE_VERSION=20
PNPM_VERSION=8.15.0

# Nx Cloud configuration
NX_CLOUD_ACCESS_TOKEN=${NX_CLOUD_ACCESS_TOKEN}

# Vercel configuration
VERCEL_TOKEN=${VERCEL_TOKEN}
VERCEL_ORG_ID=${VERCEL_ORG_ID}
VERCEL_PROJECT_ID=${VERCEL_PROJECT_ID}
```

## 🛠️ Setup Instructions

### 1. Nx Cloud Setup

```bash
# Connect to Nx Cloud
npx nx connect

# Get your access token from the Nx Cloud dashboard
# Add it to GitHub secrets as NX_CLOUD_ACCESS_TOKEN
```

### 2. Vercel Setup

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
cd apps/vendemas-landing-web
vercel link

# Get your project ID and org ID
vercel project ls
vercel org ls

# Add tokens to GitHub secrets
```

### 3. Security Tools Setup

```bash
# Snyk setup
npm install -g snyk
snyk auth

# Get your Snyk token and add to GitHub secrets
```

### 4. Performance Monitoring Setup

```bash
# Lighthouse CI is already configured
# The .lighthouserc.json file contains performance budgets
# No additional setup required
```

## 📊 Performance Targets

### Core Web Vitals

- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms
- **Total Blocking Time (TBT)**: < 300ms
- **Speed Index**: < 2.0s

### Lighthouse Scores

- **Performance**: ≥ 90
- **Accessibility**: ≥ 95
- **Best Practices**: ≥ 90
- **SEO**: ≥ 90

### Build Performance

- **Incremental Build**: < 30s
- **Full Build**: < 2min
- **Test Execution**: < 60s
- **E2E Tests**: < 3min

## 🔒 Security Standards

### Dependency Security

- **Vulnerability scanning**: Every build
- **License compliance**: Automatic checking
- **Dependency updates**: Automated PRs
- **Security patches**: Immediate application

### Code Security

- **Static analysis**: ESLint security rules
- **Dynamic analysis**: Runtime security testing
- **Secret scanning**: Automatic detection
- **Access control**: Principle of least privilege

## 📈 Monitoring & Observability

### Metrics Collection

- **Build metrics**: Duration, success rate, cache hit rate
- **Test metrics**: Coverage, execution time, failure rate
- **Performance metrics**: Core Web Vitals, Lighthouse scores
- **Security metrics**: Vulnerability count, fix time

### Alerting

- **Build failures**: Immediate notification
- **Performance regressions**: Automated alerts
- **Security vulnerabilities**: High-priority alerts
- **Deployment issues**: Real-time monitoring

## 🚨 Troubleshooting

### Common Issues

#### Nx Cloud Connection

```bash
# Check Nx Cloud status
npx nx show projects --affected

# Verify token
echo $NX_CLOUD_ACCESS_TOKEN

# Reconnect if needed
npx nx disconnect
npx nx connect
```

#### Vercel Deployment

```bash
# Check Vercel status
vercel status

# Verify project linking
vercel project ls

# Check deployment logs
vercel logs
```

#### Performance Issues

```bash
# Run Lighthouse locally
npx lighthouse http://localhost:3000

# Check bundle size
npx nx build vendemas-landing-web --stats-json
npx webpack-bundle-analyzer dist/vendemas-landing-web/stats.json
```

### Debug Commands

```bash
# Check affected projects
npx nx affected:graph

# Run specific target
npx nx run vendemas-landing-web:build

# Check cache status
npx nx show projects --affected --verbose

# Clear cache
npx nx reset
```

## 📚 Best Practices

### Development Workflow

1. **Feature branches**: Create from `develop`
2. **Small PRs**: Keep changes focused and reviewable
3. **Test coverage**: Maintain >80% coverage
4. **Performance budgets**: Don't exceed targets
5. **Security first**: Address vulnerabilities immediately

### CI/CD Optimization

1. **Cache everything**: Dependencies, build artifacts, test results
2. **Parallel execution**: Use matrix strategies
3. **Fail fast**: Stop on first failure
4. **Monitor metrics**: Track build times and success rates
5. **Regular updates**: Keep dependencies current

### Deployment Strategy

1. **Blue-green**: Zero-downtime deployments
2. **Feature flags**: Gradual rollouts
3. **Monitoring**: Real-time health checks
4. **Rollback plan**: Quick recovery procedures
5. **Documentation**: Keep deployment docs current

## 🔄 Maintenance

### Regular Tasks

- **Weekly**: Review performance metrics
- **Monthly**: Update dependencies
- **Quarterly**: Review security posture
- **Annually**: Update performance budgets

### Monitoring

- **Build success rate**: Target >95%
- **Test coverage**: Maintain >80%
- **Performance scores**: Monitor for regressions
- **Security vulnerabilities**: Zero tolerance

## 📞 Support

For issues with the CI/CD pipeline:

1. **Check logs**: Review GitHub Actions logs
2. **Verify configuration**: Ensure all secrets are set
3. **Test locally**: Run commands locally first
4. **Document issues**: Create detailed bug reports
5. **Escalate**: Contact the DevOps team

---

**Last Updated**: January 2025
**Version**: 1.0.0
**Maintainer**: DevOps Team
