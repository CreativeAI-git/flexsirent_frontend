export default function FallbackComponent({ locale }) {
  const isEs = locale.startsWith("es");

  return (
    <div style={{ width: "100%" }}>
      <div className="chat-fallback-alert">
        <strong>
          {isEs ? "Búsqueda Guiada:" : "Guided Search:"}
        </strong>{" "}
        {isEs
          ? "Indícame la ciudad, fecha de entrada y por cuánto tiempo te hospedas."
          : "Tell me the city, move-in date and how long you'll stay."}
      </div>
    </div>
  );
}
