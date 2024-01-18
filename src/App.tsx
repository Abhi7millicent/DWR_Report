import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Navigate from "./Navigate";
import Login from "./components/login/Login";
import ProtectedRoute from "./ProtectedRoute";
// import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Navigate />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      {/* Uncomment the following block if needed */}
    </>
  );
}

export default App;
