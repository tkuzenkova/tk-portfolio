'use client'

import { Board } from './board'
import { MarkProvider } from './mark-context'

export default function TicTacToeGame() {
  return (
    <MarkProvider>
      <div className="flex flex-col items-center gap-4">
        <h2 className="font-syne text-2xl font-semibold text-primary">Tic Tac Toe</h2>
        <Board />
      </div>
    </MarkProvider>
  )
}
