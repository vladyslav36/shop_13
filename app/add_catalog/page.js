import AddCatalog from '@/components/AddCatalog'
import { getCatalogs } from '@/fetchers'
import { getListForCatalogsMenu } from '@/utils'
import React from 'react'


export function generateMetadata() {
  return {title:"Добавление каталога"}
}

 
  
export default async function addCatalogPage() {
  const { catalogs } = await getCatalogs()
  const listForMenu = getListForCatalogsMenu(catalogs)
  
  return (
    <>
      <AddCatalog  listForMenu={ listForMenu} />
    </>
   
  )
}
