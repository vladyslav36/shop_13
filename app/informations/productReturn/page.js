import styles from "@/styles/Information.module.scss"

import Links from "@/components/Links"
import { getInformation } from "@/fetchers"

export function generateMetadata() {
  return {title:"Возврат товара"}
}

export default async function productReturnPage() {
  const { information = {} }=await getInformation()
  return (    
      <div className={styles.container}>
        <Links home={true} back={true} />
        <h1>Возврат товара</h1>
        <p>{information.productReturn}</p>
      </div>   
  )
}


