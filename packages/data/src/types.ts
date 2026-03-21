export interface Skill {
  name: string
  icon: string
  color: string
}

export interface ExperienceItem {
  role: string
  company: string
  period: string
  project: string
  bullets: string[]
  stack: string[]
  team: string
}

export interface ExpertiseCard {
  title: string
  subtitle: string
  description: string
  icon: string
}

export interface Testimonial {
  text: string
  author: string
  role: string
  company: string
  avatar?: string
}

export interface ContactInfo {
  email: string
  linkedin: string
  github: string
}
