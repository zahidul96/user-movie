import { useState } from "react";
import "./App.css";
import UserSection from "./UserSection";
const App = () => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center bg-dark">
        <p style={{ paddingLeft: "10%", color: "white" }}>
          Join Movies VIP for a chance to win. Don't forget to join during
          checkout
        </p>
        <div style={{ paddingRight: "10%" }}>
          <button>
            <a href="https://admin-movie-green.vercel.app/">
              Admin Login
            </a>
          </button>
        </div>
      </div>
      <UserSection />
    </>
  );
};

export default App;
