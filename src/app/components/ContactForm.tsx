"use client";
import { ArrowRight, LoaderPinwheel } from "lucide-react";
import { Button } from "./Button";
import { useState } from "react";
import { isValidEmail } from "@/lib/utils";
import { toast } from "sonner";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = "Please fill in your name.";
    }
    if (!isValidEmail(email)) {
      newErrors.email = "Please fill in a valid email address.";
    }
    if (!message.trim() || message.trim().length < 20) {
      newErrors.message = "Message must be at least 20 characters long.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    const res = await fetch("/api/send", {
      method: "POST",
      body: JSON.stringify({ name, email, message }),
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();

    if (result.success) {
      toast.success("The email has been sent.");
      form.reset();
    } else {
      setErrors({ message: "Failed to send. Try again later." });
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`mt-6 md:max-w-[400px] w-full h-full flex flex-col justify-center
      ${loading ? "opacity-50 pointer-events-none" : ""}`}
    >
      <div className="flex flex-col gap-4">
        <input
          name="name"
          placeholder="Your Name"
          className="bg-form px-3 py-4 rounded-md dark:text-card"
          required
        />
        {errors.name && (
          <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.name}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="youremail@exemple.com"
          className="bg-form px-3 py-4 rounded-md dark:text-card"
          required
        />
        {errors.email && (
          <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.email}</p>
        )}

        <textarea
          name="message"
          className="border border-gray-300 p-2 rounded-md resize-none bg-form dark:text-card"
          rows={4}
          placeholder="Your Message"
          required
        />
        {errors.message && (
          <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="dark:bg-background bg-ternary-color dark:text-text-primary mt-8 mr-auto"
      >
        {loading ? (
          <>
            <span className="h-5 w-5 animate-spin">
              <LoaderPinwheel size={18} />
            </span>
            Sending...
          </>
        ) : (
          <>
            Send Message
            <ArrowRight size={24} />
          </>
        )}
      </Button>
    </form>
  );
}
