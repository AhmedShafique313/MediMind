import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserSubscription, PlanType } from '@/types/payment';

interface UserStore {
  user: UserSubscription | null;
  setUser: (user: UserSubscription) => void;
  updateCredits: (credits: number) => void;
  deductCredit: () => boolean;
  hasCredits: () => boolean;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: {
        userId: 'demo-user',
        plan: 'free',
        credits: 5,
        subscriptionStatus: 'active',
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      setUser: (user) => set({ user }),

      updateCredits: (credits) =>
        set((state) => ({
          user: state.user ? { ...state.user, credits } : null,
        })),

      deductCredit: () => {
        const { user } = get();
        if (!user || user.credits <= 0) {
          return false;
        }
        set({
          user: { ...user, credits: user.credits - 1, updatedAt: new Date() },
        });
        return true;
      },

      hasCredits: () => {
        const { user } = get();
        return user ? user.credits > 0 : false;
      },

      logout: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
    }
  )
);
