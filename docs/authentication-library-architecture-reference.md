# Authentication Library Architecture Reference

## Overview

The `vendemas-shared-auth` library provides a reusable, configurable authentication system for Next.js applications. It's designed to be Firebase-agnostic, type-safe, and easily adaptable for different products and Firebase projects.

## Library Structure

```
libs/vendemas-shared-auth/
├── src/
│   ├── components/           # React components
│   │   ├── auth-provider.tsx # Auth context provider
│   │   ├── login-form.tsx    # Reusable login form
│   │   ├── register-form.tsx # Reusable register form
│   │   ├── auth-guard.tsx    # Route protection
│   │   └── user-menu.tsx     # User dropdown menu
│   ├── hooks/                # Custom hooks
│   │   ├── use-auth.ts       # Main auth hook
│   │   ├── use-user.ts       # User data hook
│   │   └── use-permissions.ts # Role-based access
│   ├── api/                  # API utilities
│   │   ├── auth-api.ts       # Auth API functions
│   │   ├── firebase-config.ts # Firebase configuration
│   │   └── types.ts          # API types
│   ├── utils/                # Utilities
│   │   ├── auth-utils.ts     # Auth helpers
│   │   ├── token-manager.ts  # JWT management
│   │   └── permissions.ts    # Role checking
│   ├── types/                # TypeScript types
│   │   ├── auth.types.ts     # Auth types
│   │   ├── user.types.ts     # User types
│   │   └── api.types.ts      # API types
│   └── index.ts              # Main export
├── package.json              # Library package
├── tsconfig.json             # TypeScript config
└── README.md                 # Documentation
```

## Core Types

### Auth Configuration

```typescript
// libs/vendemas-shared-auth/src/types/auth.types.ts
export interface AuthConfig {
  firebaseConfig: FirebaseConfig;
  projectId: string;
  authDomain: string;
  apiKey: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}
```

### User Types

```typescript
// libs/vendemas-shared-auth/src/types/user.types.ts
export interface User {
  id: string;
  email: string;
  role: 'staff' | 'admin' | 'owner';
  businessId?: string;
  permissions: string[];
  displayName?: string;
  photoURL?: string;
  emailVerified: boolean;
  createdAt: Date;
  lastLoginAt: Date;
}

export interface BusinessData {
  name: string;
  type: 'retail' | 'restaurant' | 'service';
  address?: string;
  phone?: string;
  website?: string;
}
```

### Auth State

```typescript
// libs/vendemas-shared-auth/src/types/auth.types.ts
export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresAt: Date;
}
```

## Firebase Service

### Firebase Auth Service

```typescript
// libs/vendemas-shared-auth/src/api/firebase-config.ts
import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

export class FirebaseAuthService {
  private app: FirebaseApp;
  private auth: Auth;
  private firestore: Firestore;

  constructor(config: AuthConfig) {
    this.app = initializeApp(config.firebaseConfig);
    this.auth = getAuth(this.app);
    this.firestore = getFirestore(this.app);
  }

  // Authentication methods
  async login(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    return this.getUserData(userCredential.user.uid);
  }

  async register(
    email: string,
    password: string,
    businessData: BusinessData
  ): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    const user = await this.createUserProfile(
      userCredential.user.uid,
      email,
      businessData
    );
    return user;
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  async getCurrentUser(): Promise<User | null> {
    const firebaseUser = this.auth.currentUser;
    if (!firebaseUser) return null;
    return this.getUserData(firebaseUser.uid);
  }

  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(this.auth, async firebaseUser => {
      if (firebaseUser) {
        const user = await this.getUserData(firebaseUser.uid);
        callback(user);
      } else {
        callback(null);
      }
    });
  }

  private async getUserData(uid: string): Promise<User> {
    // Fetch user data from Firestore
    // Implementation details...
  }

  private async createUserProfile(
    uid: string,
    email: string,
    businessData: BusinessData
  ): Promise<User> {
    // Create user profile in Firestore
    // Implementation details...
  }
}
```

## React Components

### Auth Provider

