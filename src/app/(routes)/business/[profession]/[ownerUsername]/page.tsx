import BusinessProfileModule from "@/components/modules/Marketplace/BusinessProfileModule/BusinessProfileModule";
import { BusinessProfile } from "@/ts/models/booking/business/BusinessProfile";
import { makeProfessionSlug } from "@/utils/make-profession-slug";
import { get } from "@/utils/requests";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

interface BusinessProfilePageProps {
  params: {
    ownerUsername: string;
    profession: string;
  };
}

export async function generateMetadata({
  params,
}: BusinessProfilePageProps): Promise<Metadata> {
  const { ownerUsername } = await Promise.resolve(params);

  const profile = (
    await get<BusinessProfile | null>({
      url: `/businesses/${ownerUsername}/profile`,
    })
  ).data;

  if (!profile) {
    return {
      title: "Business not found | ScrollBooker",
    };
  }

  const title = `${profile.owner.fullname} - ${profile.owner.profession} | ScrollBooker`;

  const description =
    profile.description ??
    `Book appointments at ${profile.owner.fullname} on ScrollBooker.`;

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      images: [],
    },

    alternates: {
      canonical: `https://scrollbooker.com/business/${params.profession}/${params.ownerUsername}`,
    },
  };
}

export default async function BusinessProfilePage({
  params,
}: BusinessProfilePageProps) {
  const { ownerUsername } = await Promise.resolve(params);

  const profile = (
    await get<BusinessProfile | null>({
      url: `/businesses/${ownerUsername}/profile`,
    })
  ).data;

  if (!profile) {
    return <>Profile not found</>;
  }

  const expectedSlug = makeProfessionSlug(profile.owner.profession);

  if (params.profession !== expectedSlug) {
    redirect(`/business/${expectedSlug}/${profile.owner.username}`);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: profile.owner.fullname,
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: profile.owner.counters.ratings_average,
              reviewCount: profile.owner.counters.ratings_count,
            },
          }),
        }}
      />

      <BusinessProfileModule initialProfile={profile} />
    </>
  );
}
