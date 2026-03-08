"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Column, Heading, Text, Button, Input } from "@once-ui-system/core";
import { motion } from "framer-motion";

export default function AdminPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/verify", { cache: "no-store" });
        if (!cancelled && res.ok) {
          router.replace("/admin/dashboard");
          return;
        }
      } catch {
        // Ignore and let the user sign in.
      } finally {
        if (!cancelled) {
          setCheckingAuth(false);
        }
      }
    }

    checkAuth();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError("Invalid credentials");
        return;
      }

      router.replace("/admin/dashboard");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (checkingAuth) {
    return (
      <Column as="section" fill center paddingBottom="160">
        <Text variant="body-default-l" onBackground="neutral-weak">
          Loading...
        </Text>
      </Column>
    );
  }

  return (
    <Column as="section" fill center paddingY="64" maxWidth="s" gap="xl" horizontal="center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{ width: "100%" }}
      >
        <Column
          fillWidth
          gap="l"
          padding="xl"
          background="surface"
          border="neutral-alpha-weak"
          radius="l"
        >
          <Column gap="s" horizontal="center">
            <Heading variant="heading-strong-l">Admin Panel</Heading>
            <Text onBackground="neutral-weak" variant="body-default-m">
              Sign in to access your premium CMS dashboard
            </Text>
          </Column>

          <form onSubmit={handleLogin} style={{ width: "100%" }}>
            <Column gap="m" fillWidth>
              <Input
                id="admin-email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                id="admin-password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && (
                <Text variant="body-default-s" onBackground="danger-weak">
                  {error}
                </Text>
              )}
              <Button type="submit" variant="primary" fillWidth disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </Column>
          </form>
        </Column>
      </motion.div>
    </Column>
  );
}
