import styles from "@/styles/Information.module.scss"

import Links from "@/components/Links"
import {
  API_URL,
  UPOST_IMAGE,
  NEW_POST_IMAGE,
  AUTOLUX_IMAGE,
} from "@/config/index.js"
import { getInformation } from "@/fetchers"

export function generateMetadata() {
  return {title:"Доставка заказов",description:"Способы доставки заказов покупателям магазина Кармен"}
}

export default async function deliveryPage() {
  
  const { information = {} }=await getInformation()
  return (
   
      <div className={styles.container}>
        <Links home={true} back={true} />
        <h1>Доставка заказов</h1>
        <div>{information.delivery}</div>

        <div className={styles.logos}>
          <div className={styles.image}>
            <img title="Новая почта" src={NEW_POST_IMAGE} />
          </div>
          <div className={styles.image}>
            <img title="Автолюкс" src={AUTOLUX_IMAGE} />
          </div>
          <div className={styles.image}>
            <img title="Укрпочта" src={UPOST_IMAGE} />
          </div>
        </div>
      </div>
   
  )
}


