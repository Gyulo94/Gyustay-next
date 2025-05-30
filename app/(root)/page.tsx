import Categories from "@/components/home/categories";
import RoomsList from "@/components/home/rooms-list";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const category = params.category as string | undefined;
  return (
    <main>
      <Categories />
      <RoomsList category={category} />
    </main>
  );
}
