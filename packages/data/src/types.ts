export interface Skill {
  name: string
  icon: string
  color: string
}

export interface ExpertiseCardMeta {
  icon: string
}

export interface ExperienceItemMeta {
  period: string
  stack?: string[]
  team?: string
}

export interface TestimonialMeta {
  author: string
}

export interface ContactInfo {
  linkedin: string
  github: string
}
