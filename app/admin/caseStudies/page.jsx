"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState([]);

  useEffect(() => {
    fetch("/api/admin/caseStudies")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch case studies");
        return res.json();
      })
      .then((data) => setCaseStudies(data))
      .catch((err) => console.error("Error loading case studies:", err));
  }, []);

  const deleteCaseStudy = async (id) => {
    try {
      if (confirm("Delete this case study?")) {
        const res = await fetch(`/api/admin/caseStudies/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          setCaseStudies((prev) => prev.filter((c) => c._id !== id));
          alert("✅ Case study deleted!");
        } else {
          const errorData = await res.json();
          alert(`❌ Failed to delete: ${errorData.error || "Unknown error"}`);
        }
      }
    } catch (error) {
      console.error("Error deleting case study:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#f5f5f6] flex">
        <div className="flex-1 ml-[18%] p-8">
          <h1 className="text-3xl font-bold mb-4">Case Studies</h1>
          <Link
            href="/admin/caseStudies/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            ➕ Add New
          </Link>

          <table className="mt-6 w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Author</th>
                <th className="p-3 text-left">Created</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {caseStudies.map((cs) => (
                <tr key={cs._id} className="border-t">
                  <td className="p-3">{cs.title}</td>
                  <td className="p-3">{cs.author || "Admin"}</td>
                  <td className="p-3">
                    {new Date(cs.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-right flex gap-2 justify-end">
                    <Link
                      href={`/admin/caseStudies/${cs._id}/edit`}
                      className="text-blue-600 hover:underline"
                    >
                      ✏️ Edit
                    </Link>
                    <button
                      onClick={() => deleteCaseStudy(cs._id)}
                      className="text-red-600 hover:underline"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CaseStudies;
