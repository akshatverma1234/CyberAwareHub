// import { NextResponse } from "next/server";
// import connectDB from "@/app/api/lib/connectDB";
// import Article from "@/app/api/model/article.model";

// export async function GET(req, { params }) {
//   await connectDB();
//   try {
//     const article = await Article.findOne({
//       slug: params.slug,
//     });

//     if (!article) {
//       return NextResponse.json({ error: "Article not found" }, { status: 404 });
//     }

//     return NextResponse.json(article, { status: 200 });
//   } catch (err) {
//     console.error("Error fetching article by slug:", err);
//     return NextResponse.json(
//       { error: "Failed to fetch article" },
//       { status: 500 }
//     );
//   }
// }
