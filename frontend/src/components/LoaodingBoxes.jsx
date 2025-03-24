const LoadingBoxes = () => {
    return (
      <div className="flex justify-center items-center">
        <style>
          {`
            :root {
              --duration: 1.5s;
              --container-size: 250px;
              --box-size: 33px;
              --box-border-radius: 15%;
              --blue: #1E88E5;
            }
  
            .container {
              width: var(--container-size);
              display: flex;
              justify-content: space-between;
              align-items: center;
              position: relative;
            }
  
            .box {
              width: var(--box-size);
              height: var(--box-size);
              position: relative;
              display: block;
              transform-origin: -50% center;
              border-radius: var(--box-border-radius);
            }
  
            .box::after {
              content: '';
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              right: 0;
              background-color: var(--blue);
              border-radius: var(--box-border-radius);
              box-shadow: 0px 0px 10px 0px rgba(30, 136, 229, 0.4);
            }
  
            .box:nth-child(1) {
              animation: slide var(--duration) ease-in-out infinite alternate;
            }
            .box:nth-child(1)::after {
              animation: color-change var(--duration) ease-in-out infinite alternate;
            }
  
            @keyframes slide {
              0% { background-color: var(--blue); transform: translateX(0vw); }
              100% { background-color: var(--blue); transform: translateX(calc(var(--container-size) - (var(--box-size) * 1.25))); }
            }
  
            @keyframes color-change {
              0% { background-color: var(--blue); }
              100% { background-color: var(--blue); }
            }
  
            ${[...Array(5).keys()].map(i => `
              .box:nth-child(${i + 2}) {
                animation: flip-${i + 1} var(--duration) ease-in-out infinite alternate;
              }
  
              .box:nth-child(${i + 2})::after {
                animation: squidge-${i + 1} var(--duration) ease-in-out infinite alternate;
              }
  
              @keyframes flip-${i + 1} {
                0%, ${(i + 1) * 15}% { transform: rotate(0); }  
                ${(i + 1) * 15 + 20}%, 100% { transform: rotate(-180deg); }
              }
  
              @keyframes squidge-${i + 1} {
                ${(i + 1) * 15 - 10}% { transform-origin: center bottom; transform: scaleX(1) scaleY(1); }
                ${(i + 1) * 15}% { transform-origin: center bottom; transform: scaleX(1.3) scaleY(0.7); }
                ${(i + 1) * 15 + 10}%, ${(i + 1) * 15 + 5}% { transform-origin: center bottom; transform: scaleX(0.8) scaleY(1.4); }
                ${(i + 1) * 15 + 40}%, 100% { transform-origin: center top; transform: scaleX(1) scaleY(1); }
                ${(i + 1) * 15 + 25}% { transform-origin: center top; transform: scaleX(1.3) scaleY(0.7); }
              }
            `).join("")}
          `}
        </style>
  
        <div className="container">
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </div>
      </div>
    );
  };
  
  export default LoadingBoxes;
  