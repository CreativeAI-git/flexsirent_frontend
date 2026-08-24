import { useState } from "react";
import { useLocalizedNavigate } from "../shared/hooks/useLocalizedNavigate";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { useAIChat } from "../shared/context/AIChatContext";

const AIBar = ({ placeholder }) => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || "en";
  const { hasSearched, triggerFirstSearch } = useAIChat();

  const [query, setQuery] = useState("");
  const navigate = useLocalizedNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      triggerFirstSearch(trimmed);
      setQuery("");
    }
  };

  const activePlaceholder = placeholder || t("ai_discovery_banner.placeholder");
  const isHomePage = typeof window !== "undefined" && 
    (window.location.pathname === "/" || 
     window.location.pathname === "/en" || 
     window.location.pathname === "/es" ||
     window.location.pathname === "/en/" ||
     window.location.pathname === "/es/");

  if (hasSearched && !isHomePage) return null;

  return (
    <>
      <div id="ai-bar-section" className="ct_home_serch_filter mt-0 w-100" style={{ maxWidth: "650px", margin: "0 auto" }}>
        <form onSubmit={handleSubmit} className="w-100">
          <div className="form-group position-relative d-flex align-items-center" style={{ margin: 0 }}>
            <input
              type="text"
              placeholder={activePlaceholder}
              className="form-control ct_input bg-transparent border-0"
              style={{ paddingRight: "50px", height: "40px", fontSize: "16px" }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div
              className="position-absolute end-0 d-flex align-items-center gap-2 pe-1"
              style={{ top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
            >
              <button
                type="submit"
                className="border-0 d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: "36px",
                  height: "36px",
                  backgroundColor: "#FF7F00",
                  color: "#fff",
                  cursor: query.trim() ? "pointer" : "not-allowed",
                  opacity: query.trim() ? 1 : 0.5,
                  padding: 0
                }}
                disabled={!query.trim()}
                title="Find Stays"
              >
                <i className="fa-solid fa-arrow-up"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AIBar;