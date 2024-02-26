import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div
      className="center"
      style={{
        position: "absolute",
        top: "0",
        zIndex: "2000",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#222",
      }}
    >
      <div>
        <h1 style={{ color: "white" }}>404 PAGE NOT FOUND</h1>
        <Link to="/">
          <p style={{ textDecoration: "underline", color: "white" }}>
            Back to Home Page
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
