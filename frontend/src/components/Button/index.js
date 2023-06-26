import React from "react";

// Styles
import "./style.css";

// Regular Button
const RButton = ({ text, action, extraStyle }) => (
  <button
    className="rbutton"
    onClick={() => {
      if (action) action();
    }}
    style={extraStyle}
  >
    {text}
  </button>
);

export default RButton;
