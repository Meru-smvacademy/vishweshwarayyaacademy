import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/config/nav";

type BranchCardProps = {
  name: string;
  description: string;
  image: string;
  imageAlt: string;
};

export default function BranchCard({ name, description, image, imageAlt }: BranchCardProps) {
  return (
    <div className="group flex h-auto min-h-[260px] flex-1 items-center gap-4 rounded-[28px] border border-scholarship-navy/5 bg-white p-6 shadow-[0px_16px_20px_0px_rgba(22,58,99,0.08)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_22px_26px_0px_rgba(22,58,99,0.14)] sm:h-[260px]">
      <div className="flex h-full min-w-0 flex-1 flex-col justify-between gap-6">
        <div className="flex flex-col gap-2">
          <p className="truncate font-manrope text-[20px] font-extrabold text-scholarship-navy">
            📍 {name}
          </p>
          <p className="text-[14px] font-medium leading-[1.3] text-[#515d6e]">{description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/about/infrastructure"
            className="inline-flex items-center gap-1.5 rounded-sm py-2 text-[14px] font-extrabold text-scholarship-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            View Campus
            <ArrowRightIcon className="h-3 w-3 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
          </Link>
          <Link
            href={PRIMARY_CTA_HREF}
            className="inline-flex items-center gap-1.5 rounded-full border border-scholarship-gold/20 bg-scholarship-gold/[0.08] px-2.5 py-1.5 text-[12px] font-bold text-scholarship-gold transition-colors duration-300 ease-out hover:bg-scholarship-gold/[0.16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            {PRIMARY_CTA_LABEL}
            <ArrowRightIcon className="h-3 w-3" />
          </Link>
        </div>
      </div>

      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl sm:h-[220px] sm:w-[220px]">
        <Image src={image} alt={imageAlt} fill className="object-cover" />
      </div>
    </div>
  );
}
