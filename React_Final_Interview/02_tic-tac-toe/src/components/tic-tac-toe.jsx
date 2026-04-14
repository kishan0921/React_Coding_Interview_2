// Custom hook import kiya jisme pura game logic hai
import useTictacToe from "../hooks/use-tic-tac-toe";

function TicTacToe() {

  // Hook se hume mil raha hai:
  // board → current game state (array of 9 cells)
  // handleClick → jab user kisi cell pe click kare
  // resetGame → game dubara start karne ke liye
  // getStatusMessage → current status (Player X turn, Player O turn, Winner, etc.)
  const { board, handleClick, resetGame, getStatusMessage } = useTictacToe();

  return (
    <div className="game">

      {/* Status section */}
      <div className="status">

        {/* Yaha current game ka message show hoga
           jaise: "Player X turn", "Player O turn", "X wins" */}
        {getStatusMessage()}

        {/* Reset button → game ko initial state pe le aata hai */}
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
      </div>

      {/* Board section (3x3 grid) */}
      <div className="board">

        {/* board array pe loop chala rahe hain */}
        {board.map((b, index) => {

          return (
            <button
              className="cell"
              key={index}

              {/* Jab user kisi cell pe click kare → handleClick call hoga
                 aur us index pe X ya O set hoga */}
              onClick={() => handleClick(index)}

              {/* Agar cell already filled hai (X ya O hai)
                 to button disable kar do (dubara click na ho) */}
              disabled={b !== null}
            >
              {/* Cell ke andar value show hogi:
                 X, O, ya empty */}
              {b}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Component export kar diya
export default TicTacToe;