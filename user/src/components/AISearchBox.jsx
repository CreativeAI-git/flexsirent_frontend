import { useEffect, useState } from "react";

const AISearchBox = ({
  onSearch,
  loading = false,
  initialValue = "",
  examples = [],
}) => {
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedQuery = query.trim();

    if (!trimmedQuery || loading) {
      return;
    }

    onSearch(trimmedQuery);
  };

  return (
    <form className="ai-search-box" onSubmit={handleSubmit}>
      <div className="ai-search-box__panel">
        <div className="ai-search-box__header">
          <div>
            <label className="ai-search-box__label" htmlFor="ai-search-input">
              Describe the property you want
            </label>
            <p className="ai-search-box__caption">
              Use natural language. Mention city, budget, dates, property type,
              BHK, or who the stay is for.
            </p>
          </div>
          <div className="ai-search-box__signal">
            <span className="ai-search-box__signal-dot" />
            Backend AI ready
          </div>
        </div>

        <div className="ai-search-box__field">
          <textarea
            id="ai-search-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="ai-search-box__input"
            placeholder="Example: I need a 1 bedroom flat in Málaga for work, starting September, budget €1,200/month."
            aria-label="AI property search"
            rows={3}
          />

          <div className="ai-search-box__actions">
            <p className="ai-search-box__helper">
              FlexiRent AI will extract filters and return the top matching
              properties.
            </p>
            <button
              type="submit"
              className="ai-search-box__button"
              disabled={loading || !query.trim()}
            >
              {loading ? "Searching..." : "Find properties"}
            </button>
          </div>
        </div>

        {examples.length ? (
          <div className="ai-search-box__examples">
            {examples.map((example) => (
              <button
                key={example}
                type="button"
                className="ai-search-box__example-chip"
                onClick={() => {
                  setQuery(example);
                  onSearch(example);
                }}
                disabled={loading}
              >
                {example}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </form>
  );
};

export default AISearchBox;
