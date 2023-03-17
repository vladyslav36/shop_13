import OrderAdminList from '@/components/OrderAdminList'
import React from 'react'

export function generateMetadata() {
  return {title:'Страница всех заказов'}
}
export default function orderAdminListPage() {
  return (
    <OrderAdminList/>
  )
}
