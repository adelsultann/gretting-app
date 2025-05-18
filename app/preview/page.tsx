import { Metadata } from "next";
import { getOrganizationLogoUrl } from "@/lib/getOrganizationLogoUrl";
import PreviewClient from "./PreviewClient";

export const metadata: Metadata = {
  title: "Preview - Greeting App",
};

type PreviewPageProps = {
  searchParams: {
    design?: string;
    occasion?: string;
    org?: string;
  };
};

export default async function PreviewPage({ searchParams }: PreviewPageProps) {
  const { design: designId, occasion, org: orgId } = searchParams;

  // console.log("designId:", designId, "occasion:", occasion, "orgId:", orgId);

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
