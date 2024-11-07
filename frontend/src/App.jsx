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
  // quote and author states
  const [currentQuote, setCurrentQuote] = useState(
    "Desire for the fruits of work must never be your motive in working"
  );
  const [currentAuthor, setCurrentAuthor] = useState("Bhagavad Gita");

  // button enable / disables and button text state
  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("New Quote");

  // for metadata regarding image link and owner of the image
  const [extractedHotLink, setExtractedHotLink] = useState("");
  const [extractedPhotoOwner, setExtractedPhotoOwner] = useState("ventiviews");
  const [extractedPhotoOwnerLink, setExtractedPhotoOwnerLink] = useState(
    "https://unsplash.com/@ventiviews"
  );

  // setting details for quote and author
  const setDetails = (quote, author) => {
    setCurrentQuote(quote);
    setCurrentAuthor(author);
  };

  // setting details for hotlink, image owner and owner's link
  const setImageDetails = (hotLink, photoOwner, photoOwnerLink) => {
    setExtractedHotLink(hotLink);
    setExtractedPhotoOwner(photoOwner);
    setExtractedPhotoOwnerLink(photoOwnerLink);
  };

  // set the new image on loading
  useEffect(() => {
    if (extractedHotLink) {
      const image = new Image();
      image.onload = () => {
        document.body.style.background = `center / cover no-repeat url(${extractedHotLink})`;
      };
      // this triggers the image to start loading i think...
      image.src = extractedHotLink;
    }
  }, [extractedHotLink]);

  // handling click of the button this is where all of the work is done for the app
  const handleButtonClick = async () => {
    setIsDisabled(true);
    setButtonText("Please wait...");

    try {
      const [getQuoteData, getRandomImage] = await Promise.all([
        axios.get(`${deployedUrl}/quote`),
        axios.get(`${deployedUrl}/unsplash/photo`),
      ]);

      // extract quote-data and calling function to set
      const extractedQuote = getQuoteData.data[0].content;
      const extractedAuthor = getQuoteData.data[0].author;
      setDetails(extractedQuote, extractedAuthor);

      // extract metdata for image and owner and calling function to set
      let hotLink = getRandomImage.data.urls.raw;
      let photoOwner = getRandomImage.data.user.username;
      let photoOwnerLink = getRandomImage.data.user.links.html;
      setImageDetails(hotLink, photoOwner, photoOwnerLink);
    } catch (error) {
      console.error("Error fetching quote:", error);
    } finally {
      // Re-enable the button and revert text after the request is complete
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
