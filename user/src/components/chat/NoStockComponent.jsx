export default function NoStockComponent({ locale, onSubmitAnswer }) {
  const isEs = locale.startsWith("es");

  return (
    <div style={{ width: "100%" }}>
      <p style={{ margin: 0 }}>
        {isEs
          ? "No he encontrado disponibilidad exacta para estos criterios."
          : "I couldn't find exact availability matching your criteria."}
      </p>
      <div className="chat-action-chips" style={{ marginTop: "10px" }}>
        <button
          className="chat-action-chip"
          onClick={() => onSubmitAnswer(isEs ? "Mover fechas ±7 días" : "Shift dates ±7 days")}
        >
          {isEs ? "Mover fechas ±7 días" : "Shift dates ±7 days"}
        </button>
        <button
          className="chat-action-chip"
          onClick={() => onSubmitAnswer(isEs ? "Otra zona" : "Another area")}
        >
          {isEs ? "Otra zona" : "Another area"}
        </button>
        <button
          className="chat-action-chip"
          onClick={() => onSubmitAnswer(isEs ? "Ajustar presupuesto" : "Adjust budget")}
        >
          {isEs ? "Ajustar presupuesto" : "Adjust budget"}
        </button>
      </div>
    </div>
  );
}
