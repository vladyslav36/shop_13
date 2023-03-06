import Checkout from "@/components/Checkout"


export function generateMetadata() {
  return {title:'Офрмление заказа'}
}

export default function checkoutPage() {
  return (
   <Checkout/>
  )
}
