import React from "react";
import { StatusDefinitions } from "../../utils/data";

const StatusCol = ({ status = "", type = "" }) => {
  return (
    <span className={StatusDefinitions?.[type][status]?.color}>
      {StatusDefinitions?.[type][status]?.value}
    </span>
  );
};

export default StatusCol;
