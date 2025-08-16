# Monorepo Constraint Tags

## Overview

This document covers the monorepo constraint tags system implemented in the VendeMás ecosystem. Constraint tags enforce architectural boundaries, prevent circular dependencies, and ensure proper project organization through Nx's built-in constraint checking.

## Constraint System Architecture

### **Tag Categories**

The constraint system uses a hierarchical tagging approach with multiple dimensions:

#### **Scope Tags**

- `scope:app` - Application projects (mobile, web)
- `scope:shared` - Shared utility libraries
- `scope:design` - Design system libraries
- `scope:auth` - Authentication libraries
- `scope:api` - API client libraries
- `scope:types` - Type definition libraries
- `scope:utils` - Utility function libraries

#### **Type Tags**

- `type:app` - Main application projects
- `type:lib` - Library projects
- `type:e2e` - End-to-end testing projects

#### **Platform Tags**

- `platform:mobile` - Mobile applications (Ionic/Capacitor)
- `platform:web` - Web applications (Angular, Next.js)

#### **Role Tags**

- `role:caja` - Staff/POS operator applications
- `role:negocio` - Business owner applications
- `role:landing` - Marketing/landing applications
- `role:admin` - Administrative applications

#### **Framework Tags**

- `framework:angular` - Angular-based projects
- `framework:nextjs` - Next.js-based projects
- `framework:playwright` - Playwright testing projects
- `framework:agnostic` - Framework-independent libraries

#### **Category Tags**

- `category:styles` - Styling and CSS libraries
- `category:design` - Design system components
- `category:i18n` - Internationalization libraries

#### **Domain Tags**

- `domain:design-system` - Design system related
- `domain:internationalization` - i18n related

## Constraint Rules

### **1. VendeMás Apps Constraints**

#### **Application Dependency Rules**

```json
{
  "vendemas-apps": {
    "rules": [
      {
        "sourceTag": "scope:app",
        "onlyDependOnLibsWithTags": [
          "scope:shared",
          "scope:design",
          "scope:auth",
          "scope:api"
        ]
      },
      {
        "sourceTag": "scope:app",
        "notDependOnLibsWithTags": ["scope:internal", "scope:test"]
      }
    ]
  }
}
```

#### **What This Means**

- **Apps can only depend on**: Shared, design, auth, and API libraries
- **Apps cannot depend on**: Internal or test-only libraries
- **Apps cannot depend on other apps**: Prevents circular dependencies

### **2. VendeMás Libraries Constraints**

#### **Library Dependency Rules**

```json
{
  "vendemas-libs": {
    "rules": [
      {
        "sourceTag": "scope:shared",
        "onlyDependOnLibsWithTags": ["scope:types", "scope:utils"]
      },
      {
        "sourceTag": "scope:design",
        "onlyDependOnLibsWithTags": ["scope:types", "scope:utils"]
      },
      {
        "sourceTag": "scope:auth",
        "onlyDependOnLibsWithTags": ["scope:types", "scope:utils", "scope:api"]
      },
      {
        "sourceTag": "scope:api",
        "onlyDependOnLibsWithTags": ["scope:types", "scope:utils"]
      },
      {
        "sourceTag": "scope:types",
        "notDependOnLibsWithTags": [
          "scope:app",
          "scope:shared",
          "scope:design",
          "scope:auth",
          "scope:api"
        ]
      },
      {
        "sourceTag": "scope:utils",
        "notDependOnLibsWithTags": [
          "scope:app",
          "scope:shared",
          "scope:design",
          "scope:auth",
          "scope:api"
        ]
      }
    ]
  }
}
```

#### **What This Means**

- **Shared libraries** can only depend on types and utils
- **Design libraries** can only depend on types and utils
- **Auth libraries** can depend on types, utils, and API
- **API libraries** can only depend on types and utils
- **Types and utils** are foundational and cannot depend on higher-level libraries

### **3. VendeMás Architecture Constraints**

#### **Project Type Rules**

```json
{
  "vendemas-architecture": {
    "rules": [
      {
        "sourceTag": "type:app",
        "onlyDependOnLibsWithTags": ["type:lib"]
      },
      {
        "sourceTag": "type:lib",
        "notDependOnLibsWithTags": ["type:app"]
      },
      {
        "sourceTag": "type:e2e",
        "onlyDependOnLibsWithTags": ["type:app", "type:lib"]
      }
    ]
  }
}
```

