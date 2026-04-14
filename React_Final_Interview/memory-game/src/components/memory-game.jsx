import { useEffect, useState } from "react";

const MemoryGame = () => {

  // STEP : 02
  // What is State? 
  // State is a variable in react app, which is used as a memazing data 
  //as per the component.
  // For Example : we can use "useState" hook. and this taking 2 things
  // 1. the actual state (gridSize)  
  // 2. The function that is responsible for mainting the state (setGridSize)
  // 3. Its Taking initially value as well. (4)
  const [gridSize, setGridSize] = useState(4);
  // we also have the state, that contain the information related to cards that we shuffles and kept insidee the box.
  const [cards, setCards] = useState([]);

  // Step : 02.1
  // Now, We have to take care of 2 things :
  // 1. While flipped the card we need to store the information.
  // 2.When 2 cards have same number, means solved so we have to store this info also.
  // Note: Both Intially state value is empty
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);

  // Step 02.2
 //Whenever,2 cards matched by flipped then we have disbled the board.
 // Intially, value is false
  const [disabled, setDisabled] = useState(false);

  // Step 02.3
 // Simillary, we have state that store information whether we win
 // intially we have false(means not win)
  const [won, setWon] = useState(false);


  // STEP 04:
  // coming back to this handleGridSizeChange function.
  // Now, we taking event "e" inside this params.
  const handleGridSizeChange = (e) => {
    // and what ever input we are getting insside Input as "e.target.value"
    // we taking and make sure it should be int not a decimal value.. so use "parseInt" frunction, that return int
    // then we will store inside "size" const variable
    const size = parseInt(e.target.value);
    // Agar size 2 se zaada ya equal ho, ya size 10 ke equal ho ya kaam ho,
    // then setGridSize ka value "size" set kr do
    if (size >= 2 && size <= 10) setGridSize(size);
  };


  // Step 05: Random Card generate krne ka logic likhna hoga.
  // So, I m creating "initializeGame" function.
  const initializeGame = () => {
    // Inside this, lets say we have gridsize = 4
    // then, logic to create 16 random cards logic we have to write
    
    //We have to determine, how many cards inside boards, and it fully dependent on "gridSize"
    const totalCards = gridSize * gridSize; // 16
    
  // Total pairs nikal rahe hain
  // Example: 16 cards → 8 pairs and Math.floor(4.95) is 4
  const pairCount = Math.floor(totalCards / 2);

  // 1 se leke pairCount tak numbers ka array bana rahe hain
  // Example: [1,2,3,4,5,6,7,8]
  const numbers = [...Array(pairCount).keys()].map((n) => n + 1);

  // Ab pairs banane ke liye numbers ko 2 baar spread kar rahe hain
  // Example: [1,2,...,8,1,2,...,8]
  const shuffledCards = [...numbers, ...numbers]

    // Random shuffle kar rahe hain taaki cards mix ho jaaye
    /*
      Step samjho:
      Math.random() → random number deta hai (0 se 1 ke beech)
      maan lo:
      0.8 - 0.5 = +0.3 → order change ho sakta hai
      0.2 - 0.5 = -0.3 → order same reh sakta hai

      Ye comparison baar-baar hota hai har element ke liye
      isliye array har baar different order me aa jaata hai

      Possible outputs:
      [3,1,4,2]
      [2,4,1,3]
      [4,3,2,1]
      */
    .sort(() => Math.random() - 0.5)

    // Agar cards zyada ho gaye ho (odd grid case), to required length tak hi le rahe hain
    .slice(0, totalCards)

    // Har number ko ek object me convert kar rahe hain
    // jisme id (unique) aur number (value) hoga
    .map((number, index) => ({
      id: index,     // unique id (React ke liye important)
      number         // card ka actual value (matching ke liye)
    }));

  // Cards ko state me set kar rahe hain
  setCards(shuffledCards);
  // Abhi koi card flip nahi hua hai → empty array
  setFlipped([]);
  // Abhi koi pair solve nahi hua → empty array
  setSolved([]);
  // Game abhi jeeta nahi hai → false
  setWon(false);
};



// Jab bhi gridSize change hoga, naya game start ho jayega
useEffect(() => {
  initializeGame();
}, [gridSize]);



// Ye function check karta hai ki 2 flipped cards match karte hain ya nahi
const checkMatch = (secondId) => {
  // Pehla flipped card ka id nikaal rahe hain
  const [firstId] = flipped;
  // Dono cards ke number compare kar rahe hain
  if (cards[firstId].number === cards[secondId].number) {
    // Agar match ho gaya to dono ko solved list me daal do
    setSolved([...solved, firstId, secondId]);
    // Flipped reset (next turn ke liye)
    setFlipped([]);
    // User ko phir se click karne do
    setDisabled(false);
  } else {
    // Agar match nahi hua to 1 second ruk ke cards band kar do
    setTimeout(() => {
      // Cards wapas flip (hide)
      setFlipped([]);
      // User ko phir se click allow karo
      setDisabled(false);
    }, 1000);
  }
};



