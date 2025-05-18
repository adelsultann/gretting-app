// app/preview/page.tsx
import { Metadata } from "next";
import { getOrganizationLogoUrl } from "@/lib/getOrganizationLogoUrl";
import PreviewClient from "./PreviewClient";

export const metadata: Metadata = {
  title: "Preview - Greeting App",
};

export default async function PreviewPage({
  searchParams,
}: {
  searchParams: {
    design?: string | undefined;
    occasion?: string | undefined;
    org?: string | undefined;
  };
}) {
  const { design: designId, occasion, org: orgId } = searchParams;

  let companyLogo: string | null = null;
  if (orgId) {
    companyLogo = await getOrganizationLogoUrl(orgId);
  }

  return (
    <PreviewClient
      designId={designId}
      occasion={occasion}
      companyLogo={companyLogo}
    />
  );
}
