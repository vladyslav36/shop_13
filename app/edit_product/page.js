import {  getCatalogs, getCategories, getProductBySlug } from '@/fetchers'
import EditProductBlock from '@/components/EditProductBlock'

export async function generateMetadata() { 
  return {title:`Редактирование товара`}
}
export default async  function editProductPage() {

  const categoriesData = getCategories()
  const catalogsData = getCatalogs()
  const [ { categories } = [], { catalogs } = []] = await Promise.all([ categoriesData, catalogsData])
  
  return (
    <EditProductBlock  categories={categories} catalogs={catalogs} />    
  )
}
