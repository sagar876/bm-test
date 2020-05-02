import React from "react";

const Bill = props => {
  const { data, onDelete, onEdit } = props;
  return (
    <div className="bill-row">
      <div>{data.description}</div>
      <div>{data.category}</div>
      <div>{data.amount}</div>
      <div>{data.date}</div>
      <div>
        <button onClick={() => onEdit(data.id)}>Edit</button>
      </div>
      <div>
        <button onClick={() => onDelete(data.id)}>Delete</button>
      </div>
    </div>
  );
};

export default Bill;
