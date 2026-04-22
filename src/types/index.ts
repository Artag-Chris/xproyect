export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  technologies: string[];
  link?: string;
  date: string;
}

export interface Metric {
  label: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
