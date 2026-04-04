import SearchModule from "@/components/modules/Marketplace/SearchModule/SearchModule";

type SearchPageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  return <SearchModule searchParams={params} />;
}
