import React, { useState, useEffect } from 'react';
import { useOrders } from './Order.hooks';
import { baseURL } from '../../BaseUrl';

// Define possible order statuses
const orderStatuses = ['pending', 'shipped', 'delivered'];

const OrderPage = () => {
  const { orders } = useOrders();
  const [order, setOrder] = useState<any>(null);
  const [status, setStatus] = useState<string>('pending');
  const [riderId, setRiderId] = useState<string | null>(null);
  const [riders, setRiders] = useState<any[]>([]); // List of riders for dropdown
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setOrder(orders[0]);
        setStatus(orders[0]?.status);
        setRiderId(orders[0]?.rider ? orders[0].rider.riderId : null);
      } catch (error) {
        console.error('Error fetching order data', error);
      }
    };

    fetchOrder();
  }, [orders]);

  useEffect(() => {
    // Fetch all riders for the dropdown
    const fetchRiders = async () => {
      try {
        const response = await fetch(`${baseURL}/api/rider`);
        console.log("riders", response)
        const result = await response.json();
        if (result) {
          setRiders(result); // Assuming 'riders' field exists in the response
        } else {
          setError('Failed to load riders');
        }
      } catch (error) {
        console.error('Error fetching riders', error);
        setError('Server error');
      }
    };

    fetchRiders();
  }, []);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  const handleRiderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRiderId(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const data = {
        orderId: order._id,
        status: status,
        riderId: riderId,
      };

      const response = await fetch(`${baseURL}/api/order/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        window.alert("Order updated")
        setError(null);
      } else {
        setError(result.message || 'Failed to update order');
      }
    } catch (error) {
      console.error('Error updating order', error);
      setError('Server error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Order Details</h1>
      {order ? (
        <div>
          <p className="text-lg"><strong>Order ID:</strong> {order._id}</p>
          <p className="text-lg"><strong>User ID:</strong> {order.userId}</p>
          <p className="text-lg"><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
          <p className="text-lg"><strong>Address:</strong> {order.Address}</p>

          <div className="my-4">
            <label className="block text-lg font-medium mb-2">Status</label>
            <select
              value={status}
              onChange={handleStatusChange}
              className="block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {orderStatuses.map((statusOption) => (
                <option key={statusOption} value={statusOption}>
                  {statusOption}
                </option>
              ))}
            </select>
          </div>

          <div className="my-4">
            <label className="block text-lg font-medium mb-2">Rider</label>
            <select
              value={riderId || ''}
              onChange={handleRiderChange}
              className="block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Rider</option>
              {riders.map((rider) => (
                <option key={rider._id} value={rider._id}>
                  {rider.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Update Order
            </button>
          </div>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
  );
};

export default OrderPage;
