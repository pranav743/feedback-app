import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Importing Components
import Feedback from "./pages/Feedback";
import Navbar from "./components/Navbar";
import FeedbackList from "./pages/FeedbackList";

const App = () => {
  const user = localStorage.getItem("tokenLoginApiPranav");

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Feedback />} />
          <Route path="/submit" element={<Feedback />} />
          <Route path="/show" element={<FeedbackList />} />
          <Route path="/delete" element={<Feedback />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
