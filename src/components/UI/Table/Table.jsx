import React from "react";
import "./table.scss";

const Table = ({ children, ...props }) => {
  return (
    <div className="table__container">
      <table>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
