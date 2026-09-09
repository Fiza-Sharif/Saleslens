'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  avatar: string;
  isLoggedIn: boolean;
}

export const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80',
];

const DEFAULT_USER: UserProfile = {
  id: 'usr_demo_1',
  name: 'Alex Morgan',
  email: 'alex.morgan@saleslens.ai',
  role: 'Lead Data Strategist',
  company: 'Acme Analytics',
  avatar: PRESET_AVATARS[0],
  isLoggedIn: true,
};

interface UserContextType {
  user: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  uploadAvatar: (file: File) => Promise<string>;
  login: (email: string, name?: string) => void;
  logout: () => void;
  selectPresetAvatar: (url: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('saleslens_user_session');
      if (saved) {
        const parsed = JSON.parse(saved);
        setUser((prev) => ({ ...prev, ...parsed }));
      }
    } catch (e) {
      console.error('Failed to load user session from localStorage', e);
    }
  }, []);

  const saveToStorage = (updatedUser: UserProfile) => {
    try {
      localStorage.setItem('saleslens_user_session', JSON.stringify(updatedUser));
    } catch (e) {
      console.warn('LocalStorage quota warning. Attempting fallback save.', e);
    }
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => {
      const next = { ...prev, ...updates };
      saveToStorage(next);
      return next;
    });
  };

  const selectPresetAvatar = (avatarUrl: string) => {
    updateProfile({ avatar: avatarUrl });
  };

  /**
   * Resizes & compresses user uploaded images using HTML5 Canvas to 256x256 JPG (15-30KB)
   * Prevents localStorage quota exceeded errors and handles any image format (PNG, JPG, WEBP)
   */
  const uploadAvatar = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            const SIZE = 256;
            canvas.width = SIZE;
            canvas.height = SIZE;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              reject(new Error('Canvas context unavailable'));
              return;
            }

            // Crop to center square
            const minDim = Math.min(img.width, img.height);
            const sx = (img.width - minDim) / 2;
            const sy = (img.height - minDim) / 2;

            ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, SIZE, SIZE);

            // Compress to 85% JPEG quality Data URL (~20KB)
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.85);

            updateProfile({ avatar: compressedBase64 });
            resolve(compressedBase64);
          } catch (canvasErr) {
            reject(canvasErr);
          }
        };
        img.onerror = (err) => reject(err);
        img.src = event.target?.result as string;
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const login = (email: string, name?: string) => {
    const displayName = name || email.split('@')[0].replace('.', ' ');
    const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
    updateProfile({
      email,
      name: formattedName,
      isLoggedIn: true,
    });
  };

  const logout = () => {
    setUser((prev) => {
      const next = { ...prev, isLoggedIn: false };
      saveToStorage(next);
      return next;
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateProfile,
        uploadAvatar,
        login,
        logout,
        selectPresetAvatar,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
