import logo from "./logo.svg";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductedRoute from "./helper/ProductedRoute";
import LoginRoute from "./helper/LoginRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<ProductedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<LoginRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
