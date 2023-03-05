"use client"

import styles from "@/styles/Form.module.scss"
import AccessDenied from "@/components/AccessDenied"
import AuthContext from "@/context/AuthContext"
import { useContext, useState, useEffect, useRef } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useRouter } from "next/navigation"
import { API_URL } from "@/config/index"
import {
  getBrand,
  getListForCatalogsMenu,
  getListForCategoriesMenu,
  stringToPrice,
} from "../utils"
import SelectOptions from "@/components/SelectOptions"
import Links from "@/components/Links"
import ModalImage from "@/components/ModalImage"

export default function addProductPage({ categories, catalogs }) {
  const {
    user: { isAdmin, token },
  } = useContext(AuthContext)

  const initValues = {
    name: "",
    brandId: null,
    model: "",
    description: "",
    category: "",
    catalog: "",
    categoryId: null,
    catalogId: null,
    options: {},
    isInStock: true,
    price: "",
    retailPrice: "",
    isShowcase: false,
    currencyValue: "UAH",
  }

  const [values, setValues] = useState(initValues)

  const [images, setImages] = useState([])

  const listForCategoryMenu = getListForCategoriesMenu(categories)
  const listForCatalogMenu = getListForCatalogsMenu(catalogs)

  const [imageIdx, setImageIdx] = useState(0)

  const elDialog = useRef()
  const router = useRouter()

  useEffect(() => {
    if (!values.categoryId)
      setValues({ ...values, options: {}, category: "", brandId: null })
  }, [values.categoryId])

  useEffect(() => {
    if (!values.catalogId) setValues({ ...values, catalog: "" })
  }, [values.catalogId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Проверка на заполнение поля имени и модели товара
    const hasEmptyFields = !values.name.trim() || !values.model.trim()
    if (hasEmptyFields) {
      toast.error("Поле Название и Модель должны быть заполнены")
      return
    }

    if (!values.category) {
      toast.error("Поле категория является обязательным")
      return
    }

    if (values.categoryId === values.brandId) {
      toast.error("Товар должен находиться хотя бы в одной подкатегории")
      return
    }

    // Send data
    const formData = new FormData()
    formData.append("values", JSON.stringify(values))
    images.forEach((item) => formData.append("images", item.file))
    const res = await fetch(`${API_URL}/api/products`, {
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
      toast.success('Товар успешно добавлен')
      setValues(initValues)
      setImageIdx(0)
      setImages([])
      router.refresh()
    }
  }

  const formatPrice = ({ name, value }) => {
    let { price, error } = stringToPrice(value)
    if (error) {
      price = ""
      toast.error("Прайс должен быть числом")
    }
    setValues({ ...values, [name]: price })
  }
  // input для name & model ...
  const handleChange = (e) => {
    const { name, value, checked } = e.target
    if (name === "isShowcase" || name === "isInStock") {
      setValues({ ...values, [name]: checked })
    } else {
      e.preventDefault()
      if (name === "catalog") {
        toast.warning("Каталог выбирается из выпадающего списка")
        return
      }
      if (name === "category") {
        toast.warning("Категория выбирается из выпадающего списка")
        return
      }
      setValues({ ...values, [name]: value })
    }
  }

  const handleListClick = async (category) => {
    const brand = getBrand(category, categories)
    setValues({
      ...values,
      category: category.name,
      categoryId: category._id,
      brandId: brand._id,
      options: { ...brand.options },
    })
  }
  const handleUploadChange = (e) => {
    const url = URL.createObjectURL(e.target.files[0])
    // что нажато: добавление новой картинки или изменение существующей
    if (images[imageIdx]) {
      URL.revokeObjectURL(images[imageIdx].path)
      setImages(
        images.map((item, i) =>
          i === imageIdx ? { path: url, file: e.target.files[0] } : item
        )
      )
    } else {
      setImages([...images, { path: url, file: e.target.files[0] }])
    }
    elDialog.current.close()
  }
  const deleteImage = (i) => {
    URL.revokeObjectURL(images[i].path)
    setImages(images.filter((item, idx) => idx !== i))
  }

  return (
    <>
      {!isAdmin ? (
        <AccessDenied />
      ) : (
        <div>
          <div className={styles.form}>
            <form>
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
                  <label htmlFor="name">Название</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="model">Модель</label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    value={values.model}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="category">Категория</label>
                  <div className={styles.input_group_menu}>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      value={values.category}
                      onChange={handleChange}
                    />
                    <div
                      className={styles.cancell}
                      onClick={() => setValues({ ...values, categoryId: null })}
                    >
                      <i className="fa-solid fa-xmark fa-lg"></i>
                    </div>

                    <ul className={styles.dropdown_menu}>
                      {listForCategoryMenu && (
                        <>
                          {listForCategoryMenu.map((item, i) => (
                            <li
                              key={i}
                              onClick={() => handleListClick(item.cat)}
                            >
                              {item.tree}
                            </li>
                          ))}
                        </>
                      )}
                    </ul>
                  </div>
                </div>
                <div>
                  <label htmlFor="catalog">Каталог</label>
                  <div className={styles.input_group_menu}>
                    <input
                      type="text"
                      id="catalog"
                      name="catalog"
                      value={values.catalog}
                      onChange={handleChange}
                    />
                    <div
                      className={styles.cancell}
                      onClick={() => setValues({ ...values, catalogId: null })}
                    >
                      <i className="fa-solid fa-xmark fa-lg"></i>
                    </div>

                    <ul className={styles.dropdown_menu}>
                      {listForCatalogMenu && (
                        <>
                          {listForCatalogMenu.map((item, i) => (
                            <li
                              key={i}
                              onClick={() =>
                                setValues({
                                  ...values,
                                  catalog: item.cat.name,
                                  catalogId: item.cat._id,
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

                <div>
                  <div className={styles.labels}>
                    <label htmlFor="price">Цена (опт)</label>
                    <label htmlFor="retailPrice">Цена (розн)</label>
                    <label htmlFor="currencyValue">Валюта товара</label>
                  </div>
                  <div className={styles.input_price}>
                    <div tabIndex={0}>
                      <input
                        type="text"
                        id="price"
                        name="price"
                        value={values.price}
                        onChange={handleChange}
                        onBlur={(e) =>
                          formatPrice({ name: "price", value: e.target.value })
                        }
                      />
                    </div>
                    <div tabIndex={0}>
                      <input
                        type="text"
                        id="retailPrice"
                        name="retailPrice"
                        value={values.retailPrice}
                        onChange={handleChange}
                        onBlur={(e) =>
                          formatPrice({
                            name: "retailPrice",
                            value: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <select
                        className={styles.input}
                        name="currencyValue"
                        id="currencyValue"
                        value={values.currencyValue}
                        onChange={handleChange}
                      >
                        <option value="UAH">UAH</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className={styles.checkbox_wrapper}>
                  <div className={styles.custom_checkbox}>
                    <input
                      type="checkbox"
                      name="isShowcase"
                      id="isShowcase"
                      onChange={handleChange}
                      checked={values.isShowcase}
                    />
                    <label htmlFor="isShowcase">Показывать на витрине </label>

                    <div className={styles.check_icon}>
                      <i className="fa-solid fa-check"></i>
                    </div>
                  </div>

                  <div className={styles.custom_checkbox}>
                    <input
                      type="checkbox"
                      name="isInStock"
                      id="isInStock"
                      onChange={handleChange}
                      checked={values.isInStock}
                    />
                    <label htmlFor="isInStock">В наличии</label>
                    <div className={styles.check_icon}>
                      <i className="fa-solid fa-check"></i>
                    </div>
                  </div>
                </div>
              </div>
              {Object.keys(values.options).length ? (
                <SelectOptions
                  values={values}
                  setValues={setValues}
                  toast={toast}
                />
              ) : null}
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
            <h2>Изображения</h2>
            <div className={styles.images_container}>
              {images.length
                ? images.map((item, i) => (
                    <div className={styles.image_container} key={i}>
                      <div className={styles.image}>
                        <img src={item.path} />
                      </div>
                      <div className={styles.image_footer}>
                        <button
                          className="btn"
                          onClick={() => {
                            setImageIdx(i)
                            elDialog.current.showModal()
                          }}
                        >
                          <i className="fa-regular fa-image"></i>
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteImage(i)}
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                    </div>
                  ))
                : null}
              <button
                className="btn"
                onClick={() => {
                  setImageIdx(images.length)
                  elDialog.current.showModal()
                }}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      )}
      <ModalImage handleUploadChange={handleUploadChange} elDialog={elDialog} />
    </>
  )
}


