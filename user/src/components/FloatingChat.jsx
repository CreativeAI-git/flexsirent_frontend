import { useState, useRef, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { useAuiState } from "@assistant-ui/react";
import { useAIChat } from "../shared/context/AIChatContext";
import { useLocalizedNavigate } from "../shared/hooks/useLocalizedNavigate";
import { useTranslation } from "react-i18next";
import ChatMessagesView from "./chat/ChatMessagesView";

export default function FloatingChat() {
  const { t } = useTranslation();
  const navigate = useLocalizedNavigate();
  const location = useLocation();
  const { lang } = useParams();
  const {
    sessionId,
    hasSearched,
    isMinimized,
    moreAvailable,
    runtime,
    toggleMinimize,
    resetChat,
    locale,
    sendMessage
  } = useAIChat();

  // Reactive state from assistant-ui
  const messages = useAuiState((s) => s.thread.messages);
  const isRunning = useAuiState((s) => s.thread.isRunning);

  const [composerText, setComposerText] = useState("");
  const chatBodyRef = useRef(null);
  const textareaRef = useRef(null);

  // Set base bottom offset to 24px universally across all pages
  const baseOffset = 24;

  // Dynamic bottom positioning to prevent footer overlap
  const [footerOverlapOffset, setFooterOverlapOffset] = useState(baseOffset);

  // Check if current route is the homepage
  const pathname = location.pathname.replace(/\/+$/, "");
  const isHomePage =
    pathname === "" ||
    pathname === "/" ||
    pathname === `/${lang}` ||
    /^\/[a-z]{2}$/.test(pathname);

  useEffect(() => {
    if (!hasSearched || isHomePage) return;

    const handleScroll = () => {
      const footer = document.querySelector("footer, .site-footer, .web-footer");
      if (!footer) {
        setFooterOverlapOffset(baseOffset);
        return;
      }

      const footerRect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (footerRect.top < viewportHeight) {
        const visibleFooterHeight = viewportHeight - footerRect.top;
        setFooterOverlapOffset(visibleFooterHeight + baseOffset);
      } else {
        setFooterOverlapOffset(baseOffset);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [hasSearched, isMinimized, isHomePage]);

  // Auto-scroll chat body to bottom when messages list changes or loading state changes
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isRunning]);

  // If on homepage or user has not searched yet, do not render floating widget
  if (isHomePage || !hasSearched) return null;

  const isEs = locale.startsWith("es");

  // Handle composer submission
  const handleSend = (e) => {
    if (e) e.preventDefault();
    const text = composerText.trim();
    if (!text || isRunning) return;

    sendMessage(text);
    setComposerText("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "42px";
    }
  };

  // Helper to send text programmatically (e.g. from suggestion chips)
  const handleProgrammaticMessage = (text, intent) => {
    if (isRunning) return;
    sendMessage(text, intent);
  };

  const handleTextareaChange = (e) => {
    setComposerText(e.target.value);

    // Auto-resize up to 6 lines (approx 120px)
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = 120;
      textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .floating-chat-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 420px;
          height: 600px;
          max-height: 80vh;
          background: #ffffff;
          border: 1px solid #efe6d8;
          border-radius: 24px;
          box-shadow: 0 12px 40px rgba(19, 18, 16, 0.16);
          display: flex;
          flex-direction: column;
          z-index: 1050;
          overflow: hidden;
          transition: bottom 0.3s ease, transform 0.3s ease;
        }
        @media (max-width: 576px) {
          .floating-chat-container {
            bottom: 0 !important;
            right: 0;
            width: 100vw;
            height: 100vh;
            max-height: 100vh;
            border-radius: 0;
          }
        }
        .floating-chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          background: linear-gradient(135deg, #fffaf2 0%, #ffffff 100%);
          border-bottom: 1px solid #efe6d8;
        }
        .floating-chat-header__info {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .floating-chat-header__avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #FF7F00;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
        }
        .floating-chat-header__title {
          font-weight: 700;
          font-size: 15px;
          color: #171717;
          margin: 0;
          line-height: 1.2;
        }
        .floating-chat-header__status {
          font-size: 11px;
          color: #7b7369;
          margin: 0;
        }
        .floating-chat-header__actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .floating-chat-header__btn {
          border: 0;
          background: transparent;
          color: #7b7369;
          font-size: 14px;
          cursor: pointer;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .floating-chat-header__btn:hover {
          background-color: #f5ede2;
          color: #FF7F00;
        }
        .floating-chat-body {
          flex: 1;
          overflow-y: auto;
          background-color: #fbf9f6;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }
        .floating-chat-message-row {
          display: flex;
          width: 100%;
          gap: 8px;
        }
        .floating-chat-message-row--user {
          justify-content: flex-end;
        }
        .floating-chat-message-row--assistant {
          justify-content: flex-start;
          align-items: flex-end;
        }
        .floating-chat-message-bubble {
          padding: 12px 16px;
          font-size: 14px;
          line-height: 1.5;
          max-width: 85%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .floating-chat-message-bubble--user {
          background-color: #171717;
          color: #ffffff;
          border-radius: 18px 18px 4px 18px;
        }
        .floating-chat-message-bubble--assistant {
          background-color: #ffffff;
          color: #171717;
          border: 1px solid #efe6d8;
          border-radius: 18px 18px 18px 4px;
        }
        .floating-chat-composer {
          padding: 16px;
          border-top: 1px solid #efe6d8;
          background-color: #ffffff;
        }
        .floating-chat-composer__form {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .floating-chat-composer__input {
          flex: 1;
          border: 1px solid #efe6d8;
          border-radius: 16px;
          padding: 10px 14px;
          font-size: 14px;
          outline: none;
          resize: none;
          height: 42px;
          max-height: 120px;
          overflow-y: auto;
          line-height: 1.4;
          transition: border-color 0.2s ease;
        }
        .floating-chat-composer__input:focus {
          border-color: #FF7F00;
        }
        .floating-chat-composer__send-btn {
          border: 0;
          background-color: #FF7F00;
          color: #ffffff;
          width: 42px;
          height: 42px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: opacity 0.2s ease;
          flex-shrink: 0;
        }
        .floating-chat-composer__send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .floating-chat-badge {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: linear-gradient(135deg, #ff8a00 0%, #ff6a00 100%);
          color: #ffffff;
          padding: 12px 20px;
          border-radius: 999px;
          box-shadow: 0 8px 24px rgba(255, 106, 0, 0.35);
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-weight: 700;
          font-size: 14px;
          z-index: 1050;
          transition: transform 0.2s ease, bottom 0.3s ease;
        }
        .floating-chat-badge:hover {
          transform: translateY(-2px);
        }
        
        /* Custom UI Components styles */
        .chat-properties-scroll {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 8px;
          margin-top: 8px;
          scrollbar-width: thin;
        }
        .chat-properties-scroll::after {
          content: "";
          width: 12px;
          flex-shrink: 0;
        }
        .chat-property-card {
          width: 220px;
          flex-shrink: 0;
          border: 1px solid #efe6d8;
          border-radius: 14px;
          background-color: #ffffff;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .chat-property-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        }
        .chat-property-card__image-container {
          position: relative;
          height: 110px;
          background-color: #fbf9f6;
        }
        .chat-property-card__image {
          width: 100%;
          height: 120px;
          object-fit: cover;
        }
        .chat-property-card__badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background-color: #FF7F00;
          color: #ffffff;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 11px;
        }
        .chat-property-card__content {
          padding: 10px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }
        .chat-property-card__title {
          font-size: 13px;
          font-weight: 700;
          color: #171717;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .chat-property-card__justification {
          font-size: 11px;
          color: #7b7369;
          font-style: italic;
          margin: 0;
          line-height: 1.3;
          height: 32px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .chat-property-card__price-row {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 6px;
          border-top: 1px solid #fbf9f6;
        }
        .chat-property-card__price-label {
          font-size: 10px;
          color: #9c9489;
          text-transform: uppercase;
        }
        .chat-property-card__price-value {
          font-size: 13px;
          font-weight: 700;
          color: #FF7F00;
        }

        .chat-action-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 10px;
        }
        .chat-action-chip {
          background: #ffffff;
          border: 1px solid #efe6d8;
          color: #171717;
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .chat-action-chip:hover {
          background: #FF7F00;
          border-color: #FF7F00;
          color: #ffffff;
        }
        
        .chat-fallback-alert {
          background-color: #fffbeb;
          border-left: 4px solid #f59e0b;
          padding: 10px 12px;
          border-radius: 0 12px 12px 0;
          font-size: 12px;
          color: #78350f;
          margin-top: 4px;
        }
        .chat-loading-dots {
          display: flex;
          gap: 4px;
          align-items: center;
          padding: 4px 8px;
        }
        .chat-loading-dot {
          width: 6px;
          height: 6px;
          background-color: #FF7F00;
          border-radius: 50%;
          animation: chatDotBounce 1.4s infinite ease-in-out both;
        }
        .chat-loading-dot:nth-child(1) { animation-delay: -0.32s; }
        .chat-loading-dot:nth-child(2) { animation-delay: -0.16s; }
        @keyframes chatDotBounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }
      `}} />

      {isMinimized ? (
        <div className="floating-chat-badge" onClick={toggleMinimize} style={{ bottom: `${footerOverlapOffset}px` }}>
          <i className="fa-solid fa-robot"></i>
          <span>{isEs ? "Descubrimiento IA" : "AI Discovery"}</span>
        </div>
      ) : (
        <div className="floating-chat-container" style={{ bottom: `${footerOverlapOffset}px` }}>
          {/* Header */}
          <div className="floating-chat-header">
            <div className="floating-chat-header__info">
              <div className="floating-chat-header__avatar">
                <i className="fa-solid fa-robot"></i>
              </div>
              <div>
                <h4 className="floating-chat-header__title">FlexsiRent AI</h4>
                <p className="floating-chat-header__status">
                  {isEs ? "Asistente de búsqueda" : "Search assistant"}
                </p>
              </div>
            </div>
            <div className="floating-chat-header__actions">
              <button
                className="floating-chat-header__btn"
                onClick={resetChat}
                title={isEs ? "Reiniciar chat" : "Reset chat"}
              >
                <i className="fa-solid fa-rotate-left"></i>
              </button>
              <button
                className="floating-chat-header__btn"
                onClick={toggleMinimize}
                title={isEs ? "Minimizar" : "Minimize"}
              >
                <i className="fa-solid fa-minus"></i>
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="floating-chat-body" ref={chatBodyRef}>
            <ChatMessagesView
              messages={messages}
              isRunning={isRunning}
              sessionId={sessionId}
              locale={locale}
              navigate={navigate}
              onProgrammaticMessage={handleProgrammaticMessage}
            />
          </div>

          {/* Composer */}
          <div className="floating-chat-composer">
            <form onSubmit={handleSend} className="floating-chat-composer__form">
              <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center" }}>
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={composerText}
                  onChange={handleTextareaChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder={isEs ? "Escribe un mensaje..." : "Type a message..."}
                  disabled={isRunning}
                  className="floating-chat-composer__input animate-fade-in ct_custom_scroll"
                />
              </div>
              <button
                type="submit"
                disabled={isRunning || !composerText.trim()}
                className="floating-chat-composer__send-btn"
                title={isEs ? "Enviar" : "Send"}
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
