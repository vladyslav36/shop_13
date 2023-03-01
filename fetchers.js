import { API_URL } from "./config"

 export async function getCatalog(id) {
  const res = await fetch(`${API_URL}/api/catalogs/${id}`, {
    next: { revalidate: 30 },
  })
  return res.json()
}

export async function getCatalogs() {
  const res = await fetch(`${API_URL}/api/catalogs`, {
    next: { revalidate: 30 },
  })
  return res.json()
}
export async function getCategories() {
  const res = await fetch(`${API_URL}/api/categories`, {
    next: { revalidate: 30 },
  })
  return res.json()
}

 export async function getCategory(id) {
   const res = await fetch(`${API_URL}/api/categories/${id}`, {
     next: { revalidate: 30 },
   })
   return res.json()
}
 
export async function getShowCaseProducts() {
  const res = await fetch(`${API_URL}/api/products/showcase`, {
    next: { revalidate: 30 },
  })
  return res.json()
}

export async function getCurrencyRate() {
  const res = await fetch(`${API_URL}/api/currencyrate`, {
    next: { revalidate: 30 },
  })
  return res.json()
}

export async function getProductsByCatalogId(id) {
   const res = await fetch(`${API_URL}/api/products/catalog/${id}`, {
     next: { revalidate: 30 },
   })
   return res.json()
}
export async function getProductsByCategoryId(id) {
   const res = await fetch(`${API_URL}/api/products/category/${id}`, {
     next: { revalidate: 30 },
   })
   return res.json()
}
 
