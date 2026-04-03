import { withCorsHeaders } from "../../lib/cors";
import connectToDatabase from "../../lib/mongodb";
import { ObjectId } from "mongodb";

// ✅ SET Home Page Product (only one)
export async function POST(req) {
  try {
    const { productId } = await req.json();

    if (!productId) {
      return withCorsHeaders(
        new Response(
          JSON.stringify({ success: false, error: "Product ID required" }),
          { status: 400 }
        )
      );
    }

    const db = await connectToDatabase();
    const collection = db.collection(process.env.NEXT_PUBLIC_TABLE_HOMEPAGE_PRODUCT);

    // 🔥 Ensure only ONE document exists
    await collection.deleteMany({});

    await collection.insertOne({
      productId: new ObjectId(productId),
      createdTime: new Date(),
    });

    return withCorsHeaders(
      new Response(
        JSON.stringify({ success: true, message: "Home page product updated" }),
        { status: 200 }
      )
    );
  } catch (err) {
    console.error("POST /api/homepage-product error:", err);
    return withCorsHeaders(
      new Response(
        JSON.stringify({ success: false, error: "Failed to set home page product" }),
        { status: 500 }
      )
    );
  }
}

// ✅ GET Home Page Product (for public side later)
export async function GET() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection(process.env.NEXT_PUBLIC_TABLE_HOMEPAGE_PRODUCT);

    const data = await collection.findOne({});

    return withCorsHeaders(
      new Response(
        JSON.stringify({ success: true, data }),
        { status: 200 }
      )
    );
  } catch (err) {
    console.error("GET /api/homepage-product error:", err);
    return withCorsHeaders(
      new Response(
        JSON.stringify({ success: false, error: "Failed to fetch home page product" }),
        { status: 500 }
      )
    );
  }
}
