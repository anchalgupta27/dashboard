import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useOrders } from './Order.hooks';
import { baseURL } from '../../BaseUrl';

const OrderPage = () => {
  const { orders } = useOrders();
  const [ridersMap, setRidersMap] = useState<Record<string, string>>({}); // riderId -> riderName
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRiders = async () => {
      try {
        const response = await fetch(`${baseURL}/api/rider`);
        const result = await response.json();

        if (result) {
          const map: Record<string, string> = {};
          result.forEach((rider: any) => {
            map[rider._id] = rider.name;
          });
          setRidersMap(map);
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

  const handleRowClick = (orderId: string) => {
    navigate(`/order/${orderId}/detail`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">Orders</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full table-auto bg-white">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-700">
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Rider Name</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Cost</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr
                key={order._id}
                onClick={() => handleRowClick(order._id)}
                className="cursor-pointer hover:bg-blue-50 transition-colors border-b"
              >
                <td className="px-6 py-4 text-sm">{order._id}</td>
                <td className="px-6 py-4 text-sm">
                  {order.rider?.riderId ? ridersMap[order.rider.riderId] || 'Assigned' : 'Not Assigned'}
                </td>
                <td className="px-6 py-4 text-sm capitalize">{order.status}</td>
                <td className="px-6 py-4 text-sm">₹{order.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderPage;
