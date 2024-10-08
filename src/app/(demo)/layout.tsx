"use client"

import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { RequiredAuthProvider } from "@propelauth/react";

export default function DemoLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminPanelLayout>
      {children}
    </AdminPanelLayout>
  )
}
