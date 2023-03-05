import { getCategories, getCategory } from "@/fetchers"
import React from "react"
import EditCategorieBlock from "@/components/EditCategoryBlock"

export async function generateMetadata() {
  return { title: `Редактирование категории ` }
}

export default async function editCategoryPage() {
  const { categories } = await getCategories()
  return <EditCategorieBlock categories={categories} />
}
