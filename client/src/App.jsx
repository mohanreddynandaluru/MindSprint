import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./componets/Login";
import Profile from "./componets/Profile";
import Body from "./pages/body";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        {/* Your routes and components will go here */}
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
