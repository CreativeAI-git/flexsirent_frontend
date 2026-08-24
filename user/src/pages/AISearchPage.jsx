import { useEffect, useState, useRef } from "react";
import WebHeader from "../shared/layout/WebHeader";
import WebFooter from "../shared/layout/WebFooter";
import { useAIDiscovery } from "../shared/hooks/useAIDiscovery";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { useLocalizedNavigate } from "../shared/hooks/useLocalizedNavigate";
import "../styles/ai-search.css";

// Full controlled amenity code list per API contract
const AMENITY_LOCALIZATION = {
  en: {
    WIFI: "Wi-Fi",
    AC: "Air conditioning",
    HEATING: "Heating",
    WASHING_MACHINE: "Washing machine",
    DISHWASHER: "Dishwasher",
    OVEN: "Oven",
    MICROWAVE: "Microwave",
    BALCONY: "Balcony",
    TERRACE: "Terrace",
    ELEVATOR: "Elevator",
    PARKING: "Parking",
    PET_FRIENDLY: "Pet friendly",
    SMOKE_FREE: "Smoke-free",
    DESK_WORKSPACE: "Desk / workspace"
  },
  es: {
    WIFI: "WiFi",
    AC: "Aire acondicionado",
    HEATING: "Calefacción",
    WASHING_MACHINE: "Lavadora",
    DISHWASHER: "Lavavajillas",
    OVEN: "Horno",
    MICROWAVE: "Microondas",
    BALCONY: "Balcón",
    TERRACE: "Terraza",
    ELEVATOR: "Ascensor",
    PARKING: "Parking",
    PET_FRIENDLY: "Admite mascotas",
    SMOKE_FREE: "Sin humos",
    DESK_WORKSPACE: "Zona de trabajo"
  }
};

// Option labels A/B/C rendered by position (never expose internal DIRECT/LIFESTYLE/VALUE type)
const OPTION_LABELS = ["A", "B", "C"];

// Helper to format date into "DD-MMM-YYYY" e.g. "01-Sep-2026"
const formatCheckInDate = (dateStr) => {
  if (!dateStr) return "01-July-2026"; // Fallback to a default if not set
  try {
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const year = parts[0];
      const monthIndex = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, monthIndex, day);
      if (!isNaN(date.getTime())) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const dStr = day < 10 ? `0${day}` : `${day}`;
        return `${dStr}-${months[monthIndex] || "Jul"}-${year}`;
      }
    }
    return dateStr;
  } catch (e) {
    return dateStr;
  }
};

// Helper to calculate check-out date from check-in and duration
const formatCheckOutDate = (startDateStr, durationDays) => {
  if (!startDateStr) return "30-September-2026"; // Fallback to a default
  try {
    const parts = startDateStr.split("-");
    if (parts.length === 3) {
      const year = parts[0];
      const monthIndex = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, monthIndex, day);
      if (!isNaN(date.getTime())) {
        const daysToAdd = parseInt(durationDays, 10) || 90;
        date.setDate(date.getDate() + daysToAdd);
        const dayOut = date.getDate();
        const monthOutIndex = date.getMonth();
        const yearOut = date.getFullYear();
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const dStr = dayOut < 10 ? `0${dayOut}` : `${dayOut}`;
        return `${dStr}-${months[monthOutIndex] || "Sep"}-${yearOut}`;
      }
    }
    return "30-September-2026";
  } catch (e) {
    return "30-September-2026";
  }
};

