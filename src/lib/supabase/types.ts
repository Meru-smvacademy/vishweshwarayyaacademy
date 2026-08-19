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
