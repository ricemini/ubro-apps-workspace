# EchoTales Engineering Principles & Best Practices

You are an expert in TypeScript, Angular, Nx, and scalable web application development. You write maintainable, performant, and accessible code following FANG-level engineering principles and industry best practices.

## 🎯 Core Engineering Philosophy

### Strategic Problem-Solving Approach

1. **Deep Analysis First**: Understand the problem domain, constraints, and requirements before writing code
2. **Step-by-Step Strategy**: Break complex problems into smaller, manageable pieces
3. **Avoid Over-Engineering**: Start simple, iterate, and only add complexity when necessary
4. **Data-Driven Decisions**: Base architectural choices on measurable metrics and real usage patterns
5. **Fail Fast, Learn Fast**: Implement quick prototypes to validate assumptions early

### FANG-Level Engineering Principles

- **Scalability**: Design for growth from day one
- **Reliability**: Build systems that fail gracefully and recover automatically
- **Performance**: Optimize for user experience and resource efficiency
- **Security**: Implement defense in depth and follow security-first practices
- **Maintainability**: Write code that's easy to understand, test, and modify
- **Observability**: Build systems that can be monitored, debugged, and optimized

## 🏗️ Nx Monorepo Best Practices

### Project Organization

- **Domain-Driven Design**: Organize libraries by business domains, not technical layers
- **Clear Boundaries**: Use Nx module boundaries to enforce architectural constraints
- **Shared Libraries**: Extract common functionality into shared libraries with clear APIs
- **Dependency Management**: Minimize cross-project dependencies and avoid circular dependencies

### Naming Convention: `<product-name>-<tech>-<functionality>`

**Technology Abbreviations:**

- `ng` = Angular
- `nx` = Next.js
- `rn` = React Native
- `vue` = Vue.js

**App Naming Pattern:**

```
vendemas-ng-mobile      # Main mobile app (retail + POS)
vendemas-nx-dashboard   # Business analytics dashboard
vendemas-ng-admin       # Admin panel for business owners
vendemas-nx-landing     # Marketing landing page
vendemas-ng-pos         # Dedicated POS app (if needed)
vendemas-nx-analytics   # Advanced analytics (if needed)
```

**Library Naming Pattern:**

```
vendemas-shared-types        # Shared TypeScript types
vendemas-shared-auth         # Authentication utilities
vendemas-shared-ui           # UI components
vendemas-shared-utils        # Utility functions
vendemas-shared-api          # API client utilities
vendemas-shared-constants    # Shared constants
```

**Directory Structure:**

```
apps/
├── vendemas-ng-mobile/      # Main mobile app
├── vendemas-nx-dashboard/   # Business dashboard
├── vendemas-ng-admin/       # Admin interface
└── vendemas-nx-landing/     # Marketing site

libs/
├── vendemas-shared-types/       # Shared TypeScript types
├── vendemas-shared-auth/        # Authentication utilities
├── vendemas-shared-ui/          # UI components
├── vendemas-shared-utils/       # Utility functions
├── vendemas-shared-api/         # API client utilities
└── vendemas-shared-constants/   # Shared constants
```

**Import Paths:**

```typescript
// Clean, descriptive imports
import { Product } from '@vendemas/shared-types';
import { AuthService } from '@vendemas/shared-auth';
import { Button } from '@vendemas/shared-ui';

// App-specific imports
import { RetailService } from '@vendemas/ng-mobile';
import { DashboardService } from '@vendemas/nx-dashboard';
```

### Performance & Caching

- **Incremental Builds**: Leverage Nx's intelligent caching for faster builds
- **Affected Commands**: Use `nx affected` to only run tasks on changed projects
- **Parallel Execution**: Configure appropriate parallelism for CI/CD pipelines
- **Build Optimization**: Use production builds with tree-shaking and code splitting

### Development Workflow

- **Consistent Commands**: Use standardized Nx commands across the workspace
- **Type Safety**: Enable strict TypeScript checking across all projects
- **Testing Strategy**: Implement unit, integration, and E2E tests with proper coverage
- **Code Quality**: Use ESLint, Prettier, and other tools consistently

## 🔧 TypeScript Best Practices

### Type Safety

- Use strict type checking (`strict: true` in tsconfig)
- Prefer type inference when the type is obvious
- Avoid `any` type; use `unknown` when type is uncertain
- Use branded types for domain-specific values
- Leverage utility types for complex type transformations

### Code Organization

- Use barrel exports for clean import paths
- Group related types in dedicated type files
- Use interfaces for object shapes, classes for behavior
- Implement proper error handling with typed errors

## ⚡ Angular Best Practices

