export type AdminNavItem = {
  id: string;
  label: string;
  href: string;
};

export type AdminNavGroup = {
  group: string;
  items: AdminNavItem[];
};

export const ADMIN_NAV_GROUPS: AdminNavGroup[] = [
  {
    group: "CONTENT",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/admin/dashboard" },
      { id: "faculty", label: "Faculty", href: "/admin/dashboard/faculty" },
      { id: "gallery", label: "Gallery", href: "/admin/dashboard/gallery" },
      { id: "infrastructure", label: "Infrastructure", href: "/admin/dashboard/infrastructure" },
      { id: "results", label: "Results", href: "/admin/dashboard/results" },
      { id: "media", label: "Media", href: "/admin/dashboard/media" },
    ],
  },
  {
    group: "ADMISSIONS",
    items: [
      { id: "enquiries", label: "Enquiries", href: "/admin/dashboard/enquiries" },
      { id: "scholarships", label: "Scholarship Applications", href: "/admin/dashboard/scholarships" },
    ],
  },
  {
    group: "SYSTEM",
    items: [
      { id: "staff", label: "Staff", href: "/admin/dashboard/staff" },
      { id: "settings", label: "Settings", href: "/admin/dashboard/settings" },
    ],
  },
];

export const ADMIN_NAV_ITEMS: AdminNavItem[] = ADMIN_NAV_GROUPS.flatMap((g) => g.items);
