// app/preview/page.tsx
import PreviewClient from "./PreviewClient";
import { getOrganizationLogoUrl } from "@/lib/getOrganizationLogoUrl";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preview - Greeting App",
};

export default async function PreviewPage({
  searchParams,
}: {
  
  searchParams: { design?: string; occasion?: string; org?: string };
  
}) {
  // Await searchParams to ensure its properties are available
  const sp = await Promise.resolve(searchParams);
  const designId = sp.design;
  const occasion = sp.occasion;
  const orgId = sp.org;

  let companyLogo: string | null = null;
  if (orgId) {

    companyLogo = await getOrganizationLogoUrl(orgId);
    console.log(companyLogo,"from preiver")
   
  }

  return (
    <PreviewClient
      designId={designId}
      occasion={occasion}
      companyLogo={companyLogo}
    />
  );
}
