# CI/CD Quick Reference Card

## 🚀 Pipeline Overview

```
Setup & Affected Detection → [Lint + Test] (parallel) → Build → Deploy
```

## 📋 Essential Commands

### Local Testing
```bash
# Test specific app
npx nx run vendemas-landing-web:test

# Test with verbose output
npx vitest run --reporter=verbose

# Test without Nx Cloud
NX_CLOUD_ACCESS_TOKEN="" npx nx run vendemas-landing-web:test --skip-nx-cache

# Lint specific app
npx nx run vendemas-landing-web:lint

# Build specific app
npx nx run vendemas-landing-web:build
```

### Nx Commands
```bash
# Check affected projects
npx nx show projects --affected --plain

# View project graph
npx graph

# Reset cache
npx reset
```

### Debugging
```bash
# Check Nx Cloud status
npx nx connect

# View detailed build info
npx nx run vendemas-landing-web:build --verbose

# Check test configuration
npx vitest --config apps/vendemas-landing-web/vitest.config.ts --run
```

## 🔧 Environment Variables

### GitHub Secrets Required
- `NX_CLOUD_ACCESS_TOKEN` - Nx Cloud CI token (read-write)
- `VERCEL_TOKEN` - Vercel deployment token
- `VERCEL_ORG_ID` - Vercel organization ID
- `VERCEL_PROJECT_ID` - Vercel project ID

### Vercel Environment Variables
- `NX_CLOUD_ACCESS_TOKEN` - Same as GitHub secret

## 🚨 Common Issues

### 1. Nx Cloud Token Error
```
Invalid Nx Cloud access token. Token: process.env.NX_CLOUD_ACCESS_TOKEN. (code: 401)
```
**Fix:** Generate CI access token (read-write) in Nx Cloud Dashboard

### 2. Test Environment Error
```
A React Element from an older version of React was rendered
```
**Fix:** Use `environment: 'jsdom'` in vitest config, simplify tests

### 3. Vercel Deployment Error
```
Error: The file "/vercel/path0/dist/vendemas-landing-web/routes-manifest.json" couldn't be found
```
**Fix:** Use `output: 'standalone'` in Next.js config, prepare `.vercel/output` structure

### 4. Pipeline Not Triggering
**Fix:** Check path filters in workflow, ensure files are in monitored paths

## 📁 Key Files

| File | Purpose |
|------|---------|
| `.github/workflows/vendemas-landing-web-ci.yml` | Main CI/CD pipeline |
| `vercel.json` | Vercel deployment config |
| `nx.json` | Nx workspace config |
| `vitest.config.ts` | Root test config |
| `apps/vendemas-landing-web/vitest.config.ts` | App-specific test config |

## 🎯 Performance Tips

1. **Parallel Jobs**: Lint and test run simultaneously
2. **Caching**: pnpm store and Nx cache are preserved
3. **Affected Only**: Only builds changed projects and dependencies
4. **Prebuilt Deploy**: Uses existing artifacts for faster deployment

## 📞 Support

- **Full Documentation**: [CI/CD Pipeline Reference](ci-cd-pipeline-reference.md)
- **Nx Cloud**: https://cloud.nx.app
- **GitHub Actions**: Repository → Actions tab
- **Vercel**: https://vercel.com/dashboard

---

**Last Updated:** August 2024  
**Version:** 1.0
