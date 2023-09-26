import { Square } from '../Square/Square';
import './Board.css';

export const Board = ({ squares, onClick, turn, winningSquares }) => {
  /* Función para crear el Square a partir de un mapeo  */
  const createSquares = (values) =>
    values.map((value) => (
      <Square
        winner={winningSquares.includes(value)}
        turn={turn}
        onClick={() => onClick(value)}
        value={squares[value]}
        key={`square_${value}`}
      />
    ));

  return (
    <div className='board'>
      <div className='row'>{createSquares([0, 1, 2])}</div>
      <div className='row'>{createSquares([3, 4, 5])}</div>
      <div className='row'>{createSquares([6, 7, 8])}</div>
    </div>
  );
};
