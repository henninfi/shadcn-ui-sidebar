"use client"
// components/AuthComponent.tsx
import React from 'react';
import { AuthProvider } from "@propelauth/react";

interface AuthComponentProps {
  children: React.ReactNode;
}

export const AuthComponent: React.FC<AuthComponentProps> = ({ children }) => {
  console.log("Auth URL:", process.env.NEXT_PUBLIC_AUTH_URL);

  return (
    <AuthProvider authUrl={process.env.NEXT_PUBLIC_AUTH_URL as string}>
      {children}
    </AuthProvider>
  );
};

export default AuthComponent;