import "./App.css";

// aao Routes ko import kar lete hai
import { Route, Routes } from "react-router-dom";

// aao Home ko import kar lete hai
import Home from './pages/Home';
import NavBar from "./Components/common/NavBar"; // Ensure this matches the renamed file

function App() {
  return (
      <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
        <NavBar />

        {/* Div ke ander.. maine bola Routes create krne h */}
        <Routes>
        {/* Route ke ander...humne single Route create kr diya */}
          <Route path="/"   // Jisska path jo hoga wo "/" hoga
          element={<Home />} // and kisko point kr raha h....Home waale component ko
          />
        </Routes>
      </div>
  );
}

export default App;