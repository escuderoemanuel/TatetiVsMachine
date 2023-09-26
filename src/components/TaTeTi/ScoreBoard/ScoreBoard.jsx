import './ScoreBoard.css';

export const ScoreBoard = ({ scoreX, scoreO }) => (
  <div className='scoreContainer'>
    <h2>MARCADOR</h2>
    <div className='scoreBoard'>
      <div>{scoreX}</div>
      <div>{scoreO}</div>
    </div>
  </div>
);
