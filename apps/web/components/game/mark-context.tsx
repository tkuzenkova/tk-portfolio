'use client'

import { createContext, useState } from 'react'

import type { MarkType, MatrixType } from './types'
import { getMark, getWinner, initialMatrix } from './utils'

export const MarkContext = createContext<{
  currentPlayer: MarkType
  matrix: MatrixType
  toggleMatrix?: (key: number) => void
  getCellValue?: (key: number) => MarkType
  resetMatrix?: () => void
  winner: MarkType | null
  winningLine: number[]
}>({
  currentPlayer: '',
  matrix: initialMatrix,
  winner: null,
  winningLine: [],
})

export function MarkProvider({ children }: { children: React.ReactNode }) {
  const [currentPlayer, setCurrentPlayer] = useState<MarkType>('')
  const [matrix, setMatrix] = useState(initialMatrix)

  const toggleMatrix = (key: number) => {
    if (matrix[key] === '') {
      setMatrix({ ...matrix, [key]: getMark(currentPlayer) })
      setCurrentPlayer((prev) => getMark(prev))
    }
  }

  const getCellValue = (key: number) => matrix[key]

  const resetMatrix = () => {
    setMatrix(initialMatrix)
    setCurrentPlayer('')
  }

  const result = getWinner(matrix)

  return (
    <MarkContext.Provider
      value={{
        currentPlayer,
        matrix,
        toggleMatrix,
        getCellValue,
        resetMatrix,
        winner: result?.mark ?? null,
        winningLine: result?.line ?? [],
      }}
    >
      {children}
    </MarkContext.Provider>
  )
}
