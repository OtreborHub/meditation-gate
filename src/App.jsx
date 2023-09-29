
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import SessionDashboard from './view/SessionDashboard';
import Home from './view/Home';
import initFirebase from "./utils/firebase";

export default function App() {
  initFirebase();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/dashboard" element={<SessionDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}



