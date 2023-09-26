import { useState } from 'react';
import { Multiplayer } from './Multiplayer/Multiplayer'; // Importa el componente Multiplayer
import { PlayerMachine } from './PlayerMachine/PlayerMachine'; // Importa el componente PlayerMachine
import './Menu.css';

export const Menu = () => {
  const [menuGame, setMenuGame] = useState(null);

  // Función para renderizar el componente Multiplayer
  const renderMultiplayer = () => {
    setMenuGame('multiplayer');
  };

  // Función para renderizar el componente PlayerMachine
  const renderPlayerMachine = () => {
    setMenuGame('playerMachine');
  };

  // Renderiza el componente correspondiente según la elección del jugador
  const renderGameComponent = () => {
    switch (menuGame) {
      case 'multiplayer':
        return <Multiplayer />;
      case 'playerMachine':
        return <PlayerMachine />;
    }
  };

  return (
    <div className='main'>
      <div className='menu'>
        <button
          className={`btnMenu ${menuGame === 'multiplayer' ? 'selected' : ''}`}
          onClick={renderMultiplayer}>
          PLAYER <span>VS</span> PLAYER
        </button>
        <button
          className={`btnMenu ${
            menuGame === 'playerMachine' ? 'selected' : ''
          }`}
          onClick={renderPlayerMachine}>
          PLAYER <span>VS</span> MACHINE
        </button>
      </div>
      {renderGameComponent()} {/* Renderiza el componente correspondiente */}
    </div>
  );
};
