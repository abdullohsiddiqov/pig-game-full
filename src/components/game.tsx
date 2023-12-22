
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../index.css';

interface Player {
  id: string;
  name: string;
  currentScore: number;
  totalScore: number;
}

interface Game {
  id: string;
  player1: Player;
  player2: Player;
  currentPlayerId: string;
  winner: string;
  max: number;
}

const Game: React.FC<{ gameId: string }> = ({ gameId }) => {
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/api/games/pig/${gameId}`);
        setGame(response.data.data.game);
      } catch (error) {
        console.error('Error fetching game:', error);
      }
    };

    fetchGame();
  }, [gameId]);

  const handleRollDice = async () => {
    try {
      const response = await axios.post(`http://localhost:4001/api/games/pig/dice/${gameId}`, {
        playerId: game?.currentPlayerId,
      });
      setGame(response.data.data.game);
    } catch (error) {
      console.error('Error rolling dice:', error);
    }
  };

  const handleHold = async () => {
    try {
      const response = await axios.post(`http://localhost:4001/api/games/pig/hold/${gameId}`, {
        playerId: game?.currentPlayerId,
      });
      setGame(response.data.data);
    } catch (error) {
      console.error('Error holding:', error);
    }
  };

  const handleReset = async () => {
    try {
      const response = await axios.get(`http://localhost:4001/api/games/pig/reset/${gameId}`);
      setGame(response.data.data.game);
    } catch (error) {
      console.error('Error resetting game:', error);
    }
  };

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div className="game-container">
      <h2>Game ID: {game.id}</h2>
      <p>Current Turn: {game.currentPlayerId}</p>
      <p>Winner: {game.winner || 'None'}</p>
      <div className="players">
        <div className="player">
          <h3>{game.player1.name}</h3>
          <p>Current Score: {game.player1.currentScore}</p>
          <p>Total Score: {game.player1.totalScore}</p>
        </div>
        <div className="player">
          <h3>{game.player2.name}</h3>
          <p>Current Score: {game.player2.currentScore}</p>
          <p>Total Score: {game.player2.totalScore}</p>
        </div>
      </div>
      <div className="dice-container">
        <p>Dice Value: {game.player1.currentScore}</p>
      </div>
      <div className="buttons">
        <button onClick={handleRollDice}>Roll Dice</button>
        <button onClick={handleHold}>Hold</button>
        <button onClick={handleReset}>Reset Game</button>
      </div>
    </div>
  );
};

export default Game;
