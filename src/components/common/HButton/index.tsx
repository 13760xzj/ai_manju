import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./index.css";

export interface HButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "small" | "medium" | "large";
  children: ReactNode;
  loading?: boolean;
}

export function HButton({
  variant = "primary",
  size = "medium",
  children,
  loading = false,
  className = "",
  disabled,
  ...props
}: HButtonProps) {
  const classes = [
    "btn",
    `btn-${variant}`,
    `btn-${size}`,
    className,
    loading ? "btn-loading" : "",
    disabled ? "btn-disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading ? <span className="btn-spinner"></span> : null}
      {children}
    </button>
  );
}
