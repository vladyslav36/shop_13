import { getCategories } from '@/fetchers'
import { getListForCategoriesMenu } from '@/utils'
import React from 'react'
import AddCategory from '@/components/AddCategory'


export function generateMetadata() {
  return { title: "Добавление категории" }
}

export default async function addCategoryPage() {
  const { categories } = await getCategories()
  const listForMenu=getListForCategoriesMenu(categories)
  return (
    <AddCategory listForMenu={listForMenu}/>
  )
}
