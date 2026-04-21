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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(109,76,138,0.10),transparent_32%),linear-gradient(180deg,#fcfbfd_0%,#f4eef8_52%,#fcfbfd_100%)]">
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
