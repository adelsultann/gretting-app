"use client"

import React from 'react'
import Image from 'next/image'
import CultureLogo from "@/public/assets/org-logos/culture-logo.png"
import SfaLogo from "@/public/assets/org-logos/sfda-logo.png"
import StatisticsLogo from "@/public/assets/org-logos/statistics-logo.png"
import SocpaLogo from "@/public/assets/org-logos/socpa-logo.png"

// Logos array
const logos = [
  { src: CultureLogo, alt: 'Culture Authority Logo' },
  { src: SfaLogo, alt: 'Saudi Food & Drug Authority Logo' },
  { src: StatisticsLogo, alt: 'Statistics Authority Logo' },
  { src: SocpaLogo, alt: 'SOCPA Logo' },
]

const LogoPartners = () => {
  return (
    <section className="bg-[#484747] py-10 px-4 mt-10">
      <div className="max-w-6xl mx-auto text-center">
        
        {/* <h2 className="text-lg text-white mb-6 font-semibold">شركاء موثوقون</h2> */}

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10  grayscale-0 transition">
          {logos.map((logo, index) => (
            <div key={index} className="relative w-28 h-10 md:w-32 md:h-12 ">
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100px, 160px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LogoPartners
