import './Header.css';
import logoGame from '../../assets/img/logoGame.png';
export const Header = () => {
  return (
    <section className='header'>
      <div className='titleGame'>
        <h1 className='title'>Ta</h1>
        <h1 className='title'>Te</h1>
        <h1 className='title'>Ti</h1>
      </div>
      <img className='logoGame' src={logoGame} alt="Game's Logotype" />
    </section>
  );
};
