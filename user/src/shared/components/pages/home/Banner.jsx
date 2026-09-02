import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useParams } from "react-router";
import { webPath } from "../../../../user/routes";
import { BASE_URL } from "../../../routes/apiURLs";
import MultiDatePicker from "../../MultiDateSelector";
import PlaceSearchInput from "../../form/PlaceSearchInput";
import AIBar from "@/components/AIBar";
import InlineChatPanel from "@/components/InlineChatPanel";
import { useAIChat } from "@/shared/context/AIChatContext";
import { useTranslation } from "react-i18next";

const buildApiUrl = (path) => {
  const baseUrl = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
};

const getFirstArray = (...values) =>
  values.find((value) => Array.isArray(value)) || [];

const getFirstObject = (...values) =>
  values.find(
    (value) => value && typeof value === "object" && !Array.isArray(value),
  ) || {};

const normaliseProperties = (payload) =>
  getFirstArray(
    payload,
    payload?.results,
    payload?.properties,
    payload?.matches,
    payload?.listings,
    payload?.data,
    payload?.data?.results,
    payload?.data?.properties,
    payload?.data?.matches,
    payload?.data?.listings,
  );

const normaliseFilters = (payload) => {
  const filters = getFirstObject(
    payload?.filters,
    payload?.extractedFilters,
    payload?.extracted_filters,
    payload?.data?.filters,
    payload?.data?.extractedFilters,
    payload?.data?.extracted_filters,
  );

  return {
    location:
      filters?.location ||
      filters?.city ||
      filters?.area ||
      filters?.destination ||
      "",
    budget:
      filters?.budget ||
      filters?.price_range ||
      filters?.priceRange ||
      filters?.rent_range ||
      filters?.rentRange ||
      "",
    dates:
      filters?.dates ||
      filters?.stay_dates ||
      filters?.move_in_out ||
      filters?.dateRange ||
      "",
    propertyType:
      filters?.property_type ||
      filters?.propertyType ||
      filters?.home_type ||
      filters?.category ||
      "",
    bhk: filters?.bhk || filters?.bedrooms || filters?.beds || "",
  };
};

const normaliseMeta = (payload, submittedQuery, fallbackCount) => {
  const source = getFirstObject(payload, payload?.data);
  const meta = getFirstObject(source?.meta, source?.summary);

  return {
    query:
      source?.query ||
      source?.search_query ||
      source?.prompt ||
      submittedQuery ||
      "",
    message:
      source?.message ||
      source?.summary ||
      meta?.message ||
      "Here are the closest matches for your request.",
    total:
      source?.total ||
      source?.count ||
      source?.total_results ||
      source?.data?.total ||
      fallbackCount ||
      0,
  };
};

const createBotMessage = (text, options = []) => ({
  id: `${Date.now()}-${Math.random()}`,
  role: "bot",
  text,
  options,
});

const createUserMessage = (text) => ({
  id: `${Date.now()}-${Math.random()}`,
  role: "user",
  text,
});

const getPeopleCount = (value) => {
  const match = String(value).match(/\d+/);
  return match ? Number(match[0]) : 0;
};

const hasGreetingOnly = (value) => {
  const normalised = value.trim().toLowerCase();
  return [
    "hi",
    "hello",
    "hey",
    "hii",
    "hy",
    "good morning",
    "good afternoon",
    "good evening",
  ].includes(normalised);
};

const isSmallTalk = (value) => {
  const normalised = value.trim().toLowerCase();
  return [
    "how are you",
    "how are you?",
    "what's up",
    "whats up",
    "kya haal hai",
    "kaise ho",
    "how do you do",
  ].includes(normalised);
};

const looksLikePropertyIntent = (value) => {
  const normalised = value.trim().toLowerCase();

  if (normalised.length < 4 || hasGreetingOnly(normalised) || isSmallTalk(normalised)) {
    return false;
  }

  const propertyKeywords = [
    "bhk",
    "studio",
    "flat",
    "apartment",
    "property",
    "home",
    "room",
    "villa",
    "rent",
    "rental",
    "stay",
    "house",
    "pg",
  ];

  return propertyKeywords.some((keyword) => normalised.includes(keyword));
};

const looksLikeLocation = (value) => {
  const normalised = value.trim().toLowerCase();

  if (normalised.length < 2 || hasGreetingOnly(normalised) || isSmallTalk(normalised)) {
    return false;
  }

  return /[a-z]/i.test(normalised);
};

