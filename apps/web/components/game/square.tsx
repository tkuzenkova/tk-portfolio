import type { MarkType } from './types'

export function Square({
  onClick,
  value,
  isWinning,
  winnerMark,
}: {
  onClick: () => void
  value: MarkType
  isWinning: boolean
  winnerMark: MarkType | null
}) {
  const markColor = value === 'X' ? 'text-accent' : value === 'O' ? 'text-accent-2' : ''

  const winGlow =
    isWinning && winnerMark === 'X'
      ? 'border-accent shadow-[0_0_20px_var(--accent)] animate-pulse'
      : isWinning && winnerMark === 'O'
        ? 'border-accent-2 shadow-[0_0_20px_var(--accent-2)] animate-pulse'
        : ''

  const hoverStyle = !value ? 'hover:border-accent/40 hover:bg-white/[0.03] cursor-pointer' : ''

  return (
    <div
      className={`flex h-20 w-20 items-center justify-center rounded-lg border border-border bg-surface font-syne text-3xl font-bold transition-all duration-200 select-none md:h-24 md:w-24 md:text-4xl ${markColor} ${winGlow} ${hoverStyle}`}
      onClick={onClick}
    >
      {value}
    </div>
  )
}
