import { db } from './firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  query, 
  where,
  Timestamp,
  serverTimestamp 
} from 'firebase/firestore';
import type { Company, User, CompanyMember, Subscription } from '@/types/database';

export const createCompany = async (companyData: Partial<Company>) => {
  const companyRef = doc(collection(db, 'companies'));
  const now = new Date().toISOString();
  
  const company: Company = {
    id: companyRef.id,
    name: companyData.name || '',
    createdAt: now,
    updatedAt: now,
    subscription: {
      status: 'trial',
      plan: 'trial',
      startDate: now,
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days trial
      trialEndsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    settings: {
      brandColors: [],
      timezone: 'UTC',
    },
    billing: {
      email: '',
      name: '',
      address: {
        line1: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
      },
    },
    ...companyData,
  };

  await setDoc(companyRef, company);
  return company;
};

export const createCompanyMember = async (
  userId: string, 
  companyId: string, 
  role: 'admin' | 'member' | 'viewer' = 'member'
) => {
  const memberRef = doc(collection(db, 'company_members'));
  const member: CompanyMember = {
    userId,
    companyId,
    role,
    joinedAt: new Date().toISOString(),
    invitedBy: userId, // self-invited if creating company
    status: 'active',
  };

  await setDoc(memberRef, member);
  return member;
};

export const getUserCompanies = async (userId: string) => {
  const membershipsQuery = query(
    collection(db, 'company_members'),
    where('userId', '==', userId),
    where('status', '==', 'active')
  );

  const memberships = await getDocs(membershipsQuery);
  const companies: Company[] = [];

  for (const membership of memberships.docs) {
    const companyDoc = await getDoc(doc(db, 'companies', membership.data().companyId));
    if (companyDoc.exists()) {
      companies.push({ id: companyDoc.id, ...companyDoc.data() } as Company);
    }
  }

  return companies;
};

export const getCompanyMembers = async (companyId: string) => {
  const membersQuery = query(
    collection(db, 'company_members'),
    where('companyId', '==', companyId)
  );

  const members = await getDocs(membersQuery);
  return members.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateSubscription = async (
  companyId: string, 
  subscriptionData: Partial<Subscription>
) => {
  const subscriptionRef = doc(db, 'subscriptions', companyId);
  await updateDoc(subscriptionRef, {
    ...subscriptionData,
    updatedAt: serverTimestamp(),
  });
}; 