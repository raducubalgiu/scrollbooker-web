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

  const response = await get<BusinessProfile | null>({
    url: `/businesses/${ownerUsername}/profile`,
  });

  const profileData = response.data;

  if (!profileData) {
    throw new Error("An occured when feching profile data");
  }

  const title = `${profileData.owner.fullname} - ${profileData.owner.profession} | ScrollBooker`;

  const description =
    profileData.description ??
    `Book appointments at ${profileData.owner.fullname} on ScrollBooker.`;

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

  const response = await get<BusinessProfile | null>({
    url: `/businesses/${ownerUsername}/profile`,
  });

  const profileData = response.data;

  if (!profileData) {
    throw new Error("An occured when feching profile data");
  }

  const expectedSlug = makeProfessionSlug(profileData.owner.profession);

  if (params.profession !== expectedSlug) {
    redirect(`/business/${expectedSlug}/${profileData.owner.username}`);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: profileData.owner.fullname,
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: profileData.owner.counters.ratings_average,
              reviewCount: profileData.owner.counters.ratings_count,
            },
          }),
        }}
      />

      <BusinessProfileModule initialProfile={profileData} />
    </>
  );
}
