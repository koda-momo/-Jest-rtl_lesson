import React from "react";

const FrameworkList = ({ frameworks }) => {
  if (!frameworks || frameworks.length === 0) {
    return <h1>No data</h1>;
  }
  return (
    <div>
      <ul>
        {frameworks.map(({ id, item }) => (
          <li key={id}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default FrameworkList;