#### **What This Means**

- **Applications** can only depend on libraries
- **Libraries** cannot depend on applications
- **E2E tests** can depend on both apps and libs

## Project Tagging Examples

### **1. Application Projects**

#### **Mobile App (Caja Mobile)**

```json
{
  "tags": [
    "scope:app",
    "type:app",
    "platform:mobile",
    "role:caja",
    "framework:angular"
  ]
}
```

#### **Web App (Negocio Web)**

```json
{
  "tags": [
    "scope:app",
    "type:app",
    "platform:web",
    "role:negocio",
    "framework:angular"
  ]
}
```

#### **Landing Page (Landing Web)**

```json
{
  "tags": [
    "scope:app",
    "type:app",
    "platform:web",
    "role:landing",
    "framework:nextjs"
  ]
}
```

### **2. Library Projects**

#### **Shared Styles Library**

```json
{
  "tags": [
    "scope:shared",
    "type:lib",
    "category:styles",
    "domain:design-system",
    "framework:agnostic"
  ]
}
```

#### **Shared Design Library**

```json
{
  "tags": [
    "scope:design",
    "type:lib",
    "category:design",
    "domain:design-system",
    "framework:agnostic"
  ]
}
```

#### **Shared i18n Library**

```json
{
  "tags": [
    "scope:shared",
    "type:lib",
    "category:i18n",
    "domain:internationalization",
    "framework:agnostic"
  ]
}
```

### **3. E2E Testing Projects**

#### **Mobile App E2E**

```json
{
  "tags": [
    "scope:app",
    "type:e2e",
    "platform:mobile",
    "role:caja",
    "framework:playwright"
  ]
}
```

#### **Web App E2E**

```json
{
  "tags": [
    "scope:app",
    "type:e2e",
    "platform:web",
    "role:negocio",
    "framework:playwright"
  ]
}
```

## Dependency Flow

### **Allowed Dependency Patterns**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   scope:app     │───▶│  scope:shared   │───▶│  scope:types    │
│   type:app      │    │   type:lib      │    │   type:lib      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   scope:design  │───▶│  scope:types    │    │  scope:utils    │
│   type:lib      │    │   type:lib      │    │   type:lib      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   scope:auth    │───▶│  scope:api      │───▶│  scope:types    │
│   type:lib      │    │   type:lib      │    │   type:lib      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **Forbidden Dependency Patterns**

```
❌ Apps depending on other apps
❌ Libraries depending on apps
❌ Higher-level libraries depending on lower-level ones
❌ Circular dependencies between any projects
```

## Constraint Enforcement

### **1. Nx Constraint Checking**

#### **Check All Constraints**

```bash
# Check all constraint rules
nx run-many --target=lint --all

# Check specific project constraints
nx lint vendemas-caja-mobile
nx lint vendemas-shared-styles
```

#### **Constraint Validation**

```bash
# Validate project graph constraints
nx graph --file=project-graph.html

# Check for constraint violations
nx graph --focus=vendemas-caja-mobile
```

### **2. CI/CD Integration**

#### **Pre-commit Hooks**

```json
// .husky/pre-commit
#!/bin/sh
nx run-many --target=lint --all
nx graph --file=project-graph.html
```

#### **GitHub Actions**

```yaml
# .github/workflows/constraints.yml
name: Constraint Validation
on: [push, pull_request]
jobs:
  constraints:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: nx run-many --target=lint --all
      - run: nx graph --file=project-graph.html
```

## Adding New Projects

### **1. Project Creation with Tags**

#### **Angular Application**

```bash
nx g @nx/angular:application \
  --name=vendemas-admin-web \
  --directory=apps/vendemas-admin-web \
  --tags="scope:app,type:app,platform:web,role:admin,framework:angular"
```

#### **Next.js Application**

```bash
nx g @nx/next:application \
  --name=vendemas-website \
  --directory=apps/vendemas-website \
  --tags="scope:app,type:app,platform:web,role:website,framework:nextjs"
```

#### **Shared Library**

```bash
nx g @nx/js:library \
  --name=vendemas-shared-ui \
  --directory=libs/vendemas-shared-ui \
  --tags="scope:shared,type:lib,category:ui,domain:components,framework:agnostic"
```

### **2. Manual Tag Addition**

#### **Update project.json**

