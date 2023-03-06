import { getCatalogs, getCategories, getProductBySlug } from '@/fetchers'
import React from 'react'
import  Script  from 'next/script'
import Navbar from '@/components/Navbar'
import Product from '@/components/Product'

export async function generateMetadata({ params: { slug } }) {
  const { product = {} } = await getProductBySlug(slug)
  
  return {title:Object.keys(product).length ? product.name : "",description:Object.keys(product).length ? product.description : ""}
}

export default async  function productPage({ params: { slug } }) {
  const productData = getProductBySlug(slug)
  const categoriesData = getCategories()
  const catalogsData = getCatalogs()
  const [{ product = {} }, { categories = [] }, { catalogs = [] }] =
    await Promise.all([productData, categoriesData, catalogsData])

  // Удаляем опции в товаре которые в нем не используются
  Object.keys(product.options).forEach((option) => {
    const isCheck = Object.keys(product.options[option].values).some(
      (item) => product.options[option].values[item].checked
    )
    if (!isCheck) delete product.options[option]
  })

  // ld+json for SEO
  const schemaData = {
    "@context": "http://www.schema.org",
    "@type": "product",
    brand: product.brandId.name,
    category: product.categoryId.name,
    name: product.name,
    article: product.model,
    image: product.images[0],
    description: product.description,
    price: product.price + " " + product.currencyValue,
  }

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Navbar categories={categories} catalogs={catalogs} />
      <Product product={ product} />
    </>
  )
}
