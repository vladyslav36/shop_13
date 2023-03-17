"use client"

import styles from "@/styles/OrderUserList.module.scss"
import { API_URL } from "@/config/index"
import moment from "moment"
import { useEffect, useState, useContext } from "react"
import Links from "@/components/Links"
import { useRouter } from "next/navigation"
import AuthContext from "@/context/AuthContext"

export default function OrderUserList() {
  const { user } = useContext(AuthContext)
  const [orders, setOrders] = useState([])
  useEffect(() => {
    const fetchOrdersById = async () => {
      const res = await fetch(`${API_URL}/api/order/user/${user._id}`, {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
      const { orders } = await res.json()
      setOrders(orders.reverse())
    }
    if (Object.keys(user).length) {
      fetchOrdersById()
    }
  }, [user])
  const router = useRouter()

  moment.locale("ru")

  const openOrder = (order) => {
    router.push(`/order_page/${order._id}`)
  }

  return (
    <>
      <div className={styles.container}>
        <Links home={true} back={true} />
        {Object.keys(user).length ? (
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Дата</th>
                  <th>Общая сумма</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {orders.length
                  ? orders.map((item, i) => (
                      <tr key={i}>
                        <td>{item.count}</td>
                        <td>
                          {moment(Date.parse(item.createdAt)).format("L")}
                        </td>
                        <td>{item.totalAmount}</td>
                        <td title="Смотреть заказ">
                          <button onClick={() => openOrder(item)}>
                            <i className="fa-regular fa-eye"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </>
  )
}
