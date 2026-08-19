import AdminModulePlaceholder from "@/components/admin/AdminModulePlaceholder";
import { SettingsIcon } from "@/components/admin/icons";

export default function AdminSettingsPage() {
  return (
    <AdminModulePlaceholder
      title="Settings"
      description="Admin dashboard settings will appear here."
      icon={SettingsIcon}
    />
  );
}
