import DotGrid from "@/components/Animation/DotGrid";
import CaseStudyList from "@/components/ClientPages/CaseStudyList";

async function getCaseStudiesData() {
  const res = await fetch(`${process.env.PUBLIC_URL}/api/admin/caseStudies`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch case studies data");
  }

  return res.json();
}

const CaseStories = async () => {
  const caseStudiesData = await getCaseStudiesData();

  return (
    <div className="w-full min-h-[100vh]">
      <div className="py-22 px-8 relative">
        <div className="w-full px-20 flex items-center justify-center">
          <div className="mb-4">
            <h1 className="text-4xl font-bold text-white mb-2 text-center">
              📌 Cyber Attack Case Studies
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Explore real-world cybercrime cases, their impact, and lessons
              learned to stay safe online
            </p>
          </div>
        </div>
      </div>
      <div className="mt-1">
        <CaseStudyList initialData={caseStudiesData} />
      </div>

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
    </div>
  );
};

export default CaseStories;
