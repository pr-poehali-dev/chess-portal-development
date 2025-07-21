import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'

type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn' | null
type PieceColor = 'white' | 'black'

interface ChessPiece {
  type: PieceType
  color: PieceColor | null
}

type BoardPosition = ChessPiece | null

interface Position {
  row: number
  col: number
}

const initialBoard: BoardPosition[][] = [
  // Черные фигуры (ряд 0)
  [
    { type: 'rook', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'queen', color: 'black' },
    { type: 'king', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'rook', color: 'black' }
  ],
  // Черные пешки (ряд 1)
  Array(8).fill({ type: 'pawn', color: 'black' }),
  // Пустые ряды (2-5)
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  // Белые пешки (ряд 6)
  Array(8).fill({ type: 'pawn', color: 'white' }),
  // Белые фигуры (ряд 7)
  [
    { type: 'rook', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'queen', color: 'white' },
    { type: 'king', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'rook', color: 'white' }
  ]
]

const pieceEmojis = {
  white: {
    king: '♔',
    queen: '♕',
    rook: '♖',
    bishop: '♗',
    knight: '♘',
    pawn: '♙'
  },
  black: {
    king: '♚',
    queen: '♛',
    rook: '♜',
    bishop: '♝',
    knight: '♞',
    pawn: '♟'
  }
}

