// app/preview/page.tsx

import PreviewClient from "./PreviewClient";
import { getOrganizationLogoUrl } from "@/lib/getOrganizationLogoUrl";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preview - Greeting App",
};

// Note: searchParams is a Promise of your shape
export default async function PreviewPage({
  searchParams,
}: {
  searchParams: Promise<{
    design?: string;
    occasion?: string;
    org?: string;
  }>;
}) {
  // Await the searchParams promise to get the real object
  const { design: designId, occasion, org: orgId } = await searchParams;

  let companyLogo: string | null = null;
  if (orgId) {
    companyLogo = await getOrganizationLogoUrl(orgId);
    console.log("Fetched logo URL:", companyLogo);
  }

  return (
    <PreviewClient
      designId={designId}
      occasion={occasion}
      companyLogo={companyLogo}
    />
  );
}
