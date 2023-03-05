import styles from "@/styles/Information.module.scss"
import Links from "@/components/Links"
import { getInformation } from "@/fetchers"

export function generateMetadata() {
  return { title: "Адрес и режим работы магазина Кармен" }
}

export default async function addressPage() {
  const { information = {} }=await getInformation()

  return (
    <>
     <Links home={true} back={true} />
      <div className={styles.container}>
        <h1>Адрес магазина</h1>
        <pre>{information.address}</pre>
        <h1>Режим работы</h1>
        <pre>{information.workingHours}</pre>
      </div>
    
    </>
     
  
  )
}


