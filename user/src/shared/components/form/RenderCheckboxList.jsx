import ErrorMessage from "./ErrorMessage";

const RenderCheckboxList = ({
  name,
  options = [],
  values,
  setFieldValue,
  title,
  errors,
  touched,
}) => {
  const getOptionValue = (option) =>
    option.amenities_id || option.safety_id || option.ideal_id || option.house_rules_id;

  const getOptionTitle = (option) => option.title;

  const handleChange = (optionId) => {
    const currentValues = values[name] || [];
    const updatedValues = currentValues.includes(optionId)
      ? currentValues?.filter((v) => v !== optionId)
      : [...currentValues, optionId];
    setFieldValue(name, updatedValues);
  };

  return (
    <div className="ct_pe_40 mb-4">
      {title && <h4 className="ct_fs_16 ct_fw_600 mb-3">{title}</h4>}
      <ul className="d-flex align-items-center gap-3 flex-wrap ct_custom_scroll ct_para_scroll">
        {options.map((option, index) => {
          const optionId = getOptionValue(option);
          const isChecked = values[name]?.includes(optionId);

          return (
            <li key={optionId || index}>
              <div className="d-flex align-items-center gap-1">
                <div className="form-check ct_custom_check ct_flex_shrink_0 w-auto h-auto mt-0">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`${name}_${optionId}`}
                    checked={isChecked}
                    onChange={() => handleChange(optionId)}
                  />
                </div>
                <label htmlFor={`${name}_${optionId}`}>
                  {getOptionTitle(option)}
                </label>
              </div>
            </li>
          );
        })}
      </ul>
      <ErrorMessage errors={errors} fieldName={name} touched={touched}/>
    </div>
  );
};

export default RenderCheckboxList;
