'use client'

import { useContext } from 'react'

import { MarkContext } from './mark-context'
import { Square } from './square'
import { getMark } from './utils'

export function Board() {
  const { currentPlayer, resetMatrix, toggleMatrix, getCellValue, winner, winningLine } =
    useContext(MarkContext)

  const nextPlayerText = getMark(currentPlayer)
  const isBoardFull = Array.from({ length: 9 }, (_, i) => getCellValue?.(i) ?? '').every(
    (v) => v !== '',
  )
  const isDraw = !winner && isBoardFull

  const onClick = (key: number) => {
    if (!winner) toggleMatrix?.(key)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 font-mono text-sm">
        {winner ? (
          <span>
            <span className="text-muted">{'// '}</span>
            <span className="text-primary">winner: </span>
            <span className={winner === 'X' ? 'text-accent' : 'text-accent-2'}>{winner}</span>
          </span>
        ) : isDraw ? (
          <span className="text-muted">{'// draw'}</span>
        ) : (
          <span>
            <span className="text-muted">{'// '}</span>
            <span className="text-muted">next: </span>
            <span className={nextPlayerText === 'X' ? 'text-accent' : 'text-accent-2'}>
              {nextPlayerText}
            </span>
          </span>
        )}
      </div>

      <div
        className={`grid grid-cols-3 gap-2 md:gap-3 ${winner || isDraw ? 'pointer-events-none' : ''}`}
      >
        {Array.from({ length: 9 }, (_, index) => index).map((id) => (
          <Square
            key={id}
            onClick={() => onClick(id)}
            value={getCellValue?.(id) ?? ''}
            isWinning={winningLine.includes(id)}
            winnerMark={winner}
          />
        ))}
      </div>

      <button
        className="group relative mt-6 overflow-hidden rounded-lg border border-accent px-6 py-2.5 font-syne text-sm font-semibold text-primary transition-colors duration-500 hover:text-bg"
        onClick={resetMatrix}
      >
        <span className="relative z-10">Reset</span>
        <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-accent to-accent-2 transition-transform duration-500 ease-out group-hover:translate-x-0" />
      </button>
    </div>
  )
}
