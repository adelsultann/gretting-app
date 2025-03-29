// "use client";

// import { createContext, useContext, useState } from "react";

// type Org = {
//   companyName: string;
//   logoUrl: string;
//   slug: string;
// };

// type OrgContextType = {
//   org: Org | null;
//   setOrg: (org: Org) => void;
// };

// const OrgContext = createContext<OrgContextType | undefined>(undefined);

// export function OrgProvider({ children }: { children: React.ReactNode }) {
//   const [org, setOrg] = useState<Org | null>(null);

//   return (
//     <OrgContext.Provider value={{ org, setOrg }}>
//       {children}
//     </OrgContext.Provider>
//   );
// }

// export function useOrg() {
//   const context = useContext(OrgContext);
//   if (!context) throw new Error("useOrg must be used within OrgProvider");
//   return context;
// }