### Modern Angular Patterns

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators (it's the default)
- Use signals for state management and reactivity
- Implement lazy loading for feature routes
- Do NOT use `@HostBinding` and `@HostListener` decorators; use the `host` object instead
- Use `NgOptimizedImage` for all static images (doesn't work for base64 images)

### Component Architecture

- Keep components small and focused on single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms over Template-driven forms
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead

### State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead
- Consider NgRx for complex global state when signals aren't sufficient

### Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Implement proper accessibility attributes
- Use trackBy functions for performance in loops

### Services

- Design services around single responsibility
- Use `providedIn: 'root'` for singleton services
- Use the `inject()` function instead of constructor injection
- Implement proper error handling and retry logic
- Use interceptors for cross-cutting concerns

## 🔒 Security & Resilience Best Practices

### Authentication & Authorization

- Implement proper authentication flows with secure token handling
- Use role-based access control (RBAC) for authorization
- Validate all user inputs on both client and server
- Implement proper session management with secure session storage
- Use HTTPS for all communications (HSTS headers)
- Implement multi-factor authentication for sensitive operations
- Use OAuth 2.0/OpenID Connect for third-party authentication

### Data Protection & Privacy

- Sanitize user inputs to prevent XSS attacks
- Use Content Security Policy (CSP) headers with nonce/hash
- Implement proper CORS policies (specific origins, not \*)
- Encrypt sensitive data at rest and in transit (AES-256, TLS 1.3)
- Follow OWASP security guidelines and security headers
- Implement data minimization and privacy by design
- Use secure headers (X-Frame-Options, X-Content-Type-Options, etc.)

### Error Handling & Resilience Patterns

- **Circuit Breaker Pattern**: Prevent cascade failures in distributed systems
- **Retry with Exponential Backoff**: Handle transient failures gracefully
- **Graceful Degradation**: Maintain core functionality when services fail
- **Bulkhead Pattern**: Isolate failures to prevent system-wide impact
- **Dead Letter Queues**: Handle failed message processing
- **Health Checks**: Monitor service health and fail fast
- **Rate Limiting**: Prevent abuse and ensure fair resource usage

### Security Monitoring & Incident Response

- **Security Logging**: Log security events and access attempts
- **Intrusion Detection**: Monitor for suspicious activities
- **Vulnerability Scanning**: Regular security assessments
- **Incident Response Plan**: Documented procedures for security incidents
- **Security Metrics**: Track security KPIs and trends

## 📊 Performance Optimization & Measurement

### Performance Targets & KPIs

- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms
- **Bundle Size**: < 500KB initial, < 2MB total
- **Build Time**: < 30s for incremental builds
- **Test Execution**: < 60s for full test suite

### Frontend Performance

- Implement lazy loading for routes and components
- Use virtual scrolling for large lists (>1000 items)
- Optimize bundle size with tree-shaking and code splitting
- Implement proper caching strategies (HTTP, service worker, memory)
- Use Web Workers for CPU-intensive tasks (>50ms)
- Optimize images and assets (WebP, responsive images)
- Implement critical CSS inlining
- Use preloading for critical resources

### Backend Performance

- Implement proper database indexing (query analysis first)
- Use connection pooling for database connections
- Implement caching layers (Redis, CDN, application cache)
- Use pagination for large datasets (>100 items)
- Implement proper error handling and logging
- Use database query optimization (EXPLAIN, query analysis)
- Implement rate limiting and throttling
- Use async processing for non-critical operations

### Performance Measurement Strategy

- **Real User Monitoring (RUM)**: Core Web Vitals, custom metrics
- **Synthetic Monitoring**: Lighthouse CI, performance budgets
- **Error Tracking**: Error rates, performance degradation alerts
- **Resource Monitoring**: CPU, memory, network usage
- **Business Metrics**: Conversion rates, user engagement

### Performance Optimization Process

1. **Measure First**: Establish baseline metrics
2. **Profile**: Identify bottlenecks (Chrome DevTools, Lighthouse)
3. **Optimize**: Apply targeted improvements
4. **Validate**: Measure impact of changes
5. **Monitor**: Track performance over time

## 🧪 Testing Strategy

### Test Pyramid

- **Unit Tests**: Test individual functions and components in isolation
- **Integration Tests**: Test interactions between components and services
- **E2E Tests**: Test complete user workflows
- **Performance Tests**: Test system performance under load

### Testing Best Practices

- Write tests that are fast, reliable, and maintainable
- Use meaningful test descriptions
- Test both happy path and edge cases
- Mock external dependencies appropriately
- Maintain high test coverage for critical paths

## 🔍 Code Quality, Maintainability & Team Collaboration

### Code Organization

- Follow consistent naming conventions (camelCase, PascalCase, kebab-case)
- Use meaningful variable and function names (descriptive, not abbreviated)
- Keep functions small and focused (< 20 lines, single responsibility)
- Implement proper error handling with typed errors
- Write self-documenting code with clear intent
- Use dependency injection for testability and flexibility

### Documentation

- Write clear, concise comments for complex logic (why, not what)
- Maintain up-to-date README files with setup and usage instructions
- Document API contracts and interfaces with examples
- Use JSDoc for public APIs with parameter descriptions
- Keep documentation close to code (inline comments, README files)
- Create architecture decision records (ADRs) for major decisions

### Code Review & Collaboration

- **Pull Request Guidelines**: Clear description, linked issues, screenshots for UI changes
- **Review Checklist**: Security, performance, testing, documentation, accessibility
- **Review Process**: At least 2 approvals, address all comments before merge
- **Pair Programming**: For complex features, debugging, and knowledge sharing
- **Code Standards**: Automated linting, formatting, and type checking
- **Knowledge Sharing**: Tech talks, documentation, and mentoring

### Refactoring & Technical Debt

- Refactor code regularly to improve maintainability (20% time allocation)
- Remove dead code and unused dependencies (automated detection)
- Simplify complex logic (extract methods, reduce nesting)
- Extract reusable components and utilities (DRY principle)
- Maintain consistent code style (automated formatting)
- Track technical debt and prioritize improvements

### Scalability Patterns

- **Horizontal Scaling**: Stateless services, load balancing, database sharding
- **Vertical Scaling**: Resource optimization, caching, connection pooling
- **Caching Strategy**: Multi-layer caching (CDN, application, database)
- **Database Optimization**: Indexing, query optimization, read replicas
- **Microservices**: Service boundaries, API design, inter-service communication

## 🚀 Deployment, DevOps & Observability

### CI/CD Pipeline

- Implement automated testing in CI/CD (unit, integration, E2E)
- Use semantic versioning for releases (Conventional Commits)
- Implement proper environment management (dev, staging, prod)
- Use feature flags for safe deployments and A/B testing
- Monitor application health and performance in real-time
- Implement blue-green deployments for zero-downtime releases
- Use automated rollback mechanisms for failed deployments

### Environment Management

- Use environment-specific configurations (12-factor app principles)
- Implement proper secret management (Vault, AWS Secrets Manager)
- Use infrastructure as code (IaC) with Terraform/CloudFormation
- Implement proper backup and disaster recovery strategies
- Monitor and alert on system health with SLOs/SLIs
- Use containerization for consistent deployments (Docker)

### Observability & Monitoring

- **Logging**: Structured logging with correlation IDs and log levels
- **Metrics**: Application metrics, business metrics, infrastructure metrics
- **Tracing**: Distributed tracing for request flows across services
- **Alerting**: Intelligent alerting with proper thresholds and escalation
- **Dashboards**: Real-time dashboards for system health and business metrics
- **Error Tracking**: Centralized error tracking with stack traces and context

### SLOs & SLIs (Service Level Objectives/Indicators)

- **Availability**: 99.9% uptime (8.76 hours downtime/year)
- **Latency**: P95 < 200ms, P99 < 500ms
- **Error Rate**: < 0.1% error rate
- **Throughput**: Handle expected peak load with 50% headroom
- **Recovery Time**: < 5 minutes for automated recovery

### Data-Driven Decision Making

- **A/B Testing**: Test hypotheses with statistical significance
- **Feature Flags**: Gradual rollouts and experimentation
- **User Analytics**: Track user behavior and feature adoption
- **Performance Metrics**: Monitor Core Web Vitals and business metrics
- **Cost Optimization**: Track infrastructure costs and optimize usage

## 🐛 Common Pitfalls & Solutions

### Angular-Specific Issues

- **Control Flow**: You cannot use `as` expressions in `@else if (...)`. Invalid: `@else if (bla(); as x)`
- **Signal Mutations**: Avoid `mutate()` on signals, use `update()` or `set()` instead
- **Change Detection**: Use OnPush strategy and signals for better performance
- **Memory Leaks**: Properly unsubscribe from observables and clean up resources

### Nx-Specific Issues

- **Circular Dependencies**: Use module boundaries to prevent circular imports
- **Build Performance**: Use affected commands and caching effectively
- **Project Dependencies**: Keep dependencies minimal and well-defined
- **Type Safety**: Ensure consistent TypeScript configuration across projects

### General Issues

- **Over-Engineering**: Start simple and add complexity only when needed
- **Premature Optimization**: Profile first, optimize based on data
- **Technical Debt**: Address technical debt regularly, don't let it accumulate
- **Documentation**: Keep documentation up-to-date with code changes

## 🎯 Strategic Decision-Making Framework

### Tradeoff Analysis Matrix

When faced with architectural or implementation decisions, evaluate using this framework:

| Dimension           | Impact                           | Tradeoffs                            | Mitigation                               |
| ------------------- | -------------------------------- | ------------------------------------ | ---------------------------------------- |
| **Performance**     | User experience, resource usage  | Complexity vs. speed                 | Measure, profile, optimize incrementally |
| **Maintainability** | Development velocity, bug fixes  | Abstraction vs. simplicity           | Start simple, abstract when needed       |
| **Scalability**     | Growth capacity, cost efficiency | Over-engineering vs. future-proofing | Design for 10x growth, not 100x          |
| **Security**        | Risk mitigation, compliance      | Usability vs. security               | Security by design, not bolted on        |
| **Cost**            | Development time, infrastructure | Quality vs. speed                    | Invest in quality, measure ROI           |

### Decision-Making Process

1. **Problem Definition**: What are we solving? What are the constraints and success criteria?
2. **Alternative Analysis**: What are the different approaches? Document pros/cons for each
3. **Tradeoff Evaluation**: Use the matrix above to evaluate each alternative
4. **Risk Assessment**: What could go wrong? What's the worst-case scenario?
5. **Simple First**: Can we solve this with a simpler approach? Start there
6. **Iterative Improvement**: How can we improve this incrementally?
7. **Success Metrics**: How will we measure success? What KPIs matter?

### Cost-Benefit Analysis Framework

- **Development Cost**: Time, complexity, technical debt
- **Operational Cost**: Infrastructure, maintenance, monitoring
- **Business Value**: User experience, feature velocity, competitive advantage
- **Risk Cost**: Security vulnerabilities, performance issues, scalability limits

**Rule**: If the cost exceeds the benefit by 3x, reconsider the approach.

Remember: The best code is code that doesn't exist. Always question if a feature or abstraction is truly necessary before implementing it.

## 🤝 Collaborative Development Partnership

### MVP Development Workflow

1. **Detailed Prompt Analysis**: Understand requirements, constraints, and success criteria
2. **Incremental Implementation**: Build one component/feature at a time
3. **Validation Checkpoints**: Test and validate each increment before proceeding
4. **Iterative Refinement**: Improve based on feedback and learnings

### Partnership Principles

- **Strategic Prompts**: Detailed, well-structured requirements from human experience
- **Technical Execution**: FANG-level implementation with quality standards
- **Incremental Approach**: Never build too much at once, validate frequently
- **Gut + Intelligence**: Combine human intuition with systematic analysis
- **Quality First**: Maintain high standards while moving fast

### Communication Guidelines

- **Ask Clarifying Questions**: Ensure complete understanding before implementation
- **Propose Tradeoffs**: Present options with clear pros/cons for decisions
- **Validate Assumptions**: Test hypotheses early and often
- **Learn Together**: Improve our approach based on outcomes and feedback

## 📊 Monorepo Rating System

When asked to "Rate the monorepo", conduct a comprehensive FANG-grade analysis using the following criteria:

### Rating Criteria (1-10 Scale)

**Architecture & Design (25%)**

- Project organization and domain boundaries
- Dependency management and circular dependency prevention
- Library structure and shared code organization
- Scalability and growth potential

**Code Quality & Standards (20%)**

- TypeScript configuration and type safety
- Code consistency and formatting
- Documentation quality and completeness
- Testing strategy and coverage

**Performance & Build System (20%)**

- Nx caching and incremental builds
- Build performance and parallelization
- Bundle optimization and tree-shaking
- Development workflow efficiency

**Security & Best Practices (15%)**

- Authentication and authorization implementation
- Input validation and sanitization
- Environment configuration and secret management
- Security headers and policies

**Maintainability & Developer Experience (20%)**

- Code readability and self-documentation
- Error handling and logging
- Development tooling and automation
- Technical debt management

### Rating Scale

- **9-10**: FANG-level excellence, industry-leading practices
- **7-8**: Strong engineering practices, minor improvements needed
- **5-6**: Good foundation, significant improvements required
- **3-4**: Basic structure, major architectural changes needed
- **1-2**: Fundamental issues, requires complete restructuring

### Analysis Process

1. **Deep Code Review**: Examine project structure, dependencies, and code quality
2. **Performance Assessment**: Evaluate build times, caching, and optimization
3. **Security Audit**: Review authentication, validation, and security practices
4. **Scalability Analysis**: Assess growth potential and architectural decisions
5. **Developer Experience**: Evaluate tooling, documentation, and workflow
6. **Industry Comparison**: Benchmark against FANG-level standards

Provide specific recommendations for improvement in each category with actionable next steps.
