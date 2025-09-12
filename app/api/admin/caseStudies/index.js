import dbConnect from "@/app/api/lib/connectDB";
import CaseStudy from "@/models/CaseStudy";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const caseStudies = await CaseStudy.find({});
    return res.status(200).json(caseStudies);
  }

  if (req.method === "POST") {
    const { name, title, summary, impact, image, lesson, author } = req.body;
    const newCaseStudy = await CaseStudy.create({
      name,
      title,
      summary,
      image,
      impact,
      lesson,
      author,
    });
    return res.status(201).json(newCaseStudy);
  }

  res.status(405).json({ message: "Method not allowed" });
}
