import axios from "axios";

export async function GET(req) {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=cybersecurity&sortBy=popularity&apiKey=${apiKey}`
    );

    return new Response(JSON.stringify(response.data.articles), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch news" }), {
      status: 500,
    });
  }
}
