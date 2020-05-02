import React from "react";

const SelectBox = props => {
  const { filterDropdownValues, selectedFilterValue, onChange } = props;
  return (
    <select value={selectedFilterValue} onChange={e => onChange(e)}>
      <option value="select">Select an Option</option>
      {filterDropdownValues.map(val => {
        return (
          <option key={val} value={val}>
            {val}
          </option>
        );
      })}
    </select>
  );
};

export default SelectBox;
