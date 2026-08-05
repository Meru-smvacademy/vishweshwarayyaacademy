import Image from "next/image";

export default function HeroIllustrationPreviewPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-muted p-8">
      <div className="border border-dashed border-line bg-surface p-6">
        <Image
          src="/images/hero/hero-illustration.png"
          alt=""
          width={5504}
          height={3072}
          priority
          className="h-auto w-full max-w-3xl"
        />
      </div>
    </div>
  );
}
