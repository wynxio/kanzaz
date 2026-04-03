import { uploadToBunnySafe, validateAllImagesSize,isBase64Image } from "../../lib/utils";
import { withCorsHeaders } from "../../lib/cors";
import connectToDatabase from "../../lib/mongodb";
import { ObjectId } from "mongodb";

// 🟢 GET all products with pagination and filtering
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const filteredKeyword = searchParams.get("filteredkeyword") || "";

    const db = await connectToDatabase();
    const productCollection = db.collection(
      process.env.NEXT_PUBLIC_TABLE_PRODUCTS,
    );

    // Build query
    const query = {};
    if (filteredKeyword) {
      query.$or = [
        { title: { $regex: filteredKeyword, $options: "i" } },
        { subtitle: { $regex: filteredKeyword, $options: "i" } },
        { description: { $regex: filteredKeyword, $options: "i" } },
        {
          features: { $elemMatch: { $regex: filteredKeyword, $options: "i" } },
        },
      ];
    }

    const total = await productCollection.countDocuments(query);
    const products = await productCollection
      .find(query)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return withCorsHeaders(
      new Response(
        JSON.stringify({
          success: true,
          products,
          pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
          },
        }),
        { status: 200 },
      ),
    );
  } catch (err) {
    console.error("GET /api/products error:", err);
    return withCorsHeaders(
      new Response(
        JSON.stringify({ success: false, error: "Failed to fetch products" }),
        { status: 500 },
      ),
    );
  }
}

export async function POST(req) {
  try {
    const db = await connectToDatabase();
    const productCollection = db.collection(
      process.env.NEXT_PUBLIC_TABLE_PRODUCTS,
    );

    const createdTime = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
    );

    const {
      title,
      subtitle,
      actualcost,
      discountedcost,
      description,
      description1,
      description2,
      sizeChartImage,
      features,
      extras,
      basePrice,
      variations,
      paymentModes,
    } = await req.json();

    const validation = validateAllImagesSize({
      sizeChartImage,
      variations,
    });

    if (!validation.valid) {
      return withCorsHeaders(
        new Response(
          JSON.stringify({
            success: false,
            error: validation.error,
          }),
          { status: 400 },
        ),
      );
    }

    if (!title || !description) {
      return withCorsHeaders(
        new Response(
          JSON.stringify({
            success: false,
            error: "Title and description are required",
          }),
          { status: 400 },
        ),
      );
    }

    // 🔼 Upload size chart image
    const sizeChartImageUrl = sizeChartImage
      ? await uploadToBunnySafe(sizeChartImage, "file")
      : null;

    // 🔁 Process variations
    const formattedVariations = Array.isArray(variations)
      ? await Promise.all(
          variations.map(async (v, index) => {
            const folder = `products/${index}`;

            // Upload primary + gallery images in parallel
            const [primaryImage, images] = await Promise.all([
              v.primaryImage ? uploadToBunnySafe(v.primaryImage, folder) : null,

              Array.isArray(v.images)
                ? Promise.all(
                    v.images.map((img) => uploadToBunnySafe(img, folder)),
                  )
                : [],
            ]);

            return {
              colorName: v.colorName || "",
              colorCode: v.colorCode || "",
              primaryImage,
              images,
              sizes: Array.isArray(v.sizes) ? v.sizes : [],
            };
          }),
        )
      : [];

    const result = await productCollection.insertOne({
      title,
      subtitle,
      actualcost,
      discountedcost,
      description,
      description1,
      description2,
      sizeChartImage: sizeChartImageUrl,
      features: Array.isArray(features) ? features : [],
      extras: Array.isArray(extras) ? extras : [],
      basePrice: basePrice || 0,
      variations: formattedVariations,
      paymentModes: paymentModes || { cod: true, online: false },
      createdTime,
    });

    return withCorsHeaders(
      new Response(
        JSON.stringify({
          success: true,
          message: "Product created successfully",
          insertedId: result.insertedId,
        }),
        { status: 201 },
      ),
    );
  } catch (err) {
    console.error("POST /api/products error:", err);
    return withCorsHeaders(
      new Response(
        JSON.stringify({ success: false, error: "Failed to create product" }),
        { status: 500 },
      ),
    );
  }
}

