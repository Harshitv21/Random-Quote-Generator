import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv/config";

const PORT = 5965;
const app = express();
app.use(cors());

const configTopics = {
    params: {
        client_id: process.env.CLIENT_ID
        // per_page
        // page
    }
};

const configRandomPhoto = {
    params: {
        client_id: process.env.CLIENT_ID,
        topics: "6sMVjTLSkeQ,bo8jQKTaE0Y,CDwuwXJAbEw,Fzo3zuOHN6w,M8jVbLbTRws,xHxYTMHLgOc,hmenvQhUmxM",
        orientation: "landscape"
    }
};

app.get("/unsplash/photo", async (request, response) => {
    try {
        const photoData = await axios.get("https://api.unsplash.com/photos/random", configRandomPhoto);
        response.send(photoData.data);
    } catch (error) {
        console.error("Error fetching photo: ", error);
    }
})

// generate list of topics to add have to call this manually tho.
app.get("/unsplash/topics", async (request, response) => {
    try {
        const topicsData = await axios.get("https://api.unsplash.com/topics", configTopics);
        response.send(topicsData.data);
    } catch (error) {
        console.error("Error fetching topics: ", error);
    }
})

app.get("/quote", async (request, response) => {
    try {
        const quoteData = await axios.get("https://api.quotable.io/quotes/random");
        response.json(quoteData.data);
    } catch (error) {
        console.error("Error fetching quote: ", error);
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})