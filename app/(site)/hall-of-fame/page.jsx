import { getReporterDetails } from "@/app/api/lib/fetchingData/getReporterDetails";
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";

const HallOfFame = async () => {
  const reportedData = await getReporterDetails();

  return (
    <div className="bg-[#201f1f] w-full min-h-[100vh] text-white">
      <div className="flex flex-col items-center justify-center h-[200px] w-full text-center">
        <h1 className="text-[40px] font-bold mt-12">🏆 Hall of Fame</h1>
        <p className="text-gray-400 mt-2">
          Recognizing contributors who helped us improve security
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-12">
        {reportedData.length > 0 ? (
          <div className="overflow-hidden rounded-lg shadow-lg">
            <table className="min-w-full border border-gray-700 divide-y divide-gray-700">
              <thead className="bg-[#2a2a2a] hidden sm:table-header-group">
                <tr>
                  <th className="px-6 py-3 text-center  text-sm font-semibold">
                    Name
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold">
                    Date
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold">
                    Social Link
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700 ">
                {reportedData.map((report, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-[#333333] transition-colors sm:table-row block sm:flex-row"
                  >
                    <td
                      className="px-6 py-3 text-sm text-center font-medium block sm:table-cell"
                      data-label="Name"
                    >
                      {report.name || "Anonymous"}
                    </td>

                    <td
                      className="px-6 py-3 text-sm text-gray-400 text-center block sm:table-cell"
                      data-label="Date"
                    >
                      {new Date(report.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td
                      className="px-6 py-3 text-sm text-gray-400 text-center block sm:table-cell"
                      data-label="Social Link"
                    >
                      {report.profileLink ? (
                        <a
                          href={report.profileLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:underline"
                        >
                          View Profile
                        </a>
                      ) : (
                        <span className="text-gray-400 cursor-not-allowed">
                          ---
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-8">
            No recognized contributors yet. Be the first to report responsibly!
            🚀
          </p>
        )}
      </div>
    </div>
  );
};

export default HallOfFame;
