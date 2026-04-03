withCorsHeaders;
import { withCorsHeaders } from "../../../lib/cors";
import connectToDatabase from "../../../lib/mongodb";

import { ObjectId } from "mongodb";

// 🟢 GET single product by ID
export async function GET(req, context) {
  try {
    const { id } = await context.params;

    if (!id || !ObjectId.isValid(id)) {
      return withCorsHeaders(
        new Response(
          JSON.stringify({ success: false, error: "Invalid product ID" }),
          { status: 400 },
        ),
      );
    }

    const db = await connectToDatabase();
    const productCollection = db.collection(
      process.env.NEXT_PUBLIC_TABLE_PRODUCTS,
    );

    const product = await productCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!product) {
      return withCorsHeaders(
        new Response(
          JSON.stringify({ success: false, error: "Product not found" }),
          { status: 404 },
        ),
      );
    } else {
      // after fetching product
      const safeProduct = {
        ...product,
        _id: product._id.toString(),
        createdTime: product.createdTime?.toISOString?.(),
      };

      return withCorsHeaders(
        new Response(JSON.stringify({ success: true, product: safeProduct }), {
          status: 200,
        }),
      );
    }

     
  } catch (err) {
    console.error("GET /api/products/[id] error:", err);
    return withCorsHeaders(
      new Response(
        JSON.stringify({ success: false, error: "Failed to fetch product" }),
        { status: 500 },
      ),
    );
  }
}
