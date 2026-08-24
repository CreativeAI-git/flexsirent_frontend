
import { Dropdown, Checkbox, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

const MultiSelectDropdown = ({ title, options, selectedValues, onChange }) => {
  const handleChange = (checkedValue, checked) => {
    if (checked) {
      onChange([...selectedValues, checkedValue]);
    } else {
      onChange(selectedValues.filter((item) => item !== checkedValue));
    }
  };

  const dropdownContent = (
    <div style={{ padding: "8px 12px", maxHeight: "200px", overflowY: "auto" }}>
      {options.map((option) => (
        <div
          key={option.value}
          className="d-flex justify-content-between align-items-center py-1"
        >
          <Checkbox
            checked={selectedValues.includes(option.value)}
            onChange={(e) => handleChange(option.value, e.target.checked)}
          >
            {option.label}
          </Checkbox>
          <span style={{ color: "#888" }}>{option.count}</span>
        </div>
      ))}
    </div>
  );

  return (
    <Dropdown overlay={dropdownContent} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {title}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default MultiSelectDropdown;
