import EditCatalogBlock from "@/components/EditCatalogBlock"
import EditCatalogBlock from "@/components/EditCatalogBlock"
import {  getCatalogs } from "@/fetchers"
import React from "react"

export function generateMetadata() {
  return { title: `Редактирование каталога` }
}

export default async function editCatalogPage() {
  const { catalogs } = await getCatalogs()
  return <EditCatalogBlock catalogs={catalogs} />
}
