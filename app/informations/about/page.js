import styles from "@/styles/Information.module.scss"
import Links from "@/components/Links"
import { getInformation } from "@/fetchers"

export function generateMetadata() {
  return {title:"О нас",description:"Информация о магазине Кармен"}
}
export default async function aboutPage() {
  const { information = {} } = await getInformation()
  
  return (   
      <div className={styles.container}>
        <Links home={true} back={true} />
        <h2>О нас</h2>
        <div>{information.aboutUs}</div>
      </div>  
  )
}


