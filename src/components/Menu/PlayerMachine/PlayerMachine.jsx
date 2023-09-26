import { useState, useEffect } from 'react';
import { Board } from '../Board/Board';
import '../Menu.css';
import { ScoreBoard } from '../ScoreBoard/ScoreBoard';
import confetti from 'canvas-confetti';

const WINNER_COMBOS = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals
  [0, 4, 8],
  [2, 4, 6],
];

const getRandomEmptySquare = (squares) => {
  const emptySquares = squares.reduce((acc, value, index) => {
    if (value === null) {
      acc.push(index);
    }
    return acc;
  }, []);
  const randomIndex = Math.floor(Math.random() * emptySquares.length);
  return emptySquares[randomIndex];
};

export const PlayerMachine = () => {
  /* Estado del Turno */
  const [turn, setTurn] = useState('X');

  /* Estado de cada Square */
  const [squares, setSquares] = useState(Array(9).fill(null));

  /* Estado del las 3 Squares Ganadoras */
  const [winningSquares, setWinningSquares] = useState([]);

  /* Estado del Marcador */
  const [score, setScore] = useState({
    X: 0,
    O: 0,
  });

  /* Reiniciar el juego */
  const reset = () => {
    setTurn('X');
    setSquares(Array(9).fill(null));
    setWinningSquares([]);
  };

  /* Chequea si hay ganador */
  const checkForWinner = (newSquares) => {
    for (let i = 0; i < WINNER_COMBOS.length; i++) {
      const [a, b, c] = WINNER_COMBOS[i];
      if (
        newSquares[a] &&
        newSquares[a] === newSquares[b] &&
        newSquares[a] === newSquares[c]
      ) {
        /* Si hay ganador */
        endGame(newSquares[a], WINNER_COMBOS[i]);
        confetti();
        return;
      }
    }
    /* Si hay empate */
    if (!newSquares.includes(null)) {
      endGame(null, Array.from(Array(10).keys()));
      return;
    }
    /* Si aún no hay ganador ni empate, cambia el turno del jugador */
    setTurn(turn === 'X' ? 'O' : 'X');
  };

  /* Función para que la máquina realice su movimiento */
  const makeMachineMove = (currentTurn) => {
    if (currentTurn === 'O') {
      setTimeout(() => {
        const newSquares = [...squares];
        const randomEmptySquare = getRandomEmptySquare(newSquares);

        // Intentar bloquear una jugada ganadora del usuario
        for (let i = 0; i < WINNER_COMBOS.length; i++) {
          const [a, b, c] = WINNER_COMBOS[i];
          if (
            newSquares[a] === 'X' &&
            newSquares[b] === 'X' &&
            newSquares[c] === null
          ) {
            // Bloquear la jugada ganadora del usuario
            newSquares.splice(c, 1, 'O');
            setSquares(newSquares);
            checkForWinner(newSquares);
            return;
          }
          if (
            newSquares[a] === 'X' &&
            newSquares[c] === 'X' &&
            newSquares[b] === null
          ) {
            // Bloquear la jugada ganadora del usuario
            newSquares.splice(b, 1, 'O');
            setSquares(newSquares);
            checkForWinner(newSquares);
            return;
          }
          if (
            newSquares[b] === 'X' &&
            newSquares[c] === 'X' &&
            newSquares[a] === null
          ) {
            // Bloquear la jugada ganadora del usuario
            newSquares.splice(a, 1, 'O');
            setSquares(newSquares);
            checkForWinner(newSquares);
            return;
          }
        }

        // Si no se puede bloquear una jugada ganadora, realizar un movimiento aleatorio
        if (randomEmptySquare !== undefined) {
          newSquares.splice(randomEmptySquare, 1, 'O');
          setSquares(newSquares);
          checkForWinner(newSquares);
        }
      }, 1000); // Espera 1 segundo antes de realizar el movimiento
    }
  };

  /* Efecto secundario para que la máquina realice su movimiento después del cambio de turno */
  useEffect(() => {
    makeMachineMove(turn);
  }, [turn]);

  /*  */
  const handleClick = (square) => {
    if (squares[square] === null && turn === 'X') {
      const newSquares = [...squares];
      newSquares.splice(square, 1, 'X');
      setSquares(newSquares);
      checkForWinner(newSquares);
    }
  };

  /* Juego Terminado */
  const endGame = (result, WINNER_COMBOS) => {
    /* Si está terminado, bloqueamos que se siga jugando */
    setTurn(null);
    /* Si hay ganador, suma 1 al score que tenía antes */
    if (result !== null) {
      setScore({
        ...score,
        [result]: score[result] + 1,
      });
    }

    /*  */
    setWinningSquares(WINNER_COMBOS);
    setTimeout(reset, 2000);
  };

  /* Renderizado */
  return (
    <div className='game'>
      <Board
        winningSquares={winningSquares}
        turn={turn}
        squares={squares}
        onClick={handleClick}
      />
      <ScoreBoard scoreO={score.O} scoreX={score.X} />
    </div>
  );
};
