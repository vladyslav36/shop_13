

import { getInformation } from '@/fetchers'
import EditInformation from '@/components/EditInformation'
import React from 'react'

export function generateMetadata() {
  return {title:'Редактирование информации'}
}
export default async  function editInformationPage() {
  const { information }=await getInformation()
  return (
    <EditInformation information={information}/>
  )
}
