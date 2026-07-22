import { LucideIcon } from "lucide-react";

export interface NavigationItem {
  title: string;
  href: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface SocialItem {
  title: string;
  href: string;
  icon: LucideIcon;
}
