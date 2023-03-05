import { API_URL } from "./config"

 export async function getCatalog(id) {
  const res = await fetch(`${API_URL}/api/catalogs/${id}`, {
    cache:'no-store'
  })
   if (!res.ok) {
      throw new Error('Ошибка при загрузке каталога')
   }
  return res.json()
}

export async function getCatalogs() {
  const res = await fetch(`${API_URL}/api/catalogs`, {
   cache:'no-store'
  })
  if (!res.ok) {
    throw new Error("Ошибка при загрузке каталогов")
  }
  return res.json()
}
export async function getCategories() {
  const res = await fetch(`${API_URL}/api/categories`, {
   cache:'no-store'
  })
 if (!res.ok) {
   throw new Error("Ошибка при загрузке категорий")
 }
  return res.json()
}

 export async function getCategory(id) {
   const res = await fetch(`${API_URL}/api/categories/${id}`, {
    cache:'no-store'
   })
    if (!res.ok) {
      throw new Error("Ошибка при загрузке катагории")
    }
   return res.json()
}
 
export async function getShowCaseProducts() {
  const res = await fetch(`${API_URL}/api/products/showcase`, {
    //cache:'no-store'
   cache:'no-store'
  })
   if (!res.ok) {
     throw new Error("Ошибка при загрузке витрины")
   }
  return res.json()
}

export async function getCurrencyRate() {
  const res = await fetch(`${API_URL}/api/currencyrate`, {
   cache:'no-store'
  })
   if (!res.ok) {
     throw new Error("Ошибка при загрузке валютных пар")
   }
  return res.json()
}

export async function getProductsByCatalogId(id) {
   const res = await fetch(`${API_URL}/api/products/catalog/${id}`, {
    cache:'no-store'
   })
   if (!res.ok) {
     throw new Error("Ошибка при загрузке товара из каталога")
   }
   return res.json()
}
export async function getProductsByCategoryId(id) {
   const res = await fetch(`${API_URL}/api/products/category/${id}`, {
    cache:'no-store'
   })
   if (!res.ok) {
     throw new Error("Ошибка при загрузке товара из категории")
   }
   return res.json()
}

export async function getInformation() {
   const res = await fetch(`${API_URL}/api/information`, {
    cache:'no-store'
   })
   if (!res.ok) {
     throw new Error("Ошибка при загрузке блока информации")
   }
   return res.json()
}

export async function getProductBySlug(slug) {
  const res = await fetch(`${API_URL}/api/products/${slug}`, {cache:'no-store'})
   if (!res.ok) {
     throw new Error("Ошибка при загрузке товара")
   }
  return res.json()
}
 
