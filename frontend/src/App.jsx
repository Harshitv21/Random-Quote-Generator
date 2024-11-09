import { useState, useEffect } from "react";
import axios from "axios";
import "./styles/App.css";
import { Heading } from "./components/Heading";
import { QuoteContainer } from "./components/QuoteContainer";
import { Credits } from "./components/Credits";

const SERVER_PORT = 5965;
const deployedUrl = `${
  import.meta.env.VITE_DEPLOYED_URL || `http://localhost:${SERVER_PORT}`
}`;

function App() {
  const [currentQuote, setCurrentQuote] = useState(
    "Desire for the fruits of work must never be your motive in working"
  );
  const [currentAuthor, setCurrentAuthor] = useState("Bhagavad Gita");
  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("New Quote");
  const [extractedHotLink, setExtractedHotLink] = useState("");
  const [extractedPhotoOwner, setExtractedPhotoOwner] = useState("ventiviews");
  const [extractedPhotoOwnerLink, setExtractedPhotoOwnerLink] = useState(
    "https://unsplash.com/@ventiviews"
  );

  const setDetails = (quote, author) => {
    setCurrentQuote(quote);
    setCurrentAuthor(author);
  };

  const setImageDetails = (hotLink, photoOwner, photoOwnerLink) => {
    setExtractedHotLink(hotLink);
    setExtractedPhotoOwner(photoOwner);
    setExtractedPhotoOwnerLink(photoOwnerLink);
  };

  useEffect(() => {
    if (extractedHotLink) {
      const image = new Image();
      image.onload = () => {
        document.body.style.background = `center / cover no-repeat url(${extractedHotLink})`;
      };
      image.src = extractedHotLink;
    }
    return () => {
      document.body.style.background = "";
    };
  }, [extractedHotLink]);

  const handleButtonClick = async () => {
    setIsDisabled(true);
    setButtonText("Please wait...");

    try {
      const [getQuoteData, getRandomImage] = await Promise.all([
        axios.get(`${deployedUrl}/quote`),
        axios.get(`${deployedUrl}/unsplash/photo`),
      ]);

      const extractedQuote = getQuoteData.data[0].content;
      const extractedAuthor = getQuoteData.data[0].author;
      setDetails(extractedQuote, extractedAuthor);

      let hotLink = getRandomImage.data.urls.raw;
      let photoOwner = getRandomImage.data.user.username;
      let photoOwnerLink = getRandomImage.data.user.links.html;
      setImageDetails(hotLink, photoOwner, photoOwnerLink);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("There was an issue loading new content.");
    } finally {
      setTimeout(() => {
        setIsDisabled(false);
        setButtonText("New Quote");
      }, 6500);
    }
  };

  return (
    <>
      <div>
        <Heading />
        <QuoteContainer
          currentQuote={currentQuote}
          currentAuthor={currentAuthor}
          isDisabled={isDisabled}
          handleButtonClick={handleButtonClick}
          buttonText={buttonText}
        />
        <Credits
          extractedHotLink={extractedHotLink}
          extractedPhotoOwner={extractedPhotoOwner}
          extractedPhotoOwnerLink={extractedPhotoOwnerLink}
        />
      </div>
    </>
  );
}

export default App;
