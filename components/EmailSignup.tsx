"use client";

import { FormEvent, useState } from "react";

export function EmailSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.includes("@")) {
      setStatus("error");
      return;
    }

    setStatus("success");
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
            type="email"
            value={email}
          />
          <button className="button" type="submit">
            Join
          </button>
        </div>
        {status === "success" ? (
          <p className="form-note">You are on the list.</p>
        ) : null}
        {status === "error" ? (
          <p className="form-note form-note-error">
            Enter a valid email address.
          </p>
        ) : null}
      </form>
    </section>
  );
}
