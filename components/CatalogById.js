"use client"

import styles from "@/styles/Category.module.scss"
import { API_URL, NOIMAGE } from "@/config/index"
import Link from "next/link"
import ProductsList from "@/components/ProductsList"
import {  useState } from "react"
import { getArrayCatTree } from "utils"
import Links from "@/components/Links"
import CatalogsList from "@/components/CatalogsList"


export default function CatalogById({ catalog, catalogs,products,childrenList }) {
  
  const [isShowAsList, setIsShowAsList] = useState(true)  

  return (
    <>       
      <div className={styles.header}>
        <div className={styles.header_left}>
          <Links home={true} back={true} />
          <div className={styles.crumbs}>
            {getArrayCatTree(catalog, catalogs).map((item, i, arr) => {
              const arrow = i < arr.length - 1 ? <div>&nbsp;➔&nbsp;</div> : null
              return (
                <div key={i}>
                  <Link href={`/catalog/${item._id}`}>
                    <p>{item.name}</p>
                  </Link>
                  {arrow}
                </div>
              )
            })}
          </div>
        </div>
        {!childrenList.length ? (
          <div className={styles.toggles}>
            <div title="Список" onClick={() => setIsShowAsList(true)}>
              <i className="fa-solid fa-list"></i>
            </div>
            <div title="Плитка" onClick={() => setIsShowAsList(false)}>
              <i className="fa-solid fa-table-cells"></i>
            </div>
          </div>
        ) : null}
      </div>

      <div className={styles.container}>
        <div className={styles.left_content}>
          <div className={styles.image}>
            <img
              src={catalog.image ? `${API_URL}${catalog.image}` : `${NOIMAGE}`}
            />
          </div>
          <div className={styles.name}>
            <p>{catalog.name}</p>
          </div>
        </div>
        <div className={styles.right_content}>
          {childrenList.length ? (
            <CatalogsList catalogs={childrenList} />
          ) : products.length ? (
            <ProductsList products={products} isShowAsList={isShowAsList} />
          ) : null}
        </div>
      </div>
    
    
    </>
     
   
  )
}


