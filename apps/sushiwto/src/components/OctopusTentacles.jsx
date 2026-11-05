export default function OctopusTentacles() {
  return (
    <>
      <style>{`
        .tentacle-container {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }
        .tentacle {
          position: absolute;
          opacity: 0.04;
          transition: opacity 0.8s ease;
        }
        .tentacle-top-left {
          top: -40px;
          left: -20px;
          width: 320px;
          height: 380px;
          transform: rotate(15deg);
        }
        .tentacle-bottom-left {
          bottom: -60px;
          left: -30px;
          width: 280px;
          height: 420px;
          transform: rotate(-25deg);
        }
        .tentacle-top-right {
          top: -50px;
          right: -30px;
          width: 300px;
          height: 400px;
          transform: rotate(-15deg) scaleX(-1);
        }
        .tentacle-bottom-right {
          bottom: -50px;
          right: -20px;
          width: 260px;
          height: 380px;
          transform: rotate(20deg) scaleX(-1);
        }
        .tentacle-middle-left {
          top: 35%;
          left: -40px;
          width: 200px;
          height: 300px;
          transform: rotate(5deg);
        }
        .tentacle-middle-right {
          top: 30%;
          right: -35px;
          width: 220px;
          height: 320px;
          transform: rotate(-8deg) scaleX(-1);
        }
      `}</style>
      <div className="tentacle-container" aria-hidden="true">
        <svg
          className="tentacle tentacle-top-left"
          viewBox="0 0 200 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 0C95 40 85 80 75 110C60 155 45 190 35 220C28 242 22 265 20 280C18 290 22 298 30 300C38 302 42 295 40 285C36 265 42 240 55 210C70 175 90 140 110 100C120 80 125 60 128 40C130 20 125 5 100 0Z"
            fill="var(--color-blue)"
          />
          <path
            d="M100 0C97 30 92 55 88 75C80 110 72 140 62 165C52 190 40 210 32 225C26 236 22 245 28 250C34 255 40 248 42 238C46 218 54 195 68 165C82 135 98 100 115 65C122 48 126 30 128 15C128 5 120 0 100 0Z"
            fill="var(--color-blue)"
            opacity="0.7"
          />
        </svg>

        <svg
          className="tentacle tentacle-bottom-left"
          viewBox="0 0 200 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 300C95 260 85 220 75 190C60 145 45 110 35 80C28 58 22 35 20 20C18 10 22 2 30 0C38 -2 42 5 40 15C36 35 42 60 55 90C70 125 90 160 110 200C120 220 125 240 128 260C130 280 125 295 100 300Z"
            fill="var(--color-blue)"
          />
          <path
            d="M100 300C97 270 92 245 88 225C80 190 72 160 62 135C52 110 40 90 32 75C26 64 22 55 28 50C34 45 40 52 42 62C46 82 54 105 68 135C82 165 98 200 115 235C122 252 126 270 128 285C128 295 120 300 100 300Z"
            fill="var(--color-blue)"
            opacity="0.7"
          />
        </svg>

        <svg
          className="tentacle tentacle-top-right"
          viewBox="0 0 200 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 0C95 40 85 80 75 110C60 155 45 190 35 220C28 242 22 265 20 280C18 290 22 298 30 300C38 302 42 295 40 285C36 265 42 240 55 210C70 175 90 140 110 100C120 80 125 60 128 40C130 20 125 5 100 0Z"
            fill="var(--color-blue)"
          />
          <path
            d="M100 0C97 30 92 55 88 75C80 110 72 140 62 165C52 190 40 210 32 225C26 236 22 245 28 250C34 255 40 248 42 238C46 218 54 195 68 165C82 135 98 100 115 65C122 48 126 30 128 15C128 5 120 0 100 0Z"
            fill="var(--color-blue)"
            opacity="0.7"
          />
        </svg>

        <svg
          className="tentacle tentacle-bottom-right"
          viewBox="0 0 200 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 300C95 260 85 220 75 190C60 145 45 110 35 80C28 58 22 35 20 20C18 10 22 2 30 0C38 -2 42 5 40 15C36 35 42 60 55 90C70 125 90 160 110 200C120 220 125 240 128 260C130 280 125 295 100 300Z"
            fill="var(--color-blue)"
          />
          <path
            d="M100 300C97 270 92 245 88 225C80 190 72 160 62 135C52 110 40 90 32 75C26 64 22 55 28 50C34 45 40 52 42 62C46 82 54 105 68 135C82 165 98 200 115 235C122 252 126 270 128 285C128 295 120 300 100 300Z"
            fill="var(--color-blue)"
            opacity="0.7"
          />
        </svg>

        <svg
          className="tentacle tentacle-middle-left"
          viewBox="0 0 200 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M40 150C42 120 48 90 58 65C70 35 85 15 100 10C115 5 125 15 120 30C115 45 105 65 95 90C85 115 78 135 75 150C72 165 70 175 65 180C60 185 52 182 48 172C44 162 40 155 40 150Z"
            fill="var(--color-blue)"
          />
          <path
            d="M40 150C44 130 52 105 65 80C80 50 95 28 105 20C112 14 118 18 115 28C112 38 106 55 98 75C90 95 84 115 82 135C80 148 78 158 75 165C72 172 65 175 58 170C52 165 42 160 40 150Z"
            fill="var(--color-blue)"
            opacity="0.6"
          />
        </svg>

        <svg
          className="tentacle tentacle-middle-right"
          viewBox="0 0 200 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M40 150C42 120 48 90 58 65C70 35 85 15 100 10C115 5 125 15 120 30C115 45 105 65 95 90C85 115 78 135 75 150C72 165 70 175 65 180C60 185 52 182 48 172C44 162 40 155 40 150Z"
            fill="var(--color-blue)"
          />
          <path
            d="M40 150C44 130 52 105 65 80C80 50 95 28 105 20C112 14 118 18 115 28C112 38 106 55 98 75C90 95 84 115 82 135C80 148 78 158 75 165C72 172 65 175 58 170C52 165 42 160 40 150Z"
            fill="var(--color-blue)"
            opacity="0.6"
          />
        </svg>
      </div>
    </>
  )
}