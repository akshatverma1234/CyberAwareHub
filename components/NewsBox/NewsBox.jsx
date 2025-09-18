"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import SkeletonLoader from "../Loader/SkeletonLoader";
import DotGrid from "../Animation/DotGrid";
import {
  Calendar,
  ExternalLink,
  TrendingUp,
  AlertCircle,
  AlertTriangle,
  Shield,
  Users,
  Building,
} from "lucide-react";

const NewsBox = ({
  limit,
  searchTerm = "",
  selectedCategory = "all",
  selectedTimeframe = "week",
  selectedSeverity = "all",
  sortBy = "publishedAt",
  categories = [],
  severityLevels = [],
  timeframes = [],
}) => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredNews, setFilteredNews] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      try {
        setIsLoading(true);
        const res = await axios.get("/api/news", {
          params: {
            category: selectedCategory,
            timeframe: selectedTimeframe,
            sortBy: sortBy,
          },
        });
        setNews(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchNews();
  }, [selectedCategory, selectedTimeframe, sortBy]);

  // Filter news based on all criteria
  useEffect(() => {
    let filtered = [...news];

    // Search term filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (article) =>
          article.title?.toLowerCase().includes(searchLower) ||
          article.description?.toLowerCase().includes(searchLower) ||
          article.content?.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      // Define categories inline to avoid dependency issues
      const categoryKeywords = {
        ransomware: ["ransomware", "malware", "encryption"],
        "data-breach": ["data breach", "leak", "exposed", "stolen data"],
        phishing: ["phishing", "social engineering", "scam", "fraud"],
        enterprise: ["enterprise", "corporate", "business security"],
        government: ["government", "state-sponsored", "APT", "nation-state"],
        vulnerability: ["vulnerability", "CVE", "zero-day", "exploit"],
        privacy: ["privacy", "GDPR", "data protection", "surveillance"],
        cryptocurrency: ["cryptocurrency", "blockchain", "crypto", "DeFi"],
      };

      const keywords = categoryKeywords[selectedCategory];
      if (keywords) {
        filtered = filtered.filter((article) => {
          const text =
            `${article.title} ${article.description} ${article.content}`.toLowerCase();
          return keywords.some((keyword) =>
            text.includes(keyword.toLowerCase())
          );
        });
      }
    }

    // Severity filter
    if (selectedSeverity !== "all") {
      // Define severity keywords inline
      const severityKeywords = {
        critical: ["critical", "severe", "major breach", "massive", "global"],
        high: ["high", "significant", "important", "serious"],
        medium: ["medium", "moderate", "notable"],
        low: ["minor", "small", "limited"],
      };

      const keywords = severityKeywords[selectedSeverity];
      if (keywords) {
        filtered = filtered.filter((article) => {
          const text = `${article.title} ${article.description}`.toLowerCase();
          return keywords.some((keyword) =>
            text.includes(keyword.toLowerCase())
          );
        });
      }
    }

    // Time filter (if not handled by API)
    if (selectedTimeframe !== "all") {
      const timeframeDays = {
        day: 1,
        week: 7,
        month: 30,
      };

      const days = timeframeDays[selectedTimeframe];
      if (days) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        filtered = filtered.filter((article) => {
          const publishedDate = new Date(article.publishedAt);
          return publishedDate >= cutoffDate;
        });
      }
    }

    // Sort the filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "publishedAt":
          return new Date(b.publishedAt) - new Date(a.publishedAt);
        case "relevancy":
          // Simple relevancy based on search term matches
          if (searchTerm.trim()) {
            const aMatches = countMatches(a, searchTerm);
            const bMatches = countMatches(b, searchTerm);
            return bMatches - aMatches;
          }
          return new Date(b.publishedAt) - new Date(a.publishedAt);
        case "popularity":
          // Fallback to date if no popularity metric
          return new Date(b.publishedAt) - new Date(a.publishedAt);
        default:
          return new Date(b.publishedAt) - new Date(a.publishedAt);
      }
    });

    setFilteredNews(filtered);
  }, [
    news,
    searchTerm,
    selectedCategory,
    selectedSeverity,
    selectedTimeframe,
    sortBy,
  ]);

  const countMatches = (article, searchTerm) => {
    const text = `${article.title} ${article.description}`.toLowerCase();
    const term = searchTerm.toLowerCase();
    return (text.match(new RegExp(term, "g")) || []).length;
  };

  const getSeverityLevel = (article) => {
    const text = `${article.title} ${article.description}`.toLowerCase();

    // Define severity keywords inline
    const criticalKeywords = [
      "critical",
      "severe",
      "major breach",
      "massive",
      "global",
    ];
    const highKeywords = ["high", "significant", "important", "serious"];
    const mediumKeywords = ["medium", "moderate", "notable"];

    if (criticalKeywords.some((k) => text.includes(k.toLowerCase()))) {
      return {
        level: "critical",
        color: "text-red-400",
        bgColor: "bg-red-900/20",
      };
    } else if (highKeywords.some((k) => text.includes(k.toLowerCase()))) {
      return {
        level: "high",
        color: "text-orange-400",
        bgColor: "bg-orange-900/20",
      };
    } else if (mediumKeywords.some((k) => text.includes(k.toLowerCase()))) {
      return {
        level: "medium",
        color: "text-yellow-400",
        bgColor: "bg-yellow-900/20",
      };
    }
    return { level: "info", color: "text-blue-400", bgColor: "bg-blue-900/20" };
  };

  const getArticleCategory = (article) => {
    const text = `${article.title} ${article.description}`.toLowerCase();

    // Define categories with their keywords inline
    const categoryMap = [
      {
        id: "ransomware",
        label: "Ransomware",
        icon: AlertTriangle,
        keywords: ["ransomware", "malware", "encryption"],
      },
      {
        id: "data-breach",
        label: "Data Breach",
        icon: Shield,
        keywords: ["data breach", "leak", "exposed", "stolen data"],
      },
      {
        id: "phishing",
        label: "Phishing",
        icon: Users,
        keywords: ["phishing", "social engineering", "scam", "fraud"],
      },
      {
        id: "enterprise",
        label: "Enterprise",
        icon: Building,
        keywords: ["enterprise", "corporate", "business security"],
      },
      {
        id: "government",
        label: "Government",
        icon: Shield,
        keywords: ["government", "state-sponsored", "APT", "nation-state"],
      },
      {
        id: "vulnerability",
        label: "Vulnerability",
        icon: AlertTriangle,
        keywords: ["vulnerability", "CVE", "zero-day", "exploit"],
      },
      {
        id: "privacy",
        label: "Privacy",
        icon: Users,
        keywords: ["privacy", "GDPR", "data protection", "surveillance"],
      },
      {
        id: "cryptocurrency",
        label: "Crypto",
        icon: TrendingUp,
        keywords: ["cryptocurrency", "blockchain", "crypto", "DeFi"],
      },
    ];

    for (const category of categoryMap) {
      if (
        category.keywords.some((keyword) =>
          text.includes(keyword.toLowerCase())
        )
      ) {
        return category;
      }
    }
    return null;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "1 day ago";
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  const displayedNews = limit ? filteredNews.slice(0, limit) : filteredNews;

  return (
    <>
      <div
        style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}
      >
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -100,
          }}
        >
          <DotGrid
            dotSize={10}
            gap={15}
            baseColor="#1f2022cb"
            activeColor="#5227FF"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
            className="bg-[#06080e]"
          />
        </div>

        <div className="h-full p-6">
          <div className="mb-6 text-center">
            <p className="text-gray-400">
              Showing {displayedNews.length} of {filteredNews.length} articles
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>

          {!isLoading && filteredNews.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                No articles found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters or search terms
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <SkeletonLoader type="news" key={`skeleton-${i}`} />
              ))
            ) : (
              <>
                {displayedNews.map((article, idx) => {
                  const severity = getSeverityLevel(article);
                  const category = getArticleCategory(article);

                  return (
                    <div
                      key={idx}
                      className="bg-[#111827] border border-gray-700 p-6 rounded-xl shadow-lg flex flex-col h-[450px] max-w-[500px] hover:border-purple-500/50 transition-all duration-300 group"
                    >
                      {/* Article Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {category && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-xs text-purple-300">
                              <category.icon className="w-3 h-3" />
                              {category.label}
                            </span>
                          )}
                        </div>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 ${severity.bgColor} border border-current/30 rounded-full text-xs ${severity.color}`}
                        >
                          <AlertCircle className="w-3 h-3" />
                          {severity.level.toUpperCase()}
                        </span>
                      </div>

                      {/* Image */}
                      <div className="h-[180px] w-full mb-4 overflow-hidden rounded-lg">
                        <img
                          src={article.urlToImage || "/placeholder.png"}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = "/placeholder.png";
                          }}
                        />
                      </div>

                      <h3 className="font-semibold text-lg mb-3 line-clamp-2 text-white group-hover:text-purple-300 transition-colors">
                        {article.title}
                      </h3>

                      <p className="text-gray-400 text-sm mb-4 flex-1 line-clamp-3">
                        {article.description}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                        <div className="flex items-center gap-2 text-gray-500 text-xs">
                          <Calendar className="w-3 h-3" />
                          {formatDate(article.publishedAt)}
                        </div>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 font-medium text-sm transition-colors"
                        >
                          Read More
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {!limit && filteredNews.length > displayedNews.length && (
            <div className="text-center mt-8">
              <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                Load More Articles
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NewsBox;
