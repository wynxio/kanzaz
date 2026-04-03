import { withCorsHeaders } from "../../lib/cors";
import connectToDatabase from "../../lib/mongodb";

// 🟢 GET products (only essential fields)
export async function GET() {
  try {
    const db = await connectToDatabase();
    const productCollection = db.collection(
      process.env.NEXT_PUBLIC_TABLE_PRODUCTS
    );

    const products = await productCollection
      .aggregate([
        { $sort: { _id: -1 } },
        {
          $project: {
            title: 1,
            actualcost: 1,
            discountedcost: 1,
            primaryImage: {
              $arrayElemAt: ["$variations.primaryImage", 0],
            },
          },
        },
      ])
      .toArray();

    return withCorsHeaders(
      new Response(JSON.stringify({ success: true, products }), {
        status: 200,
      })
    );
  } catch (err) {
    console.error("GET /api/products error:", err);
    return withCorsHeaders(
      new Response(
        JSON.stringify({ success: false, error: "Failed to fetch products" }),
        { status: 500 }
      )
    );
  }
}
 