export const QuoteContainer = ({
  currentQuote, currentAuthor, isDisabled, handleButtonClick, buttonText,
}) => {
  return (
    <>
      <div className="main-content-container">
        <p className="quote">&quot;{currentQuote}.&quot;</p>
        <p className="author">{currentAuthor}</p>
        <button
          className={`generate-button ${isDisabled ? "disabled-button" : ""}`}
          onClick={handleButtonClick}
        >
          {buttonText}
        </button>
      </div>
    </>
  );
};
