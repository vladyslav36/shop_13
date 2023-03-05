import styles from "@/styles/Information.module.scss"
import Links from "@/components/Links"

import { getInformation } from "@/fetchers"

export function generateMetadata() {
  return {title:"Условия сотрудничества",description:"Условия сотрудничечтва с магазином Кармен"}
}

export default async  function conditionsPage() {
  const { information = {} }=await getInformation()
  return (
    
      <div className={styles.container}>
        <Links home={true} back={true} />
        <h1>Условия сотрудничества</h1>
        <div>{information.conditions}</div>
      </div>
   
  )
}


