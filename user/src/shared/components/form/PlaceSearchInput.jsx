import { useRef } from "react";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];

const PlaceSearchInput = ({
  value,
  onChange,
  onSelect,
  placeholder = "Search city, area, or location",
  inputClass,
  inputclassName,
  style = { width: "265px" },
}) => {
  const autoCompleteRef = useRef(null);
  const finalInputClass = inputclassName || inputClass || "form-control ct_input ct_input_h_50 ct_light_blue_input_border ct_border_radius_10";

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDI4goHRPF_UHcK7F6TmFtnHyFNFYkdlfw",
    libraries,
  });

  const handlePlaceChanged = () => {
    const place = autoCompleteRef.current.getPlace();
    if (!place?.geometry?.location) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    onSelect({
      address: place.formatted_address,
      lat,
      lng,
      place,
    });
  };

  if (!isLoaded) return null;

  return (
    <Autocomplete
      onLoad={(ref) => (autoCompleteRef.current = ref)}
      onPlaceChanged={handlePlaceChanged}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={finalInputClass}
        style={style}
      />
    </Autocomplete>
  );
};

export default PlaceSearchInput;
