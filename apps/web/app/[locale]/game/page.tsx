import { setRequestLocale } from 'next-intl/server'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import TicTacToeGame from '@/components/game/tic-tac-toe-game'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function GamePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Header />
      <main className="flex min-h-screen items-center justify-center">
        <TicTacToeGame />
      </main>
      <Footer />
    </>
  )
}
