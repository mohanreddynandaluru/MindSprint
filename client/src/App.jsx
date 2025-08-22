import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./componets/Login.jsx";
import Profile from "./componets/Profile.jsx";
import Signup from "./componets/Signup.jsx";
import Body from "./pages/body";
import { Provider } from "react-redux";
import appStore from "./util/appStore.js";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          {/* Your routes and components will go here */}
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
