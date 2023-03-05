"use client"

import AccessDenied from "@/components/AccessDenied"
import EditProductList from "@/components/EditProductList"
import EditProduct from "@/components/EditProduct"

import AuthContext from "@/context/AuthContext"
import { useState, useContext } from "react"


export default function EditProductBlock({ categories, catalogs }) {
  const {
    user: { isAdmin, token },
  } = useContext(AuthContext)
  const [isShowProduct, setIsShowProduct] = useState(false)

  const [prodList, setProdList] = useState([])
  const [product, setProduct] = useState({})

  return (
    <>
      {!isAdmin ? (
        <AccessDenied />
      ) : !isShowProduct ? (
        <EditProductList
          prodList={prodList}
          setProdList={setProdList}
          setIsShowProduct={setIsShowProduct}
          setProduct={setProduct}
          token={token}
          categories={categories}
          catalogs={catalogs}
        />
      ) : (
        <EditProduct
          setProdList={setProdList}
          prodList={prodList}
          categories={categories}
          catalogs={catalogs}
          product={product}
          setIsShowProduct={setIsShowProduct}
          token={token}
        />
      )}
    </>
  )
}


