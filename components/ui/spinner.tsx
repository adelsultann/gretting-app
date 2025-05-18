

import Image from "next/image";
import loading from "@/public/assets/loadingspinner.gif"

export default function SpinnerLoader() {
     return (
          <div className="flex justify-center items-center h-screen">
              

              <Image src={loading} alt="loading" width={150} height={150} />
          </div>
     );
}