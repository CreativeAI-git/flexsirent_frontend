
const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) => {
  return (
      <div className="ct_search ct_w_100_575">
        <input
          type="text"
          className="form-control ct_input ct_input_h_50 ct_light_blue_input_border"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
    
  );
};

export default SearchInput;
