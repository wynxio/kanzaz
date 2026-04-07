// import ComingSoon from "./components/ComingSoon";
// import HomeProduct from "./components/HomeProduct";
import FeaturedPackages from "./components/FeaturedPackages";
import HeroSection from "./components/HeroSection";
import HomeProductClient from "./components/HomeProductClient";
import IslandGallery from "./components/IslandGallery";
import { PublicLayout } from "./components/PublicLayout";
import Testimonials from "./components/Testimonials";
import WhyChooseUs from "./components/WhyChooseUs";
import connectToDatabase from "./lib/mongodb";
import { ObjectId } from "mongodb";




export async function generateMetadata() {
  const title="Kanzas Tour and Travels - Lakshadweep Tour Packages";
  const description="Discover paradise with Kanzas Tour and Travels. Exclusive Lakshadweep island packages for every traveler."
  // const db = await connectToDatabase();

  // 1️⃣ Get homepage product mapping
  // const homeProduct = await db
  //   .collection(process.env.NEXT_PUBLIC_TABLE_HOMEPAGE_PRODUCT)
  //   .findOne({});

  // if (!homeProduct?.productId) {
  //   return {
  //     title: "WynTees",
  //     description: "Premium T-shirts from Wyntees",
  //   };
  // }

  // 2️⃣ Fetch actual product
  // const product = await db
  //   .collection(process.env.NEXT_PUBLIC_TABLE_PRODUCTS)
  //   .findOne({
  //     _id: new ObjectId(homeProduct.productId),
  //   });

  // if (!product) {
  //   return {
  //     title: "WynTees",
  //     description: "Premium T-shirts from Wyntees",
  //   };
  // }

  // const image =
  //   product?.variations?.[0]?.primaryImage ;

  // const description ="Check out today’s premium T-shirt from Wyntees";

  // const title = "WynTees Premium Collection";

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      type: "website",
      url: process.env.NEXT_PUBLIC_SITE_URL,
      images: [
        {
          url: 'https://www.kanzastours.com/kanlogo1.png',
          width: 1200,
          height: 630,
          type: "image/jpeg"
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ['https://www.kanzastours.com/kanlogo1.png'],
    },
  };
}

export default function HomePage() {
  return (
    
    // <ComingSoon></ComingSoon>
    <PublicLayout>
      <main>
        <HeroSection></HeroSection>
        <WhyChooseUs></WhyChooseUs>
        <FeaturedPackages></FeaturedPackages>
        <IslandGallery></IslandGallery>
        <Testimonials></Testimonials>
      </main>
       
    </PublicLayout>
  );
}
