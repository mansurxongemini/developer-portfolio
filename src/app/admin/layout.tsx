import { AdminAreaShell } from "@/components/admin/AdminAreaShell";

export const metadata = {
  title: "Admin Dashboard – Mansurxon Rustamov",
  description: "Content management dashboard",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminAreaShell>{children}</AdminAreaShell>;
}
