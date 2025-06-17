import React from "react";
 

export default function TestMotion() {
  return (
    <div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ background: "lightblue", padding: "2rem", margin: "2rem" }}
    >
      <h1>Animation Motion fonctionne 🎉</h1>
    </div>
  );
}