const looksLikeBudget = (value) => {
  const normalised = value.trim().toLowerCase();
  return /\d/.test(normalised) || normalised.includes("budget") || normalised.includes("under");
};

const looksLikeDates = (value) => {
  const normalised = value.trim().toLowerCase();

  return (
    /\d/.test(normalised) ||
    normalised.includes("from") ||
    normalised.includes("to") ||
    normalised.includes("january") ||
    normalised.includes("february") ||
    normalised.includes("march") ||
    normalised.includes("april") ||
    normalised.includes("may") ||
    normalised.includes("june") ||
    normalised.includes("july") ||
    normalised.includes("august") ||
    normalised.includes("september") ||
    normalised.includes("october") ||
    normalised.includes("november") ||
    normalised.includes("december")
  );
};

const isQuestionLike = (value) => {
  const normalised = value.trim().toLowerCase();

  return (
    normalised.includes("?") ||
    normalised.startsWith("can ") ||
    normalised.startsWith("could ") ||
    normalised.startsWith("which ") ||
    normalised.startsWith("what ") ||
    normalised.startsWith("where ") ||
    normalised.startsWith("is ") ||
    normalised.startsWith("are ") ||
    normalised.startsWith("do ") ||
    normalised.startsWith("tell me")
  );
};

const getStageReminder = (stage) => {
  if (stage === "people") {
    return "To continue, please enter the number of people only, like 1, 2, or 3.";
  }

  if (stage === "location") {
    return "To continue, please share the location or city you want, like Málaga or Madrid.";
  }

  if (stage === "budget") {
    return "To continue, please enter your budget, like under 30k or 25000 to 35000.";
  }

  if (stage === "dates") {
    return "To continue, please share your move-in and move-out dates, like 1 July to 30 September.";
  }

  return "Please share the required property detail so I can continue the search.";
};

const buildConversationQuery = (details) => {
  const parts = [];

  if (details.intent) {
    parts.push(details.intent);
  }
  if (details.people) {
    parts.push(`for ${details.people} people`);
  }
  if (details.location) {
    parts.push(`in ${details.location}`);
  }
  if (details.budget) {
    parts.push(`budget ${details.budget}`);
  }
  if (details.dates) {
    parts.push(`dates ${details.dates}`);
  }

  return parts.join(", ");
};

