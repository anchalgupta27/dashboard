import { OrderRepository } from "../repository/OrderRepository";


export class OrderUsecase {
    static async getAllOrders() {
        return OrderRepository.getAllOrders();
    }
}