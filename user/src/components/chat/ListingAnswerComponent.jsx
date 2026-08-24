export default function ListingAnswerComponent({ payload }) {
  const { answer_text = "" } = payload || {};

  return (
    <div style={{ width: "100%" }}>
      <p style={{ margin: 0, fontSize: "14px", color: "#171717", lineHeight: "1.5" }}>
        {answer_text}
      </p>
    </div>
  );
}
