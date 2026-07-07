import { NextResponse } from "next/server";

type SignupRequest = {
  email?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

async function sendToSignupProvider(email: string) {
  const webhookUrl = process.env.EMAIL_SIGNUP_WEBHOOK_URL;

  if (!webhookUrl) {
    return;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  });

  if (!response.ok) {
    throw new Error(`Signup provider failed with ${response.status}.`);
  }
}

export async function POST(request: Request) {
  let body: SignupRequest;

  try {
    body = (await request.json()) as SignupRequest;
  } catch {
    return jsonError("Invalid signup request.");
  }

  const email = body.email?.trim().toLowerCase();

  if (!email || !EMAIL_PATTERN.test(email)) {
    return jsonError("Enter a valid email address.");
  }

  try {
    await sendToSignupProvider(email);
  } catch {
    return jsonError("Signup could not be completed. Please try again.", 502);
  }

  return NextResponse.json({ ok: true });
}
