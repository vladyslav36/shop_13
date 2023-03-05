import { getCatalogs, getCategories } from '@/fetchers'
import AddProduct from '@/components/AddProduct'
import React from 'react'

export function generateMetadata() {
  return {title:'Добавление товара'}
}

export default async  function addProduct() {
  const categoriesData = getCategories()
  const catalogsData = getCatalogs()
  const [{ categories } = [], { catalogs }=[]]=await Promise.all([categoriesData,catalogsData])
  return (
    <AddProduct catalogs={catalogs} categories={categories}/>
  )
}
