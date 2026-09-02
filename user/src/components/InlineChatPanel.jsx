import { useState, useRef, useEffect } from "react";
import { useAuiState } from "@assistant-ui/react";
import { useAIChat } from "../shared/context/AIChatContext";
import { useLocalizedNavigate } from "../shared/hooks/useLocalizedNavigate";
import { useTranslation } from "react-i18next";
import ChatMessagesView from "./chat/ChatMessagesView";

export default function InlineChatPanel() {
  const { t } = useTranslation();
  const navigate = useLocalizedNavigate();
  const {
    sessionId,
    hasSearched,
    moreAvailable,
    runtime,
    resetChat,
    locale,
    sendMessage,
  } = useAIChat();

  const messages = useAuiState((s) => s.thread.messages);
  const isRunning = useAuiState((s) => s.thread.isRunning);

  const [composerText, setComposerText] = useState("");
  const chatBodyRef = useRef(null);
  const textareaRef = useRef(null);

  const isEs = locale.startsWith("es");

  // Auto-scroll chat body to bottom when messages or running state updates
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isRunning]);

  // Handle composer submission
  const handleSend = (e) => {
    if (e) e.preventDefault();
    const text = composerText.trim();
    if (!text || isRunning) return;

    sendMessage(text);
    setComposerText("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "44px";
    }
  };

  // Helper to send text programmatically (e.g. from suggestion chips)
  const handleProgrammaticMessage = (text, intent) => {
    if (isRunning) return;
    sendMessage(text, intent);
  };

  const handleTextareaChange = (e) => {
    setComposerText(e.target.value);

    // Auto-resize up to 6 lines (~120px)
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = 120;
      textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  };

  return (
    <div className="inline-chat-wrapper w-100">
      <style dangerouslySetInnerHTML={{
        __html: `
  .inline-chat-card {
    width: 100%;
    max-width: 780px;
    margin: 0px auto 0px auto;
    height: auto;
    height: calc(100vh - 359px);
    min-height: 354px;
    background: #ffffff;
    border: 1px solid #efe6d8;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(19, 18, 16, 0.08);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    text-align: left;
  }
        @media (max-width: 768px) {
          .inline-chat-card {
            height: 424px;
            max-height: calc(100vh - 180px);
            border-radius: 16px;
            margin-bottom: 20px;
          }
        }
        .inline-chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          background: linear-gradient(135deg, #fffaf2 0%, #ffffff 100%);
          border-bottom: 1px solid #efe6d8;
        }
        .inline-chat-header__info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .inline-chat-header__avatar {
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
        .inline-chat-header__title {
          font-weight: 700;
          font-size: 16px;
          color: #171717;
          margin: 0;
          line-height: 1.2;
        }
        .inline-chat-header__status {
          font-size: 12px;
          color: #7b7369;
          margin: 0;
        }
        .inline-chat-header__actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .inline-chat-header__btn {
          border: 0;
          background: transparent;
          color: #7b7369;
          font-size: 14px;
          cursor: pointer;
          padding: 6px 10px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .inline-chat-header__btn:hover {
          background-color: #f5ede2;
          color: #FF7F00;
        }
        .inline-chat-body-container {
          flex: 1;
          overflow-y: auto;
          background-color: #fbf9f6;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }
        .flexsi-chat-body {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
        }
        .inline-chat-composer {
          padding: 14px 18px;
          border-top: 1px solid #efe6d8;
          background-color: #ffffff;
        }
        .inline-chat-composer__form {
          display: flex;
          gap: 10px;
          align-items: flex-end;
        }
        .inline-chat-composer__input {
          flex: 1;
          border: 1px solid #efe6d8;
          border-radius: 14px;
          padding: 10px 14px;
          font-size: 14px;
          outline: none;
          resize: none;
          height: 44px;
          max-height: 120px;
          overflow-y: auto;
          line-height: 1.4;
          transition: border-color 0.2s ease;
        }
        .inline-chat-composer__input:focus {
          border-color: #FF7F00;
        }
        .inline-chat-composer__send-btn {
          border: 0;
          background-color: #FF7F00;
          color: #ffffff;
          width: 44px;
          height: 44px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: opacity 0.2s ease, transform 0.1s ease;
          flex-shrink: 0;
        }
        .inline-chat-composer__send-btn:hover:not(:disabled) {
          transform: scale(1.03);
        }
        .inline-chat-composer__send-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
      `}} />

      <div className="inline-chat-card">
        {/* Header */}
        <div className="inline-chat-header">
          {/* Header Info */}
          <div className="inline-chat-header__info">
            <div className="inline-chat-header__avatar">
              <i className="fa-solid fa-robot"></i>
            </div>
            <div>
              <h4 className="inline-chat-header__title">FlexsiRent AI</h4>
              <p className="inline-chat-header__status">
                {isEs ? "Asistente de búsqueda conversacional" : "Conversational search assistant"}
              </p>
            </div>
          </div>
        </div>

        {/* Message Body */}
        <div className="inline-chat-body-container" ref={chatBodyRef}>
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
        <div className="inline-chat-composer">
          <form onSubmit={handleSend} className="inline-chat-composer__form">
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
              placeholder={
                isEs
                  ? "Describe lo que buscas (ej. 'piso con terraza en Málaga')..."
                  : "Describe what you need (e.g. 'flat with balcony in Malaga')..."
              }
              disabled={isRunning}
              className="inline-chat-composer__input ct_custom_scroll"
            />
            <button
              type="submit"
              disabled={isRunning || !composerText.trim()}
              className="inline-chat-composer__send-btn"
              title={isEs ? "Enviar" : "Send"}
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
