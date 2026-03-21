import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTopButton } from '@/components/layout/ScrollToTopButton'
import { HeroSection } from '@/components/sections/HeroSection'
import { SkillsCarousel } from '@/components/sections/SkillsCarousel'
import { ExpertiseSection } from '@/components/sections/ExpertiseSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { ContactSection } from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <>
      <Header />
      <main>
<HeroSection />
        <SkillsCarousel />
        <ExpertiseSection />
        <ExperienceSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTopButton />
    </>
  )
}
