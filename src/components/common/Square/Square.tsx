import React from 'react';

import { 
  STATUS_NOT_OCCUPIED, 
  STATUS_PLAYER_1, 
  STATUS_PLAYER_2 
} from '../../constant/ui';

import './Square.css';
interface SquareProps {
  status?: number,
  handleClick: any,
}

function getSquareContent(status: number) {
  if (status === STATUS_NOT_OCCUPIED) {
    return null;
  } else if (status === STATUS_PLAYER_1) {
    return '❌';
  } else if (status === STATUS_PLAYER_2) {
    return '🟢';
  }
}

function Square( { handleClick, status=-1 }: SquareProps) { 
  return (
    <button className="square" aria-label="quare-button" onClick={handleClick}>
        { getSquareContent(status) }
    </button>
  );
}

export default Square;