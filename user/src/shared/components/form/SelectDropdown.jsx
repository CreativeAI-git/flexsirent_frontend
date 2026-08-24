const SelectDropdown = ({
  placeholder = null,
  options = [],
  selectedValue = "",
  onChange,
  className = "form-control ct_input ct_input_h_50 ct_light_blue_input_border",
  id,
  name,
}) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="form-group ct_w_100_575">
      <select
        id={id}
        name={name || id || "select"}
        className={className}
        value={selectedValue}
        onChange={handleChange}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option, index) =>
          option?.value !== null ? (
            <option key={index} value={option?.value}>
              {option?.label}
            </option>
          ) : null
        )}
      </select>
    </div>
  );
};

export default SelectDropdown;