const Banner = () => {
  const { lang } = useParams();
  const { t } = useTranslation();
  const navigate = useLocalizedNavigate();
  const { hasSearched } = useAIChat();
  const memberRef = useRef(null);
  const calendarRef = useRef(null);
  const chatBodyRef = useRef(null);

  const [locationData, setLocationData] = useState({
    viewport: null,
    address: "",
    lat: null,
    lng: null,
  });
  const [selectDate, setSelectDate] = useState({});
  const [isShowCalender, setIsShowCalender] = useState(false);
  const [isShowUserCount, setIsShowUserCount] = useState(false);
  const [searchByNumberOfPeople, setSearchByNumberOfPeople] = useState(0);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiStage, setAiStage] = useState("intent");
  const [conversationDetails, setConversationDetails] = useState({
    intent: "",
    people: "",
    location: "",
    budget: "",
    dates: "",
  });
  const [pendingResults, setPendingResults] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    createBotMessage("Hi, how can I help you find a property today?"),
    createBotMessage(
      "Tell me what kind of property you need, then I’ll ask a few quick details before showing matches.",
    ),
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (memberRef.current && !memberRef.current.contains(event.target)) {
        setIsShowUserCount(false);
      }

      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsShowCalender(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatMessages, aiLoading]);

  const handleManagePeopleCount = (val) => {
    if (val === "Dec") {
      if (searchByNumberOfPeople !== 0) {
        setSearchByNumberOfPeople(searchByNumberOfPeople - 1);
      }
    } else if (val === "Inc") {
      setSearchByNumberOfPeople(searchByNumberOfPeople + 1);
    }
  };

  const handleSearchProperty = () => {
    const params = new URLSearchParams();
    if (locationData?.address) params.set("location", locationData.address);
    if (selectDate?.start_date) params.set("move_in", selectDate.start_date);
    if (selectDate?.end_date) params.set("move_out", selectDate.end_date);
    if (searchByNumberOfPeople) params.set("max_person", String(searchByNumberOfPeople));
    if (locationData?.viewport) params.set("viewport", typeof locationData.viewport === "string" ? locationData.viewport : JSON.stringify(locationData.viewport));

    navigate(`${webPath.Properties}?${params.toString()}`);
  };

  const pushMessages = (...messages) => {
    setChatMessages((prev) => [...prev, ...messages]);
  };

  const askForConfirmation = (details) => {
    const summary = [
      details.intent ? `Need: ${details.intent}` : null,
      details.people ? `People: ${details.people}` : null,
      details.location ? `Location: ${details.location}` : null,
      details.budget ? `Budget: ${details.budget}` : null,
      details.dates ? `Dates: ${details.dates}` : null,
    ]
      .filter(Boolean)
      .join(" | ");

    pushMessages(
      createBotMessage(
        `I understood this requirement: ${summary}. Should I check matching properties now?`,
        [
          { label: "Yes, check", value: "confirm-search" },
          { label: "No, edit", value: "restart-search" },
        ],
      ),
    );
    setAiStage("confirm-search");
  };

  const handleAiConversation = async (rawValue) => {
    const value = rawValue.trim();

    if (!value || aiLoading) {
      return;
    }

    pushMessages(createUserMessage(value));
    setAiQuery("");

    if (aiStage === "intent") {
      if (hasGreetingOnly(value) || isSmallTalk(value)) {
        pushMessages(
          createBotMessage(
            "I'm doing well. Please tell me your property requirement, for example: 1 bedroom flat in Málaga for work, budget €1,200/month.",
          ),
        );
        return;
      }

      if (!looksLikePropertyIntent(value)) {
        pushMessages(
          createBotMessage(
            "Please describe the property you need, like studio in Barcelona near metro or 1 bedroom flat in Madrid.",
          ),
        );
        return;
      }

      setConversationDetails((prev) => ({
        ...prev,
        intent: value,
      }));
      pushMessages(
        createBotMessage("Great. How many people will stay in the property?"),
      );
      setAiStage("people");
      return;
    }

    if (aiStage === "people") {
      if (isQuestionLike(value) || hasGreetingOnly(value) || isSmallTalk(value)) {
        pushMessages(createBotMessage(getStageReminder("people")));
        return;
      }

      const people = getPeopleCount(value) || value;
      const numericPeople = getPeopleCount(value);

      if (!numericPeople) {
        pushMessages(
          createBotMessage(
            "Please enter the number of people only, for example 1, 2, or 3 people.",
          ),
        );
        return;
      }

      setSearchByNumberOfPeople(numericPeople);

      setConversationDetails((prev) => ({
        ...prev,
        people,
      }));
      pushMessages(
        createBotMessage("Perfect. Which location or city are you looking in?"),
      );
      setAiStage("location");
      return;
    }

    if (aiStage === "location") {
      if (isQuestionLike(value) || hasGreetingOnly(value) || isSmallTalk(value)) {
        pushMessages(createBotMessage(getStageReminder("location")));
        return;
      }

      if (!looksLikeLocation(value)) {
        pushMessages(
          createBotMessage(
            "Please share a valid city or location, for example Málaga, Madrid, or Barcelona near metro.",
          ),
        );
        return;
      }

      setConversationDetails((prev) => ({
        ...prev,
        location: value,
      }));
      setLocationData((prev) => ({
        ...prev,
        address: value,
      }));
      pushMessages(
        createBotMessage("Got it. What is your budget range for this stay?"),
      );
      setAiStage("budget");
      return;
    }

    if (aiStage === "budget") {
      if (isQuestionLike(value) || hasGreetingOnly(value) || isSmallTalk(value)) {
        pushMessages(createBotMessage(getStageReminder("budget")));
        return;
      }

      if (!looksLikeBudget(value)) {
        pushMessages(
          createBotMessage(
            "Please tell me your budget, for example under 30k or budget 25000 to 35000.",
          ),
        );
        return;
      }

      setConversationDetails((prev) => ({
        ...prev,
        budget: value,
      }));
      pushMessages(
        createBotMessage(
          "Thanks. What dates are you planning for move-in and move-out?",
        ),
      );
      setAiStage("dates");
      return;
    }

    if (aiStage === "dates") {
      if (isQuestionLike(value) || hasGreetingOnly(value) || isSmallTalk(value)) {
        pushMessages(createBotMessage(getStageReminder("dates")));
        return;
      }

      if (!looksLikeDates(value)) {
        pushMessages(
          createBotMessage(
            "Please share move-in and move-out timing, for example 1 July to 30 September.",
          ),
        );
        return;
      }

      const nextDetails = {
        ...conversationDetails,
        dates: value,
      };

      setConversationDetails(nextDetails);
      askForConfirmation(nextDetails);
      return;
    }

    if (aiStage === "result-decision") {
      const normalised = value.toLowerCase();

      if (["yes", "y", "show", "show me"].includes(normalised)) {
        handleOptionAction("view-results");
        return;
      }

      if (["no", "n", "not now"].includes(normalised)) {
        handleOptionAction("refine-results");
        return;
      }

      pushMessages(
        createBotMessage(
          "Please reply with Yes to open results or No to refine the search.",
        ),
      );
    }

    if (aiStage === "confirm-search") {
      const normalised = value.toLowerCase();

      if (["yes", "y", "check", "search"].includes(normalised)) {
        handleOptionAction("confirm-search");
        return;
      }

      if (["no", "n", "edit"].includes(normalised)) {
        handleOptionAction("restart-search");
        return;
      }

      pushMessages(
        createBotMessage(
          "Please reply with Yes to check properties or No if you want to edit the requirement.",
        ),
      );
    }
  };

  const fetchAiMatches = async () => {
    const query = buildConversationQuery(conversationDetails);

    if (!query) {
      return;
    }

    setAiLoading(true);
    pushMessages(
      createBotMessage("Checking available properties for your requirement..."),
    );

    try {
      const response = await axios.post(
        buildApiUrl("/ai/property-search"),
        { query },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const payload = response?.data || {};
      const properties = normaliseProperties(payload);
      const filters = normaliseFilters(payload);
      const meta = normaliseMeta(payload, query, properties.length);

      setPendingResults({
        query,
        properties,
        filters,
        meta,
      });

      pushMessages(
        createBotMessage(
          `I found ${meta.total || properties.length} matching properties. Would you like to see the results page now?`,
          [
            { label: "Yes, show results", value: "view-results" },
            { label: "No, refine search", value: "refine-results" },
          ],
        ),
      );
      setAiStage("result-decision");
    } catch (error) {
      pushMessages(
        createBotMessage(
          "I couldn’t fetch property matches right now. Please try again in a moment.",
        ),
      );
      setAiStage("confirm-search");
    } finally {
      setAiLoading(false);
    }
  };

  const resetConversation = () => {
    setPendingResults(null);
    setAiStage("intent");
    setConversationDetails({
      intent: "",
      people: "",
      location: "",
      budget: "",
      dates: "",
    });
    pushMessages(
      createBotMessage(
        "No problem. Tell me your property requirement again and I’ll help you refine it.",
      ),
    );
  };

  const handleOptionAction = (value) => {
    if (value === "confirm-search") {
      pushMessages(createUserMessage("Yes"));
      fetchAiMatches();
      return;
    }

    if (value === "restart-search") {
      pushMessages(createUserMessage("No"));
      resetConversation();
      return;
    }

    if (value === "view-results") {
      pushMessages(createUserMessage("Yes"));

      if (!pendingResults) {
        return;
      }

      navigate(webPath.AISearch, {
        state: {
          query: pendingResults.query,
          prefetchedResults: pendingResults,
        },
      });
      return;
    }

    if (value === "refine-results") {
      pushMessages(createUserMessage("No"));
      setPendingResults(null);
      setAiStage("intent");
      pushMessages(
        createBotMessage(
          "Sure. Send me the updated requirement and I’ll search again.",
        ),
      );
    }
  };

  return (
    <section className={`ct_banner_bg ${hasSearched ? "et_pt_80" : ""}`}>
      <div className="container position-relative">
        <div className="row">
          <div className="col-xxl-9 col-xl-10 col-md-12 mx-auto">
            <div className="ct_banner_title">
              <div className={`ct_banner_desc ${hasSearched ? "et_pb_40" : ""}`}>
                <h2 className="ct_fs_40 ct_blue_text mb-0 ct_fw_700 ct_ff_Agrandir_bold text-center">
                  {t("welcomeToFlexsi")}<span className="ct_fs_40 ct_blue_text mb-0 ct_fw_700 ct_ff_Agrandir_bold text-center ct_orange_text">rent</span>
                </h2>
                <div className="ct_banner_subtitle text-center ct_text_707070 ct_fs_18 mt-3">
                  {t("ai_discovery_banner.subtitle")}
                </div>
              </div>
              {/* comment by sakshi */}

              {/* <div className="ct_home_serch_filter">
                <div className="row align-items-center">
                  <div className="form-group text-start col-lg-7 mb-3 mb-lg-0">
                    <div className="ct_grid_2">
                      <div className="ct_border_right_1_grey">
                        <div className="form-group col-lg-12">
                          <PlaceSearchInput
                            value={locationData.address}
                            onChange={(val) =>
                              setLocationData((prev) => ({
                                ...prev,
                                address: val,
                                lat: null,
                                lng: null,
                              }))
                            }
                            onSelect={({ address, lat, lng, place }) =>
                              setLocationData({
                                viewport: place?.geometry?.viewport,
                                address,
                                lat,
                                lng,
                              })
                            }
                            inputclassName="form-control ct_input bg-transparent border-0 px-0"
                            style={{ width: "265px" }}
                          />
                        </div>
                      </div>

                      <div className="ct_border_right_1_grey">
                        <div className="position-relative" ref={memberRef}>
                          <input
                            type="number"
                            onWheel={(e) => e.target.blur()}
                            id="ct_member_numbers"
                            value={
                              searchByNumberOfPeople === 0
                                ? ""
                                : searchByNumberOfPeople
                            }
                            readOnly
                            onClick={() => {
                              setIsShowUserCount(true);
                              setIsShowCalender(false);
                            }}
                            className="form-control ct_input bg-transparent px-0 ct_placeholder_light border-0"
                            placeholder="Enter Members"
                          />

                          <div
                            className={`ct_custom_dropdown_list ct_member_filter ${isShowUserCount ? "active" : ""
                              }`}
                          >
                            <h5 className="ct_fs_16 ct_fw_500 mb-3">
                              How Many Members
                            </h5>
                            <div className="ct_member_counter">
                              <button
                                type="button"
                                className="ct_flex_shrink_0"
                                onClick={() => handleManagePeopleCount("Dec")}
                              >
                                -
                              </button>
                              <input
                                type="number"
                                className="bg-transparent border-0 text-center w-100"
                                style={{ outline: "none" }}
                                value={searchByNumberOfPeople}
                                readOnly
                                placeholder="0"
                              />
                              <button
                                type="button"
                                className="ct_flex_shrink_0"
                                onClick={() => handleManagePeopleCount("Inc")}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-group text-start col-lg-4 mb-3 mb-lg-0">
                    <div
                      className="pe-0 pe-lg-3 position-relative"
                      ref={calendarRef}
                    >
                      <input
                        type="text"
                        id="multiDatePicker"
                        placeholder="Move in - Move Out"
                        value={
                          selectDate?.start_date
                            ? `${selectDate?.start_date} - ${selectDate?.end_date}`
                            : ""
                        }
                        onClick={() => {
                          setIsShowCalender(true);
                          setIsShowUserCount(false);
                        }}
                        className="form-control ct_input bg-transparent px-0 ct_placeholder_light border-0"
                      />
                      <div
                        className={`ct_custom_dropdown_list ${isShowCalender ? "active" : ""
                          }`}
                        style={{ maxHeight: "unset", maxWidth: "300px" }}
                      >
                        <MultiDatePicker
                          onDateSelect={(val) => setSelectDate(val)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="ct_search_icon col-lg-1">
                    <button
                      type="button"
                      className="ct_flex_shrink_0"
                      onClick={handleSearchProperty}
                    >
                      <span className="d-block d-lg-none"> Search</span>
                      <i className="fa-solid fa-search"></i>
                    </button>
                  </div>
                </div>
              </div> */}

              {/* end */}

              <div className="row justify-content-center">
                <div className="col-lg-10 col-xl-9 col-xxl-8">
                  {hasSearched ? (
                    <InlineChatPanel />
                  ) : (
                    <>
                      <AIBar />
                      <div className="d-flex flex-wrap gap-4 justify-content-center ct_mt_35">
                        <div>
                          <div className="d-flex gap-1 align-items-center">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8.75 10.3688L7.13125 8.75L6.25 9.63125L8.75 12.1313L13.75 7.13125L12.8688 6.25L8.75 10.3688Z" fill="#707070" />
                              <path d="M10 18.75L6.14 16.6919C5.0395 16.1066 4.11919 15.2325 3.4779 14.1637C2.83661 13.0948 2.49854 11.8715 2.5 10.625V2.5C2.5 2.16848 2.6317 1.85054 2.86612 1.61612C3.10054 1.3817 3.41848 1.25 3.75 1.25H16.25C16.5815 1.25 16.8995 1.3817 17.1339 1.61612C17.3683 1.85054 17.5 2.16848 17.5 2.5V10.625C17.5015 11.8715 17.1634 13.0948 16.5221 14.1637C15.8808 15.2325 14.9605 16.1066 13.86 16.6919L10 18.75ZM3.75 2.5V10.625C3.74931 11.6448 4.02618 12.6456 4.55093 13.52C5.07568 14.3945 5.82853 15.1096 6.72875 15.5887L10 17.3331L13.2713 15.5894C14.1716 15.1102 14.9245 14.3949 15.4492 13.5204C15.974 12.6458 16.2508 11.6449 16.25 10.625V2.5H3.75Z" fill="#707070" />
                            </svg>

                            <span className="ct_text_707070 ct_fs_15">{t("ai_discovery_banner.verified_properties")}</span>
                          </div>
                        </div>
                        <div>
                          <div className="d-flex gap-1 align-items-center">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1.66699 9.99967C1.66699 6.85717 1.66699 5.28551 2.64366 4.30967C3.62033 3.33384 5.19116 3.33301 8.33366 3.33301H11.667C14.8095 3.33301 16.3812 3.33301 17.357 4.30967C18.3328 5.28634 18.3337 6.85717 18.3337 9.99967V11.6663C18.3337 14.8088 18.3337 16.3805 17.357 17.3563C16.3803 18.3322 14.8095 18.333 11.667 18.333H8.33366C5.19116 18.333 3.61949 18.333 2.64366 17.3563C1.66783 16.3797 1.66699 14.8088 1.66699 11.6663V9.99967Z" stroke="#61739A" />
                              <path d="M5.83398 3.33301V2.08301M14.1673 3.33301V2.08301M2.08398 7.49967H17.9173" stroke="#61739A" strokeLinecap="round" />
                              <path d="M15 14.1667C15 14.3877 14.9122 14.5996 14.7559 14.7559C14.5996 14.9122 14.3877 15 14.1667 15C13.9457 15 13.7337 14.9122 13.5774 14.7559C13.4211 14.5996 13.3333 14.3877 13.3333 14.1667C13.3333 13.9457 13.4211 13.7337 13.5774 13.5774C13.7337 13.4211 13.9457 13.3333 14.1667 13.3333C14.3877 13.3333 14.5996 13.4211 14.7559 13.5774C14.9122 13.7337 15 13.9457 15 14.1667ZM15 10.8333C15 11.0543 14.9122 11.2663 14.7559 11.4226C14.5996 11.5789 14.3877 11.6667 14.1667 11.6667C13.9457 11.6667 13.7337 11.5789 13.5774 11.4226C13.4211 11.2663 13.3333 10.8333 13.3333 10.8333C13.3333 10.6123 13.4211 10.4004 13.5774 10.2441C13.7337 10.0878 13.9457 10 14.1667 10C14.3877 10 14.5996 10.0878 14.7559 10.2441C14.9122 10.4004 15 10.6123 15 10.8333ZM10.8333 14.1667C10.8333 14.3877 10.7455 14.5996 10.5893 14.7559C10.433 14.9122 10.221 15 10 15C9.77899 15 9.56702 14.9122 9.41074 14.7559C9.25446 14.5996 9.16667 14.3877 9.16667 14.1667C9.16667 13.9457 9.25446 13.7337 9.41074 13.5774C9.56702 13.4211 9.77899 13.3333 10 13.3333C10.221 13.3333 10.433 13.4211 10.5893 13.5774C10.7455 13.7337 10.8333 13.9457 10.8333 14.1667ZM10.8333 10.8333C10.8333 11.0543 10.7455 11.2663 10.5893 11.4226C10.433 11.5789 10.221 11.6667 10 11.6667C9.77899 11.6667 9.56702 11.5789 9.41074 11.4226C9.25446 11.2663 9.16667 11.0543 9.16667 10.8333C9.16667 10.6123 9.25446 10.4004 9.41074 10.2441C9.56702 10.0878 9.77899 10 10 10C10.221 10 10.433 10.0878 10.5893 10.2441C10.7455 10.4004 10.8333 10.6123 10.8333 10.8333ZM6.66667 14.1667C6.66667 14.3877 6.57887 14.5996 6.42259 14.7559C6.26631 14.9122 6.05435 15 5.83333 15C5.61232 15 5.40036 14.9122 5.24408 14.7559C5.0878 14.5996 5 14.3877 5 14.1667C5 13.9457 5.0878 13.7337 5.24408 13.5774C5.40036 13.4211 5.61232 13.3333 5.83333 13.3333C6.05435 13.3333 6.26631 13.4211 6.42259 13.5774C6.57887 13.7337 6.66667 13.9457 6.66667 14.1667ZM6.66667 10.8333C6.66667 11.0543 6.57887 11.2663 6.42259 11.4226C6.26631 11.5789 6.05435 11.6667 5.83333 11.6667C5.61232 11.6667 5.40036 11.5789 5.24408 11.4226C5.0878 11.2663 5 11.0543 5 10.8333C5 10.6123 5.0878 10.4004 5.24408 10.2441C5.40036 10.0878 5.61232 10 5.83333 10C6.05435 10 6.26631 10.0878 6.42259 10.2441C6.57887 10.4004 6.66667 10.6123 6.66667 10.8333Z" fill="#61739A" />
                            </svg>
                            <span className="ct_text_707070 ct_fs_15">{t("ai_discovery_banner.flexible_stays")}</span>
                          </div>
                        </div>
                        <div>
                          <div className="d-flex gap-1 align-items-center">
                            <svg className="me-1" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.41797 8.05554V5.13888C5.41797 4.10748 5.82769 3.11833 6.557 2.38903C7.28631 1.65972 8.27546 1.25 9.30686 1.25C10.3383 1.25 11.3274 1.65972 12.0567 2.38903C12.786 3.11833 13.1957 4.10748 13.1957 5.13888V8.05554" stroke="#61739A" strokeLinecap="round" />
                              <path d="M2.5 8.05566H16.1111V16.8056C16.1111 17.3213 15.9063 17.8159 15.5416 18.1806C15.1769 18.5452 14.6824 18.7501 14.1667 18.7501H4.44444C3.92875 18.7501 3.43417 18.5452 3.06951 18.1806C2.70486 17.8159 2.5 17.3213 2.5 16.8056V8.05566Z" stroke="#61739A" strokeLinejoin="round" />
                              <path d="M11.7344 13.4033H11.7427V13.4117H11.7344V13.4033Z" stroke="#61739A" strokeWidth="1.5" strokeLinejoin="round" />
                            </svg>
                            <span className="ct_text_707070 ct_fs_15">{t("ai_discovery_banner.secure_payments")}</span>
                          </div>
                        </div>
                        <div>
                          <div className="d-flex gap-1 align-items-center">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M16.5003 8.48367C16.242 5.83367 14.6753 1.66699 9.83369 1.66699C4.99201 1.66699 3.42533 5.83367 3.16701 8.48367C2.26076 8.82762 1.66299 9.69769 1.66701 10.667V11.8337C1.66701 13.1223 2.7117 14.167 4.00033 14.167C5.289 14.167 6.33369 13.1223 6.33369 11.8337V10.667C6.32947 9.71859 5.75369 8.86641 4.87533 8.50867C5.04201 6.97531 5.85869 3.33367 9.83369 3.33367C13.8087 3.33367 14.617 6.97531 14.7837 8.50867C13.9071 8.86719 13.3342 9.71996 13.3337 10.667V11.8337C13.3355 12.2727 13.4607 12.7024 13.6949 13.0737C13.9292 13.4451 14.2632 13.743 14.6587 13.9337C14.3087 14.592 13.417 15.4837 11.2253 15.7503C10.7872 15.0851 9.93963 14.8228 9.20236 15.1244C8.46514 15.426 8.04432 16.2071 8.19807 16.9887C8.35182 17.7702 9.03713 18.3337 9.83369 18.3337C10.1423 18.3319 10.4444 18.2446 10.7063 18.0812C10.9682 17.9179 11.1797 17.6851 11.317 17.4087C14.892 17.0003 16.0337 15.1587 16.392 14.0753C17.3614 13.7613 18.0134 12.8526 18.0003 11.8337V10.667C18.0044 9.69769 17.4066 8.82762 16.5003 8.48367ZM4.66701 11.8337C4.66701 12.2018 4.36854 12.5003 4.00033 12.5003C3.63213 12.5003 3.33369 12.2019 3.33369 11.8337V10.667C3.33302 10.579 3.34977 10.4918 3.38297 10.4103C3.41617 10.3288 3.46517 10.2547 3.52714 10.1923C3.58911 10.1298 3.66283 10.0803 3.74405 10.0464C3.82526 10.0126 3.91237 9.99521 4.00035 9.99521C4.08833 9.99521 4.17544 10.0126 4.25666 10.0464C4.33788 10.0803 4.41159 10.1298 4.47357 10.1923C4.53554 10.2547 4.58454 10.3288 4.61774 10.4103C4.65094 10.4918 4.66769 10.579 4.66701 10.667V11.8337ZM15.0003 10.667C15.0003 10.2988 15.2988 10.0003 15.667 10.0003C16.0352 10.0003 16.3337 10.2988 16.3337 10.667V11.8337C16.3337 12.2018 16.0352 12.5003 15.667 12.5003C15.2988 12.5003 15.0003 12.2019 15.0003 11.8337V10.667Z" fill="#61739A" />
                            </svg>

                            <span className="ct_text_707070 ct_fs_15">{t("ai_discovery_banner.support_24_7")}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>












              {/* <div className="ct_banner_ai_toggle_wrap">
                <button
                  type="button"
                  className="ct_ai_toggle_button"
                  onClick={() => setIsAiOpen((prev) => !prev)}
                >
                  <span className="ct_ai_toggle_icon">
                    <i className="fa-solid fa-sparkles"></i>
                  </span>
                  <span>
                    <strong>Llama 3.2 IA</strong>
                    <small>GPU server powered</small>
                  </span>
                </button>
                <aside
                  className={`ct_banner_ai_flyout ${isAiOpen ? "active" : ""}`}
                  aria-hidden={!isAiOpen}
                >
                  <div className="ct_ai_chat_card">
                    <div className="ct_ai_chat_header">
                      <div>
                        <p className="mb-1 ct_fs_14 ct_fw_600">Llama 3.2 IA</p>
                        <span className="ct_text_op_6 ct_fs_14">
                          Guided property discovery before opening results
                        </span>
                      </div>

                      <div className="d-flex align-items-center gap-3">
                        <span className="ct_ai_online_dot"></span>
                        <button
                          type="button"
                          className="ct_ai_close_btn"
                          onClick={() => setIsAiOpen(false)}
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                    </div>

                    <div className="ct_ai_chat_body" ref={chatBodyRef}>
                      {chatMessages.map((message) => (
                        <div key={message.id}>
                          <div
                            className={`ct_ai_message ${
                              message.role === "bot"
                                ? "ct_ai_message_bot"
                                : "ct_ai_message_user"
                            }`}
                          >
                            {message.text}
                          </div>

                          {message.role === "bot" && message.options?.length ? (
                            <div className="ct_ai_prompt_list mt-2">
                              {message.options.map((option) => (
                                <button
                                  key={option.value}
                                  type="button"
                                  className="ct_ai_prompt_chip"
                                  onClick={() => handleOptionAction(option.value)}
                                  disabled={aiLoading}
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      ))}

                      {aiLoading ? (
                        <div className="ct_ai_message ct_ai_message_bot">
                          Checking live property matches...
                        </div>
                      ) : null}
                    </div>

                    <div className="ct_ai_input_row">
                      <input
                        type="text"
                        value={aiQuery}
                        onChange={(event) => setAiQuery(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                            handleAiConversation(aiQuery);
                          }
                        }}
                        className="form-control ct_ai_chat_input"
                        placeholder="Type your answer here..."
                      />
                      <button
                        type="button"
                        className="ct_ai_send_btn"
                        onClick={() => handleAiConversation(aiQuery)}
                        disabled={aiLoading}
                      >
                        <i className="fa-solid fa-paper-plane"></i>
                      </button>
                    </div>
                  </div>
                </aside>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
