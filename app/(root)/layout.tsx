import { auth } from "@/auth";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header/header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <main>
      <Header session={session} />
      {children}
      <Footer />
    </main>
  );
}
