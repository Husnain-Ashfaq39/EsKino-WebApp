import React from 'react';
import colors from '../../colorTheme';

const Preloader = () => {
  const preloaderStyle = {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary, // Ensure background is white
    fontFamily: "'Montserrat', sans-serif",
    overflow: 'hidden',
  };

  const containerStyle = {
    width: '100%',
    maxWidth: '520px',
    textAlign: 'center',
    color: colors.secondary, // Ensure text color is #7EC1EC
    position: 'relative',
    margin: '0 32px',
  };

  const textStyle = {
    fontSize: '5vw',
    lineHeight: '64px',
    letterSpacing: '10px',
    marginBottom: '32px',
    display: 'flex',
    justifyContent: 'space-evenly',
  };

  const spanStyle = {
    animation: 'moveLetters 2.4s infinite ease-in-out',
    transform: 'translateX(0)',
    position: 'relative',
    display: 'inline-block',
    opacity: '0',
    textShadow: '0px 2px 10px rgba(126, 193, 236, 0.3)', // Ensure shadow color matches text
  };

  const keyframes = `
    @keyframes movingLine {
      0% {
        opacity: 0;
        width: 0;
      }
      33.3%, 66% {
        opacity: 0.8;
        width: 100%;
      }
      85% {
        width: 0;
        left: initial;
        right: 0;
        opacity: 1;
      }
      100% {
        opacity: 0;
        width: 0;
      }
    }

    @keyframes moveLetters {
      0% {
        transform: translateX(-15vw);
        opacity: 0;
      }
      33.3%, 66% {
        transform: translateX(0);
        opacity: 1;
      }
      100% {
        transform: translateX(15vw);
        opacity: 0;
      }
    }
  `;

  return (
    <div style={preloaderStyle}>
      <style>{keyframes}</style>
      <div style={containerStyle}>
        <div className="loading-text" style={textStyle}>
          <span style={{ ...spanStyle, animationDelay: '0.1s' }}>E</span>
          <span style={{ ...spanStyle, animationDelay: '0.2s' }}>S</span>
          <span style={{ ...spanStyle, animationDelay: '0.3s' }}>K</span>
          <span style={{ ...spanStyle, animationDelay: '0.4s' }}>I</span>
          <span style={{ ...spanStyle, animationDelay: '0.5s' }}>N</span>
          <span style={{ ...spanStyle, animationDelay: '0.6s' }}>O</span>
        </div>
        <div style={{
          content: "''",
          position: 'absolute',
          width: '100%',
          height: '3px',
          backgroundColor: colors.secondary, // Ensure line color is #7EC1EC
          bottom: '0',
          left: '0',
          borderRadius: '10px',
          animation: 'movingLine 2.4s infinite ease-in-out',
        }}></div>
      </div>
    </div>
  );
};

export default Preloader;