```typescript
// libs/vendemas-shared-auth/src/components/auth-provider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { FirebaseAuthService } from '../api/firebase-config';
import { AuthConfig, User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, businessData: BusinessData) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export interface AuthProviderProps {
  config: AuthConfig;
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ config, children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
    isAuthenticated: false,
  });

  const authService = new FirebaseAuthService(config);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      setAuthState({
        user,
        loading: false,
        error: null,
        isAuthenticated: !!user,
      });
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      const user = await authService.login(email, password);
      setAuthState({
        user,
        loading: false,
        error: null,
        isAuthenticated: true,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      }));
    }
  };

  const register = async (email: string, password: string, businessData: BusinessData) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      const user = await authService.register(email, password, businessData);
      setAuthState({
        user,
        loading: false,
        error: null,
        isAuthenticated: true,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      }));
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setAuthState({
        user: null,
        loading: false,
        error: null,
        isAuthenticated: false,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Logout failed',
      }));
    }
  };

  const clearError = () => {
    setAuthState(prev => ({ ...prev, error: null }));
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
      clearError,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
```

### Login Form Component

```typescript
// libs/vendemas-shared-auth/src/components/login-form.tsx
import React, { useState } from 'react';
import { useAuthContext } from './auth-provider';

export interface LoginFormProps {
  onSuccess?: (user: User) => void;
  onError?: (error: string) => void;
  redirectTo?: string;
  customStyles?: React.CSSProperties;
  showRegisterLink?: boolean;
  title?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onError,
  redirectTo,
  customStyles,
  showRegisterLink = true,
  title = 'Login',
}) => {
  const { login, loading, error, clearError } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      await login(email, password);
      onSuccess?.(user);
      if (redirectTo) {
        window.location.href = redirectTo;
      }
    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'Login failed');
    }
  };

  return (
    <div style={customStyles}>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {showRegisterLink && (
        <p>
          Don't have an account? <a href="/register">Register here</a>
        </p>
      )}
    </div>
  );
};
```

### Auth Guard Component

```typescript
// libs/vendemas-shared-auth/src/components/auth-guard.tsx
import React from 'react';
import { useAuthContext } from './auth-provider';
import { User } from '../types';

export interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: User['role'];
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requiredRole,
  fallback,
  redirectTo = '/login',
}) => {
  const { user, loading, isAuthenticated } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    if (fallback) return <>{fallback}</>;
    window.location.href = redirectTo;
    return null;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <div>Access denied. Required role: {requiredRole}</div>;
  }

  return <>{children}</>;
};
```

## Custom Hooks

### Main Auth Hook

```typescript
// libs/vendemas-shared-auth/src/hooks/use-auth.ts
import { useAuthContext } from '../components/auth-provider';

export const useAuth = () => {
  const context = useAuthContext();

  return {
    user: context.user,
    login: context.login,
    logout: context.logout,
    register: context.register,
    loading: context.loading,
    error: context.error,
    isAuthenticated: context.isAuthenticated,
    clearError: context.clearError,
  };
};
```

### User Hook

```typescript
// libs/vendemas-shared-auth/src/hooks/use-user.ts
import { useAuth } from './use-auth';

export const useUser = () => {
  const { user, loading } = useAuth();

  return {
    user,
    loading,
    isStaff: user?.role === 'staff',
    isAdmin: user?.role === 'admin',
    isOwner: user?.role === 'owner',
    hasPermission: (permission: string) =>
      user?.permissions.includes(permission) ?? false,
  };
};
```

### Permissions Hook

```typescript
// libs/vendemas-shared-auth/src/hooks/use-permissions.ts
import { useUser } from './use-user';

export const usePermissions = () => {
  const { user, hasPermission } = useUser();

  return {
    canManageProducts: hasPermission('products:manage'),
    canManageStaff: hasPermission('staff:manage'),
    canViewAnalytics: hasPermission('analytics:view'),
    canManageBilling: hasPermission('billing:manage'),
    canExportData: hasPermission('data:export'),
    hasAnyPermission: (permissions: string[]) =>
      permissions.some(hasPermission),
  };
};
```

