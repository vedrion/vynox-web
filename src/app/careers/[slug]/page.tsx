import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { createPageMetadata } from "@/config/metadata";
import { careerRoles } from "@/content/careers";
import { CareerRolePage } from "@/features/careers/components/career-role-page";

export const dynamicParams = false;

export function generateStaticParams() {
  return careerRoles.filter((role) => role.status === "open").map((role) => ({ slug: role.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const role = careerRoles.find((item) => item.id === slug && item.status === "open");

  if (!role) notFound();

  return createPageMetadata({
    title: role.title,
    description: role.summary,
    path: `/careers/${role.id}`,
  });
}

export default async function CareerRoleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const role = careerRoles.find((item) => item.id === slug && item.status === "open");

  if (!role) notFound();

  return <CareerRolePage role={role} />;
}