export async function PUT(req) {
  try {
    const {
      id,
      title,
      subtitle,
      actualcost,
      discountedcost,
      description,
      description1,
      description2,
      features,
      sizeChartImage,
      extras,
      basePrice,
      variations,
      paymentModes,
    } = await req.json();

    if (!id) {
      return withCorsHeaders(
        new Response(
          JSON.stringify({ success: false, error: "Product ID is required" }),
          { status: 400 }
        )
      );
    }

    // 🚫 FAIL FAST — validate ONLY base64 images
    const validation = validateAllImagesSize({
      sizeChartImage: isBase64Image(sizeChartImage) ? sizeChartImage : null,
      variations: Array.isArray(variations)
        ? variations.map(v => ({
            ...v,
            primaryImage: isBase64Image(v.primaryImage) ? v.primaryImage : null,
            images: Array.isArray(v.images)
              ? v.images.filter(isBase64Image)
              : [],
          }))
        : [],
    });

    if (!validation.valid) {
      return withCorsHeaders(
        new Response(
          JSON.stringify({ success: false, error: validation.error }),
          { status: 400 }
        )
      );
    }

    const db = await connectToDatabase();
    const productCollection = db.collection(
      process.env.NEXT_PUBLIC_TABLE_PRODUCTS
    );

    // 🔼 Size chart image (upload only if new)
    const sizeChartImageUrl = isBase64Image(sizeChartImage)
      ? await uploadToBunnySafe(sizeChartImage, "file")
      : sizeChartImage || null;

    // 🔁 Variations (parallel-safe)
    const formattedVariations = Array.isArray(variations)
      ? await Promise.all(
          variations.map(async (v, index) => {
            const folder = `products/${index}`;

            const [primaryImage, images] = await Promise.all([
              isBase64Image(v.primaryImage)
                ? uploadToBunnySafe(v.primaryImage, folder)
                : v.primaryImage || null,

              Array.isArray(v.images)
                ? Promise.all(
                    v.images.map(img =>
                      isBase64Image(img)
                        ? uploadToBunnySafe(img, folder)
                        : img
                    )
                  )
                : [],
            ]);

            return {
              colorName: v.colorName || "",
              colorCode: v.colorCode || "",
              primaryImage,
              images,
              sizes: Array.isArray(v.sizes) ? v.sizes : [],
            };
          })
        )
      : [];

    const updatedProduct = {
      title,
      subtitle,
      actualcost,
      discountedcost,
      description,
      description1,
      description2,
      sizeChartImage: sizeChartImageUrl,
      features: Array.isArray(features) ? features : [],
      extras: Array.isArray(extras) ? extras : [],
      basePrice: basePrice || 0,
      variations: formattedVariations,
      paymentModes: paymentModes || { cod: true, online: true },
    };

    const result = await productCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedProduct }
    );

    if (result.matchedCount === 0) {
      return withCorsHeaders(
        new Response(
          JSON.stringify({ success: false, error: "Product not found" }),
          { status: 404 }
        )
      );
    }

    return withCorsHeaders(
      new Response(
        JSON.stringify({
          success: true,
          message: "Product updated successfully",
        }),
        { status: 200 }
      )
    );
  } catch (err) {
    console.error("PUT /api/products error:", err);
    return withCorsHeaders(
      new Response(
        JSON.stringify({ success: false, error: "Failed to update product" }),
        { status: 500 }
      )
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return withCorsHeaders(
        new Response(
          JSON.stringify({ success: false, error: "Missing product ID" }),
          { status: 400 },
        ),
      );
    }

    const db = await connectToDatabase();
    const productCollection = db.collection(
      process.env.NEXT_PUBLIC_TABLE_PRODUCTS,
    );

    const result = await productCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return withCorsHeaders(
        new Response(
          JSON.stringify({ success: false, error: "Product not found" }),
          { status: 404 },
        ),
      );
    }

    return withCorsHeaders(
      new Response(
        JSON.stringify({
          success: true,
          message: "Product deleted successfully",
        }),
        { status: 200 },
      ),
    );
  } catch (err) {
    console.error("DELETE /api/products error:", err);
    return withCorsHeaders(
      new Response(
        JSON.stringify({ success: false, error: "Failed to delete product" }),
        { status: 500 },
      ),
    );
  }
}
