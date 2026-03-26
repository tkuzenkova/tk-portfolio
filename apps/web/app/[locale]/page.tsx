import { setRequestLocale } from 'next-intl/server'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTopButton } from '@/components/layout/ScrollToTopButton'
import { HeroSection } from '@/components/sections/HeroSection'
import { SkillsCarousel } from '@/components/sections/SkillsCarousel'
import { ExpertiseSection } from '@/components/sections/ExpertiseSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { ContactSection } from '@/components/sections/ContactSection'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function Home({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <SkillsCarousel />
        <ExpertiseSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTopButton />
    </>
  )
}
