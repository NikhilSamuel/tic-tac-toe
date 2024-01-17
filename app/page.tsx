"use client"
import { useState } from "react";

const squareStyles = " w-20 h-20 -mr-px -mt-px text-center float-left text-xl font-bold border-4 border-solid border-red p-0";
const boardRowStyles = "after:table after:clear-both after:content-['']";

interface Square {
  value: string;
  onSquareClick: any;
  highLightBorder: any;
}

interface Board {
  xIsNext?: boolean;
  onPlay?: any;
  squares?: any[]
}

export default function TicTacToe() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0)
  const currentSqaures = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares: any) {
    const nextHistory = [...history?.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory?.length - 1)
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove)
  }

  const moves = history?.map((_squares, move) => {
    let desc;
    if (move > 0) {
      desc = 'Go to move #' + move;
    }
    else {
      desc = 'Go to Game Start'
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  })

  return (
    <div className="flex flex-row ">
      <div>
        <Board
          xIsNext={xIsNext}
          onPlay={handlePlay}
          squares={currentSqaures}
        />
      </div>
      <div className="mt-10 ml-20 font-bold text-xl">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}
function Square({ value, onSquareClick, highLightBorder }: Square) {
  let borderColorWinner = '', valueColor = '';
  value === 'O' ? (valueColor = 'text-orange-600') : (valueColor = 'text-green-600');
  if (highLightBorder) {
    borderColorWinner = 'border-indigo-500'
  }
  return <button className={`${squareStyles} ${borderColorWinner} ${valueColor}`} onClick={onSquareClick}>{value} </button>
}
function calculateWinner(squares: any) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for(let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && (squares[a] === squares[b] && squares[a] === squares[c])) {
      return [squares[a], [a,b,c]];
    }
  };
  return null;
}
function Board({ xIsNext, onPlay, squares }: Board) {
  function handleClick(i: number) {
    if (squares![i] || calculateWinner(squares)) return;
    const nextSquares = squares!.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    }
    else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares)
  }

  const [winner, line] = calculateWinner(squares) || [];
  const draw = squares?.map(square => Boolean(square))
  let status, statusColor = '';
  if (winner) {
    status = `Winner: ${winner}`;
    statusColor = 'text-blue-600'
  }
  else if(draw?.includes(false)) {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    statusColor = 'text-green-600'
  }
  else {
    status = ' Game Draw Monu'
    statusColor = 'text-red-600'
  }

  return <>
    <div className={`${statusColor} mb-4 text-2xl`}>{status}</div>
    <div className={boardRowStyles}>
      <Square value={squares![0]} onSquareClick={() => handleClick(0)} highLightBorder={line?.includes?.(0)} />
      <Square value={squares![1]} onSquareClick={() => handleClick(1)} highLightBorder={line?.includes?.(1)} />
      <Square value={squares![2]} onSquareClick={() => handleClick(2)} highLightBorder={line?.includes?.(2)} />
    </div>
    <div className={boardRowStyles}>
      <Square value={squares![3]} onSquareClick={() => handleClick(3)} highLightBorder={line?.includes?.(3)} />
      <Square value={squares![4]} onSquareClick={() => handleClick(4)} highLightBorder={line?.includes?.(4)} />
      <Square value={squares![5]} onSquareClick={() => handleClick(5)} highLightBorder={line?.includes?.(5)} />
    </div>
    <div className={boardRowStyles}>
      <Square value={squares![6]} onSquareClick={() => handleClick(6)} highLightBorder={line?.includes?.(6)} />
      <Square value={squares![7]} onSquareClick={() => handleClick(7)} highLightBorder={line?.includes?.(7)} />
      <Square value={squares![8]} onSquareClick={() => handleClick(8)} highLightBorder={line?.includes?.(8)} />
    </div>
  </>;
}
