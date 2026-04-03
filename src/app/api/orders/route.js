import { withCorsHeaders } from "../../lib/cors";
import connectToDatabase from "../../lib/mongodb";
import { ObjectId } from "mongodb";

/**
 * ✅ CREATE ORDER
 */
export async function POST(req) {
  try {
    const body = await req.json();

    const {
      productId,
      size,
      color,
      name,
      email,
      mobile,
      state,
      house,
      address,
    } = body;

    if (
      !ObjectId.isValid(productId) ||
      !size ||
      !color ||
      !name ||
      !email ||
      !mobile ||
      !state ||
      !house ||
      !address
    ) {
      return withCorsHeaders(
        new Response(
          JSON.stringify({ success: false, error: "Invalid data" }),
          { status: 400 }
        )
      );
    }

    const db = await connectToDatabase();
    const orders = db.collection(process.env.NEXT_PUBLIC_TABLE_ORDERS);

    const result = await orders.insertOne({
      productId: new ObjectId(productId),
      size,
      color,

      name,
      email,
      mobile,
      state,
      house,
      address,

      status: "new",
      comment: "",

      createdTime: new Date(),
    });

    return withCorsHeaders(
      new Response(
        JSON.stringify({
          success: true,
          orderId: result.insertedId,
        }),
        { status: 201 }
      )
    );
  } catch (err) {
    console.error("POST /api/orders", err);
    return withCorsHeaders(
      new Response(
        JSON.stringify({ success: false, error: "Order creation failed" }),
        { status: 500 }
      )
    );
  }
}

/**
 * ✅ GET ALL ORDERS (ADMIN) + PRODUCT DETAILS
 */
export async function GET() {
  try {
    const db = await connectToDatabase();
    const orders = db.collection(process.env.NEXT_PUBLIC_TABLE_ORDERS);

    const data = await orders
      .aggregate([
        {
          $lookup: {
            from: process.env.NEXT_PUBLIC_TABLE_PRODUCTS,
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $unwind: "$product",
        },
        {
          $sort: { createdTime: -1 },
        },
      ])
      .toArray();

    return withCorsHeaders(
      new Response(JSON.stringify({ success: true, orders: data }), {
        status: 200,
      })
    );
  } catch (err) {
    console.error("GET /api/orders", err);
    return withCorsHeaders(
      new Response(
        JSON.stringify({ success: false, error: "Failed to fetch orders" }),
        { status: 500 }
      )
    );
  }
}