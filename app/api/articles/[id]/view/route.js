// // app/api/articles/[id]/view/route.js
// import { NextResponse } from "next/server";
// import connectDB from "@/app/api/lib/connectDB";
// import Article from "@/app/api/model/article.model";

// export async function POST(req, { params }) {
//   await connectDB();
//   try {
//     const article = await Article.findById(params.id);
//     if (!article) {
//       return NextResponse.json({ error: "Article not found" }, { status: 404 });
//     }

//     // Increment views
//     article.views += 1;
//     await article.save();

//     return NextResponse.json(
//       {
//         message: "View recorded successfully",
//         views: article.views,
//       },
//       { status: 200 }
//     );
//   } catch (err) {
//     console.error("Error recording view:", err);
//     return NextResponse.json(
//       { error: "Failed to record view" },
//       { status: 500 }
//     );
//   }
// }
