import courierOrder from '../data/courierOrder.json'

export async function getCourierOrder(orderId) {
  if (orderId && orderId !== courierOrder.id) return null
  return courierOrder
}
