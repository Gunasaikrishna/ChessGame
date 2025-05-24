import React, { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

const App = () => {
  const [game, setGame] = useState(new Chess());

  const makeAIMove = (gameInstance) => {
    const moves = gameInstance.moves();
    if (moves.length === 0) return;

    const move = moves[Math.floor(Math.random() * moves.length)];
    gameInstance.move(move);
    setGame(new Chess(gameInstance.fen()));
  };

  const onDrop = (sourceSquare, targetSquare) => {
    const newGame = new Chess(game.fen());
    const move = newGame.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) return false;

    setGame(newGame);
    setTimeout(() => makeAIMove(newGame), 500);
    return true;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Chess vs AI</h1>
      <div style={styles.boardWrapper}>
        <Chessboard 
          position={game.fen()}
          onPieceDrop={onDrop}
          boardWidth={800}  // fixed size to ensure all squares visible
        />
      </div>
    </div>
  );
  };
  
  const styles = {
    container: {
      height: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",   // vertically center content
      alignItems: "center",       // horizontally center content
      backgroundColor: "#222",
      margin: 0,
    },
    title: {
      color: "#0ff",
      marginBottom: 20,
      fontSize: 24,
    },
    boardWrapper: {
      width: 800,
      height: 800,
      boxShadow: "0 0 10px #0ff",
    },
  };

export default App;
