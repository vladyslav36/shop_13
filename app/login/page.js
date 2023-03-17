import Login from '@/components/Login'
import React from 'react'

export function generateMetadata() {
  return {title:'Страница авторизации'}
}

export default function loginPage() {
  return (
    <Login/>
  )
}
