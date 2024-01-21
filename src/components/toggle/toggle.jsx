import React from "react";

const Toggle = ({ checked, onChange }) => {
  return (
    <input
      class="switch"
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
  );
};

export default Toggle;
