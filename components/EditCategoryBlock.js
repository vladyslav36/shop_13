"use client"

import AccessDenied from "@/components/AccessDenied"
import AuthContext from "@/context/AuthContext"
import { useContext, useState } from "react"
import { API_URL } from "../config"
import EditCategory from "./EditCategory"
import EditCategoryList from "./EditCategoryList"

export default function EditCategoryBlock({ categories }) {
  const {
    user: { isAdmin, token },
  } = useContext(AuthContext)
  
  const [isShowCategory, setIsShowCategory] = useState(false)
  const [category, setCategory] = useState({})

  return (
    <>
      {!isAdmin ? (
        <AccessDenied />
      ) : isShowCategory ? (
        <EditCategory
          category={category}
          categories={categories}          
          setIsShowCategory={setIsShowCategory}
          token={token}
        />
      ) : (
        <EditCategoryList
          categories={categories}
          setCategory={setCategory}
          setIsShowCategory={setIsShowCategory}          
          token={token}
        />
      )}
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/categories`)
  const { categories } = await res.json()
  if (!res.ok) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      categories,
    },
  }
}
