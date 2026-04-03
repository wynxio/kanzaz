import React from "react";
import connectToDatabase from "../lib/mongodb";
import ProductDisplay from "./ProductDisplay";
import PreviousCollection from "./PreviousCollection";
import { ObjectId } from "mongodb";

export default async function HomeProduct({ productId = null,showTodaysDropTitle=true }) {
  let finalProductId = productId;
  let finalProduct;
  let previousProducts = [];
  let objectId = null;
  const db = await connectToDatabase();

  function serializeMongo(doc) {
    if (!doc) return null;
    return {
      ...doc,
      _id: doc._id.toString(),
      createdTime: doc.createdTime?.toISOString?.(),
    };
  }

  if (!productId) {
    const homeProduct = await db
      .collection(process.env.NEXT_PUBLIC_TABLE_HOMEPAGE_PRODUCT)
      .findOne({});

    if (homeProduct) {
      finalProductId = homeProduct.productId;
    } else {
      const productCollection = db.collection(
        process.env.NEXT_PUBLIC_TABLE_PRODUCTS,
      );
      const products = await productCollection
        .find({})
        .sort({ createdTime: -1 })
        .skip(0)
        .limit(1)
        .toArray();
      if (products?.length > 0) {
        finalProductId = products[0]._id;
      }
    }
  }

  //new start
  if (finalProductId instanceof ObjectId) {
    objectId = finalProductId;
  } else if (
    typeof finalProductId === "string" &&
    ObjectId.isValid(finalProductId)
  ) {
    objectId = new ObjectId(finalProductId);
  }

  if (!objectId) {
    finalProduct = null;
  } else {
    finalProduct = await db
      .collection(process.env.NEXT_PUBLIC_TABLE_PRODUCTS)
      .findOne({ _id: objectId });
  }
  //new end


  //old start
  // if (!finalProductId) {
  //   finalProduct = null;
  // } else {
  //   finalProduct = await db
  //     .collection(process.env.NEXT_PUBLIC_TABLE_PRODUCTS)
  //     .findOne({
  //       _id:
  //         typeof finalProductId === "string"
  //           ? new ObjectId(finalProductId)
  //           : finalProductId,
  //     });
  // }

  //old end

  if (!finalProduct) {
    return (
      <section className="pt-32 pb-20 text-center">
        <p className="text-gray-500">
          Todays Premium Product will be available soon
        </p>
      </section>
    );
  }

  const productCollection = db.collection(
    process.env.NEXT_PUBLIC_TABLE_PRODUCTS,
  );
  const rawPreviousProducts = await productCollection
    .find({})
    .sort({ _id: -1 })
    .skip(0)
    .limit(20)
    .toArray();

  previousProducts = rawPreviousProducts.map(serializeMongo);

  const safeProduct = serializeMongo(finalProduct);

 
 
  return (
    <>
      <ProductDisplay product={safeProduct} showTodaysDropTitle={showTodaysDropTitle}></ProductDisplay>
      <PreviousCollection
        selectedProduct={safeProduct}
        previousProducts={previousProducts}
      ></PreviousCollection>
    </>
  );
}
