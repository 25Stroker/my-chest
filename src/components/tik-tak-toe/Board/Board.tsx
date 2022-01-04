import React, { useEffect, useState, useRef } from 'react';
import Square from '../../common/Square/Square';

import { 
  STATUS_NOT_OCCUPIED, 
  STATUS_PLAYER_1, 
  STATUS_PLAYER_2 
} from '../../constant/ui';

import './Board.css'

const initStatus: number[] = new Array(9).fill(-1);

function Board() {
  const [status, setStatus] = useState(initStatus);
  const [xIsNext, setXIsNext] = useState(true);
  const titleElement = useRef<HTMLDivElement>(null);
  const winner = getWinner(status);

  function handleClick(index: number) {
    if (status[index] !== STATUS_NOT_OCCUPIED) {
      return;
    }
    const nextStatus = status.slice();
    nextStatus[index] = xIsNext ? STATUS_PLAYER_1 : STATUS_PLAYER_2;
    setStatus(nextStatus);
    setXIsNext(!xIsNext);
  }

  function renderSquareByStatus(index: number) {
    return (
      <Square handleClick={() => handleClick(index)} status={status[index]} />
    );
  }

  function getWinner(status:number[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let winner = -1;
    lines.forEach(line => {
      const [a, b, c] =line;
      if (status[a] !== -1 && status[a] === status[b] && status[a] === status[c]) {
        winner = status[a];
      }
    })
    return winner;
  }

  useEffect(() => {
    let statusStr:string;
    if (titleElement.current) {
      if (winner === -1) {
        statusStr = `Next Player ${xIsNext ? 'X' : 'O'}`;
      } else {
        statusStr = `Winner is player ${winner ? 'O' : 'X'}`;
      }
      titleElement.current.innerText = statusStr;
    }
  })

  return (
    <div className="board">
      <div className='status' ref={titleElement}></div>
      <div className='board-row'>
        {renderSquareByStatus(0)}
        {renderSquareByStatus(1)}
        {renderSquareByStatus(2)}
      </div>
      <div className='board-row'>
        {renderSquareByStatus(3)}
        {renderSquareByStatus(4)}
        {renderSquareByStatus(5)}
      </div>
      <div className='board-row'>
        {renderSquareByStatus(6)}
        {renderSquareByStatus(7)}
        {renderSquareByStatus(8)}
      </div>
    </div>
  );
}

export default Board;