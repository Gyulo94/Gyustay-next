import { findRoomsAll } from "@/actions/room.actions";
import Categories from "@/components/home/categories";
import { Badge } from "@/components/ui/badge";

export default async function Home() {
  const rooms = await findRoomsAll();
  console.log(rooms);
  return (
    <main>
      <Categories />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-20 sm:px-4 md:px-8 lg:px-16">
        {rooms.map((room: any) => (
          <div key={room.id}>
            <img
              src={room.images[0].url}
              alt={room.title}
              className="rounded-md w-full h-auto object-cover"
            />
            <div className="mt-2 font-semibold text-sm">{room.title}</div>
            <Badge>{room.category.name}</Badge>
            <div className="mt-1 text-gray-400 text-sm">{room.address}</div>
            <div className="mt-1 text-sm">
              {room.price.toLocaleString()}원
              <span className="text-gray-500"> /박</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
