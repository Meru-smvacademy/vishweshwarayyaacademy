export type Faculty = {
  id: string;
  name: string;
  designation: string;
  subject: string | null;
  qualification: string | null;
  experience: string | null;
  bio: string | null;
  photo_path: string | null;
  campus: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type GalleryPhoto = {
  id: string;
  title: string;
  category: string;
  academic_year: string | null;
  campus: string | null;
  description: string | null;
  photo_path: string;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type InfrastructureItem = {
  id: string;
  title: string;
  category: string;
  campus: string | null;
  description: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type InfrastructurePhoto = {
  id: string;
  infrastructure_id: string;
  photo_path: string;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type Enquiry = {
  id: string;
  reference_no: string;
  student_name: string;
  parent_name: string;
  phone: string;
  qualification: string;
  program: string;
  message: string | null;
  status: string;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
};

export type ScholarshipApplication = {
  id: string;
  reference_no: string;
  student_name: string;
  applying_for: string;
  education_completed: string;
  school_college_name: string;
  native_place: string;
  phone: string;
  academic_year: string;
  status: string;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
};

export type SntRegistration = {
  id: string;
  hall_ticket_no: string | null;
  student_name: string;
  applying_for: string;
  /** Class the student is currently studying in (historical column name); see sntClassLabel. */
  education_completed: string;
  medium: string;
  school_name: string;
  native_place: string;
  phone: string;
  whatsapp: string;
  parent_name: string;
  dob: string;
  academic_year: string;
  centre: string;
  photo_path: string;
  consent_given: boolean;
  consent_at: string;
  status: "pending" | "paid" | "failed";
  amount_paise: number;
  order_id: string | null;
  payment_id: string | null;
  transfer_id: string | null;
  razorpay_fee_paise: number | null;
  razorpay_tax_paise: number | null;
  transfer_amount_paise: number | null;
  transfer_status: "pending" | "processing" | "done" | "failed" | null;
  transfer_attempts: number;
  transfer_last_error: string | null;
  created_at: string;
  paid_at: string | null;
};
