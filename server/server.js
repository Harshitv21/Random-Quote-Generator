import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv/config";

const PORT = process.env.PORT || 5965;
const app = express();
app.use(cors());

const configTopics = {
    params: {
        client_id: process.env.CLIENT_ID,
    }
};

const configRandomPhoto = {
    params: {
        client_id: process.env.CLIENT_ID,
        topics: "6sMVjTLSkeQ,bo8jQKTaE0Y,CDwuwXJAbEw,Fzo3zuOHN6w,M8jVbLbTRws,xHxYTMHLgOc,hmenvQhUmxM",
        orientation: "landscape",
    }
};

app.get("/", async (req, res) => {
    res.send({ "Working": true });
});

app.get("/unsplash/photo", async (req, res) => {
    try {
        const { data } = await axios.get("https://api.unsplash.com/photos/random", configRandomPhoto);
        res.status(200).send(data);
    } catch (error) {
        console.error("Error fetching photo: ", error);
        res.status(500).send({ message: "Error fetching photo from Unsplash" });
    }
});

app.get("/unsplash/topics", async (req, res) => {
    try {
        const { data } = await axios.get("https://api.unsplash.com/topics", configTopics);
        res.status(200).send(data);
    } catch (error) {
        console.error("Error fetching topics: ", error);
        res.status(500).send({ message: "Error fetching topics from Unsplash" });
    }
});

app.get("/quote", async (req, res) => {
    try {
        const { data } = await axios.get("https://api.quotable.io/quotes/random");
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching quote: ", error);
        res.status(500).send({ message: "Error fetching quote" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