## API Utilities

### Auth API

```typescript
// libs/vendemas-shared-auth/src/api/auth-api.ts
export class AuthAPI {
  constructor(private config: AuthConfig) {}

  async loginEndpoint(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  }

  async registerEndpoint(userData: RegisterData): Promise<AuthResponse> {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    return response.json();
  }

  async verifyTokenEndpoint(token: string): Promise<User> {
    const response = await fetch('/api/auth/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      throw new Error('Token verification failed');
    }

    return response.json();
  }

  async refreshTokenEndpoint(): Promise<AuthResponse> {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    return response.json();
  }
}
```

## Usage Examples

### Basic Setup

```typescript
// apps/vendemas-nx-website/src/lib/auth-config.ts
import { AuthConfig } from '@vendemas/shared-auth';

export const authConfig: AuthConfig = {
  firebaseConfig: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  },
  projectId: 'vendemas-prod',
  authDomain: 'vendemas-prod.firebaseapp.com',
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
};
```

### App Integration

```typescript
// apps/vendemas-nx-website/src/app/layout.tsx
import { AuthProvider } from '@vendemas/shared-auth';
import { authConfig } from '@/lib/auth-config';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider config={authConfig}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

### Component Usage

```typescript
// apps/vendemas-nx-website/src/app/(auth)/login/page.tsx
import { LoginForm, useAuth } from '@vendemas/shared-auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginForm
        onSuccess={(user) => {
          console.log('Login successful:', user);
          router.push('/dashboard');
        }}
        onError={(error) => {
          console.error('Login failed:', error);
        }}
        title="Welcome to Vendemás"
        customStyles={{ maxWidth: '400px', width: '100%' }}
      />
    </div>
  );
}
```

### Route Protection

```typescript
// apps/vendemas-nx-website/src/app/(dashboard)/layout.tsx
import { AuthGuard } from '@vendemas/shared-auth';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard
      requiredRole="admin"
      fallback={<div>Please log in to access the dashboard</div>}
    >
      <div className="dashboard-layout">
        <DashboardSidebar />
        <main>{children}</main>
      </div>
    </AuthGuard>
  );
}
```

## Multi-Product Configuration

### Different Firebase Projects

```typescript
// Product A: Vendemás
const vendemasAuthConfig: AuthConfig = {
  firebaseConfig: {
    projectId: 'vendemas-prod',
    authDomain: 'vendemas-prod.firebaseapp.com',
    apiKey: 'vendemas-api-key',
    // ... other config
  },
  projectId: 'vendemas-prod',
  authDomain: 'vendemas-prod.firebaseapp.com',
  apiKey: 'vendemas-api-key',
};

// Product B: Another Business
const otherProductAuthConfig: AuthConfig = {
  firebaseConfig: {
    projectId: 'other-product-prod',
    authDomain: 'other-product-prod.firebaseapp.com',
    apiKey: 'other-product-api-key',
    // ... other config
  },
  projectId: 'other-product-prod',
  authDomain: 'other-product-prod.firebaseapp.com',
  apiKey: 'other-product-api-key',
};
```

## Implementation Timeline

### Phase 1: Core Library (Week 1)

- **Day 1**: Create library structure and types
- **Day 2**: Implement Firebase service
- **Day 3**: Create auth context and provider
- **Day 4**: Build reusable components
- **Day 5**: Add API utilities and testing

### Phase 2: Integration (Week 2)

- **Day 1**: Integrate with first Next.js app
- **Day 2**: Test authentication flow
- **Day 3**: Add role-based access
- **Day 4**: Implement error handling
- **Day 5**: Documentation and examples

## Benefits

- ✅ **Reusable**: Same auth logic across products
- ✅ **Configurable**: Different Firebase projects
- ✅ **Type-safe**: Full TypeScript support
- ✅ **Testable**: Isolated auth logic
- ✅ **Maintainable**: Single source of truth
- ✅ **Scalable**: Easy to add new features
- ✅ **Secure**: Built-in security best practices
