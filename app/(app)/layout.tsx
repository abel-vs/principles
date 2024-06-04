import { Footer } from "@/components/footer";
import Header from "@/components/header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="relative mt-12 flex min-h-0 flex-1 grow flex-col md:mt-0">
        {children}
      </main>
      <Footer />
    </div>
  );
}
