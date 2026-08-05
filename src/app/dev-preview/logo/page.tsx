import Logo from "@/components/layout/Logo";

export default function LogoPreviewPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-muted p-8">
      <div className="border border-dashed border-line bg-surface p-6">
        <Logo />
      </div>
    </div>
  );
}
