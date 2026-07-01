import { useState } from "react";
import type { FormData, FormStatus } from "@/types";
import { sendEmail } from "@/lib/email";

export function useForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendEmail(formData);
      setFormStatus("sent");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setFormStatus("sent");
      setFormData({ name: "", email: "", message: "" });
    }
    window.setTimeout(() => setFormStatus("idle"), 5000);
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return { formData, formStatus, handleSubmit, updateField };
}
