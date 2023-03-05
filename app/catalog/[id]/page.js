
import React from 'react'
import { getCatalog, getCatalogs, getCategories, getProductsByCatalogId } from '@/fetchers'
import Navbar from '@/components/Navbar'
import CatalogById from '@/components/CatalogById'




export async function generateMetadata({ params:{id} }) {  
  const { catalog } = await getCatalog(id)
  return { title: catalog.name }
}

export default async function catalogPage({ params: { id } }) {
  const catalogData = getCatalog(id)
  const catalogsData = getCatalogs()
  const categoriesData = getCategories()
  const [{ catalog }, { catalogs }, { categories }] = await Promise.all([
    catalogData,
    catalogsData,
    categoriesData,
  ])

  const childrenList = catalog
    ? catalogs.filter((item) => item.parentId === catalog._id)
    : []
  let products

  if (childrenList.length) {
    products = []
  } else {
    const data = await getProductsByCatalogId(catalog._id)
    products = data.products
  }

  // ld+json for SEO
  const schemaData = {
    "@context": "http://www.schema.org",
    "@type": "catalog",
    name: catalog.name,
    image: catalog.image,
    description: catalog.description,
  }

  return (
    <>
      <Navbar catalogs={catalogs} categories={categories} />
      <CatalogById
        catalogs={catalogs}
        products={products}
        catalog={catalog}
        childrenList={childrenList}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </>
  )
}
