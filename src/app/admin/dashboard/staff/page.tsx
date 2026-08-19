import AdminModulePlaceholder from "@/components/admin/AdminModulePlaceholder";
import { StaffIcon } from "@/components/admin/icons";

export default function AdminStaffPage() {
  return (
    <AdminModulePlaceholder
      title="Staff"
      description="Staff account management will appear here."
      icon={StaffIcon}
    />
  );
}
