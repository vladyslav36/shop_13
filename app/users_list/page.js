import React from 'react'
import UsersList from '@/components/UsersList'

export function generateMetadata() {
  return {title:'Список пользователей'}
}
export default function usersListPage() {
  return (
    <UsersList/>
  )
}
