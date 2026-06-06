import Link from "next/link";

export const FeedbackLink = () => {
  return (
    <div style={{ marginTop: "10px", marginBottom: "5px" }}>
      <Link
        href="/feedback"
        style={{
          display: "inline-block",
          marginTop: "8px",
          padding: "6px 12px",
          borderRadius: "8px",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "#00f2ea",
          textDecoration: "none",
          fontSize: "0.85rem",
          transition: "0.2s",
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.background =
            "rgba(0,242,234,0.08)";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.background = "transparent";
        }}
      >
        💬 Send Feedback
      </Link>
    </div>
  );
};
