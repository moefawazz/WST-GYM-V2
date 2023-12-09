import React from 'react';

const SelectInput = ({ value, onChange, width }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${width} border-2 border-red rounded-[0.25rem] px-[1.25rem] py-[0.63rem] bg-transparent`}
    >
      <option value="Select" disabled>
        Select
      </option>
      <option value="Zumba">Zumba</option>
      <option value="Gym">Gym</option>
    </select>
  );
};

export default SelectInput;
