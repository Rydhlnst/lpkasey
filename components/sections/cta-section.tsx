"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RiMailSendFill } from "react-icons/ri";

export interface CTASectionProps {
  title: string;
  submitLabel?: string;
  formAction?: string;
  className?: string;
}

type CTAFormValues = {
  firstName: string;
  lastName: string;
  email: string;
};

export function CTASection({
  title,
  submitLabel = "Sign Me Up",
  formAction = "#",
  className,
}: CTASectionProps) {
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CTAFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const onSubmit = async (values: CTAFormValues) => {
    setSubmitMessage(null);

    if (formAction && formAction !== "#") {
      await fetch(formAction, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
    }

    reset();
    setSubmitMessage("Thank you. We have received your details.");
  };

  return (
    <section className={`py-16 sm:py-20 ${className ?? ""}`}>
      <Container>
        <div className="relative border border-border bg-card px-5 py-10 sm:px-8 sm:py-12 md:px-10 md:py-14">
          <div className="absolute left-1/2 top-0 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-border bg-background text-foreground">
            <RiMailSendFill className="h-7 w-7" />
          </div>

          <h2 className="mt-3 text-center font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
            {title}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-3 md:gap-6">
            <label className="space-y-2">
              <span className="block font-body text-sm font-semibold text-foreground sm:text-base">Name (Required)</span>
              <Input
                {...register("firstName", {
                  required: "First name wajib diisi.",
                  minLength: { value: 2, message: "First name minimal 2 karakter." },
                })}
                type="text"
                aria-invalid={errors.firstName ? "true" : "false"}
                className="h-12 rounded-none border-border bg-background px-4 text-foreground placeholder:text-muted-foreground"
                placeholder="First name"
              />
              {errors.firstName ? <p className="text-sm text-destructive">{errors.firstName.message}</p> : null}
            </label>

            <label className="space-y-2">
              <span className="block font-body text-sm font-semibold text-foreground sm:text-base">Last Name (Required)</span>
              <Input
                {...register("lastName", {
                  required: "Last name wajib diisi.",
                  minLength: { value: 2, message: "Last name minimal 2 karakter." },
                })}
                type="text"
                aria-invalid={errors.lastName ? "true" : "false"}
                className="h-12 rounded-none border-border bg-background px-4 text-foreground placeholder:text-muted-foreground"
                placeholder="Last name"
              />
              {errors.lastName ? <p className="text-sm text-destructive">{errors.lastName.message}</p> : null}
            </label>

            <label className="space-y-2">
              <span className="block font-body text-sm font-semibold text-foreground sm:text-base">Email Address (Required)</span>
              <Input
                {...register("email", {
                  required: "Email wajib diisi.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Masukkan email yang valid.",
                  },
                })}
                type="email"
                aria-invalid={errors.email ? "true" : "false"}
                className="h-12 rounded-none border-border bg-background px-4 text-foreground placeholder:text-muted-foreground"
                placeholder="you@example.com"
              />
              {errors.email ? <p className="text-sm text-destructive">{errors.email.message}</p> : null}
            </label>

            <div className="md:col-span-3 md:mt-2 md:flex md:justify-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="mx-auto min-h-12 rounded-none px-9 font-display text-xl font-semibold"
              >
                {isSubmitting ? "Submitting..." : submitLabel}
              </Button>
            </div>
          </form>

          {submitMessage ? (
            <p className="mt-5 text-center font-body text-sm font-medium text-muted-foreground">{submitMessage}</p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
