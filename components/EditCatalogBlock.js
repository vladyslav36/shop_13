"use client"

import AccessDenied from "@/components/AccessDenied"
import AuthContext from "@/context/AuthContext"
import { useContext, useState } from "react"

import EditCatalog from "./EditCatalog"
import EditCatalogList from "./EditCatalogList"

export default function EditCatalogBlock({ catalogs }) {
  const {
    user: { isAdmin, token },
  } = useContext(AuthContext)

  const [isShowCatalog, setIsShowCatalog] = useState(false)
  const [catalog, setCatalog] = useState({})

  return (
    <>
      {!isAdmin ? (
        <AccessDenied />
      ) : isShowCatalog ? (
        <EditCatalog
          catalog={catalog}
          catalogs={catalogs}
          setIsShowCatalog={setIsShowCatalog}
          token={token}
        />
      ) : (
        <EditCatalogList
          catalogs={catalogs}
          setCatalog={setCatalog}
          setIsShowCatalog={setIsShowCatalog}
          token={token}
        />
      )}
    </>
  )
}
