import React from "react";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "3rem",
  color: "#dc2626",
};

const ErrorMessage = ({ message }) => {
  return (
    <div style={containerStyle}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
