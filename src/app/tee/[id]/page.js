//export const dynamic = "force-dynamic";

import connectToDatabase from "../../lib/mongodb";
// import HomeProduct from "../../components/HomeProduct";
// import Hero from "../../components/Hero";
import { PublicLayout } from "../../components/PublicLayout";
 import { ObjectId } from "mongodb";
import HomeProductClient from "../../components/HomeProductClient";
// import '../../Styles/public.css';


 

export async function generateMetadata({ params }) {
  const { id } = await params;
  const db = await connectToDatabase();

  if (!ObjectId.isValid(id)) {
    return {
      title: "WynTees",
      description: "Premium T-shirts from WynTees",
    };
  }

  const product = await db
    .collection(process.env.NEXT_PUBLIC_TABLE_PRODUCTS)
    .findOne({ _id: new ObjectId(id) });

  if (!product) {
    return {
      title: "WynTees",
      description: "Premium T-shirts from WynTees",
    };
  }

  const title = product.title;
  const description = "Check out today’s premium T-shirt from WynTees";
  const image = product?.variations?.[0]?.primaryImage;

 

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/tee/${id}`,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image, width: 1200, height: 630 }],
      type: "image/jpeg"
    },
  };
}

export default  async function TeePage({ params }){
    const { id } = await params;

    return(
        <PublicLayout>   
          
          <div className="min-h-screen bg-white">
            <HomeProductClient productId={id} showTodaysDropTitle={false}/>
          </div>
        </PublicLayout>
    )
        
}