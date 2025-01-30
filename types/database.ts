export type SubscriptionStatus = 'trial' | 'active' | 'cancelled' | 'expired';
export type UserRole = 'admin' | 'member' | 'viewer';

export interface Company {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  subscription: {
    status: SubscriptionStatus;
    plan: string;
    startDate: string;
    endDate: string;
    trialEndsAt: string;
    cancelledAt?: string;
  };
  settings: {
    brandColors: string[];
    logo?: string;
    timezone: string;
  };
  billing: {
    email: string;
    name: string;
    address: {
      line1: string;
      line2?: string;
      city: string;
      state: string;
      postal_code: string;
      country: string;
    };
  };
  metadata?: Record<string, any>;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
  companies: {
    companyId: string;
    role: UserRole;
    joinedAt: string;
  }[];
  preferences: {
    notifications: {
      email: boolean;
      push: boolean;
    };
    theme: 'light' | 'dark' | 'system';
  };
}

export interface CompanyMember {
  userId: string;
  companyId: string;
  role: UserRole;
  joinedAt: string;
  invitedBy: string;
  status: 'active' | 'invited' | 'removed';
}

export interface Subscription {
  id: string;
  companyId: string;
  status: SubscriptionStatus;
  plan: string;
  quantity: number;
  startDate: string;
  endDate: string;
  trialEndsAt: string;
  cancelledAt?: string;
  paymentMethod: {
    type: 'card' | 'paypal' | 'wire';
    last4?: string;
    brand?: string;
  };
  billingCycle: 'monthly' | 'yearly';
  price: number;
  currency: string;
  metadata?: Record<string, any>;
}

export interface Invoice {
  id: string;
  companyId: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: 'draft' | 'open' | 'paid' | 'void' | 'uncollectible';
  billingReason: 'subscription_create' | 'subscription_cycle' | 'subscription_update';
  createdAt: string;
  paidAt?: string;
  dueDate: string;
  periodStart: string;
  periodEnd: string;
} 