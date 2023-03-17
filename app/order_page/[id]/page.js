import Order from '@/components/Order'
import React from 'react'

export function generateMetadata() {
  return {title:'Страница заказа'}
}
export default function OrderPage({ params: { id } }) {
  return (
    <Order id={id}/>
  )
}
