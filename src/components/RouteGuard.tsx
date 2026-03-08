"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { routes, protectedRoutes } from "@/resources";
import { Flex, Spinner, Button, Heading, Column, PasswordInput } from "@once-ui-system/core";
import NotFound from "@/app/not-found";

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const [isRouteEnabled, setIsRouteEnabled] = useState(false);
  const [isPasswordRequired, setIsPasswordRequired] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const performChecks = async () => {
      setLoading(true);
      setIsRouteEnabled(false);
      setIsPasswordRequired(false);
      setIsAuthenticated(false);

      const checkRouteEnabled = () => {
        if (!pathname) return false;

        // Normalize locale-prefixed paths (e.g. /uz/blog -> /blog, /uz -> /).
        const locales = new Set(["uz", "en", "ru"]);
        const segments = pathname.split("/").filter(Boolean);
        const hasValidLocalePrefix = segments.length > 0 && locales.has(segments[0]);
        const normalizedPath = hasValidLocalePrefix ? `/${segments.slice(1).join("/")}` : pathname;
        const normalizedPathWithFallback = normalizedPath === "" ? "/" : normalizedPath;

        if (normalizedPathWithFallback in routes) {
          return routes[normalizedPathWithFallback as keyof typeof routes];
        }

        const dynamicRoutes = ["/blog", "/work", "/admin"] as const;
        for (const route of dynamicRoutes) {
          if (normalizedPathWithFallback.startsWith(route) && routes[route]) {
            return true;
          }
        }

        return false;
      };

      const routeEnabled = checkRouteEnabled();
      setIsRouteEnabled(routeEnabled);

      const locales = new Set(["uz", "en", "ru"]);
      const segments = (pathname ?? "").split("/").filter(Boolean);
      const hasValidLocalePrefix = segments.length > 0 && locales.has(segments[0]);
      const normalizedPath = hasValidLocalePrefix ? `/${segments.slice(1).join("/")}` : pathname ?? "/";
      const normalizedPathWithFallback = normalizedPath === "" ? "/" : normalizedPath;

      if (protectedRoutes[normalizedPathWithFallback as keyof typeof protectedRoutes]) {
        setIsPasswordRequired(true);

        const response = await fetch("/api/check-auth");
        if (response.ok) {
          setIsAuthenticated(true);
        }
      }

      setLoading(false);
    };

    performChecks();
  }, [pathname]);

  const handlePasswordSubmit = async () => {
    const response = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      setIsAuthenticated(true);
      setError(undefined);
    } else {
      setError("Incorrect password");
    }
  };

  if (loading) {
    return (
      <Flex fillWidth paddingY="128" horizontal="center">
        <Spinner />
      </Flex>
    );
  }

  if (!isRouteEnabled) {
    return <NotFound />;
  }

  if (isPasswordRequired && !isAuthenticated) {
    return (
      <Column paddingY="128" maxWidth={24} gap="24" center>
        <Heading align="center" wrap="balance">
          This page is password protected
        </Heading>
        <Column fillWidth gap="8" horizontal="center">
          <PasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            errorMessage={error}
          />
          <Button onClick={handlePasswordSubmit}>Submit</Button>
        </Column>
      </Column>
    );
  }

  return <>{children}</>;
};

export { RouteGuard };
