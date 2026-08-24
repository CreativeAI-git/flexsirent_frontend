const ErrorMessage = ({ errors, touched, fieldName }) => {
  const error = errors?.[fieldName];
  const isTouched = touched?.[fieldName];
  return error && isTouched ? <span style={{ color: "red" }}>{error}</span> : null;
};

export default ErrorMessage