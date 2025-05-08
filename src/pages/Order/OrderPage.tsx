import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useOrders } from './Order.hooks';
import { baseURL } from '../../BaseUrl';

const OrderPage = () => {
  const { orders } = useOrders();
  const [ridersMap, setRidersMap] = useState<Record<string, string>>({});
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
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Orders Dashboard</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-3 rounded mb-6 text-center">
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-800">
          <thead className="bg-blue-100 text-gray-700 uppercase tracking-wide text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Order ID</th>
              <th className="px-6 py-3 text-left">Rider</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Total Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order: any) => (
              <tr
                key={order._id}
                onClick={() => handleRowClick(order._id)}
                className="hover:bg-blue-50 cursor-pointer transition-all duration-200"
              >
                <td className="px-6 py-4">{order._id}</td>
                <td className="px-6 py-4">
                  {order.rider?.riderId
                    ? ridersMap[order.rider.riderId] || 'Assigned'
                    : 'Not Assigned'}
                </td>
                <td className="px-6 py-4 capitalize">{order.status}</td>
                <td className="px-6 py-4 font-medium">₹{order.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderPage;
