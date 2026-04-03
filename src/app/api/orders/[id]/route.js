import { withCorsHeaders } from "../../../lib/cors";
import connectToDatabase from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

/**
 * ✅ GET ORDER BY ID
 */
export async function GET(req, { params }) {
  try {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return withCorsHeaders(
        new Response(
          JSON.stringify({ success: false, error: "Invalid ID" }),
          { status: 400 }
        )
      );
    }

    const db = await connectToDatabase();
    const orders = db.collection(process.env.NEXT_PUBLIC_TABLE_ORDERS);

    const data = await orders
      .aggregate([
        { $match: { _id: new ObjectId(id) } },
        {
          $lookup: {
            from: process.env.NEXT_PUBLIC_TABLE_PRODUCTS,
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
      ])
      .toArray();

    if (!data.length) {
      return withCorsHeaders(
        new Response(
          JSON.stringify({ success: false, error: "Order not found" }),
          { status: 404 }
        )
      );
    }

    return withCorsHeaders(
      new Response(JSON.stringify({ success: true, order: data[0] }), {
        status: 200,
      })
    );
  } catch (err) {
    console.error(err);
    return withCorsHeaders(
      new Response(
        JSON.stringify({ success: false, error: "Failed to fetch order" }),
        { status: 500 }
      )
    );
  }
}
/**
 * ✅ UPDATE ORDER (status, comment, or any field)
 */
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();

    if (!ObjectId.isValid(id)) {
      return withCorsHeaders(
        new Response(
          JSON.stringify({ success: false, error: "Invalid order ID" }),
          { status: 400 }
        )
      );
    }

    const db = await connectToDatabase();
    const collection = db.collection(process.env.NEXT_PUBLIC_TABLE_ORDERS);

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...body,
          updatedTime: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return withCorsHeaders(
        new Response(
          JSON.stringify({ success: false, error: "Order not found" }),
          { status: 404 }
        )
      );
    }

    return withCorsHeaders(
      new Response(
        JSON.stringify({ success: true, message: "Order updated successfully" }),
        { status: 200 }
      )
    );
  } catch (err) {
    console.error("PUT /api/orders/[id] error:", err);
    return withCorsHeaders(
      new Response(
        JSON.stringify({ success: false, error: "Failed to update order" }),
        { status: 500 }
      )
    );
  }
}

/**
 * ✅ DELETE ORDER
 */
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return withCorsHeaders(
        new Response(
          JSON.stringify({ success: false, error: "Invalid order ID" }),
          { status: 400 }
        )
      );
    }

    const db = await connectToDatabase();
    const collection = db.collection(process.env.NEXT_PUBLIC_TABLE_ORDERS);

    const result = await collection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return withCorsHeaders(
        new Response(
          JSON.stringify({ success: false, error: "Order not found" }),
          { status: 404 }
        )
      );
    }

    return withCorsHeaders(
      new Response(
        JSON.stringify({ success: true, message: "Order deleted successfully" }),
        { status: 200 }
      )
    );
  } catch (err) {
    console.error("DELETE /api/orders/[id] error:", err);
    return withCorsHeaders(
      new Response(
        JSON.stringify({ success: false, error: "Failed to delete order" }),
        { status: 500 }
      )
    );
  }
}