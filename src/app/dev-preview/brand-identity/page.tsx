import BrandIdentity from "@/components/layout/BrandIdentity";

export default function BrandIdentityPreviewPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-muted p-8">
      <div className="border border-dashed border-line bg-surface p-6">
        <BrandIdentity />
      </div>
    </div>
  );
}
