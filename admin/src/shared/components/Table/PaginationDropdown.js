import React from "react";
import "./index.css";

const PaginationDropdown = ({ onChange, ...props }) => {
  return (
    <div className="d-flex align-items-center gap-2">
      <select
        className="ct_pagination_select_21"
        {...props}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value={5}>5</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
        <option value={250}>250</option>
      </select>
    </div>
  );
};

export default PaginationDropdown;
