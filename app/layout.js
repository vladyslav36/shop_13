import Footer from "@/components/Footer"
import Header from "@/components/Header"
import styles from "@/styles/layout.module.scss"
import { AuthProvider } from "@/context/AuthContext"
import { ProductsProvider } from "@/context/ProductsContext"
import "./globals.css"
import { getCategories, getCurrencyRate } from "@/fetchers"
import { Roboto } from 'next/font/google'

export const metadata = {
  title: "Кармен",
  description: "Оптовый магазин Кармен",
}
const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display:'swap'
})

export default async function RootLayout({ children }) {  
  const { currencyRate } = await getCurrencyRate()
  

  return (
    <html lang="ru" className={roboto.className}>
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital@0;1&display=swap"
          rel="stylesheet"
        /> */}
        <script
          src="https://kit.fontawesome.com/ab965ee727.js"
          crossOrigin="anonymous"
        ></script>
      </head>

      <body>
        <AuthProvider>
          <ProductsProvider curRate={currencyRate}>
            <Header />
            <div className={styles.container}>{children}</div>
            <div id='slider'></div>
            <div id='loupe'></div>
            <Footer />
          </ProductsProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
