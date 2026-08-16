import Image from "next/image";

type LogoProps = {
  className?: string;
};

export default function Logo({ className = "" }: LogoProps) {
  return (
    <Image
      src="/branding/logo.svg"
      alt="Vishweshwarayya NEET | JEE Academy"
      width={979}
      height={1091}
      priority
      unoptimized
      className={`h-[60px] w-auto md:h-[76px] xl:h-[96px] ${className}`}
    />
  );
}
