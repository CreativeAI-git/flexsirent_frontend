import { StatusDefinitions } from "../../utills/pip";

const StatusCol = ({ status = "", type = "" }) => {
  return (
    <td>
      <span class={`${StatusDefinitions?.[type][status]?.color} ct_fw_600`}>
        {StatusDefinitions?.[type][status]?.value || "#N/A"}
      </span>
    </td>
  );
};

export default StatusCol;
