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
};

export const KRITPREP_URL = process.env.NEXT_PUBLIC_KRITPREP_URL || "#";
export const ACADEMY_PHONE = process.env.NEXT_PUBLIC_ACADEMY_PHONE || "";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Courses",
    href: "/courses",
    children: [
      { label: "NEET", href: "/courses/neet" },
      { label: "JEE", href: "/courses/jee" },
      { label: "KCET", href: "/courses/kcet" },
      { label: "Foundation", href: "/courses/foundation" },
    ],
  },
  { label: "Our Team", href: `${KRITPREP_URL}/our-team`, isExternal: true },
  { label: "Results", href: "/results" },
  { label: "Success Stories", href: "/results/stories" },
  { label: "SNT Scholarship", href: "/scholarship" },
  { label: "Tribute Story", href: "/tribute" },
  { label: "Hostel", href: "/hostel" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
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
      { label: "Tribute Story", href: "/tribute" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    heading: "Programs",
    links: [
      { label: "NEET", href: "/courses/neet" },
      { label: "JEE", href: "/courses/jee" },
      { label: "KCET", href: "/courses/kcet" },
      { label: "Foundation", href: "/courses/foundation" },
    ],
  },
  {
    heading: "Admissions",
    links: [
      { label: "Apply Now", href: PRIMARY_CTA_HREF },
      { label: "Results", href: "/results" },
      { label: "Success Stories", href: "/results/stories" },
      { label: "SNT Scholarship", href: "/scholarship" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
