import { useState } from "react"

import HeroCarousel from "@/features/landing/HeroCarousel"
import FeaturedProducts from "@/features/landing/FeaturedProducts"
import PromoBanner from "@/features/landing/PromoBanner"
import ShopSection from "@/features/landing/ShopSection"
import BenefitsSection from "@/features/landing/BenefitsSection"
import CommunityCTA from "@/features/landing/CommunityCTA"

export default function Home() {

  const [category, setCategory] = useState("all")

  return (
    <div className="bg-[#faf9fb] min-h-screen">

      <HeroCarousel onSelectCategory={setCategory} />

      <PromoBanner />

      <BenefitsSection />
      
      <FeaturedProducts />


      <ShopSection
        category={category}
        setCategory={setCategory}
      />


      <CommunityCTA />

    </div>
  )
}