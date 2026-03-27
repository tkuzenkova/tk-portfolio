export type MarkType = 'X' | 'O' | ''
export type MatrixType = MarkType[]
export type WinResult = { mark: MarkType; line: number[] } | null
