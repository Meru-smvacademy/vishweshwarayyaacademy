import Image from "next/image";

type BrandIdentityProps = {
  className?: string;
};

export default function BrandIdentity({ className = "" }: BrandIdentityProps) {
  return (
    <div className={`flex w-[260px] items-center gap-3 md:w-[320px] xl:w-[360px] ${className}`}>
      <Image
        src="/branding/logo.svg"
        alt=""
        width={979}
        height={1091}
        priority
        unoptimized
        className="h-[48px] w-auto shrink-0 md:h-[56px] xl:h-[64px]"
      />
      <div className="flex flex-col justify-center">
        <span className="whitespace-nowrap font-manrope text-[22px] font-extrabold leading-[0.98] tracking-[-0.028em] -ml-[0.055em] text-brand-heading [font-feature-settings:'kern'_1] md:text-[28px] xl:text-[32px]">
          VISHWESHWARAYYA
        </span>
        <span className="mt-[5px] whitespace-nowrap font-manrope text-[12px] font-extrabold leading-none tracking-[0.2835em] -mr-[0.2835em] text-brand-tagline md:mt-[6px] md:text-[14px] xl:mt-[7px] xl:text-[15px]">
          NEET | JEE ACADEMY
        </span>
      </div>
    </div>
  );
}
