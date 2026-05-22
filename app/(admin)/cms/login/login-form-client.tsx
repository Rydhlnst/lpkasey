"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth/client";

export function CmsLoginFormClient() {
  const router = useRouter();
  const seedEmail = "kasey123@cms.local";
  const [username, setUsername] = useState("kasey123");
  const [password, setPassword] = useState("kaseypassword123");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const { error: signInByUsernameError } = await authClient.signIn.username({
        username,
        password,
      });

      if (signInByUsernameError) {
        const emailCandidate = username.includes("@") ? username : seedEmail;
        const { error: signInByEmailError } = await authClient.signIn.email({
          email: emailCandidate,
          password,
        });
        if (signInByEmailError) {
          setError(signInByEmailError.message || signInByUsernameError.message || "Login failed. Check username/password.");
          return;
        }
      }
      router.push("/cms");
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" value={username} onChange={(event) => setUsername(event.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Login CMS"}
      </Button>
    </form>
  );
}
