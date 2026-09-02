import React from "react";
import NeedInfoComponent from "./NeedInfoComponent";
import Show3Component from "./Show3Component";
import ShowMore3Component from "./ShowMore3Component";
import NoStockComponent from "./NoStockComponent";
import FallbackComponent from "./FallbackComponent";
import ListingAnswerComponent from "./ListingAnswerComponent";

export default function ChatMessagesView({
  messages = [],
  isRunning = false,
  sessionId,
  locale = "en",
  navigate,
  onProgrammaticMessage,
  chatBodyRef,
}) {
  const isEs = locale.startsWith("es");

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .flexsi-chat-body {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
        }
        .floating-chat-message-row {
          display: flex;
          width: 100%;
          gap: 10px;
          align-items: flex-start;
        }
        .floating-chat-message-row--user {
          justify-content: flex-end;
        }
        .floating-chat-message-row--assistant {
          justify-content: flex-start;
        }
        .floating-chat-header__avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #FF7F00;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .floating-chat-message-bubble {
          padding: 12px 18px;
          font-size: 14px;
          line-height: 1.5;
          max-width: 85%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          word-break: break-word;
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
        
        .chat-loading-dots {
          display: flex;
          gap: 5px;
          align-items: center;
          padding: 4px 8px;
        }
        .chat-loading-dot {
          width: 7px;
          height: 7px;
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

        .chat-properties-scroll {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 8px;
          margin-top: 10px;
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
          padding: 6px 14px;
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
      `}} />

      <div className="flexsi-chat-body" ref={chatBodyRef}>
        {messages.length === 0 && (
          <div className="floating-chat-message-row floating-chat-message-row--assistant">
            <div className="floating-chat-header__avatar">
              <i className="fa-solid fa-robot"></i>
            </div>
            <div className="floating-chat-message-bubble floating-chat-message-bubble--assistant">
              <span>
                {isEs
                  ? "¡Hola! Soy tu asistente de FlexsiRent. Describe tu estancia (por ejemplo, la ciudad, fecha de entrada, duración y presupuesto) para empezar a buscar propiedades."
                  : "Hello! I am your FlexsiRent AI assistant. Describe your stay (for example, city, move-in date, duration, and budget) to start finding properties."}
              </span>
            </div>
          </div>
        )}

        {messages.map((msg, idx) => {
          const isUser = msg.role === "user";

          const hasRenderableContent =
            msg.content &&
            msg.content.some((part) => {
              if (part.type === "text" && part.text && part.text.trim()) {
                return true;
              }
              if (part.type === "custom-payload" && part.data && part.data.action) {
                return true;
              }
              return false;
            });

          if (!hasRenderableContent) return null;

          return (
            <div
              key={msg.id || idx}
              className={`floating-chat-message-row ${
                isUser
                  ? "floating-chat-message-row--user"
                  : "floating-chat-message-row--assistant"
              }`}
            >
              {!isUser && (
                <div className="floating-chat-header__avatar">
                  <i className="fa-solid fa-robot"></i>
                </div>
              )}
              <div
                className={`floating-chat-message-bubble ${
                  isUser
                    ? "floating-chat-message-bubble--user"
                    : "floating-chat-message-bubble--assistant"
                }`}
                style={{
                  width: msg.content.some((p) => p.type === "custom-payload")
                    ? "100%"
                    : "auto",
                }}
              >
                {msg.content.map((part, pIdx) => {
                  if (part.type === "text") {
                    return <span key={pIdx}>{part.text}</span>;
                  }

                  if (part.type === "custom-payload") {
                    const payload = part.data || {};
                    const { action, trident_results } = payload;

                    if (action === "NEED_INFO") {
                      const questionText =
                        payload.question ||
                        (isEs
                          ? "¿En qué ciudad buscas el alojamiento? (ej. Málaga, Madrid, Barcelona)"
                          : "Which city are you looking for accommodation in? (e.g. Málaga, Madrid, Barcelona)");
                      return (
                        <span
                          key={pIdx}
                          style={{ display: "block", lineHeight: "1.5" }}
                        >
                          {questionText}
                        </span>
                      );
                    }

                    if (action === "SHOW_3") {
                      return (
                        <Show3Component
                          key={pIdx}
                          tridentResults={trident_results}
                          sessionId={sessionId}
                          locale={locale}
                          navigate={navigate}
                          onSubmitAnswer={onProgrammaticMessage}
                          moreAvailable={payload.more_available !== false}
                        />
                      );
                    }

                    if (action === "SHOW_MORE_3") {
                      return (
                        <ShowMore3Component
                          key={pIdx}
                          tridentResults={trident_results}
                          sessionId={sessionId}
                          locale={locale}
                          navigate={navigate}
                        />
                      );
                    }

                    if (action === "NO_STOCK") {
                      return (
                        <NoStockComponent
                          key={pIdx}
                          locale={locale}
                          onSubmitAnswer={onProgrammaticMessage}
                        />
                      );
                    }

                    if (action === "FALLBACK") {
                      return (
                        <FallbackComponent key={pIdx} locale={locale} />
                      );
                    }

                    if (action === "LISTING_ANSWER") {
                      return (
                        <ListingAnswerComponent
                          key={pIdx}
                          payload={payload}
                          sessionId={sessionId}
                          locale={locale}
                          navigate={navigate}
                        />
                      );
                    }

                    return null;
                  }
                  return null;
                })}
              </div>
            </div>
          );
        })}

        {isRunning && (
          <div className="floating-chat-message-row floating-chat-message-row--assistant">
            <div className="floating-chat-header__avatar">
              <i className="fa-solid fa-robot"></i>
            </div>
            <div className="floating-chat-message-bubble floating-chat-message-bubble--assistant">
              <div className="chat-loading-dots">
                <div className="chat-loading-dot"></div>
                <div className="chat-loading-dot"></div>
                <div className="chat-loading-dot"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
