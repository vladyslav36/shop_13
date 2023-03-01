import AdminPanel from "@/components/AdminPanel"
import Navbar from "@/components/Navbar"
import Showcase from "@/components/Showcase"
import { API_URL } from "@/config"
import { getCatalogs, getCategories, getShowCaseProducts } from "@/fetchers"
import React from "react"




export default async function homePage() {

  const showData = getShowCaseProducts()
  const categoriesData = getCategories()
  const catalogsData = getCatalogs()
  const [{ showcaseProducts }, { categories }, { catalogs }]=await Promise.all([showData,categoriesData,catalogsData])
  return (
    <>
      <Navbar categories={categories} catalogs={catalogs} />
      <AdminPanel />
      <Showcase showcaseProducts={showcaseProducts} />
    </>
  )
}
