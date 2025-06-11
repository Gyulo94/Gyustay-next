import { ReactNode } from "react";

export default function RoomRegisterLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className="max-w-4xl mx-auto px-4 min-h-[calc(100vh-84.2px-52.7px)]">
      {children}
    </section>
  );
}
