import React from "react";

export default function DisplayStatus({ type, message }) {
  return (
    <div>
      <p
        style={{
          color: type === "success" ? "green" : "red",
        }}
      >
        {message}
      </p>
    </div>
  );
}
