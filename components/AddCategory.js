"use client"

import styles from "@/styles/Form.module.scss"
import AccessDenied from "@/components/AccessDenied"
import AuthContext from "@/context/AuthContext"
import { useContext, useState, useEffect, useRef } from "react"
import { ToastContainer, toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { API_URL, NOIMAGE } from "@/config/index"
import "react-toastify/dist/ReactToastify.css"
import Links from "@/components/Links"
import Options from "@/components/Options"
import ModalImage from "@/components/ModalImage"
import ModalPrice from "@/components/ModalPrice"
import ModalCatalog from "@/components/ModalCatalog"

export default function AddCategory({ listForMenu }) {
  const {
    user: { isAdmin, token },
  } = useContext(AuthContext)
  const initValues = {
    name: "",
    parent: "",
    parentId: null,
    description: "",
    options: {},
  }
  const [values, setValues] = useState(initValues)

  const [image, setImage] = useState({ path: "", file: null })
  const [price, setPrice] = useState({ path: "", file: null })
  const [catalog, setCatalog] = useState({ path: "", file: null })
  const elDialog = useRef()
  const elDialogPrice = useRef()
  const elDialogCatalog = useRef()
 

  useEffect(() => {
    if (values.parentId) setValues({ ...values, options: {} })
  }, [values.parentId])

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Проверка на заполнение поля имени категории
    const hasEmptyFields = !values.name.trim()
    if (hasEmptyFields) {
      toast.error("Поле Категория должно быть заполнено")
      return
    }

    // Проверка опций

    let error = false
    Object.keys(values.options).forEach((option) => {
      if (!Object.keys(values.options[option].values).length) {
        toast.warning("Опция введена без значений")
        error = true
      }
    })
    if (error) return

    // Send data
    const formData = new FormData()
    formData.append("values", JSON.stringify(values))
    formData.append("image", image.file)
    formData.append("price", price.file)
    formData.append("catalog", catalog.file)
    const res = await fetch(`${API_URL}/api/categories`, {
      method: "POST",
      headers: {
        enctype: "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
      body: formData,
    })
    const data = await res.json()

    if (!res.ok) {
      toast.error(data.message)
    } else {
      toast.success('Категория успешно добавлена')
      setValues(initValues)
      setImage({ path: "", file: null })
      setPrice({ path: "", file: null })
      setCatalog({ path: "", file: null })
      router.refresh()
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    if (name === "name") {
      setValues({ ...values, [name]: value })
    } else {
      toast.warning("Родительская категория выбирается из выпадающего списка")
    }
  }
  const handleUploadChange = (e) => {
    const url = URL.createObjectURL(e.target.files[0])
    URL.revokeObjectURL(image.path)
    setImage({ path: url, file: e.target.files[0] })
    elDialog.current.close()
  }
  const handleUploadPrice = (e) => {
    setPrice({ path: "/", file: e.target.files[0] })
    elDialogPrice.current.close()
  }
  const handleUploadCatalog = (e) => {
    setCatalog({ path: "/", file: e.target.files[0] })
    elDialogCatalog.current.close()
  }
  const handleListClick = ({ id, name }) => {
    setValues({ ...values, parent: name, parentId: id })
  }

  const deleteImage = () => {
    URL.revokeObjectURL(image.path)
    setImage({ path: "", file: null })
  }

  return (
    <>
      {!isAdmin ? (
        <AccessDenied />
      ) : (
        <>
          <div className={styles.form}>
            <form onSubmit={handleSubmit}>
              <div className={styles.header}>
                <Links home={true} back={true} />

                <span>
                  <i
                    className="fa-solid fa-floppy-disk fa-2xl"
                    title="Сохранить"
                    name="save"
                    onClick={handleSubmit}
                  ></i>
                </span>
              </div>

              <ToastContainer />
              <div className={styles.grid}>
                <div>
                  <label htmlFor="name">Категория</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="parent">Родительская категория</label>
                  <div className={styles.input_group_menu}>
                    <input
                      type="text"
                      id="parent"
                      name="parent"
                      value={values.parent}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    <div
                      className={styles.cancell}
                      onClick={() =>
                        setValues({
                          ...values,
                          parent: "",
                          parentId: null,
                        })
                      }
                    >
                      <i className="fa-solid fa-xmark fa-lg"></i>
                    </div>
                    <ul className={styles.dropdown_menu}>
                      {listForMenu && (
                        <>
                          {listForMenu.map((item, i) => (
                            <li
                              key={i}
                              onClick={() =>
                                handleListClick({
                                  id: item.cat._id,
                                  name: item.cat.name,
                                })
                              }
                            >
                              {item.tree}
                            </li>
                          ))}
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="description">Описание</label>
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </form>
            <div>
              <div className={styles.image_header}>
                <p>Изображение категории</p>
                {values.parentId === null ? (
                  <div>
                    <div>
                      <i
                        className="fa-solid fa-download fa-xl"
                        onClick={() => {
                          elDialogPrice.current.showModal()
                        }}
                      ></i>
                      {price.path ? (
                        <i
                          className="fa-solid fa-xmark fa-xl"
                          onClick={() => setPrice({ path: "", file: null })}
                        ></i>
                      ) : null}

                      <p>Прайс</p>
                    </div>
                    <div>
                      <i
                        className="fa-solid fa-download fa-xl"
                        onClick={() => {
                          elDialogCatalog.current.showModal()
                        }}
                      ></i>
                      {catalog.path ? (
                        <i
                          className="fa-solid fa-xmark fa-xl"
                          onClick={() => setCatalog({ path: "", file: null })}
                        ></i>
                      ) : null}

                      <p>Каталог</p>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className={styles.image_container}>
                {image.path ? (
                  <div className={styles.image}>
                    <img src={image.path} />
                  </div>
                ) : (
                  <div className={styles.image}>
                    <img src={`${NOIMAGE}`} />
                  </div>
                )}
                <div className={styles.image_footer}>
                  <button
                    className="btn"
                    onClick={() => {
                      elDialog.current.showModal()
                    }}
                  >
                    <i className="fa-regular fa-image"></i>
                  </button>
                  <button className="btn btn-danger" onClick={deleteImage}>
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
            </div>
            {!values.parent ? (
              <Options values={values} setValues={setValues} />
            ) : null}
          </div>
        </>
      )}
      <ModalImage elDialog={elDialog} handleUploadChange={handleUploadChange} />
      <ModalPrice
        elDialogPrice={elDialogPrice}
        handleUploadPrice={handleUploadPrice}
      />
      <ModalCatalog
        elDialogCatalog={elDialogCatalog}
        handleUploadCatalog={handleUploadCatalog}
      />
    </>
  )
}


