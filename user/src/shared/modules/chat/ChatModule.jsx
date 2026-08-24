import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import ViewProfile from "../../components/pages/chat management/ViewProfile";
import {
  getToken,
  pip_TimeAgo,
  getTimeLabel,
  getMessageDate,
  getDateLabel,
} from "../../utils/pip";
import {
  connectChatSocket,
  disconnectChatSocket,
  fetchAvailableUsers,
  fetchChatHistory,
  initializeChatScope,
  selectConversation,
  sendChatMessage,
  startChatConversation,
  setChatSearchTerm,
  toggleNewChatMode,
} from "../../../redux/features/chat";

const EmptyChat = () => (
  <div className="ct_empty_chat_box_content">
    <svg
      width="123"
      height="123"
      viewBox="0 0 123 123"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.956267"
        y="1.3696"
        width="120.87"
        height="120.87"
        rx="60.4348"
        fill="#F4F5FA"
      />
      <rect
        x="0.956267"
        y="1.3696"
        width="120.87"
        height="120.87"
        rx="60.4348"
        stroke="#E1E2E9"
        strokeWidth="0.869565"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M76.764 77.1737C70.1202 83.8182 60.2823 85.2538 52.2315 81.5305C51.043 81.052 50.0686 80.6653 49.1423 80.6653C46.5621 80.6806 43.3505 83.1824 41.6814 81.5152C40.0122 79.8459 42.516 76.6318 42.516 74.036C42.516 73.1096 42.1446 72.1526 41.6661 70.9618C37.9411 62.9123 39.3787 53.0711 46.0225 46.4288C54.5036 37.9445 68.2828 37.9445 76.764 46.4266C85.2605 54.924 85.2452 68.6916 76.764 77.1737Z"
        fill="#BEC0CA"
        stroke="#8B8D97"
        strokeWidth="1.30435"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M69.9541 62.7022H69.9737"
        stroke="#8B8D97"
        strokeWidth="1.73913"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M61.2412 62.7022H61.2608"
        stroke="#8B8D97"
        strokeWidth="1.73913"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M52.5244 62.7022H52.544"
        stroke="#8B8D97"
        strokeWidth="1.73913"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <div>
      <h4 className="ct_fs_20 ct_fw_600">Messages</h4>
      <p>Click on a contact to view messages.</p>
    </div>
  </div>
);

