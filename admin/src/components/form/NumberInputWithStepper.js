import ErrorMessage from "./ErrorMessage";

const IncrementInput = ({
  label = "",
  name,
  value = 0,
  setFieldValue,
  errors,
  touched,
}) => {
  const handleIncrement = () => {
    const newValue = Math.max(0, Number(value) + 1);
    setFieldValue(name, newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(0, Number(value) - 1);
    setFieldValue(name, newValue);
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const parsedValue = parseInt(inputValue);
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setFieldValue(name, parsedValue);
    } else if (inputValue === "") {
      setFieldValue(name, "");
    }
  };

  return (
    <div className="form-group mb-4">
      <label className="mb-2 ct_fw_500">{label}</label>
      <div className="position-relative">
        <span className="ct_decrease_btn" onClick={handleDecrement}>
          <i className="fa-solid fa-minus"></i>
        </span>
        <input
          type="number"
          className="form-control ct_px_70 text-center ct_input ct_input_h_50 ct_light_blue_input_border ct_border_radius_10"
          placeholder="0"
          value={value}
          onChange={handleChange}
          min={0}
          onWheel={(e) => e.target.blur()}
        />
        <span className="ct_increase_btn" onClick={handleIncrement}>
          <i className="fa-solid fa-plus"></i>
        </span>
      </div>
      <ErrorMessage errors={errors} fieldName={name} touched={touched} />
    </div>
  );
};

export default IncrementInput;
