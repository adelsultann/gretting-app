

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
};


export default designTemplatesByOccasion