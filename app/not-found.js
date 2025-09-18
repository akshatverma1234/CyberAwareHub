import FuzzyText from "@/components/Animation/Error";

export default function NotFound({ hoverIntensity, enableHover }) {
  return (
    <div className="bg-[#06080e] h-screen flex flex-col items-center justify-center text-center gap-3">
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={hoverIntensity}
        enableHover={enableHover}
      >
        404
      </FuzzyText>
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={hoverIntensity}
        enableHover={enableHover}
        fontSize="3.2rem"
      >
        Not found
      </FuzzyText>

      <a
        href="/"
        className="mt-6 px-6 py-3 bg-[#5b5b5b] text-white rounded-lg hover:bg-gray-900 transition"
      >
        Go Home
      </a>
    </div>
  );
}
