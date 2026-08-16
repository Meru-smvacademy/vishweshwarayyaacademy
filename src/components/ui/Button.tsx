import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "outlineInverse"
  | "scholarshipPrimary"
  | "scholarshipOutline"
  | "headerPrimary";

type BaseProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonProps = LinkButtonProps | NativeButtonProps;

const baseClasses =
  "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

const variantClasses: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-light",
  secondary: "bg-accent text-primary hover:bg-accent-light",
  outline: "border border-line text-ink hover:bg-surface-muted",
  outlineInverse: "border border-white/40 text-white hover:bg-white/10",
  scholarshipPrimary:
    "bg-gradient-to-b from-scholarship-navy-light to-scholarship-navy text-white !rounded-2xl !px-11 !text-base !transition-all !duration-300 ease-out shadow-[0_10px_12px_-8px_rgba(0,0,0,0.078),inset_0_1px_1px_rgba(255,255,255,0.125)] hover:from-scholarship-navy hover:to-scholarship-navy hover:shadow-[0_14px_18px_-8px_rgba(0,0,0,0.16),inset_0_1px_1px_rgba(255,255,255,0.125)]",
  scholarshipOutline:
    "group border-[1.5px] border-scholarship-navy bg-transparent text-scholarship-navy !rounded-2xl !px-9 !text-base !transition-all !duration-300 ease-out hover:bg-scholarship-navy/5",
  headerPrimary:
    "group bg-header-navy text-white !rounded-[6px] !border-b-[1.5px] !border-header-amber/45 !px-[38px] !py-3 !text-[15px] !tracking-[0.4px] shadow-[0px_2px_3px_0px_rgba(23,31,56,0.14)] !transition-all !duration-300 ease-out hover:!bg-[#0e1526] hover:-translate-y-0.5 hover:shadow-[0px_6px_14px_0px_rgba(23,31,56,0.28)]",
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  href,
  ...props
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    if (href.startsWith("/")) {
      return (
        <Link
          href={href}
          className={classes}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </Link>
      );
    }

    return (
      <a href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
