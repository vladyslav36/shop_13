import UserProfile from '@/components/UserProfile'
export function generateMetadata() {
  return {title:'Профиль пользователя'}
}

export default function userProfilePage() {
  return (
    <UserProfile/>
  )
}