export default function ChessBoard() {
  const [board, setBoard] = useState<BoardPosition[][]>(initialBoard)
  const [selectedSquare, setSelectedSquare] = useState<Position | null>(null)
  const [currentPlayer, setCurrentPlayer] = useState<PieceColor>('white')
  const [moveHistory, setMoveHistory] = useState<string[]>([])

  const isSquareLight = (row: number, col: number): boolean => {
    return (row + col) % 2 === 0
  }

  const getSquareName = (row: number, col: number): string => {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1']
    return files[col] + ranks[row]
  }

  // Проверка препятствий на пути
  const isPathClear = (fromRow: number, fromCol: number, toRow: number, toCol: number): boolean => {
    const rowDiff = Math.abs(toRow - fromRow)
    const colDiff = Math.abs(toCol - fromCol)
    
    if (rowDiff === 0 && colDiff === 0) return false
    
    const rowStep = toRow > fromRow ? 1 : toRow < fromRow ? -1 : 0
    const colStep = toCol > fromCol ? 1 : toCol < fromCol ? -1 : 0
    
    let currentRow = fromRow + rowStep
    let currentCol = fromCol + colStep
    
    while (currentRow !== toRow || currentCol !== toCol) {
      if (board[currentRow][currentCol] !== null) {
        return false
      }
      currentRow += rowStep
      currentCol += colStep
    }
    
    return true
  }

  // Валидация ходов для каждой фигуры
  const isValidMove = (piece: ChessPiece, fromRow: number, fromCol: number, toRow: number, toCol: number): boolean => {
    if (!piece || !piece.type) return false
    
    const rowDiff = Math.abs(toRow - fromRow)
    const colDiff = Math.abs(toCol - fromCol)
    const rowDirection = toRow - fromRow
    const colDirection = toCol - fromCol
    
    switch (piece.type) {
      case 'pawn':
        const direction = piece.color === 'white' ? -1 : 1
        const startRow = piece.color === 'white' ? 6 : 1
        
        // Движение вперед
        if (colDiff === 0 && board[toRow][toCol] === null) {
          if (rowDirection === direction) return true // На одну клетку
          if (fromRow === startRow && rowDirection === 2 * direction) return true // На две клетки с начальной позиции
        }
        
        // Атака по диагонали
        if (colDiff === 1 && rowDirection === direction && board[toRow][toCol] !== null) {
          return board[toRow][toCol]?.color !== piece.color
        }
        
        return false
        
      case 'rook':
        if (rowDiff === 0 || colDiff === 0) {
          return isPathClear(fromRow, fromCol, toRow, toCol)
        }
        return false
        
      case 'bishop':
        if (rowDiff === colDiff && rowDiff > 0) {
          return isPathClear(fromRow, fromCol, toRow, toCol)
        }
        return false
        
      case 'queen':
        if ((rowDiff === 0 || colDiff === 0) || (rowDiff === colDiff && rowDiff > 0)) {
          return isPathClear(fromRow, fromCol, toRow, toCol)
        }
        return false
        
      case 'knight':
        return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)
        
      case 'king':
        return rowDiff <= 1 && colDiff <= 1 && (rowDiff > 0 || colDiff > 0)
        
      default:
        return false
    }
  }

  // Подсветка возможных ходов
  const getPossibleMoves = (row: number, col: number): Position[] => {
    const piece = board[row][col]
    if (!piece) return []
    
    const possibleMoves: Position[] = []
    
    for (let toRow = 0; toRow < 8; toRow++) {
      for (let toCol = 0; toCol < 8; toCol++) {
        if (toRow === row && toCol === col) continue
        
        const targetPiece = board[toRow][toCol]
        if (targetPiece && targetPiece.color === piece.color) continue
        
        if (isValidMove(piece, row, col, toRow, toCol)) {
          possibleMoves.push({ row: toRow, col: toCol })
        }
      }
    }
    
    return possibleMoves
  }

  const handleSquareClick = (row: number, col: number) => {
    const clickedPiece = board[row][col]

    if (selectedSquare === null) {
      // Выбираем фигуру, если она принадлежит текущему игроку
      if (clickedPiece && clickedPiece.color === currentPlayer) {
        setSelectedSquare({ row, col })
      }
    } else {
      // Проверяем, кликнули ли на ту же клетку
      if (selectedSquare.row === row && selectedSquare.col === col) {
        setSelectedSquare(null)
        return
      }

      // Получаем выбранную фигуру
      const selectedPiece = board[selectedSquare.row][selectedSquare.col]
      
      if (selectedPiece && selectedPiece.color === currentPlayer) {
        // Проверяем, можно ли сделать ход (включая правила шахмат)
        const isTargetEmpty = !clickedPiece
        const isTargetEnemy = clickedPiece && clickedPiece.color !== currentPlayer
        const isMoveValid = isValidMove(selectedPiece, selectedSquare.row, selectedSquare.col, row, col)
        
        if ((isTargetEmpty || isTargetEnemy) && isMoveValid) {
          // Делаем ход
          const newBoard = board.map(row => row.slice())
          newBoard[row][col] = selectedPiece
          newBoard[selectedSquare.row][selectedSquare.col] = null
          
          setBoard(newBoard)
          
          // Добавляем ход в историю с информацией о взятии
          const captureSymbol = clickedPiece ? 'x' : '-'
          const moveNotation = `${getSquareName(selectedSquare.row, selectedSquare.col)}${captureSymbol}${getSquareName(row, col)}`
          setMoveHistory(prev => [...prev, moveNotation])
          
          // Меняем игрока
          setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white')
        }
      }
      
      setSelectedSquare(null)
    }
  }

  const resetGame = () => {
    setBoard(initialBoard)
    setSelectedSquare(null)
    setCurrentPlayer('white')
    setMoveHistory([])
  }

  const isSquareSelected = (row: number, col: number): boolean => {
    return selectedSquare !== null && selectedSquare.row === row && selectedSquare.col === col
  }

  const isPossibleMove = (row: number, col: number): boolean => {
    if (!selectedSquare) return false
    const possibleMoves = getPossibleMoves(selectedSquare.row, selectedSquare.col)
    return possibleMoves.some(move => move.row === row && move.col === col)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto p-4">
      {/* Шахматная доска */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-playful text-2xl text-primary">Шахматная доска</h3>
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold">
              Ход: <span className={currentPlayer === 'white' ? 'text-blue-600' : 'text-gray-800'}>
                {currentPlayer === 'white' ? 'Белые' : 'Черные'}
              </span>
            </span>
            <Button onClick={resetGame} variant="outline" size="sm">
              <Icon name="RotateCcw" className="mr-2 h-4 w-4" />
              Заново
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-8 gap-0 border-4 border-gray-800 rounded-lg overflow-hidden shadow-xl">
          {board.map((row, rowIndex) =>
            row.map((piece, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`
                  aspect-square flex items-center justify-center cursor-pointer text-4xl md:text-5xl
                  transition-all duration-200 hover:scale-110 relative
                  ${isSquareLight(rowIndex, colIndex) 
                    ? 'bg-amber-100 hover:bg-amber-200' 
                    : 'bg-amber-800 hover:bg-amber-700'
                  }
                  ${isSquareSelected(rowIndex, colIndex) 
                    ? 'ring-4 ring-primary bg-primary/20' 
                    : ''
                  }
                  ${isPossibleMove(rowIndex, colIndex) 
                    ? 'ring-2 ring-green-400 bg-green-100/50' 
                    : ''
                  }
                `}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
              >
                {piece && piece.type && (
                  <span 
                    className={`
                      select-none transition-transform duration-200
                      ${piece.color === 'white' ? 'text-white drop-shadow-lg' : 'text-black drop-shadow-lg'}
                      hover:scale-110
                    `}
                    style={{
                      filter: piece.color === 'white' 
                        ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))' 
                        : 'drop-shadow(0 2px 4px rgba(255,255,255,0.8))'
                    }}
                  >
                    {pieceEmojis[piece.color][piece.type]}
                  </span>
                )}
                
                {/* Координаты доски */}
                {colIndex === 0 && (
                  <span className="absolute top-1 left-1 text-xs font-bold text-gray-600">
                    {8 - rowIndex}
                  </span>
                )}
                {rowIndex === 7 && (
                  <span className="absolute bottom-1 right-1 text-xs font-bold text-gray-600">
                    {String.fromCharCode(97 + colIndex)}
                  </span>
                )}
              </div>
            ))
          )}
        </div>
        
        {/* Подсказки */}
        <div className="mt-4 text-center space-y-2">
          <p className="text-sm text-gray-600">
            {selectedSquare 
              ? `Выбрана клетка: ${getSquareName(selectedSquare.row, selectedSquare.col)}` 
              : 'Кликните на фигуру, чтобы выбрать её'
            }
          </p>
          {selectedSquare && (
            <p className="text-xs text-green-600 font-semibold">
              💡 Зелёная подсветка показывает возможные ходы
            </p>
          )}
        </div>
      </Card>

      {/* Панель управления */}
      <div className="space-y-6 lg:min-w-[300px]">
        {/* Информация об игре */}
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10">
          <h4 className="font-playful text-xl mb-4">Информация об игре</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Текущий ход:</span>
              <span className={`font-semibold ${currentPlayer === 'white' ? 'text-blue-600' : 'text-gray-800'}`}>
                {currentPlayer === 'white' ? 'Белые ♔' : 'Черные ♚'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Сделано ходов:</span>
              <span className="font-semibold">{moveHistory.length}</span>
            </div>
            {selectedSquare && (
              <div className="flex justify-between">
                <span>Выбрана:</span>
                <span className="font-semibold">{getSquareName(selectedSquare.row, selectedSquare.col)}</span>
              </div>
            )}
          </div>
        </Card>

        {/* История ходов */}
        <Card className="p-6 bg-gradient-to-br from-accent/10 to-primary/10">
          <h4 className="font-playful text-xl mb-4">История ходов</h4>
          <div className="max-h-40 overflow-y-auto">
            {moveHistory.length === 0 ? (
              <p className="text-gray-500 text-sm">Пока ходов не было</p>
            ) : (
              <div className="space-y-1">
                {moveHistory.map((move, index) => (
                  <div key={index} className="text-sm font-mono bg-white/50 rounded px-2 py-1">
                    {index + 1}. {move}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Управление игрой */}
        <Card className="p-6">
          <h4 className="font-playful text-xl mb-4">Управление</h4>
          <div className="space-y-3">
            <Button onClick={resetGame} className="w-full bg-secondary hover:bg-secondary/90 text-black">
              <Icon name="RotateCcw" className="mr-2 h-4 w-4" />
              Начать заново
            </Button>
            <Button variant="outline" className="w-full">
              <Icon name="Save" className="mr-2 h-4 w-4" />
              Сохранить партию
            </Button>
            <Button variant="outline" className="w-full">
              <Icon name="Share2" className="mr-2 h-4 w-4" />
              Пригласить друга
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}