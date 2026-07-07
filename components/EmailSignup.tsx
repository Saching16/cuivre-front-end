"use client";

import { FormEvent, useState } from "react";

export function EmailSignup() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!email.includes("@")) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }

    setStatus("submitting");

    let response: Response;

    try {
      response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });
    } catch {
      setStatus("error");
      setMessage("Signup could not be completed. Please try again.");
      return;
    }

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      setStatus("error");
      setMessage(data?.error ?? "Signup could not be completed. Please try again.");
      return;
    }

    setStatus("success");
    setMessage("You are on the list.");
  }

  return (
    <section className="signup-panel" aria-labelledby="signup-heading">
      <div>
        <p className="eyebrow">Early access</p>
        <h2 id="signup-heading">Join the launch list.</h2>
        <p>
          Receive a quiet note when the moisturizer is ready for purchase.
        </p>
      </div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email address</label>
        <div className="signup-row">
          <input
            id="email"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
            type="email"
            value={email}
          />
          <button
            className="button"
            disabled={status === "submitting"}
            type="submit"
          >
            {status === "submitting" ? "Joining" : "Join"}
          </button>
        </div>
        {status === "success" ? (
          <p className="form-note" role="status">
            {message}
          </p>
        ) : null}
        {status === "error" ? (
          <p className="form-note form-note-error" role="alert">
            {message}
          </p>
        ) : null}
      </form>
    </section>
  );
}
