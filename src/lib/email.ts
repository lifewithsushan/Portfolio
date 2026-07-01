import emailjs from "@emailjs/browser";

emailjs.init("aCcDsWJ61cpPbOLu5");

export async function sendEmail(formData: {
  name: string;
  email: string;
  message: string;
}) {
  return emailjs.send(
    "service_uj5fp9l",
    "template_r2e3nsw",
    {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_email: "sushankc89@gmail.com",
    },
  );
}
