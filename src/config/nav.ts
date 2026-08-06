export type NavChild = {
  label: string;
  href: string;
  isExternal?: boolean;
};

export type NavLink = {
  label: string;
  href: string;
  isExternal?: boolean;
  prominent?: boolean;
  children?: NavChild[];
  desktopPrimary?: boolean;
};

export const KRITPREP_URL = process.env.NEXT_PUBLIC_KRITPREP_URL || "#";
export const ACADEMY_PHONE = process.env.NEXT_PUBLIC_ACADEMY_PHONE || "";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/", desktopPrimary: true },
  { label: "About", href: "/about", desktopPrimary: true },
  { label: "Courses", href: "/courses", desktopPrimary: true },
  { label: "Admissions", href: "/admissions", desktopPrimary: true },
  { label: "Our Team", href: `${KRITPREP_URL}/our-team`, isExternal: true },
  { label: "SNT Scholarship", href: "/scholarship" },
  { label: "Hostel", href: "/hostel" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact", desktopPrimary: true },
  { label: "KRITPrep", href: KRITPREP_URL, isExternal: true, prominent: true },
];

export const PRIMARY_CTA_LABEL = "Admission Enquiry";
export const PRIMARY_CTA_HREF = "/admission-enquiry";

export type FooterLinkGroup = {
  heading: string;
  links: NavChild[];
};

export const FOOTER_LINK_GROUPS: FooterLinkGroup[] = [
  {
    heading: "About",
    links: [
      { label: "Institution", href: "/about" },
      { label: "Our Team", href: `${KRITPREP_URL}/our-team`, isExternal: true },
      { label: "Campus", href: "/about/infrastructure" },
      { label: "Hostel", href: "/hostel" },
      { label: "Gallery", href: "/gallery" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "Programs",
    links: [{ label: "Courses", href: "/courses" }],
  },
  {
    heading: "Admissions",
    links: [
      { label: "Apply Now", href: PRIMARY_CTA_HREF },
      { label: "SNT Scholarship", href: "/scholarship" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
