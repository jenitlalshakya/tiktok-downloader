"use client";

import { useEffect, useState } from "react";
import { BacktrackButton, FeedbackTypeButton } from "../ui/Button";
import {
  HiBugAnt,
  HiSparkles,
  HiChatBubbleBottomCenterText,
  HiPaperAirplane,
  HiCheckCircle,
} from "react-icons/hi2";

export const FeedbackForm = () => {
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const feedbackTypes = [
    { id: "bug", label: "Bug Report", icon: HiBugAnt },
    { id: "feature", label: "Feature Idea", icon: HiSparkles },
    { id: "general", label: "General", icon: HiChatBubbleBottomCenterText },
  ];

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      setSuccess(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [success]);

  const FEEDBACK_URL = process.env.NEXT_PUBLIC_FEEDBACK_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!type || message.trim().length < 5) {
      setError("Please select a type and write a message.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch(FEEDBACK_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          email,
          message,
        }),
      });

      if (!res.ok) throw new Error();

      setSuccess(true);
      setType("");
      setMessage("");
      setEmail("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          <BacktrackButton />

          <h1
            style={{
              flex: 1,
              textAlign: "center",
              margin: 0,
              fontSize: "1.8rem",
            }}
          >
            Send <span>Feedback</span>
          </h1>
        </div>

        <p>Help improve the experience by reporting bugs or sharing ideas.</p>

        {success && (
          <div style={{
            margin: "12px 0",
            padding: "10px",
            borderRadius: "10px",
            background: "rgba(0,255,120,0.08)",
            border: "1px solid rgba(0,255,120,0.3)",
            color: "#00ff9d",
            display: "flex",
            gap: "8px",
            alignItems: "center"
          }}>
            <HiCheckCircle /> Feedback sent successfully!
          </div>
        )}

        {error && (
          <div style={{
            margin: "12px 0",
            padding: "10px",
            borderRadius: "10px",
            background: "rgba(255,0,80,0.08)",
            border: "1px solid rgba(255,0,80,0.3)",
            color: "#ff4d6d"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <p style={{ fontSize: "0.85rem", marginBottom: "10px", color: "#b8b8b8" }}>
              Choose type
            </p>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {feedbackTypes.map((t) => (
                <FeedbackTypeButton
                  key={t.id}
                  label={t.label}
                  icon={t.icon}
                  active={type === t.id}
                  onClick={() => setType(t.id)}
                />
              ))}
            </div>
          </div>

          <input
            type="email"
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "15px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.04)",
              color: "white",
              outline: "none",
            }}
          />

          <textarea
            required
            rows={7}
            placeholder="Write your feedback..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "15px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.04)",
              color: "white",
              outline: "none",
              resize: "none",
            }}
          />

          <div style={{ textAlign: "right", fontSize: "12px", color: "#777" }}>
            {message.length} chars
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              marginTop: "15px",
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              background: loading
                ? "rgba(255,255,255,0.2)"
                : "linear-gradient(90deg,#ff0050,#00f2ea)",
              color: "white",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {loading ? "Sending..." : "Send Feedback"}
            <HiPaperAirplane />
          </button>

        </form>
      </div>
    </div>
  );
}
