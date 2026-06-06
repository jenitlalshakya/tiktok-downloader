import { useRouter } from "next/navigation";
import { IconType } from "react-icons";
import { HiArrowLeft } from "react-icons/hi2";

type FeedbackTypeButtonProps = {
  label: string;
  icon: IconType;
  active: boolean;
  onClick: () => void;
};

export const BacktrackButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/")}
      title="Go to home"
      aria-label="Go to home"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "white",
        padding: "10px",
        borderRadius: "10px",
        cursor: "pointer",
        minWidth: "42px",
        minHeight: "42px",
      }}
    >
      <HiArrowLeft size={20} />
    </button>
  );
}

export const FeedbackTypeButton = ({
  label,
  icon: Icon,
  active,
  onClick,
}: FeedbackTypeButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        flex: 1,
        minWidth: "120px",
        padding: "12px",
        borderRadius: "12px",
        border: active
          ? "1px solid #00f2ea"
          : "1px solid rgba(255,255,255,0.12)",
        background: active
          ? "rgba(0,242,234,0.08)"
          : "rgba(255,255,255,0.03)",
        color: "white",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "6px",
      }}
    >
      <Icon size={20} />
      <span style={{ fontSize: "0.75rem" }}>{label}</span>
    </button>
  );
}
