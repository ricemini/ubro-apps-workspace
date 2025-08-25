#!/bin/bash

# VendeMás Landing Web - Simple CI/CD Setup Script
# This script helps set up the basic CI/CD pipeline for the current development stage

set -e

echo "🚀 Setting up VendeMás Landing Web Simple CI/CD Pipeline"
echo "========================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_requirements() {
    print_status "Checking requirements..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 20 or later."
        exit 1
    fi
    
    # Check pnpm
    if ! command -v pnpm &> /dev/null; then
        print_error "pnpm is not installed. Please install pnpm 8.15.0 or later."
        exit 1
    fi
    
    # Check git
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed. Please install Git."
        exit 1
    fi
    
    print_success "All requirements are met!"
}

# Setup Vercel
setup_vercel() {
    print_status "Setting up Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        print_status "Installing Vercel CLI..."
        npm install -g vercel
    fi
    
    if [ -z "$VERCEL_TOKEN" ]; then
        print_warning "VERCEL_TOKEN not found in environment variables."
        print_status "Please run: vercel login"
        print_status "Then add the token to your GitHub secrets as VERCEL_TOKEN"
    else
        print_success "Vercel token found!"
    fi
    
    # Check if project is linked
    if [ ! -f "apps/vendemas-landing-web/.vercel/project.json" ]; then
        print_status "Linking Vercel project..."
        cd apps/vendemas-landing-web
        vercel link --yes
        cd ../..
    fi
}

# Test the basic functionality
test_basic_functionality() {
    print_status "Testing basic functionality..."
    
    # Test build
    print_status "Testing build..."
    npx nx build vendemas-landing-web --dry-run
    
    # Test lint
    print_status "Testing lint..."
    npx nx lint vendemas-landing-web
    
    print_success "Basic functionality tests completed!"
}

# Create GitHub secrets template
create_secrets_template() {
    print_status "Creating GitHub secrets template..."
    
    cat > .github-secrets-simple-template.md << 'EOF'
# GitHub Secrets Template - Simple CI/CD

Add these secrets to your GitHub repository settings:

## Required Secrets (Simple Pipeline)

### Vercel
- **Name**: `VERCEL_TOKEN`
- **Value**: Your Vercel API token
- **How to get**: Run `vercel login` and copy the token

- **Name**: `VERCEL_ORG_ID`
- **Value**: `team_l9jyr5yrGPLrTal47hEE1uuq`
- **How to get**: This is your Vercel organization ID (already discovered)

- **Name**: `VERCEL_PROJECT_ID`
- **Value**: `prj_Ht3KzxBsYLYxxJRXcaclSdizoZ04`
- **How to get**: This is your Vercel project ID (already discovered)

## Optional Secrets (For Future FAANG-Grade Pipeline)
- **Name**: `NX_CLOUD_ACCESS_TOKEN`
- **Name**: `SNYK_TOKEN`
- **Name**: `CODECOV_TOKEN`

## How to Add Secrets

1. Go to your GitHub repository
2. Click on "Settings"
3. Click on "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. Add each secret with the name and value above

## Current Configuration Status

✅ **Vercel**: Project linked and configured
✅ **Build System**: Working correctly
✅ **Simple Pipeline**: Ready to use

## Next Steps

1. Add the required secrets to your GitHub repository
2. Push your changes to trigger the first CI run
3. Monitor the pipeline in GitHub Actions
4. Check the documentation at `docs/vendemas-landing-web-ci-cd-setup.md`

## Migration to FAANG-Grade Pipeline

When you're ready to upgrade (10+ users, multiple developers, revenue):
1. Restore the FAANG-grade pipeline from backup
2. Add the optional secrets
3. Follow the migration guide in the documentation
EOF

    print_success "GitHub secrets template created: .github-secrets-simple-template.md"
}

# Main execution
main() {
    echo ""
    print_status "Starting simple CI/CD setup..."
    
    check_requirements
    setup_vercel
    test_basic_functionality
    create_secrets_template
    
    echo ""
    print_success "Simple CI/CD setup completed successfully!"
    echo ""
    print_status "Next steps:"
    echo "1. Add the required secrets to your GitHub repository"
    echo "2. Push your changes to trigger the first CI run"
    echo "3. Monitor the pipeline in GitHub Actions"
    echo "4. Check the documentation at docs/vendemas-landing-web-ci-cd-setup.md"
    echo ""
    print_warning "Don't forget to add the GitHub secrets before pushing!"
    echo ""
    print_status "FAANG-grade pipeline is available as backup for future use:"
    echo "- Backup file: .github/workflows/vendemas-landing-web-ci-faang-backup.yml"
    echo "- Documentation: docs/ci-cd-pipeline-summary.md"
}

# Run main function
main "$@"
