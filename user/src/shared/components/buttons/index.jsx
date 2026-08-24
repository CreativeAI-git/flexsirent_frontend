import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";

const Button = ({ title, redirectUrl = "", ...props }) => {
  const navigate = useLocalizedNavigate();
  return (
    <div className="ct_w_100_575">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();

          redirectUrl && navigate(redirectUrl);
        }}
        className="ct_dark_blue_btn"
        {...props}
      >
        {title}
      </a>
    </div>
  );
};

export default Button;
