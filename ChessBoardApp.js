import React, { useState } from "react";
import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";

const themes = [
  { light: "#f0d9b5", dark: "#b58863" },
  { light: "#eaeaea", dark: "#444444" },
  { light: "#d1e8e2", dark: "#116466" },
];

const pieces = ["default", "alpha", "chesscom"];

export default function ChessBoardApp() {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState("start");
  const [themeIndex, setThemeIndex] = useState(0);
  const [pieceStyle, setPieceStyle] = useState("default");

  const handleMove = ({ sourceSquare, targetSquare }) => {
    const move = game.move({ from: sourceSquare, to: targetSquare, promotion: "q" });
    if (move === null) return false;
    setFen(game.fen());
    return true;
  };

  const changeTheme = () => {
    setThemeIndex((themeIndex + 1) % themes.length);
  };

  const changeStyle = () => {
    const nextIndex = (pieces.indexOf(pieceStyle) + 1) % pieces.length;
    setPieceStyle(pieces[nextIndex]);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">React Chessboard</h1>
      <div className="mb-4 flex gap-4">
        <button
          onClick={changeTheme}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Change Theme
        </button>
        <button
          onClick={changeStyle}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Change Piece Style
        </button>
      </div>
      <Chessboard
        width={400}
        position={fen}
        onDrop={handleMove}
        boardStyle={{
          backgroundColor: themes[themeIndex].light,
        }}
        squareStyles={(square) => {
          const color = (square.charCodeAt(0) + parseInt(square[1])) % 2 === 0 ?
            themes[themeIndex].dark :
            themes[themeIndex].light;
          return { backgroundColor: color };
        }}
        pieces={pieceStyle}
        draggable
        transitionDuration={300}
      />
    </div>
  );
}
