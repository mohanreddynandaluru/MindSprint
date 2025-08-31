import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./componets/Login.jsx";
import Profile from "./componets/Profile.jsx";
import Signup from "./componets/Signup.jsx";
import Body from "./pages/Body";
import { Provider } from "react-redux";
import appStore from "./util/appStore.js";
import Error from "./pages/Error.jsx";
import Home from "./componets/Home.jsx";
import Createquiz from "./componets/createQuiz.jsx";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          {/* Your routes and components will go here */}
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create" element={<Createquiz />} />
            </Route>
            <Route path="/error" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
