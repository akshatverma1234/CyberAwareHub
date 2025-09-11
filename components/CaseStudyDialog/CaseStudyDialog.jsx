"use client";
import React, { useContext } from "react";
import { MyContext } from "@/context/AppContext";
import { caseStudies } from "@/assets/caseStudies";

const CaseStudyDialog = () => {
  const { isOpenPanel } = useContext(MyContext);

  const caseStudy = caseStudies.find((c) => c.id === isOpenPanel.id);

  if (!caseStudy) return <p className="text-white">No case study found.</p>;

  const { detailedContent } = caseStudy;

  return (
    <div className="w-full h-full overflow-y-auto p-6 text-white bg-[#06080e]">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-blue-600 rounded-full text-sm font-medium">
            {caseStudy.category}
          </span>
          <span className="text-gray-400 text-sm">{caseStudy.date}</span>
        </div>
        <h1 className="text-3xl font-bold mb-3">{caseStudy.title}</h1>
        <p className="text-gray-300 text-lg leading-relaxed">
          {caseStudy.summary}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-red-400 mb-2">💥 Impact</h3>
          <p className="text-gray-300">{caseStudy.impact}</p>
        </div>
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-green-400 mb-2">
            📚 Key Lesson
          </h3>
          <p className="text-gray-300">{caseStudy.lesson}</p>
        </div>
      </div>

      <div className="space-y-8">
        {detailedContent?.background && (
          <div>
            <h3 className="text-xl font-semibold text-cyan-400 mb-3">
              🔍 Background
            </h3>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <p className="text-gray-300 leading-relaxed">
                {detailedContent.background}
              </p>
            </div>
          </div>
        )}

        {/* Timeline */}
        {detailedContent?.timeline && (
          <div>
            <h3 className="text-xl font-semibold text-cyan-400 mb-3">
              📅 Timeline
            </h3>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="space-y-4">
                {detailedContent.timeline.map((event, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold text-blue-300">
                        {event.date}
                      </p>
                      <p className="text-gray-300">{event.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Technical Details */}
        {detailedContent?.technicalDetails && (
          <div>
            <h3 className="text-xl font-semibold text-cyan-400 mb-3">
              ⚙️ Technical Details
            </h3>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(detailedContent.technicalDetails).map(
                  ([key, value], index) => (
                    <div
                      key={index}
                      className="border-l-2 border-purple-500 pl-4"
                    >
                      <p className="font-semibold text-purple-300 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}:
                      </p>
                      <p className="text-gray-300">{value}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* Major Victims */}
        {detailedContent?.majorVictims && (
          <div>
            <h3 className="text-xl font-semibold text-cyan-400 mb-3">
              🎯 Major Victims
            </h3>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="grid gap-4">
                {detailedContent.majorVictims.map((victim, index) => (
                  <div
                    key={index}
                    className="bg-red-900/20 border border-red-500/20 rounded-lg p-3"
                  >
                    <h4 className="font-semibold text-red-300 mb-1">
                      {victim.organization}
                    </h4>
                    <p className="text-gray-300 text-sm">{victim.impact}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Statistics */}
        {detailedContent?.statistics && (
          <div>
            <h3 className="text-xl font-semibold text-cyan-400 mb-3">
              📊 Key Statistics
            </h3>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(detailedContent.statistics).map(
                  ([key, value], index) => (
                    <div
                      key={index}
                      className="text-center bg-blue-900/20 rounded-lg p-3"
                    >
                      <p className="text-2xl font-bold text-blue-400">
                        {value}
                      </p>
                      <p className="text-gray-300 text-sm capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* Security Failures */}
        {detailedContent?.securityFailures && (
          <div>
            <h3 className="text-xl font-semibold text-cyan-400 mb-3">
              ⚠️ Security Failures
            </h3>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="space-y-2">
                {detailedContent.securityFailures.map((failure, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">❌</span>
                    <p className="text-gray-300">{failure}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Prevention Measures */}
        {detailedContent?.preventionMeasures && (
          <div>
            <h3 className="text-xl font-semibold text-cyan-400 mb-3">
              🛡️ Prevention Measures
            </h3>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="space-y-2">
                {detailedContent.preventionMeasures.map((measure, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">✅</span>
                    <p className="text-gray-300">{measure}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Financial Impact */}
        {detailedContent?.financialImpact && (
          <div>
            <h3 className="text-xl font-semibold text-cyan-400 mb-3">
              💰 Financial Impact
            </h3>
            <div className="bg-slate-800/50 rounded-lg p-4">
              {Object.entries(detailedContent.financialImpact).map(
                ([category, items], index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <h4 className="font-semibold text-yellow-300 mb-2 capitalize">
                      {category.replace(/([A-Z])/g, " $1").trim()}:
                    </h4>
                    <div className="space-y-1 ml-4">
                      {Array.isArray(items) ? (
                        items.map((item, itemIndex) => (
                          <p key={itemIndex} className="text-gray-300 text-sm">
                            • {item}
                          </p>
                        ))
                      ) : (
                        <p className="text-gray-300">{items}</p>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Long Term Impact */}
        {detailedContent?.longTermImpact && (
          <div>
            <h3 className="text-xl font-semibold text-cyan-400 mb-3">
              🔮 Long-term Impact
            </h3>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <p className="text-gray-300 leading-relaxed">
                {detailedContent.longTermImpact}
              </p>
            </div>
          </div>
        )}

        {detailedContent?.dataCompromised && (
          <div>
            <h3 className="text-xl font-semibold text-cyan-400 mb-3">
              📋 Data Compromised
            </h3>
            <div className="bg-slate-800/50 rounded-lg p-4">
              {Object.entries(detailedContent.dataCompromised).map(
                ([category, data], index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <h4 className="font-semibold text-orange-300 mb-2 capitalize">
                      {category.replace(/([A-Z])/g, " $1").trim()}:
                    </h4>
                    <div className="ml-4 space-y-1">
                      {typeof data === "object" ? (
                        Object.entries(data).map(([key, value], subIndex) => (
                          <p key={subIndex} className="text-gray-300 text-sm">
                            <span className="text-orange-200 capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}:
                            </span>{" "}
                            {value}
                          </p>
                        ))
                      ) : (
                        <p className="text-gray-300">{data}</p>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {detailedContent?.attackMethodology && (
          <div>
            <h3 className="text-xl font-semibold text-cyan-400 mb-3">
              🎯 Attack Methodology
            </h3>
            <div className="bg-slate-800/50 rounded-lg p-4">
              {typeof detailedContent.attackMethodology === "object" ? (
                <div className="space-y-3">
                  {Object.entries(detailedContent.attackMethodology).map(
                    ([phase, description], index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-1">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-purple-300 capitalize">
                            {phase.replace(/([A-Z0-9])/g, " $1").trim()}
                          </p>
                          <p className="text-gray-300 text-sm">{description}</p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p className="text-gray-300">
                  {detailedContent.attackMethodology}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseStudyDialog;
