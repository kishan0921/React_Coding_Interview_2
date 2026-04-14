// React se useState hook import kar rahe hain
// Ye hume state (data) store aur update karne deta hai
import { useState } from "react";


// Ye function ek fresh empty board banata hai
// Array(9) → 9 boxes (3x3 grid)
// .fill(null) → sab boxes empty hain initially
const initialBoard = () => Array(9).fill(null);


// Custom hook bana rahe hain jisme pura Tic Tac Toe logic hoga
const useTictacToe = () => {

  // BOARD STATE
  // board ek array hai jisme 9 values hongi (null, "X", "O")
  // Example: ["X", null, "O", ...]
  const [board, setBoard] = useState(initialBoard());


  // TURN STATE
  // true → X ka turn
  // false → O ka turn
  const [isXNext, setIsXNext] = useState(true);


  // WINNING PATTERNS
  // Ye sare possible ways hain jisse game jeeta ja sakta hai
  const WINNING_PATTERNS = [
    [0, 1, 2], // 🔹 Top row
    [3, 4, 5], // 🔹 Middle row
    [6, 7, 8], // 🔹 Bottom row

    [0, 3, 6], // 🔹 Left column
    [1, 4, 7], // 🔹 Middle column
    [2, 5, 8], // 🔹 Right column

    [0, 4, 8], // 🔹 Diagonal (↘)
    [2, 4, 6], // 🔹 Diagonal (↙)
  ];


  // WINNER CHECK FUNCTION
  const calculateWinner = (currentBoard) => {

    // Har pattern ko loop me check karenge
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {

      // Har pattern me 3 positions hoti hain
      const [a, b, c] = WINNING_PATTERNS[i];

      /*
        Condition samjho:
        1. currentBoard[a] null nahi hona chahiye
        2. a === b hona chahiye
        3. a === c hona chahiye

        Matlab:
        agar 3 boxes me same value hai ("X" ya "O")
        → to winner mil gaya
      */
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        // Winner return kar do ("X" ya "O")
        return currentBoard[a];
      }
    }

    // Agar koi bhi pattern match nahi hua
    return null;
  };


  // HANDLE CLICK FUNCTION
  const handleClick = (index) => {

    // Step 1: Check karo game already finish to nahi hua
    const winner = calculateWinner(board);

    // Agar winner mil gaya ya box already filled hai
    // to click ignore kar do
    if (winner || board[index]) return;


    // Step 2: Board ka copy bana rahe hain
    // Direct original board ko change nahi karte (React rule)
    const newBoard = [...board];


    // Step 3: Current player ka symbol daalna
    // Agar isXNext true hai → "X"
    // warna → "O"
    newBoard[index] = isXNext ? "X" : "O";


    // Step 4: Board update
    setBoard(newBoard);


    // Step 5: Turn switch karna
    // X → O, O → X
    setIsXNext(!isXNext);
  };


  // STATUS MESSAGE FUNCTION
  const getStatusMessage = () => {

    // Har baar winner check kar rahe hain
    const winner = calculateWinner(board);

    // Case 1: Winner mil gaya
    if (winner) return `Player ${winner} wins!`;

    // Case 2: Board full hai (draw)
    // includes(null) false hoga matlab sab filled hai
    if (!board.includes(null)) return `It's a draw!`;

    // Case 3: Game chal raha hai
    // Next player ka turn batana
    return `Player ${isXNext ? "X" : "O"} turn`;
  };


  // RESET GAME FUNCTION
  const resetGame = () => {

    // Board ko fresh empty bana do
    setBoard(initialBoard());

    // X ko fir se first turn de do
    setIsXNext(true);
  };


  // 📦 Return kar rahe hain sab kuch jo UI me use hoga
  return {
    board,               // current board
    handleClick,         // click handler
    calculateWinner,     // winner check function
    getStatusMessage,    // UI message
    resetGame            // reset button ke liye
  };
};


// Export kar rahe hain taaki dusre components me use ho sake
export default useTictacToe;