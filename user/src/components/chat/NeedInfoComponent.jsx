import { useState } from "react";

export default function NeedInfoComponent({ intent, locale, onSubmitAnswer }) {
  const isEs = locale.startsWith("es");
  const missingCity = !intent || intent.city == null;
  const missingStartDate = !intent || intent.start_date == null;
  const missingDuration = !intent || intent.duration_days == null;
  const missingUnitType = !intent || intent.unit_type == null;

  // Calculate local today string in YYYY-MM-DD
  const todayObj = new Date();
  const yyyy = todayObj.getFullYear();
  const mm = String(todayObj.getMonth() + 1).padStart(2, "0");
  const dd = String(todayObj.getDate()).padStart(2, "0");
  const minDateStr = `${yyyy}-${mm}-${dd}`;

  const [cityVal, setCityVal] = useState("");
  const [dateVal, setDateVal] = useState("");
  const [durationVal, setDurationVal] = useState("");
  const [unitTypeVal, setUnitTypeVal] = useState(""); // "ROOM" or "APARTMENT"
  const [dateError, setDateError] = useState("");
  const [unitTypeError, setUnitTypeError] = useState("");

  const handleDateChange = (val) => {
    setDateVal(val);
    if (!val) {
      setDateError("");
      return;
    }
    const selectedDate = new Date(val);
    const todayZero = new Date();
    todayZero.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    
    if (selectedDate < todayZero) {
      setDateError(isEs 
        ? "La fecha de entrada no puede ser del pasado." 
        : "Move-in date cannot be in the past.");
    } else {
      setDateError("");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (missingStartDate && dateVal) {
      const selectedDate = new Date(dateVal);
      const todayZero = new Date();
      todayZero.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);

      if (selectedDate < todayZero) {
        setDateError(isEs 
          ? "La fecha de entrada no puede ser del pasado." 
          : "Move-in date cannot be in the past.");
        return;
      }
    }

    if (missingUnitType && !unitTypeVal) {
      setUnitTypeError(isEs
        ? "Por favor, selecciona un tipo de alojamiento."
        : "Please select an accommodation type.");
      return;
    }

    const parts = [];
    if (missingCity && cityVal.trim()) {
      parts.push(cityVal.trim());
    }
    if (missingStartDate && dateVal) {
      parts.push(`${isEs ? "desde" : "from"} ${dateVal}`);
    }
    if (missingDuration && durationVal) {
      parts.push(`${durationVal} ${isEs ? "días" : "days"}`);
    }
    if (missingUnitType && unitTypeVal) {
      const typeLabel = unitTypeVal === "ROOM"
        ? (isEs ? "habitación" : "room")
        : (isEs ? "apartamento entero" : "entire apartment");
      parts.push(typeLabel);
    }

    const constructedMessage = parts.join(", ");
    if (constructedMessage) {
      const submittedIntent = {};
      if (missingCity && cityVal.trim()) submittedIntent.city = cityVal.trim();
      if (missingStartDate && dateVal) submittedIntent.start_date = dateVal;
      if (missingDuration && durationVal) submittedIntent.duration_days = parseInt(durationVal, 10);
      if (missingUnitType && unitTypeVal) submittedIntent.unit_type = unitTypeVal;

      onSubmitAnswer(constructedMessage, submittedIntent);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <p style={{ margin: "0 0 8px", fontWeight: "600" }}>
        {isEs
          ? "Necesito unos datos para encontrar propiedades:"
          : "I need a few details to find matching stays:"}
      </p>
      <form onSubmit={handleFormSubmit} className="need-info-form">
        {missingCity && (
          <>
            <p className="need-info-form__label">{isEs ? "Ciudad" : "City"}</p>
            <input
              type="text"
              required
              className="need-info-form__input"
              placeholder={isEs ? "ej. Málaga, Madrid" : "e.g. Málaga, Madrid"}
              value={cityVal}
              onChange={(e) => setCityVal(e.target.value)}
            />
          </>
        )}

        {missingStartDate && (
          <>
            <p className="need-info-form__label">
              {isEs ? "Fecha de Entrada" : "Move-in Date"}
            </p>
            <input
              type="date"
              required
              min={minDateStr}
              className="need-info-form__input"
              value={dateVal}
              onChange={(e) => handleDateChange(e.target.value)}
            />
            {dateError && (
              <p style={{ color: "#dc2626", fontSize: "11px", marginTop: "4px", fontWeight: "600", margin: "4px 0 0" }}>
                {dateError}
              </p>
            )}
          </>
        )}

        {missingDuration && (
          <>
            <p className="need-info-form__label">
              {isEs ? "Duración (días)" : "Duration (days)"}
            </p>
            <input
              type="number"
              min="1"
              required
              className="need-info-form__input"
              placeholder={isEs ? "ej. 60" : "e.g. 60"}
              value={durationVal}
              onChange={(e) => setDurationVal(e.target.value)}
            />
          </>
        )}

        {missingUnitType && (
          <>
            <p className="need-info-form__label">
              {isEs ? "Tipo de alojamiento" : "Accommodation type"}
            </p>
            <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
              <button
                type="button"
                onClick={() => {
                  setUnitTypeVal("ROOM");
                  setUnitTypeError("");
                }}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "10px",
                  border: unitTypeVal === "ROOM" ? "2px solid #FF7F00" : "1px solid #efe6d8",
                  backgroundColor: unitTypeVal === "ROOM" ? "#fff8ee" : "#ffffff",
                  color: unitTypeVal === "ROOM" ? "#FF7F00" : "#7b7369",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px"
                }}
              >
                <i className="fa-solid fa-door-open" style={{ fontSize: "16px" }}></i>
                <span>{isEs ? "Habitación" : "Room"}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setUnitTypeVal("APARTMENT");
                  setUnitTypeError("");
                }}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "10px",
                  border: unitTypeVal === "APARTMENT" ? "2px solid #FF7F00" : "1px solid #efe6d8",
                  backgroundColor: unitTypeVal === "APARTMENT" ? "#fff8ee" : "#ffffff",
                  color: unitTypeVal === "APARTMENT" ? "#FF7F00" : "#7b7369",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px"
                }}
              >
                <i className="fa-solid fa-building" style={{ fontSize: "16px" }}></i>
                <span>{isEs ? "Apartamento entero" : "Entire apartment"}</span>
              </button>
            </div>
            {unitTypeError && (
              <p style={{ color: "#dc2626", fontSize: "11px", marginTop: "4px", fontWeight: "600", margin: "4px 0 0" }}>
                {unitTypeError}
              </p>
            )}
          </>
        )}

        <button type="submit" className="need-info-form__submit" style={{ marginTop: "6px" }}>
          {isEs ? "Enviar datos" : "Submit details"}
        </button>
      </form>
    </div>
  );
}
