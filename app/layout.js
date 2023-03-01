import Footer from "@/components/Footer"
import Header from "@/components/Header"
import styles from "@/styles/layout.module.scss"
import { Script } from "next/script"
import { API_URL } from "@/config"
import { AuthProvider } from "@/context/AuthContext"
import { ProductsProvider } from "@/context/ProductsContext"
import "./globals.css"
import { getCategories, getCurrencyRate } from "@/fetchers"

export const metadata = {
  title: "Кармен",
  description: "Оптовый магазин Кармен",
}


export default async function RootLayout({ children }) {
  const categoriesData = getCategories()
  const rateData = getCurrencyRate()
  const [{ currencyRate }, { categories }] = await Promise.all([
    rateData,
    categoriesData,
  ])

  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <script
          src="https://kit.fontawesome.com/ab965ee727.js"
          crossOrigin="anonymous"
        ></script>
      </head>

      <body>
        <AuthProvider>
          <ProductsProvider curRate={currencyRate}>
            <Header categories={categories} />
            <div className={styles.container}>{children}</div>
            <Footer />
          </ProductsProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
