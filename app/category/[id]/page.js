
import React from "react"
import {
  getCategory,
  getCategories,
  getCatalogs,
  getProductsByCategoryId,
} from "@/fetchers"
import Navbar from "@/components/Navbar"
import CategoryById from "@/components/CategoryById"




export async function generateMetadata({ params: { id } }) {
  const { category } = await getCategory(id)
  return { title: category.name }
}

export default async function categoryPage({ params: { id } }) {
  const categoryData = getCategory(id)
  const catalogsData = getCatalogs()
  const categoriesData = getCategories()
  const [{ category }, { catalogs }, { categories }] = await Promise.all([
    categoryData,
    catalogsData,
    categoriesData,
  ])

  const childrenList = category
    ? categories.filter((item) => item.parentId === category._id)
    : []
  let products

  if (childrenList.length) {
    products = []
  } else {
    const data = await getProductsByCategoryId(category._id)
    products = data.products
  }

  // ld+json for SEO
  const schemaData = {
    "@context": "http://www.schema.org",
    "@type": "catalog",
    name: category.name,
    image: category.image,
    description: category.description,
  }

  return (
    <>
      <Navbar catalogs={catalogs} categories={categories} />
      <CategoryById
        categories={categories}
        products={products}
        category={category}
        childrenList={childrenList}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </>
  )
}
