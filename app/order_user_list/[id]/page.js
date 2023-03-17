import OrderUserList from '@/components/OrderUserList'
import { getOrderByUserId } from '@/fetchers'
import React from 'react'

export function generateMetadata() {
  return {title: 'Страница заказов'}
}
export default async  function orderUserListPage() {

  return (
    <OrderUserList/>
  )
}
