import { useState, useEffect, useCallback } from 'react';

const BOARD_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

const App = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  const generateFood = useCallback(() => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection({ x: 0, y: 0 });
    setGameOver(false);
    setScore(0);
    setIsGameStarted(false);
    setSpeed(INITIAL_SPEED);
  };

  const handleKeyPress = useCallback((e) => {
    if (gameOver) return;

    if (!isGameStarted && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      setIsGameStarted(true);
    }

    switch (e.key) {
      case 'ArrowUp':
        if (direction.y !== 1) setDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
        if (direction.y !== -1) setDirection({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
        if (direction.x !== 1) setDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
        if (direction.x !== -1) setDirection({ x: 1, y: 0 });
        break;
      default:
        break;
    }
  }, [direction, gameOver, isGameStarted]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (!isGameStarted || gameOver) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const newHead = {
          x: prevSnake[0].x + direction.x,
          y: prevSnake[0].y + direction.y,
        };

        // Check wall collision
        if (newHead.x < 0 || newHead.x >= BOARD_SIZE || newHead.y < 0 || newHead.y >= BOARD_SIZE) {
          setGameOver(true);
          return prevSnake;
        }

        // Check self collision
        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(prev => prev + 10);
          setFood(generateFood());
          setSpeed(prev => Math.max(50, prev - 2));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, speed);
    return () => clearInterval(gameInterval);
  }, [direction, food, gameOver, isGameStarted, speed, generateFood]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
    }}>
      <h1 style={{ color: 'white', fontSize: '2.5rem', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
        🐍 Snake Game
      </h1>
      
      <div style={{
        color: 'white',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
      }}>
        Score: {score}
      </div>

      <div style={{
        width: BOARD_SIZE * CELL_SIZE,
        height: BOARD_SIZE * CELL_SIZE,
        backgroundColor: '#1a1a2e',
        border: '3px solid #4a4a6a',
        borderRadius: '10px',
        position: 'relative',
        boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
      }}>
        {/* Render snake */}
        {snake.map((segment, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
              backgroundColor: index === 0 ? '#4ecca3' : '#45b393',
              borderRadius: '4px',
              border: '1px solid #2d8a72',
            }}
          />
        ))}

        {/* Render food */}
        <div
          style={{
            position: 'absolute',
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE - 2,
            height: CELL_SIZE - 2,
            backgroundColor: '#ff6b6b',
            borderRadius: '50%',
            border: '2px solid #ee5a5a',
          }}
        />

        {/* Game Over Overlay */}
        {gameOver && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '10px',
          }}>
            <h2 style={{
              color: '#ff6b6b',
              fontSize: '2rem',
              marginBottom: '20px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}>
              Game Over!
            </h2>
            <p style={{
              color: 'white',
              fontSize: '1.2rem',
              marginBottom: '20px',
            }}>
              Final Score: {score}
            </p>
            <button
              onClick={resetGame}
              style={{
                padding: '12px 24px',
                fontSize: '1.1rem',
                backgroundColor: '#4ecca3',
                color: '#1a1a2e',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#3db892'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#4ecca3'}
            >
              Play Again
            </button>
          </div>
        )}

        {/* Start Message */}
        {!isGameStarted && !gameOver && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '10px',
          }}>
            <p style={{
              color: 'white',
              fontSize: '1.2rem',
              textAlign: 'center',
              lineHeight: '1.6',
            }}>
              Press Arrow Keys to Start<br />
              Use Arrow Keys to Move
            </p>
          </div>
        )}
      </div>

      <div style={{
        color: 'white',
        fontSize: '0.9rem',
        opacity: 0.8,
        textAlign: 'center',
      }}>
        <p>Use Arrow Keys (↑ ↓ ← →) to control the snake</p>
        <p>Eat red food to grow and score points!</p>
      </div>
    </div>
  );
};

export default App;