const ChatModule = ({ scope = "guest", roomId = "global" }) => {
  const dispatch = useDispatch();
  const chatListRef = useRef(null);
  const messageBodyRef = useRef(null);
  const textareaRef = useRef(null);
  const [text, setText] = useState("");
  const [isMobileView, setIsMobileView] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 767 : false,
  );

  const handleChange = (e) => {
    setText(e.target.value);
  };
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      setTimeout(() => {
        el.scrollTop = el.scrollHeight;
      }, 0);
    }
  }, [text]);

  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const scopeState = useSelector((state) => state.chat.byScope[scope] || {});

  const {
    searchTerm = "",
    isNewChat = false,
    conversations = [],
    availableUsers = [],
    selectedConversationId,
    selectedConversationType,
    messagesByConversation = {},
    currentUser,
  } = scopeState;

  const token = getToken(scope);

  useEffect(() => {
    dispatch(initializeChatScope({ scope, roomId }));
    dispatch(connectChatSocket({ scope, token }));

    return () => {
      dispatch(disconnectChatSocket({ scope }));
    };
  }, [dispatch, scope, roomId, token]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const selectedConversation = conversations.find(
    (item) =>
      item.id === selectedConversationId &&
      item.type === selectedConversationType,
  );

  const selectedKey =
    selectedConversationId && selectedConversationType
      ? `${selectedConversationId}__${selectedConversationType}`
      : "";

  const selectedMessages = selectedKey
    ? messagesByConversation[selectedKey] || []
    : [];

  const filteredConversation = useMemo(() => {
    if (!searchTerm?.trim()) return conversations;
    return conversations.filter((item) =>
      (item?.name || "").toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [conversations, searchTerm]);

  const filteredAvailableUsers = useMemo(() => {
    if (!searchTerm?.trim()) return availableUsers;
    return availableUsers.filter((item) =>
      (item?.name || "").toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [availableUsers, searchTerm]);

  const handleConversationClick = (e, item) => {
    e.preventDefault();
    if (isNewChat) {
      dispatch(
        startChatConversation({
          scope,
          receiverId: item.id,
          receiverType: item.type,
        }),
      );
    }

    dispatch(
      selectConversation({
        scope,
        conversationId: item.id,
        conversationType: item.type,
        avtar: item?.avatar,
      }),
    );

    dispatch(
      fetchChatHistory({
        scope,
        receiverId: item.id,
        receiverType: item.type,
      }),
    );

    if (isMobileView) {
      setIsMobileChatOpen(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || !selectedConversation) return;

    dispatch(
      sendChatMessage({
        scope,
        receiverId: selectedConversation.id,
        receiverType: selectedConversation.type,
        message: text.trim(),
      }),
    );

    setText("");
  };

  useEffect(() => {
    if (!messageBodyRef.current) return;
    messageBodyRef.current.scrollTo({
      top: messageBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [selectedKey, selectedMessages.length]);

  useEffect(() => {
    if (!chatListRef.current) return;
    const activeItem = chatListRef.current.querySelector("a.active2");
    if (activeItem) {
      activeItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [
    selectedConversationId,
    selectedConversationType,
    filteredConversation.length,
  ]);

  return (
    <>
      <div className="chat-area">
        <div className="chatlist ct_chatroom_chatlist">
          <div className="modal-dialog-scrollable">
            <div className="modal-content">
              <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap mb-3">
                <h4 className="ct_fs_16 mb-0 ct_fw_600 ct_nunito_font">Contacts</h4>
                <h4 className="ct_fs_16 mb-0 ct_fw_600 ct_nunito_font ct_text_op_05">
                  {isNewChat
                    ? filteredAvailableUsers.length || ""
                    : filteredConversation.length || ""}
                </h4>
              </div>

              <div className="d-flex gap-3 align-items-center justify-content-between">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control ct_input ct_input_ps_40 ct_input_h_40 ct_border_op_10"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) =>
                      dispatch(
                        setChatSearchTerm({
                          scope,
                          value: e.target.value,
                        }),
                      )
                    }
                  />
                  <i className="fa-solid fa-search ct_input_icon_left"></i>
                </div>
                <div
                  className="add-chat-user ct_cursor_pointer"
                  onClick={() => {
                    const nextValue = !isNewChat;
                    dispatch(toggleNewChatMode({ scope, value: nextValue }));
                    if (nextValue) {
                      dispatch(fetchAvailableUsers({ scope }));
                    }
                  }}
                >
                  <i className={`fa-solid fa-${!isNewChat ? "plus" : "x"}`}></i>
                </div>
              </div>

              <div
                className="modal-body mt-4 ct_custom_scrollbar"
                style={{ overflowX: "hidden" }}
              >
                <div
                  className={
                    isNewChat ? "contact-list-chat open" : "chat-list-open"
                  }
                >
                  <div className="chat-list" ref={chatListRef}>
                    {(
                      isNewChat
                        ? filteredAvailableUsers.length === 0
                        : filteredConversation.length === 0
                    ) ? (
                      <div className="text-center py-4 ct_fw_500">
                        No record found
                      </div>
                    ) : (
                      (isNewChat
                        ? filteredAvailableUsers
                        : filteredConversation
                      ).map((item) => (
                        (() => {
                          const isActiveConversation =
                            selectedConversationId === item.id &&
                            selectedConversationType === item.type;

                          return (
                            <a
                              href="#"
                              key={item.key}
                              onClick={(e) => handleConversationClick(e, item)}
                              className={`d-flex ${isActiveConversation ? "active2" : ""
                                }`}
                            >
                              <div className="ct_chat_list_grid">
                                <div className="position-relative">
                                  <img loading="lazy"
                                    className="img-fluid ct_img_30"
                                    src={item.avatar || "../user_profile.png"}
                                    alt="img"
                                  />
                                  {/* {item.online ? (
                                <span className="active"></span>
                              ) : null} */}
                                </div>
                                <div className="flex-grow-1 ms-1">
                                  <div className="d-flex align-items-center gap-2 mb-1 ">
                                    <h3 className="ct_fs_16 ct_fw_600">{item.name}</h3>
                                    <span className="text-dark text-capitalize ct_fs_10">
                                      ({item?.type})
                                    </span>
                                    {!isActiveConversation && item?.lastMessageAt && item.unreadCount ? (
                                      <span className="ms-auto ct_fs_10 ct_time_text">
                                        {pip_TimeAgo(item.lastMessageAt)}
                                      </span>
                                    ) : null}

                                  </div>
                                  <div className="d-flex align-items-center gap-2 justify-content-between">
                                    <p className="ct_fs_14 ct_overlay_text ct_overlay_text_w_150">
                                      {isNewChat ? item.role : item.lastMessage}
                                    </p>
                                    {!isActiveConversation && item.unreadCount ? (
                                      <div className="ct_caht_msg_notify">
                                        <span className="ms-auto">
                                          {item.unreadCount}
                                        </span>
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            </a>
                          );
                        })()
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`chatbox ${isMobileView && isMobileChatOpen ? "showbox" : ""}`}
        >
          <div
            className="ct_white_bg ct_border_radius_10 ct_p_20 h-100 pb-0"
            style={{ border: "1px solid #e6e6e6" }}
          >
            {selectedConversation ? (
              <div className="modal-dialog-scrollable">
                <div className="modal-content ct_chatroom_modal_content">
                  <div className="d-block">
                    <div className="msg-head d-flex align-items-center justify-content-between gap-3 flex-wrap">
                      <div className="d-flex align-items-center gap-2">
                        <i
                          className="fa-solid fa-chevron-left chat-icon ct_cursor_pointer"
                          onClick={() => {
                            if (isMobileView) setIsMobileChatOpen(false);
                          }}
                        ></i>
                        <div className="ct_grid_50_auto">
                          <img loading="lazy"
                            src={
                              selectedConversation.avatar ||
                              "../assets/img/user_4.jpg"
                            }
                            alt="img"
                          />
                          <div className="d-flex gap-2 flex-wrap">
                            <h4 className="ct_fs_16 ct_fw_600 mb-0">
                              {selectedConversation.name}
                            </h4>
                            <span className="text-capitalize ct_fs_12">
                              ({selectedConversation?.type})
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* <div>
                        <a
                          href="javascript:void(0)"
                          className="ct_orange_link"
                          data-bs-toggle="modal"
                          data-bs-target="#ct_view_user"
                        >
                          View Profile
                        </a>
                      </div> */}
                    </div>

                    <div className="modal-body">
                      <div
                        className="msg-body ct_custom_scrollbar"
                        ref={messageBodyRef}
                      >
                        {selectedMessages.length === 0 ? (
                          <div className="text-center py-4 ct_fw_500">
                            No messages yet
                          </div>
                        ) : (
                          <ul>
                            {selectedMessages.map((message, index) => {
                              const currentDate = getMessageDate(message);
                              const prevDate =
                                index > 0
                                  ? getMessageDate(selectedMessages[index - 1])
                                  : null;
                              const currentLabel = getDateLabel(currentDate);
                              const prevLabel = getDateLabel(prevDate);
                              const showDateLabel =
                                currentLabel && currentLabel !== prevLabel;
                              const isSent =
                                message?.sender_id === currentUser?.id &&
                                message?.sender_type === currentUser?.type;

                              return (
                                <Fragment key={`${selectedKey}-${index}`}>
                                  {showDateLabel ? (
                                    <div className="ct_chat_date text-center mt-4">
                                      <span>{currentLabel}</span>
                                    </div>
                                  ) : null}
                                  <li>
                                    <div className={isSent ? "repaly" : "sender"}>
                                      {isSent ? (
                                        <p>{message?.message || ""}</p>
                                      ) : (
                                        <h5 className="ct_fs_16 mb-0">
                                          {message?.message || ""}
                                        </h5>
                                      )}
                                      <p className="text-end mb-0 chat-time">
                                        {getTimeLabel(message)}
                                      </p>
                                    </div>
                                  </li>
                                </Fragment>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    </div>

                    <div className="send-box p-0">
                      <form onSubmit={handleSubmit} className="position-relative">
                        {/* <label
                          htmlFor="upload_chat_img_2"
                          className="ct_upload_paper_click_img"
                        >
                          <input
                            type="text"
                            className="d-none"
                            id="upload_chat_img_2"
                          />
                          <div>
                            <i className="fa-solid fa-paperclip"></i>
                          </div>
                        </label> */}
                        <textarea
                          ref={textareaRef}
                          className="form-control ct_custom_scroll"
                          placeholder="Your message"
                          onChange={handleChange}
                          rows={4}
                          style={{
                            width: "100%",
                            maxHeight: "120px",
                            overflowY: "auto",
                            resize: "none",
                          }}
                          value={text}
                        // onChange={ (e) => {
                        //   setText(e.target.value);
                        // }}
                        />

                        <button
                          type="submit"
                          className="ct_right_side_send_chat_btns border-0 text-dark"
                        >
                          <i className="fa-solid fa-paper-plane"></i>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <EmptyChat />
            )}
          </div>
        </div>
      </div>

      <ViewProfile />
    </>
  );
};

export default ChatModule;
