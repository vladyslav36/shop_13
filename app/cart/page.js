import Cart from "@/components/Cart"


export function generateMetadata() {
  return {title:'Корзина заказов'}
}

export default function cartPage() {
  return (
    <Cart/>
  )
}
