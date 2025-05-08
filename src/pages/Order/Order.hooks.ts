import { useQuery } from '@tanstack/react-query'
import { OrderUsecase } from '../../features/usecase/OrderUsecase'

export function useOrders() {
  const { data } = useQuery({
    queryKey: ['OrderUsecase', 'getAllOrders'],
    queryFn: OrderUsecase.getAllOrders,
  })

  return {
    orders: data ?? [],
  }
}