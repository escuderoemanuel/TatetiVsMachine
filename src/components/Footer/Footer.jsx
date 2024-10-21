import './Footer.css';
import logoDev from '../../assets/img/Logo2024.png';

export const Footer = () => {
  return (
    <section className='footer'>
      <div className='footerContainer'>
        <p>[Developed by Emanuel Escudero]</p>
        <a
          href='https://emanuelescudero.ar'
          rel='noopener noreferrer'
          target='_blank'
          className='logoContainer'>
          <img className='logoDev' src={logoDev} alt='Developer Logo' />
        </a>
      </div>
    </section>
  );
};
