import { askConfig } from "@/app/ask/ask-config";

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    return Response.json(
      { error: "RESEND_API_KEY is not set. Add it to .env.local — get it from https://resend.com/api-keys" },
      { status: 500 }
    );
  }

  let body: { message?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const message = body.message?.trim();
  if (!message) {
    return Response.json({ error: "Missing message" }, { status: 400 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Date Confirmation <onboarding@resend.dev>",
      to: [askConfig.confirmation.recipientEmail],
      subject: askConfig.confirmation.emailSubject,
      // Preserve line breaks from the message template by sending HTML too.
      text: message,
      html: `<pre style="font-family: system-ui, sans-serif; font-size: 16px; line-height: 1.5; white-space: pre-wrap;">${escapeHtml(message)}</pre>`,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    return Response.json({ error }, { status: res.status });
  }

  return Response.json({ ok: true });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
