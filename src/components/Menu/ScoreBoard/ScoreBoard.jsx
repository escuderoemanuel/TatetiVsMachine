import './ScoreBoard.css';

export const ScoreBoard = ({ scoreX, scoreO }) => {
  return (
    <div className='scoreContainer'>
      <h2>SCORE</h2>
      <div className='scoreBoard'>
        <div>{scoreX}</div>
        <div>{scoreO}</div>
      </div>
    </div>
  );
};
