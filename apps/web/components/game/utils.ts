import type { MarkType, MatrixType, WinResult } from './types'

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
]

export const getWinner = (matrix: MatrixType): WinResult => {
  for (const [a, b, c] of lines) {
    const set = new Set([matrix[a], matrix[b], matrix[c]])

    if (set.size === 1 && !set.has('')) {
      return { mark: matrix[a], line: [a, b, c] }
    }
  }

  return null
}

export const getMark = (mark: MarkType): MarkType => {
  switch (mark) {
    case '':
      return 'X'
    case 'X':
      return 'O'
    case 'O':
      return 'X'
    default:
      return ''
  }
}

export const initialMatrix: MatrixType = Array(9).fill('')
