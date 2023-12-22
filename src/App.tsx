
import React, { useState } from 'react';
import axios from 'axios';
import Game from './components/game';

const App: React.FC = () => {
  const [newGameId, setNewGameId] = useState<string | null>(null);

  const handleNewGame = async () => {
    try {
      const response = await axios.post('http://localhost:4001/api/games/pig', {
        player1: 'Player 1',
        player2: 'Player 2',
        max: 20,
      });
      setNewGameId(response.data.data.game.id);
    } catch (error) {
      console.error('Error creating new game:', error);
    }
  };

  return (
    <div>
      <h1>Pig Game</h1>
      <button onClick={handleNewGame}>Start New Game</button>
      {newGameId && <Game gameId={newGameId} />}
    </div>
  );
};

export default App;
