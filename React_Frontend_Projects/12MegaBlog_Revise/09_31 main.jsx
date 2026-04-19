import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { AuthLayout, Login } from "./components/index.js";

// STEP: 01
// main.jx ke ander kr dete hai, hum apne provider setup
// chalo provider le akr aate h, react-redux se
import { Provider } from "react-redux";
// STEP: 02
//store bhi laagega
import store from "./store/store.js";

import AddPost from "./pages/AddPost";
import Signup from "./pages/Signup";
import EditPost from "./pages/EditPost";

import Post from "./pages/Post";

import AllPosts from "./pages/AllPosts";


// STEP 04: 7:45:00 - video end last time
// ab mujhe chahiye router , to create kr lete h Browser router
// createBrowserRouter ke ander hum ek empty arra
const router = createBrowserRouter([
  // ab isske ander 1 object, hume de diya hai.
  {
    // ye lijiye path mera root hogya hai.
    path: "/",
    // element kon sa rander krna chahte hai. <App> components kr do.
    element: <App />,
    // Aur ek children, and children apne aap me ek array h
    children: [
      // isske ander bahut saare object aayegen, ek ek krke
      {
        // Ye home waala path ho gya
        path: "/",
        // and yaha hum <Home> components render krenge.
        element: <Home />,
      },
      {
        // Ab interesting Chiz, dusra jo mera path h wo "login" hai.
        path: "/login",
        // and element me hum Login components render krenge,
        // element ke ander () - parentheis le lijiye , jisse aap wrap kr paayenge.
        // then Login components ko hum AuthLayout components ke ander Wrap krenge.
        // then Login ke liye manual authentication data mujhe false chahiye.
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        // Ab interesting Chiz, dusra jo mera path h wo "/signup" hai
        path: "/signup",
        element: (
          // and element me hum Signup components render krenge,
          // element ke ander () - parentheis le lijiye , jisse aap wrap kr paayenge.
          // then Login components ko hum AuthLayout components ke ander Wrap krenge.
          // then Login ke liye manual authentication data mujhe false chahiye.
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          // Yaha mujhe authentication chahiye so hum false assign ni kr rahe h.
          <AuthLayout authentication>
            {" "}
            {/*AllPosts waala components render kr diye h */}
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          // Yaha mujhe authentication chahiye so hum false assign ni kr rahe h.
          <AuthLayout authentication>
            {" "}
            {/*AddPost waala components render kr diye h */}
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          // Yaha mujhe authentication chahiye so hum false assign ni kr rahe h.
          <AuthLayout authentication>
            {" "}
            {/*EditPost waala components render kr diye h */}
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ],
  },
]);

// STEP : 03
// Earlier - method 01

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//    {/* STEP : 03 */}
//    {/* step 3- App ko wrap kr do provider ke ander (Down - see Earlier method) */}
//     <Provider store={store}>
//      <App />    - mera app wrap ho gya provider ke ander
//     </Provider>
//   </StrictMode>,
// )

// STEP : 03.1
// New Method - 02
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* Ab mujhe actually me ek router provider chahiye  
    and then, issko chahiye ek router and value aa jaayegi, iss file me jo router banaya h usski.
    */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
