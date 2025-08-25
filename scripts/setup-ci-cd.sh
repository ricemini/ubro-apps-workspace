#!/bin/bash

# VendeMás Landing Web CI/CD Setup Script
# This script helps set up the FAANG-grade CI/CD pipeline

set -e

echo "🚀 Setting up VendeMás Landing Web CI/CD Pipeline"
echo "=================================================="

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

# Setup Nx Cloud
setup_nx_cloud() {
    print_status "Setting up Nx Cloud..."
    
    if [ -z "$NX_CLOUD_ACCESS_TOKEN" ]; then
        print_warning "NX_CLOUD_ACCESS_TOKEN not found in environment variables."
        print_status "Please run: npx nx connect"
        print_status "Then add the token to your GitHub secrets as NX_CLOUD_ACCESS_TOKEN"
    else
        print_success "Nx Cloud token found!"
    fi
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

# Setup security tools
setup_security() {
    print_status "Setting up security tools..."
    
    # Install Snyk if not present
    if ! command -v snyk &> /dev/null; then
        print_status "Installing Snyk..."
        npm install -g snyk
    fi
    
    if [ -z "$SNYK_TOKEN" ]; then
        print_warning "SNYK_TOKEN not found in environment variables."
        print_status "Please run: snyk auth"
        print_status "Then add the token to your GitHub secrets as SNYK_TOKEN"
    else
        print_success "Snyk token found!"
    fi
}

# Setup performance monitoring
setup_performance() {
    print_status "Setting up performance monitoring..."
    
    # Install Lighthouse CI if not present
    if ! command -v lhci &> /dev/null; then
        print_status "Installing Lighthouse CI..."
        npm install -g @lhci/cli@0.12.x
    fi
    
    print_success "Performance monitoring tools installed!"
}

# Create GitHub secrets template
create_secrets_template() {
    print_status "Creating GitHub secrets template..."
    
    cat > .github-secrets-template.md << 'EOF'
# GitHub Secrets Template

Add these secrets to your GitHub repository settings:

## Required Secrets

### Nx Cloud
- **Name**: `NX_CLOUD_ACCESS_TOKEN`
- **Value**: Your Nx Cloud access token
- **How to get**: Run `npx nx connect` and copy the token

### Vercel
- **Name**: `VERCEL_TOKEN`
- **Value**: Your Vercel API token
- **How to get**: Run `vercel login` and copy the token

- **Name**: `VERCEL_ORG_ID`
- **Value**: Your Vercel organization ID
- **How to get**: Run `vercel org ls` and copy the org ID

- **Name**: `VERCEL_PROJECT_ID`
- **Value**: Your Vercel project ID
- **How to get**: Run `vercel project ls` and copy the project ID

### Security
- **Name**: `SNYK_TOKEN`
- **Value**: Your Snyk API token
- **How to get**: Run `snyk auth` and copy the token

### Coverage (Optional)
- **Name**: `CODECOV_TOKEN`
- **Value**: Your Codecov token
- **How to get**: Sign up at codecov.io and get your token

## How to Add Secrets

1. Go to your GitHub repository
2. Click on "Settings"
3. Click on "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. Add each secret with the name and value above
EOF

    print_success "GitHub secrets template created: .github-secrets-template.md"
}

# Test the setup
test_setup() {
    print_status "Testing the setup..."
    
    # Test Nx commands
    print_status "Testing Nx affected commands..."
    npx nx affected:graph --file=affected-graph.html
    
    # Test build
    print_status "Testing build..."
    npx nx build vendemas-landing-web --dry-run
    
    # Test tests
    print_status "Testing unit tests..."
    npx nx test vendemas-landing-web --dry-run
    
    # Test E2E tests
    print_status "Testing E2E tests..."
    npx nx e2e vendemas-landing-web-e2e --dry-run
    
    print_success "Setup test completed successfully!"
}

# Main execution
main() {
    echo ""
    print_status "Starting CI/CD setup..."
    
    check_requirements
    setup_nx_cloud
    setup_vercel
    setup_security
    setup_performance
    create_secrets_template
    test_setup
    
    echo ""
    print_success "CI/CD setup completed successfully!"
    echo ""
    print_status "Next steps:"
    echo "1. Add the required secrets to your GitHub repository"
    echo "2. Push your changes to trigger the first CI run"
    echo "3. Monitor the pipeline in GitHub Actions"
    echo "4. Check the documentation at docs/vendemas-landing-web-ci-cd-setup.md"
    echo ""
    print_warning "Don't forget to add the GitHub secrets before pushing!"
}

# Run main function
main "$@"
