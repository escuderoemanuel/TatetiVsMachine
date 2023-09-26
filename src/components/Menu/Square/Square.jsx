import './Square.css';
import classNames from 'classnames';

export const Square = ({ value, onClick, turn, winner }) => {
  /* Chequea si es el turno de alguien y el valor es null antes de modificarlo */
  const handleClick = () => {
    turn !== null && value === null && onClick();
  };

  /* Clases condicionales */
  const squareClass = classNames({
    square: true,
    [`square${value}`]: value !== null,
    winner: winner,
  });
  return <div className={squareClass} onClick={() => handleClick()}></div>;
};
