"use client"


import { createContext, useEffect, useState } from "react"
import { API_URL } from "@/config/index"


const ProductsContext = createContext()

export const ProductsProvider = ({ children, curRate  }) => {
  const [currencyShop, setCurrencyShop] = useState("UAH")
  const [currencyRate, setCurrencyRate] = useState(curRate || {})
  const [cart, setCart] = useState([])
  const [catToggle, setCatToggle] = useState("categories")

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"))
    setCart(cart ? cart : [])
  }, [])
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])
  

  return (
    <ProductsContext.Provider
      value={{
        currencyShop,
        setCurrencyShop,
        currencyRate,
        setCurrencyRate,
        cart,
        setCart,
        catToggle,
        setCatToggle,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export default ProductsContext
