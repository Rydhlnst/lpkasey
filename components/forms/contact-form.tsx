"use client";

import { useState } from "react";
import { CONTACT_ENQUIRY_TYPES } from "@/constants/services";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export interface ContactFormProps {
  onSubmitMock?: (formData: FormData) => void;
}

const contactFormSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((value: string | undefined) => !value || /^[+0-9()\-\s]{7,20}$/.test(value), {
      message: "Please enter a valid phone number.",
    }),
  enquiryType: z.enum(CONTACT_ENQUIRY_TYPES, {
    message: "Please select an enquiry type.",
  }),
  message: z.string().trim().min(10, "Please share a bit more detail (minimum 10 characters)."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;
type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export function ContactForm({ onSubmitMock }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");
  const [errors, setErrors] = useState<ContactFormErrors>({});

  function handleSubmit(formData: FormData) {
    setStatus("idle");
    setErrors({});

    const values: ContactFormValues = {
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      enquiryType: String(formData.get("enquiryType") ?? "") as ContactFormValues["enquiryType"],
      message: String(formData.get("message") ?? ""),
    };

    const result = contactFormSchema.safeParse(values);
    if (!result.success) {
      const nextErrors: ContactFormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string" && !(field in nextErrors)) {
          nextErrors[field as keyof ContactFormValues] = issue.message;
        }
      }
      setErrors(nextErrors);
      return;
    }

    onSubmitMock?.(formData);
    setStatus("submitted");
  }

  return (
    <form action={handleSubmit} className="space-y-4 rounded-3xl border border-border bg-card/50 p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" name="fullName" required className="min-h-11" />
          {errors.fullName ? <p className="text-sm text-destructive">{errors.fullName}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required className="min-h-11" />
          {errors.email ? <p className="text-sm text-destructive">{errors.email}</p> : null}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" className="min-h-11" />
          {errors.phone ? <p className="text-sm text-destructive">{errors.phone}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="enquiryType">Enquiry Type</Label>
          <Select name="enquiryType">
            <SelectTrigger id="enquiryType" className="min-h-11 w-full">
              <SelectValue placeholder="Select enquiry type" />
            </SelectTrigger>
            <SelectContent>
              {CONTACT_ENQUIRY_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.enquiryType ? <p className="text-sm text-destructive">{errors.enquiryType}</p> : null}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" rows={5} required />
        {errors.message ? <p className="text-sm text-destructive">{errors.message}</p> : null}
      </div>
      <Button type="submit" className="min-h-11 rounded-full">
        Send Enquiry
      </Button>
      {status === "submitted" ? (
        <p className="text-sm text-muted-foreground" role="status">
          Thank you. Your message has been received (wireframe mock submit).
        </p>
      ) : null}
    </form>
  );
}