```json
{
  "name": "vendemas-new-project",
  "tags": [
    "scope:app",
    "type:app",
    "platform:web",
    "role:new-role",
    "framework:angular"
  ]
}
```

#### **Update nx.json Constraints**

```json
{
  "constraints": {
    "vendemas-apps": {
      "rules": [
        {
          "sourceTag": "scope:new-role",
          "onlyDependOnLibsWithTags": ["scope:shared", "scope:design"]
        }
      ]
    }
  }
}
```

## Troubleshooting Constraints

### **1. Common Constraint Violations**

#### **App Depending on App**

```bash
# Error: Project 'vendemas-caja-mobile' cannot depend on 'vendemas-negocio-web'
# Solution: Use shared libraries for common functionality
```

#### **Library Depending on App**

```bash
# Error: Project 'vendemas-shared-ui' cannot depend on 'vendemas-caja-mobile'
# Solution: Move shared logic to appropriate library scope
```

#### **Circular Dependencies**

```bash
# Error: Circular dependency detected
# Solution: Refactor to use dependency injection or shared interfaces
```

### **2. Constraint Resolution**

#### **Identify Violations**

```bash
# Check project dependencies
nx show project vendemas-caja-mobile

# Check project graph
nx graph --focus=vendemas-caja-mobile
```

#### **Resolve Violations**

1. **Move shared code** to appropriate libraries
2. **Use dependency injection** instead of direct imports
3. **Create interfaces** for cross-project communication
4. **Refactor architecture** to eliminate circular dependencies

## Best Practices

### **1. Tag Naming Conventions**

#### **Consistent Tagging**

- ✅ **Use descriptive tags** that clearly indicate purpose
- ✅ **Follow established patterns** for similar projects
- ✅ **Use lowercase with hyphens** for tag values
- ✅ **Group related tags** logically

#### **Tag Organization**

```typescript
// Recommended tag order
[
  'scope:app', // Primary scope
  'type:app', // Project type
  'platform:web', // Technical platform
  'role:negocio', // Business role
  'framework:angular', // Technology stack
];
```

### **2. Constraint Design**

#### **Layered Architecture**

- **Foundation Layer**: Types and utilities (no dependencies)
- **Core Layer**: Shared and design libraries
- **Feature Layer**: Auth and API libraries
- **Application Layer**: User-facing applications

#### **Dependency Direction**

```
Types/Utils ← Shared/Design ← Auth/API ← Applications
     ↑              ↑              ↑           ↑
  No deps      Basic deps    Feature deps  Full deps
```

### **3. Maintenance**

#### **Regular Validation**

- **Run constraint checks** before commits
- **Validate in CI/CD** pipeline
- **Review project graph** regularly
- **Update constraints** as architecture evolves

#### **Documentation**

- **Keep constraints** up-to-date with architecture
- **Document exceptions** and their rationale
- **Review constraints** during architecture reviews

## Future Enhancements

### **1. Advanced Constraints**

#### **Environment-based Constraints**

```json
{
  "sourceTag": "scope:app",
  "onlyDependOnLibsWithTags": ["scope:shared"],
  "when": "environment:production"
}
```

#### **Version-based Constraints**

```json
{
  "sourceTag": "framework:angular",
  "onlyDependOnLibsWithTags": ["framework:angular", "framework:agnostic"],
  "when": "version:>=17.0.0"
}
```

### **2. Automated Constraint Management**

#### **Constraint Generation**

```bash
# Future: Auto-generate constraints from project structure
nx g @vendemas/schematic:constraints --analyze
```

#### **Constraint Validation**

```bash
# Future: Advanced constraint validation
nx validate-constraints --strict --report
```

## Summary

The monorepo constraint tags system provides:

1. **🏗️ Architectural Enforcement** - Prevents improper dependencies
2. **🔒 Dependency Control** - Ensures clean project boundaries
3. **📊 Visual Clarity** - Clear project categorization and relationships
4. **🚫 Violation Prevention** - Catches issues before they become problems
5. **📈 Scalability** - Maintains clean architecture as projects grow

### **Key Benefits**

- **Prevents circular dependencies** between projects
- **Enforces layered architecture** principles
- **Improves code organization** and maintainability
- **Facilitates team collaboration** with clear boundaries
- **Enables automated validation** in CI/CD pipelines

---

_This constraint system ensures the VendeMás monorepo maintains clean architecture and prevents dependency issues as the ecosystem grows._
