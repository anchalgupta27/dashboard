import { useEffect, useState } from 'react';
import { baseURL } from '../../BaseUrl';

interface Rider {
  _id: string;
  name: string;
  email: string;
}

interface Order {
  _id: string;
  totalAmount: number;
  status: string;
  Address: string;
  createdAt: string;
}

interface RiderWithOrders {
  riderId: string;
  rider: Rider;
  assignedOrders: Order[];
}

const RiderPage = () => {
  const [ridersWithOrders, setRidersWithOrders] = useState<RiderWithOrders[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRiders = async () => {
      try {
        const response = await fetch(`${baseURL}/api/order/riders-with-orders`);
        console.log(`${baseURL}/api/order/riders-with-orders`)
        const data = await response.json();
        console.log(data)
        if (data.success) {
          setRidersWithOrders(data.riders);
        } else {
          setError('Failed to fetch riders');
        }
      } catch (err) {
        console.log(err)
        setError('Server error');
      } finally {
        setLoading(false);
      }
    };

    fetchRiders();
  }, []);

  if (loading) return <div className="text-center py-10 text-gray-600">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Riders & Their Orders</h1>
      
      {ridersWithOrders.length === 0 ? (
        <p className="text-gray-500 text-center">No riders with assigned orders.</p>
      ) : (
        ridersWithOrders.map(({ riderId, rider, assignedOrders }) => (
          <div key={riderId} className="bg-white shadow-md rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-2">{rider.name}</h2>
            <p className="text-gray-600 mb-4">{rider.email}</p>

            <h3 className="font-medium mb-2">Assigned Orders:</h3>
            <ul className="space-y-3">
              {assignedOrders.map(order => (
                <li key={order._id} className="border p-4 rounded-md">
                  <p><span className="font-semibold">Order ID:</span> {order._id}</p>
                  <p><span className="font-semibold">Address:</span> {order.Address}</p>
                  <p><span className="font-semibold">Amount:</span> ₹{order.totalAmount}</p>
                  <p><span className="font-semibold">Status:</span> {order.status}</p>
                  <p><span className="font-semibold">Created At:</span> {new Date(order.createdAt).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default RiderPage;
