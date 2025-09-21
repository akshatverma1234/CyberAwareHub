"use client";
import React, { useEffect, useState } from "react";
import NewsBox from "@/components/NewsBox/NewsBox";
import {
  Search,
  Filter,
  Calendar,
  TrendingUp,
  Shield,
  AlertTriangle,
  Globe,
  Building,
  Users,
} from "lucide-react";

const CyberNews = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("week");
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [sortBy, setSortBy] = useState("publishedAt");
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: "all", label: "All News", icon: Globe, keywords: [] },
    {
      id: "ransomware",
      label: "Ransomware",
      icon: AlertTriangle,
      keywords: ["ransomware", "malware", "encryption"],
    },
    {
      id: "data-breach",
      label: "Data Breaches",
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
      label: "Enterprise Security",
      icon: Building,
      keywords: ["enterprise", "corporate", "business security"],
    },
    {
      id: "government",
      label: "Government/APT",
      icon: Shield,
      keywords: ["government", "state-sponsored", "APT", "nation-state"],
    },
    {
      id: "vulnerability",
      label: "Vulnerabilities",
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
      label: "Crypto Security",
      icon: TrendingUp,
      keywords: ["cryptocurrency", "blockchain", "crypto", "DeFi"],
    },
  ];

  const timeframes = [
    { id: "day", label: "Today", value: 1 },
    { id: "week", label: "This Week", value: 7 },
    { id: "month", label: "This Month", value: 30 },
    { id: "all", label: "All Time", value: null },
  ];

  const severityLevels = [
    { id: "all", label: "All Severity" },
    {
      id: "critical",
      label: "Critical",
      keywords: ["critical", "severe", "major breach", "massive", "global"],
    },
    {
      id: "high",
      label: "High",
      keywords: ["high", "significant", "important", "serious"],
    },
    {
      id: "medium",
      label: "Medium",
      keywords: ["medium", "moderate", "notable"],
    },
    { id: "low", label: "Low", keywords: ["minor", "small", "limited"] },
  ];

  const sortOptions = [
    { id: "publishedAt", label: "Latest First" },
    { id: "relevancy", label: "Most Relevant" },
    { id: "popularity", label: "Most Popular" },
  ];

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedTimeframe("week");
    setSelectedSeverity("all");
    setSortBy("publishedAt");
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchTerm) count++;
    if (selectedCategory !== "all") count++;
    if (selectedTimeframe !== "week") count++;
    if (selectedSeverity !== "all") count++;
    if (sortBy !== "publishedAt") count++;
    return count;
  };

  return (
    <div className="text-white py-10 px-6 w-full min-h-screen">
      <div className="text-center mb-8 mx-auto px-4 py-14">
        <h1 className="text-4xl font-bold text-white mb-2">
          📰 Latest Cybersecurity News
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Real cybersecurity incidents and news from around the world
        </p>
      </div>

      <div className="max-w-7xl mx-auto mb-4">
        <div className="relative mb-2">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search cybersecurity news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#111827] border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-[#111827] border border-gray-700 rounded-lg text-white hover:border-purple-500 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
            {getActiveFiltersCount() > 0 && (
              <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                {getActiveFiltersCount()}
              </span>
            )}
          </button>

          {getActiveFiltersCount() > 0 && (
            <button
              onClick={handleClearFilters}
              className="text-purple-400 hover:text-purple-300 text-sm"
            >
              Clear all filters
            </button>
          )}
        </div>

        {showFilters && (
          <div className="bg-[#111827] border border-gray-700 rounded-xl p-6 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Category
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${
                          selectedCategory === category.id
                            ? "bg-purple-600 text-white"
                            : "text-gray-300 hover:bg-gray-700"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{category.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Time Period
                </label>
                <div className="space-y-2">
                  {timeframes.map((timeframe) => (
                    <button
                      key={timeframe.id}
                      onClick={() => setSelectedTimeframe(timeframe.id)}
                      className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                        selectedTimeframe === timeframe.id
                          ? "bg-purple-600 text-white"
                          : "text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {timeframe.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  <AlertTriangle className="w-4 h-4 inline mr-2" />
                  Severity
                </label>
                <div className="space-y-2">
                  {severityLevels.map((severity) => (
                    <button
                      key={severity.id}
                      onClick={() => setSelectedSeverity(severity.id)}
                      className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                        selectedSeverity === severity.id
                          ? "bg-purple-600 text-white"
                          : "text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {severity.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  <TrendingUp className="w-4 h-4 inline mr-2" />
                  Sort By
                </label>
                <div className="space-y-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSortBy(option.id)}
                      className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                        sortBy === option.id
                          ? "bg-purple-600 text-white"
                          : "text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {getActiveFiltersCount() > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-sm text-purple-300">
                Search: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm("")}
                  className="ml-1 hover:text-white"
                >
                  ×
                </button>
              </span>
            )}
            {selectedCategory !== "all" && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-sm text-purple-300">
                {categories.find((c) => c.id === selectedCategory)?.label}
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="ml-1 hover:text-white"
                >
                  ×
                </button>
              </span>
            )}
            {selectedTimeframe !== "week" && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-sm text-purple-300">
                {timeframes.find((t) => t.id === selectedTimeframe)?.label}
                <button
                  onClick={() => setSelectedTimeframe("week")}
                  className="ml-1 hover:text-white"
                >
                  ×
                </button>
              </span>
            )}
            {selectedSeverity !== "all" && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-sm text-purple-300">
                {severityLevels.find((s) => s.id === selectedSeverity)?.label}
                <button
                  onClick={() => setSelectedSeverity("all")}
                  className="ml-1 hover:text-white"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      <NewsBox
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        selectedTimeframe={selectedTimeframe}
        selectedSeverity={selectedSeverity}
        sortBy={sortBy}
        categories={categories}
        severityLevels={severityLevels}
        timeframes={timeframes}
      />
    </div>
  );
};

export default CyberNews;