const AISearchPage = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || "en";
  const navigate = useLocalizedNavigate();

  const SEARCH_EXAMPLES = [
    t("ai_discovery.example_1"),
    t("ai_discovery.example_2"),
    t("ai_discovery.example_3"),
  ];

  const {
    status,
    voiceActive,
    query,
    messages,
    properties,
    filters,
    selectedProperty,
    needInfoPrompt,
    suggestions,
    submitQuery,
    provideInfo,
    selectListing,
    confirmBooking,
    toggleVoice,
    resetAll,
  } = useAIDiscovery();
  const [inputVal, setInputVal] = useState("");
  const [transcript, setTranscript] = useState("");
  const [voiceError, setVoiceError] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const chatContainerRef = useRef(null);
  const chatSectionRef = useRef(null);

  // Speech Recognition setup using browser's Web Speech API
  useEffect(() => {
    if (!voiceActive) {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
        recognitionRef.current = null;
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceError(t("ai_discovery.voice.no_support") || "Speech Recognition is not supported by your browser.");
      setIsListening(false);
      toggleVoice(false);
      return;
    }

    setVoiceError("");
    setTranscript("");
    setIsListening(true);

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;

    // Map language locales
    const langMap = {
      en: "en-US",
      es: "es-ES",
      de: "de-DE",
      fr: "fr-FR",
      it: "it-IT",
      sv: "sv-SE"
    };
    recognition.lang = langMap[currentLang] || "en-US";

    recognition.onstart = () => {
      console.log("Speech recognition started in language:", recognition.lang);
      setIsListening(true);
      setVoiceError("");
    };

    let hasSpeech = false;

    recognition.onresult = (event) => {
      let resultText = "";
      for (let i = 0; i < event.results.length; i++) {
        resultText += event.results[i][0].transcript;
      }
      hasSpeech = true;
      setTranscript(resultText);
      setInputVal(resultText);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      toggleVoice(false);
      if (event.error === "not-allowed") {
        setVoiceError(t("ai_discovery.voice.mic_blocked") || "Microphone permission is blocked. Please enable it in browser settings.");
      } else if (event.error === "no-speech") {
        setVoiceError(t("ai_discovery.voice.no_speech") || "No speech detected. Please try again.");
      } else {
        setVoiceError(`Error: ${event.error}`);
      }
    };

    recognition.onend = () => {
      console.log("Speech recognition ended, hasSpeech:", hasSpeech);
      setIsListening(false);
      recognitionRef.current = null;
      toggleVoice(false);
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
    } catch (e) {
      console.error("Failed to start speech recognition:", e);
      setVoiceError("Could not start voice recognition.");
      setIsListening(false);
      toggleVoice(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
        recognitionRef.current = null;
      }
      setIsListening(false);
    };
  }, [voiceActive, currentLang]);

  const handleDoneVoice = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    toggleVoice(false);
  };

  // Auto-scroll chat container to bottom on new messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages]);

  // Scroll window to results when they are loaded/displayed
  useEffect(() => {
    if (status === "SHOW_3" || status === "FALLBACK" || status === "NO_STOCK") {
      setTimeout(() => {
        const resultsEl = document.querySelector(".ai-summary-card, .ai-results-grid, .alert-warning");
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }, 100);
    }
  }, [status]);

  // Scroll to chat screen on initial mount if query is present
  useEffect(() => {
    if (query) {
      const scrollTimer = setTimeout(() => {
        if (chatSectionRef.current) {
          chatSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
      return () => clearTimeout(scrollTimer);
    }
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim() && status !== "DISCOVERING") {
      submitQuery(inputVal.trim());
      setInputVal("");
    }
  };

  return (
    <div className="ai-search-page-wrapper">
      <WebHeader />

      <main className="ai-search-page">
        {/* Style injection for glowing voice waveforms and custom layout animation enhancements */}
        <style dangerouslySetInnerHTML={{
          __html: `
          .waveform-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            height: 60px;
            margin: 20px 0;
          }
          .wave-bar {
            width: 4px;
            height: 15px;
            background-color: #FF7F00;
            border-radius: 99px;
            animation: bounce 0.8s ease-in-out infinite alternate;
          }
          .wave-bar:nth-child(2) { animation-delay: 0.1s; height: 30px; }
          .wave-bar:nth-child(3) { animation-delay: 0.2s; height: 45px; }
          .wave-bar:nth-child(4) { animation-delay: 0.3s; height: 25px; }
          .wave-bar:nth-child(5) { animation-delay: 0.4s; height: 10px; }
          @keyframes bounce {
            from { transform: scaleY(1); }
            to { transform: scaleY(1.8); }
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.15); }
            100% { transform: scale(1); }
          }
          .animate-pulse {
            animation: pulse 1.5s infinite ease-in-out;
          }
          .voice-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(7, 21, 55, 0.85);
            backdrop-filter: blur(12px);
            z-index: 1050;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
          }
          .voice-overlay__card {
            background: #ffffff;
            color: #171717;
            padding: 40px;
            border-radius: 32px;
            text-align: center;
            box-shadow: 0 30px 70px rgba(0,0,0,0.3);
            max-width: 450px;
            width: 90%;
          }
          .checkout-summary-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }
          @media (max-width: 767px) {
            .checkout-summary-grid {
              grid-template-columns: 1fr;
            }
          }
        `}} />



        <section className="ai-search-hero">
          <div className="container">
            <div className="ai-search-shell">
              <div className="ai-search-hero__copy">
                <p className="ai-search-hero__badge">{t("ai_discovery.badge")}</p>
                <h1 className="ai-search-hero__title">
                  {t("ai_discovery.title")}
                </h1>
                <p className="ai-search-hero__subtitle">
                  {t("ai_discovery.subtitle")}
                </p>
              </div>

              {/* AI Search input box removed from hero */}
            </div>
          </div>
        </section>

        <section ref={chatSectionRef} className="ai-search-results container">
          {/* Chat history section - always visible when there is active discussion */}
          {messages.length > 0 && (
            <div className="bg-white rounded-4 shadow-sm overflow-hidden mb-4 animate-fade-in">
              {/* Header */}
              <div className="p-4 border-bottom d-flex align-items-center justify-content-between"
                style={{ background: "linear-gradient(135deg, #fff8ee 0%, #fff 100%)", borderTop: "1px solid #e6e6e6" }}
              >
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                    style={{ width: "44px", height: "44px", background: "#FF7F00", color: "#fff" }}
                  >
                    <i className="fa-solid fa-robot" style={{ fontSize: "18px" }}></i>
                  </div>
                  <div>
                    <p className="fw-bold mb-0" style={{ color: "#171717" }}>FlexsiRent AI</p>
                    <p className="mb-0 small text-muted">
                      {status === "NEED_INFO" ? t("ai_discovery.need_info.title") : "AI Assistant"}
                    </p>
                  </div>
                </div>
                {status !== "READY" && (
                  <button
                    className="btn btn-sm btn-outline-secondary px-3"
                    style={{ borderRadius: "12px", fontWeight: "600" }}
                    onClick={resetAll}
                  >
                    {t("ai_discovery.btn_reset")}
                  </button>
                )}
              </div>

              {/* Chat history list */}
              <div ref={chatContainerRef} className="p-4" style={{ maxHeight: "400px", overflowY: "auto", background: "#f9f9f7" }}>
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`d-flex mb-3 align-items-end gap-2 ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"}`}
                  >
                    {msg.sender !== "user" && (
                      <div className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                        style={{ width: "30px", height: "30px", background: "#FF7F00", color: "#fff", fontSize: "12px" }}
                      >
                        <i className="fa-solid fa-robot"></i>
                      </div>
                    )}
                    <div
                      className="p-3 rounded-4 w-100"
                      style={{
                        maxWidth: "78%",
                        background: msg.sender === "user" ? "#171717" : "#ffffff",
                        color: msg.sender === "user" ? "#fff" : "#171717",
                        border: msg.sender === "user" ? "none" : "1px solid #eee",
                        borderRadius: msg.sender === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
                      }}
                    >
                      <p className="mb-0 small" style={{ lineHeight: "1.5" }}>{msg.text}</p>

                      {/* Welcome message example search chips */}
                      {idx === 0 && messages.length === 1 && (
                        <div className="d-flex flex-wrap gap-2 mt-3">
                          {SEARCH_EXAMPLES.map((example) => (
                            <button
                              key={example}
                              type="button"
                              className="btn et_outline_badge btn-outline-secondary btn-sm rounded-pill text-start bg-light"
                              style={{ fontSize: "11px", borderColor: "#ddd" }}
                              onClick={() => {
                                submitQuery(example);
                              }}
                            >
                              {example}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Unified Chat Input Form */}
              <form onSubmit={handleSearchSubmit} className="p-4 border-top bg-white">
                {voiceError && (
                  <div className="alert alert-danger py-2 px-3 mb-2 rounded-3 small d-flex align-items-center justify-content-between animate-fade-in" style={{ fontSize: "12px", border: "1px solid #f8d7da" }}>
                    <span>
                      <i className="fa-solid fa-triangle-exclamation me-2"></i>
                      {voiceError}
                    </span>
                    <button type="button" className="btn-close" style={{ fontSize: "10px", padding: "0.25rem 0.5rem" }} onClick={() => setVoiceError("")}></button>
                  </div>
                )}
                {isListening && (
                  <div className="text-muted small mb-2 ps-1 animate-fade-in d-flex align-items-center gap-2" style={{ fontSize: "12px" }}>
                    <span className="spinner-grow spinner-grow-sm text-warning" role="status" style={{ width: "8px", height: "8px" }}></span>
                    <span>{t("ai_discovery.voice.listening")}</span>
                  </div>
                )}
                <div className="d-flex align-items-center gap-2">
                  <button
                    type="button"
                    className={`btn rounded-circle border-0 d-flex align-items-center justify-content-center ${isListening ? "animate-pulse" : ""}`}
                    style={{
                      width: "45px",
                      height: "45px",
                      backgroundColor: isListening ? "#FF7F00" : "#EFF4EC",
                      color: isListening ? "#FFFFFF" : "#FF7F00",
                      flexShrink: 0,
                      transition: "all 0.3s ease",
                      boxShadow: isListening ? "0 0 10px rgba(255, 127, 0, 0.5)" : "none"
                    }}
                    onClick={() => {
                      if (isListening) {
                        handleDoneVoice();
                      } else {
                        toggleVoice(true);
                      }
                    }}
                    title={isListening ? "Stop Voice Search" : "Voice Search"}
                  >
                    <i className="fa-solid fa-microphone" style={{ color: "inherit" }}></i>
                  </button>
                  <textarea
                    id="ai-search-input"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        if (inputVal.trim() && status !== "DISCOVERING") {
                          submitQuery(inputVal.trim());
                          setInputVal("");
                        }
                      }
                    }}
                    className="form-control"
                    style={{
                      borderRadius: "16px",
                      border: "2px solid #e0e0e0",
                      padding: "12px 18px",
                      fontSize: "14px",
                      resize: "none"
                    }}
                    placeholder={status === "NEED_INFO" ? t("ai_discovery.need_info.placeholder") : t("ai_discovery.input_placeholder")}
                    rows={2}
                    disabled={status === "DISCOVERING"}
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="btn px-4 text-white flex-shrink-0"
                    style={{
                      backgroundColor: "#FF7F00",
                      borderRadius: "16px",
                      fontWeight: "600",
                      height: "45px"
                    }}
                    disabled={status === "DISCOVERING" || !inputVal.trim()}
                  >
                    {status === "DISCOVERING"
                      ? <span className="spinner-border spinner-border-sm"></span>
                      : (status === "NEED_INFO" ? t("ai_discovery.need_info.btn_submit") : t("ai_discovery.btn_find"))
                    }
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* DISCOVERING / Loading state */}
          {status === "DISCOVERING" && (
            <div className="p-5 text-center bg-white rounded-4 shadow-sm">
              <div className="spinner-border text-warning mb-3" role="status" style={{ width: "3rem", height: "3rem" }}>
                <span className="visually-hidden">Loading...</span>
              </div>
              <h4 className="fw-bold">{t("ai_discovery.discovering.title")}</h4>
              <p className="text-muted">{t("ai_discovery.discovering.description")}</p>

              <div className="mt-4 mx-auto" style={{ maxWidth: "300px" }}>
                <div className="d-flex align-items-center justify-content-between text-muted small mb-1">
                  <span>{t("ai_discovery.discovering.step1")}</span>
                  <i className="fa-solid fa-circle-check text-success"></i>
                </div>
                <div className="d-flex align-items-center justify-content-between text-muted small mb-1">
                  <span>{t("ai_discovery.discovering.step2")}</span>
                  <i className="fa-solid fa-circle-check text-success"></i>
                </div>
                <div className="d-flex align-items-center justify-content-between text-muted small">
                  <span>{t("ai_discovery.discovering.step3")}</span>
                  <span className="spinner-grow spinner-grow-sm text-warning"></span>
                </div>
              </div>
            </div>
          )}


          {/* SHOW_3 / Trident flow */}
          {status === "SHOW_3" && (
            <div>
              <div className="ai-summary-card p-4 mb-4">
                <div className="ai-summary-card__header">
                  <div>
                    <span className="ai-summary-card__badge">{t("ai_discovery.show_3.badge")}</span>
                    <h3 className="ai-summary-card__title">{t("ai_discovery.show_3.title")}</h3>
                  </div>
                  <div className="ai-summary-card__count">
                    <strong>3</strong>
                    <span>{t("ai_discovery.show_3.count_unit")}</span>
                  </div>
                </div>
                <p className="mb-0 text-muted">{t("ai_discovery.show_3.description")}</p>
              </div>

              <div className="ai-results-grid">
                {properties.slice(0, 3).map((item, idx) => {
                  // rent_monthly_minor is in cents (minor units) — divide by 100 for display
                  const displayRent = item.rent_monthly_minor != null
                    ? Math.round(item.rent_monthly_minor / 100)
                    : null;
                  const locationLine = [item.area, item.city].filter(Boolean).join(", ");
                  const amenityCodes = item.amenities || [];
                  return (
                    <div key={item.id || idx} className="ai-property-card">
                      {/* Option label A / B / C by position — never show internal type */}
                      <div className="ai-property-card__option-badge"
                        style={{
                          position: "absolute",
                          top: "12px",
                          left: "12px",
                          background: "#FF7F00",
                          color: "#fff",
                          borderRadius: "50%",
                          width: "28px",
                          height: "28px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "700",
                          fontSize: "13px",
                          zIndex: 2
                        }}
                      >
                        {OPTION_LABELS[idx] || idx + 1}
                      </div>
                      <div style={{ position: "relative" }}>
                        <img
                          src={item.cover_photo || "https://app.flexsirent.com/assets/img/apartments/apartment_detail_small_2.png"}
                          className="ai-property-card__image"
                          alt={item.title}
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate(`/l/${item.id}`)}
                        />
                      </div>
                      <div className="d-flex flex-column justify-content-between py-2">
                        <div>
                          <span className="ai-property-card__eyebrow">
                            {locationLine || t("ai_discovery.property.eyebrow") || "Apartment"}
                          </span>
                          <h4 className="ai-property-card__title mt-1" style={{ cursor: "pointer" }} onClick={() => navigate(`/l/${item.id}`)}>{item.title}</h4>
                          {/* Justification text from AI — shown as-is (<=15 words) */}
                          {item.justification && (
                            <p className="text-muted small mt-1 mb-0" style={{ fontStyle: "italic" }}>
                              {item.justification}
                            </p>
                          )}
                          <div className="d-flex flex-wrap gap-1 mt-2">
                            {amenityCodes.map((code) => {
                              const label = AMENITY_LOCALIZATION[currentLang]?.[code] || code;
                              return (
                                <span key={code} className="badge bg-light text-dark border small" style={{ fontSize: "11px" }}>
                                  {label}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                        <dl className="ai-property-card__meta mb-0 mt-3">
                          <div>
                            <dt>{t("ai_discovery.property.capacity") || "Capacity"}</dt>
                            <dd>{item.capacity_max || 1} {t("ai_discovery.property.guests_unit") || "guests"}</dd>
                          </div>
                          {item.bedrooms != null && (
                            <div>
                              <dt>{t("ai_discovery.property.bedrooms") || "Bedrooms"}</dt>
                              <dd>{item.bedrooms}</dd>
                            </div>
                          )}
                        </dl>
                      </div>
                      <div className="text-xl-end d-flex flex-column gap-3 w-100 justify-content-between align-items-xl-end py-2">
                        <div className="text-xl-end" style={{ flex: "1" }}>
                          <span className="text-muted small d-block text-nowrap">{t("ai_discovery.property.monthly_rent")}</span>
                          <strong className="fs-4 ct_orange_text text-nowrap">
                            {displayRent != null ? `${item.currency || "EUR"} ${displayRent.toLocaleString()}` : "—"}
                          </strong>
                        </div>
                        {/* <button
                          className="btn btn-warning text-white px-3 py-2"
                          style={{ backgroundColor: "#FF7F00", borderRadius: "12px", fontWeight: "600" }}
                          onClick={() => selectListing(item)}
                        >
                          {t("ai_discovery.property.btn_select")}
                        </button> */}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* NO_STOCK flow */}
          {status === "NO_STOCK" && (
            <div className="bg-white p-5 rounded-4 shadow-sm text-center">
              <div className="d-inline-flex p-3 rounded-circle bg-danger-subtle text-danger mb-3">
                <i className="fa-solid fa-triangle-exclamation fa-2xl"></i>
              </div>
              <h3 className="fw-bold">{t("ai_discovery.no_stock.title")}</h3>
              <p className="text-muted mx-auto" style={{ maxWidth: "500px" }}>
                {t("ai_discovery.no_stock.description")}
              </p>

              <div className="d-flex flex-wrap gap-2 justify-content-center mt-4">
                {suggestions.map((item, idx) => (
                  <button
                    key={idx}
                    className="btn btn-outline-secondary btn-sm rounded-pill"
                    onClick={() => {
                      submitQuery(item);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* FALLBACK flow */}
          {status === "FALLBACK" && (
            <div>
              <div className="alert alert-warning rounded-4 p-4 mb-4 border-0" style={{ backgroundColor: "#fffbeb" }}>
                <h5 className="fw-bold text-warning-emphasis mb-2">
                  <i className="fa-solid fa-circle-exclamation me-2"></i>{t("ai_discovery.fallback.title")}
                </h5>
                <p className="mb-0 text-warning-emphasis small">
                  {t("ai_discovery.fallback.description")}
                </p>
              </div>

              <div className="ai-results-grid">
                {properties.map((item, idx) => {
                  const displayRent = item.rent_monthly_minor != null
                    ? Math.round(item.rent_monthly_minor / 100)
                    : null;
                  const locationLine = [item.area, item.city].filter(Boolean).join(", ");
                  const amenityCodes = item.amenities || [];
                  return (
                    <div key={item.id || idx} className="ai-property-card">
                      <div style={{ position: "relative" }}>
                        <img
                          src={item.cover_photo || "https://app.flexsirent.com/assets/img/apartments/apartment_detail_small_2.png"}
                          className="ai-property-card__image"
                          alt={item.title}
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate(`/l/${item.id}`)}
                        />
                      </div>
                      <div className="d-flex flex-column justify-content-between py-2">
                        <div>
                          <span className="ai-property-card__eyebrow">
                            {locationLine || t("ai_discovery.property.eyebrow") || "Apartment"}
                          </span>
                          <h4 className="ai-property-card__title mt-1" style={{ cursor: "pointer" }} onClick={() => navigate(`/l/${item.id}`)}>{item.title}</h4>
                          {item.justification && (
                            <p className="text-muted small mt-1 mb-0" style={{ fontStyle: "italic" }}>
                              {item.justification}
                            </p>
                          )}
                          <div className="d-flex flex-wrap gap-1 mt-2">
                            {amenityCodes.map((code) => {
                              const label = AMENITY_LOCALIZATION[currentLang]?.[code] || code;
                              return (
                                <span key={code} className="badge bg-light text-dark border small" style={{ fontSize: "11px" }}>
                                  {label}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                        <dl className="ai-property-card__meta mb-0 mt-3">
                          <div>
                            <dt>{t("ai_discovery.property.capacity") || "Capacity"}</dt>
                            <dd>{item.capacity_max || 1} {t("ai_discovery.property.guests_unit") || "guests"}</dd>
                          </div>
                        </dl>
                      </div>
                      <div className="text-end d-flex flex-column justify-content-between align-items-end py-2">
                        <div className="text-end">
                          <span className="text-muted small d-block">{t("ai_discovery.property.monthly_rent")}</span>
                          <strong className="fs-4 ct_orange_text">
                            {displayRent != null ? `${item.currency || "EUR"} ${displayRent.toLocaleString()}` : "—"}
                          </strong>
                        </div>
                        <button
                          className="btn btn-warning text-white px-3 py-2"
                          style={{ backgroundColor: "#FF7F00", borderRadius: "12px", fontWeight: "600" }}
                          onClick={() => selectListing(item)}
                        >
                          {t("ai_discovery.property.btn_select")}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* CONFIRMING checkout flow */}
          {status === "CONFIRMING" && selectedProperty && (
            <div className="bg-white p-4 rounded-4 shadow-sm">
              <h4 className="fw-bold mb-4 ct_orange_text">
                <i className="fa-solid fa-receipt me-2"></i>{t("ai_discovery.confirming.title")}
              </h4>

              <div className="checkout-summary-grid">
                {/* Left Card: Property summary */}
                <div className="border p-3 rounded-4">
                  <img
                    src={selectedProperty.cover_photo || "https://app.flexsirent.com/assets/img/apartments/apartment_detail_small_2.png"}
                    className="w-100 rounded-3 mb-3 object-fit-cover"
                    style={{ height: "180px" }}
                    alt=""
                  />
                  <h5 className="fw-bold">{selectedProperty.title}</h5>

                  <div className="row mt-4 pt-3 border-top">
                    <div className="col-6">
                      <span className="text-muted small d-block">{t("ai_discovery.confirming.check_in")}</span>
                      <strong>{formatCheckInDate(filters?.start_date)}</strong>
                    </div>
                    <div className="col-6">
                      <span className="text-muted small d-block">{t("ai_discovery.confirming.check_out")}</span>
                      <strong>{formatCheckOutDate(filters?.start_date, filters?.duration_days)}</strong>
                    </div>
                  </div>
                </div>

                {/* Right Card: Pricing breakdown */}
                <div className="border p-3 rounded-4 d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="fw-bold mb-3">{t("ai_discovery.confirming.price_spec")}</h5>

                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="text-muted">{t("ai_discovery.confirming.rent")}</span>
                      <strong>
                        {selectedProperty.currency || "EUR"} {selectedProperty.rent_monthly_minor != null ? Math.round(selectedProperty.rent_monthly_minor / 100).toLocaleString() : "—"}{t("ai_discovery.confirming.rent_suffix")}
                      </strong>
                    </div>
                    {filters?.duration_days && (
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className="text-muted">{t("ai_discovery.confirming.duration")}</span>
                        <strong>{filters.duration_days} {t("ai_discovery.confirming.days")}</strong>
                      </div>
                    )}
                    <div className="d-flex align-items-center justify-content-between pt-3 border-top mt-3">
                      <span className="fw-bold">{t("ai_discovery.confirming.total")}</span>
                      <strong className="fs-4 ct_orange_text">
                        {selectedProperty.currency || "EUR"} {selectedProperty.rent_monthly_minor != null ? Math.round((selectedProperty.rent_monthly_minor / 100) * ((parseInt(filters?.duration_days, 10) || 30) / 30)).toLocaleString() : "—"}
                      </strong>
                    </div>
                  </div>

                  <div className="d-flex gap-2 mt-4">
                    <button
                      className="btn btn-outline-secondary w-50"
                      onClick={() => resetAll()}
                    >
                      {t("ai_discovery.confirming.btn_back")}
                    </button>
                    <button
                      className="btn btn-warning text-white w-50"
                      style={{ backgroundColor: "#FF7F00", fontWeight: "600" }}
                      onClick={confirmBooking}
                    >
                      {t("ai_discovery.confirming.btn_lock")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CLOSING state profiles */}
          {status === "CLOSING" && (
            <div className="bg-white p-5 rounded-4 shadow-sm text-center">
              <div
                className="d-inline-flex p-3 rounded-circle bg-success-subtle text-success mb-3"
                style={{ width: "70px", height: "70px", alignItems: "center", justifyContent: "center" }}
              >
                <i className="fa-solid fa-circle-check fa-2xl"></i>
              </div>
              <h3 className="fw-bold">{t("ai_discovery.closing.title")}</h3>
              <p className="text-muted mx-auto" style={{ maxWidth: "500px" }}>
                {t("ai_discovery.closing.description")}
              </p>

              <div className="row g-4 mt-4 text-start">
                <div className="col-md-4">
                  <div className="border p-4 rounded-4 h-100 ct_cursor_pointer text-center" style={{ transition: "all 0.2s" }}>
                    <i className="fa-solid fa-graduation-cap fa-xl text-success mb-2"></i>
                    <h5 className="fw-bold">{t("ai_discovery.closing.student_path")}</h5>
                    <p className="text-muted small">{t("ai_discovery.closing.student_desc")}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="border p-4 rounded-4 h-100 ct_cursor_pointer text-center" style={{ transition: "all 0.2s" }}>
                    <i className="fa-solid fa-briefcase fa-xl text-primary mb-2"></i>
                    <h5 className="fw-bold">{t("ai_discovery.closing.professional_path")}</h5>
                    <p className="text-muted small">{t("ai_discovery.closing.professional_desc")}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="border p-4 rounded-4 h-100 ct_cursor_pointer text-center" style={{ transition: "all 0.2s" }}>
                    <i className="fa-solid fa-building fa-xl text-warning mb-2"></i>
                    <h5 className="fw-bold">{t("ai_discovery.closing.corporate_path")}</h5>
                    <p className="text-muted small">{t("ai_discovery.closing.corporate_desc")}</p>
                  </div>
                </div>
              </div>

              <button
                className="btn btn-warning mt-5 text-white px-5"
                style={{ backgroundColor: "#FF7F00", fontWeight: "600" }}
                onClick={resetAll}
              >
                {t("ai_discovery.closing.btn_new")}
              </button>
            </div>
          )}

          {/* ERROR state */}
          {status === "ERROR" && (
            <div className="bg-white p-5 rounded-4 shadow-sm text-center">
              <div className="d-inline-flex p-3 rounded-circle bg-danger-subtle text-danger mb-3">
                <i className="fa-solid fa-triangle-exclamation fa-2xl"></i>
              </div>
              <h3 className="fw-bold">{t("ai_discovery.error.title")}</h3>
              <p className="text-muted">
                {t("ai_discovery.error.description")}
              </p>
              <button className="btn btn-warning text-white mt-4" style={{ backgroundColor: "#FF7F00" }} onClick={resetAll}>
                {t("ai_discovery.error.btn_retry")}
              </button>
            </div>
          )}
        </section>
      </main>

      <WebFooter />
    </div>
  );
};

export default AISearchPage;
