import { NextResponse } from "next/server";
import axios from "axios";
import xss from "xss";

export async function GET(req) {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
      console.error("NEWS_API_KEY environment variable is not set.");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category") || "all";
    const timeframe = searchParams.get("timeframe") || "week";
    const sortBy = searchParams.get("sortBy") || "publishedAt";

    // Build the query based on category
    let query =
      'cybersecurity OR "cyber security" OR "cyber crime" OR "data breach" OR ransomware OR malware OR hacking';

    // Enhanced queries based on category
    const categoryQueries = {
      ransomware:
        'ransomware OR "malware attack" OR "encryption virus" OR "crypto-locker"',
      "data-breach":
        '"data breach" OR "data leak" OR "exposed database" OR "stolen data" OR "compromised data"',
      phishing:
        'phishing OR "social engineering" OR "email scam" OR "fraud attack" OR "credential theft"',
      enterprise:
        '"enterprise security" OR "corporate breach" OR "business cybersecurity" OR "company hacked"',
      government:
        '"government hack" OR "state-sponsored" OR APT OR "nation-state attack" OR "cyber warfare"',
      vulnerability:
        'vulnerability OR CVE OR "zero-day" OR "security flaw" OR exploit OR patch',
      privacy:
        'privacy OR GDPR OR "data protection" OR surveillance OR "personal information"',
      cryptocurrency:
        '"crypto hack" OR blockchain OR "DeFi attack" OR "cryptocurrency theft" OR "crypto scam"',
    };

    if (category !== "all" && categoryQueries[category]) {
      query = categoryQueries[category];
    }

    // Calculate date range
    let fromDate = null;
    const timeframeDays = {
      day: 1,
      week: 7,
      month: 30,
    };

    if (timeframe !== "all" && timeframeDays[timeframe]) {
      const date = new Date();
      date.setDate(date.getDate() - timeframeDays[timeframe]);
      fromDate = date.toISOString().split("T")[0];
    }

    // Map sortBy to NewsAPI parameters
    const sortByMap = {
      publishedAt: "publishedAt",
      relevancy: "relevancy",
      popularity: "popularity",
    };

    // Build API URL
    let apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      query
    )}&sortBy=${
      sortByMap[sortBy] || "publishedAt"
    }&language=en&apiKey=${apiKey}&pageSize=100`;

    if (fromDate) {
      apiUrl += `&from=${fromDate}`;
    }

    // Add additional filters to improve relevance
    apiUrl +=
      "&domains=bleepingcomputer.com,krebsonsecurity.com,securityweek.com,threatpost.com,darkreading.com,cyberscoop.com,zdnet.com,techcrunch.com,wired.com,arstechnica.com,thehackernews.com";

    console.log("Fetching from:", apiUrl.replace(apiKey, "API_KEY_HIDDEN"));

    const response = await axios.get(apiUrl);

    // Additional filtering and processing
    let articles = response.data.articles || [];

    // Filter out articles that are clearly not cybersecurity related
    const irrelevantKeywords = [
      "sports",
      "entertainment",
      "music",
      "movie",
      "celebrity",
      "fashion",
      "recipe",
      "weather",
      "traffic",
      "stock market",
      "real estate",
    ];

    articles = articles.filter((article) => {
      const text = `${article.title} ${article.description}`.toLowerCase();

      // Must contain cybersecurity-related keywords
      const cyberKeywords = [
        "cyber",
        "security",
        "hack",
        "breach",
        "malware",
        "ransomware",
        "phishing",
        "vulnerability",
        "attack",
        "threat",
        "data",
        "privacy",
        "encryption",
        "authentication",
        "firewall",
        "antivirus",
        "exploit",
      ];

      const hasCyberKeyword = cyberKeywords.some((keyword) =>
        text.includes(keyword)
      );
      const hasIrrelevantKeyword = irrelevantKeywords.some((keyword) =>
        text.includes(keyword)
      );

      return hasCyberKeyword && !hasIrrelevantKeyword;
    });

    const uniqueArticles = [];
    const seenTitles = new Set();

    articles.forEach((article) => {
      const normalizedTitle = article.title
        ?.toLowerCase()
        .replace(/[^\w\s]/g, "")
        .trim();
      if (normalizedTitle && !seenTitles.has(normalizedTitle)) {
        seenTitles.add(normalizedTitle);
        uniqueArticles.push(article);
      }
    });

    const scoredArticles = uniqueArticles.map((article) => {
      let score = 0;
      const text = `${article.title} ${article.description}`.toLowerCase();

      const highValueKeywords = [
        "ransomware",
        "data breach",
        "zero-day",
        "apt",
        "malware",
        "phishing",
        "vulnerability",
        "cyber attack",
        "hacker",
        "exploit",
      ];

      const mediumValueKeywords = [
        "security",
        "cyber",
        "hack",
        "threat",
        "privacy",
        "encryption",
      ];

      // Score based on keyword presence
      highValueKeywords.forEach((keyword) => {
        if (text.includes(keyword)) score += 3;
      });

      mediumValueKeywords.forEach((keyword) => {
        if (text.includes(keyword)) score += 1;
      });

      const articleDate = new Date(article.publishedAt);
      const now = new Date();
      const hoursDiff = (now - articleDate) / (1000 * 60 * 60);

      if (hoursDiff < 24) score += 2;
      else if (hoursDiff < 72) score += 1;

      const reputableSources = [
        "krebsonsecurity",
        "bleepingcomputer",
        "securityweek",
        "darkreading",
        "thehackernews",
        "cyberscoop",
      ];

      if (
        reputableSources.some(
          (source) =>
            article.source?.name?.toLowerCase().includes(source) ||
            article.url?.toLowerCase().includes(source)
        )
      ) {
        score += 2;
      }

      const sanitizedArticle = {
        ...article,
        title: article.title ? xss(article.title) : "No Title Available",
        description: article.description
          ? xss(article.description)
          : "No description available",
        content: article.content
          ? xss(article.content)
          : "No content available",
      };

      return { ...sanitizedArticle, relevanceScore: score };
    });

    // Sort by relevance score and then by date
    scoredArticles.sort((a, b) => {
      if (sortBy === "relevancy") {
        return (
          b.relevanceScore - a.relevanceScore ||
          new Date(b.publishedAt) - new Date(a.publishedAt)
        );
      }
      return new Date(b.publishedAt) - new Date(a.publishedAt);
    });

    // Clean up and format the response
    const cleanedArticles = scoredArticles.map((article) => ({
      title: article.title || "No Title Available",
      description: article.description || "No description available",
      urlToImage: article.urlToImage || null,
      publishedAt: article.publishedAt,
      source: article.source,
      url: article.url,
      relevanceScore: article.relevanceScore,
    }));

    return new Response(JSON.stringify(cleanedArticles), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300", // Cache for 5 minutes
      },
    });
  } catch (error) {
    console.error("Error fetching news:", error);

    // Return more detailed error information in development
    const errorResponse = {
      error: "Failed to fetch news",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    };

    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
