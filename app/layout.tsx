
import { cookies } from "next/headers";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";
import Provider from "./provider/Provider";
import { Metadata } from "next";


export const metadata: Metadata = {

  title: "Mobin Online Shop",

  icons: {
    icon: "/Image/Icon.png"
  },

  description: "An online shop for buying and selling products."

}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  const cookieStore = await cookies()
  const isLogin = cookieStore.get("refresh_token")?.value

  return (
    <html lang="en">
      <body className=" min-w-xs select-none font-serif">


        <main>

          <Header isLogin={`${isLogin}`} />

        </main>


        <Provider>

          <div className="pt-3 md:pt-9">

            {children}

          </div>
        </Provider>


        <main>

          <Footer />

        </main>


      </body>
    </html>
  );
}
