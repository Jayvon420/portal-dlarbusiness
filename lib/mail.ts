// lib/mail.ts

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export async function sendEmail({ to, subject, html, text }: SendEmailOptions) {
  const apiKey = process.env.DEOMAIL_API_KEY;
  const from = process.env.DEOMAIL_FROM;

  if (!apiKey) {
    throw new Error("Missing DEOMAIL_API_KEY environment variable.");
  }

  if (!from) {
    throw new Error("Missing DEOMAIL_FROM environment variable.");
  }

  const response = await fetch("https://api.deomail.com/v1/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": apiKey,
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
      text,
      fingerprint: false,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    console.error("DeoMail Error:", data);

    throw new Error(data?.error || "Failed to send email.");
  }

  return data;
}
