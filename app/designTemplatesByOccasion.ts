

import { StaticImageData } from 'next/image'; // Import StaticImageData

import Design1 from "@/public/assets/Eid-alftar_design/design1.png";
import Design2 from "@/public/assets/Eid-alftar_design/design2.png";
import Design3 from "@/public/assets/Eid-alftar_design/design3.png";
import Design4 from "@/public/assets/Eid-alftar_design/design4.png";
import Design5 from "@/public/assets/Eid-alftar_design/design5.png";

import Design6 from "@/public/assets/Eid-alftar_design/design6.png";

import Design7 from "@/public/assets/Eid-alftar_design/design7.png";

import Design8 from "@/public/assets/Eid-alftar_design/design8.png";

import Design9 from "@/public/assets/Eid-alftar_design/design9.png";

import EidAdha1 from "@/public/assets/eid-adha-design/eid-adha-1.png"

import EidAdha2 from "@/public/assets/eid-adha-design/eid-adha-2.png"

import EidAdha3 from "@/public/assets/eid-adha-design/eid-adha-3.png"

import EidAdha4 from "@/public/assets/eid-adha-design/eid-adha-4.png"

import EidAdha5 from "@/public/assets/eid-adha-design/eid-adha-5.png"

import EidAdha6 from "@/public/assets/eid-adha-design/eid-adha-6.png"

import EidAdha7 from "@/public/assets/eid-adha-design/eid-adha-7.png"

import EidAdha8 from "@/public/assets/eid-adha-design/eid-adha-8.png"

import EidAdha9 from "@/public/assets/eid-adha-design/eid-adha-9.png"

import EidAdha10 from "@/public/assets/eid-adha-design/eid-adha-10.png"

const designTemplatesByOccasion: Record<
  string,
  { id: string; title: string; image: StaticImageData  }[]
> = {
  "eid-fitr": [
    { id: "1", title: "تصميم 1", image: Design1 },
    { id: "2", title: "تصميم 2", image: Design2 },
    { id: "3", title: "تصميم 3", image: Design3 },
    { id: "4", title: "تصميم 4", image: Design4 },
    { id: "5", title: "تصميم 5", image: Design5 },
    { id: "6", title: "تصميم 6", image: Design6 },
    { id: "7", title: "تصميم 7", image: Design7 },
    { id: "8", title: "تصميم 8", image: Design8 },
    { id: "9", title: "تصميم 9", image: Design9 },
   

  ],
  "eid-adha": [
    { id: "1", title: "تصميم 1", image: EidAdha1 },
    { id: "2", title: "تصميم 2", image: EidAdha2 },
    { id: "3", title: "تصميم 3", image: EidAdha3 },
    { id: "4", title: "تصميم 4", image: EidAdha4 },
    { id: "5", title: "تصميم 5", image: EidAdha5 },
    { id: "6", title: "تصميم 6", image: EidAdha6 },
    { id: "7", title: "تصميم 7", image: EidAdha7 },
    { id: "8", title: "تصميم 8", image: EidAdha8 },
    { id: "9", title: "تصميم 9", image:EidAdha9 },{ id: "10", title: "تصميم 10", image:EidAdha10 },
   

  ],
};


export default designTemplatesByOccasion