// Ye function tab call hota hai jab user kisi card pe click karta hai
const handleClick = (id) => {
  // Agar game temporarily disabled hai ya already win ho chuka hai
  // to kuch bhi mat karo (click ignore kar do)
  if (disabled || won) return;

  // Agar abhi tak koi bhi card flip nahi hua
  if (flipped.length === 0) {
    // To current card ko flipped list me daal do
    setFlipped([id]);
    // Aur function yahin stop kar do (2nd click ka wait karo)
    return;
  }


  // Agar already 1 card flip ho chuka hai
  if (flipped.length === 1) {
    // Ab user ko temporarily disable kar rahe hain
    // taaki wo extra clicks na kare jab tak check ho raha hai
    setDisabled(true);
    // Check karo ki user ne same card dobara click to nahi kiya
    if (id !== flipped[0]) {
      // Agar alag card hai to usko bhi flipped me add kar do
      setFlipped([...flipped, id]);
      // Ab dono cards compare karne ke liye match check function call karo
      checkMatch(id);
    } else {
      // Agar user ne same card pe dobara click kar diya
      // to flip reset kar do (ignore situation)
      setFlipped([]);
      // Aur disable hata do taaki user phir se click kar sake
      setDisabled(false);
    }
  }
};
      // Ye function check karta hai ki card flip hona chahiye ya nahi
      // Card flip hoga agar:
      // 1. User ne abhi usko click kiya hai (flipped array me hai)
      // 2. Ya wo already match ho chuka hai (solved array me hai)
      const isFlipped = (id) =>
        flipped.includes(id) || solved.includes(id);

      // Ye function check karta hai ki card already solve (match) ho chuka hai ya nahi
      // Agar id solved array me mil gaya → matlab wo card permanently open rahega
      const isSolved = (id) =>
        solved.includes(id);

      // Ye useEffect har baar chalega jab:
      // - solved array change hoga
      // - ya cards array change hoga
      useEffect(() => {
        // Yaha hum check kar rahe hain:
        // kya saare cards solve ho gaye hain?
        // solved.length === cards.length ka matlab:
        // jitne total cards hain utne hi solved ho gaye → game complete
        // cards.length > 0 isliye check kar rahe hain:
        // taki empty array pe galti se win na ho jaye

        if (solved.length === cards.length && cards.length > 0) {
          // Agar sab solve ho gaye → game jeet gaye 🎉
          setWon(true);
        }
      }, [solved, cards]); // dependency → jab bhi ye change honge, effect dubara chalega

  return (

    // Step 01:
    // Here, in this Memory-Game page, we have 4 things:
    //1. Grid Size Input  - 4x4 or 8x8
    //2. Grid Size Box  ({/* Game Board */})
    //3.Winner or loss message  ( {/* Result */})
    //4.Reset Game Button ( {/* Reset / Play Again Btn */})

    // Step 03:
    <div className="flex flex-col items-center justify-center min-h-screen bg-grey-100 p-4">
     Using H1 tag we giving Headline
      <h1 className="text-3xl font-bold mb-6">Memory Game</h1> 
      {/* Input */}
      {/* Now, we have to give label for this input  */}
      <div className="mb-4">
        <label htmlFor="gridSize" className="mr-2">
          Grid Size: (max 10)
        </label>

      {/* STEP 03.1 */}
        {/* using input tag, we have to take user input */}
        <input
          type="number" // Input type is number
          id="gridSize" //I m giving this Input Id as gridSize
          min="2" //Min input size is 2
          max="10" // Max input size 10
          value={gridSize}  //Input value to be gridSize(meanas intially 4)
          onChange={handleGridSizeChange} //on change of this input "handleGridSizeChange" funtion will called.
          className="border-2 border-gray-300 rounded px-2 py-1" // Lastly, Style this input by applying css
        />
      </div>

      {/* Game Board */}
      <div
        className={`grid gap-2 mb-4`}
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0,1fr))`,
          width: `min(100%, ${gridSize * 5.5}rem)`,
        }}
      >
        {cards.map((card) => {
          return (
            <div
              key={card.id}
              onClick={() => handleClick(card.id)}
              className={`aspect-square flex items-center justify-center text-xl font-bold rounded-lg cursor-pointer transition-all duration-300  ${
                isFlipped(card.id)
                  ? isSolved(card.id)
                    ? "bg-green-500 text-white"
                    : "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-400"
              }`}
            >
              {isFlipped(card.id) ? card.number : "?"}
            </div>
          );
        })}
      </div>

      {/* Result */}
      {won && (
        <div className="mt-4 text-4xl font-bold text-green-600 animate-bounce">
          You Won!
        </div>
      )}

      {/* Reset / Play Again Btn */}
      <button
        onClick={initializeGame}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
      >
        {won ? "Play Again" : "Reset"}
      </button>
    </div>
  );
};

export default MemoryGame;
