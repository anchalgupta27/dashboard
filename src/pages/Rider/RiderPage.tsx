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
  const [openRiderId, setOpenRiderId] = useState<string | null>(null);

  useEffect(() => {
    const fetchRiders = async () => {
      try {
        const response = await fetch(`${baseURL}/api/order/riders-with-orders`);
        const data = await response.json();
        if (data.success) {
          setRidersWithOrders(data.riders);
        } else {
          setError('Failed to fetch riders');
        }
      } catch (err) {
        console.log(err);
        setError('Server error');
      } finally {
        setLoading(false);
      }
    };

    fetchRiders();
  }, []);

  const toggleAccordion = (riderId: string) => {
    setOpenRiderId(openRiderId === riderId ? null : riderId);
  };

  if (loading) return <div className="text-center py-10 text-gray-600">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Riders & Their Orders</h1>

      {ridersWithOrders.length === 0 ? (
        <p className="text-gray-500 text-center">No riders with assigned orders.</p>
      ) : (
        <div className="space-y-4">
          {ridersWithOrders.map(({ riderId, rider, assignedOrders }) => (
            <div key={riderId} className="border border-gray-200 rounded-xl shadow">
              <button
                className="w-full px-6 py-4 bg-gray-100 hover:bg-gray-200 flex justify-between items-center text-left"
                onClick={() => toggleAccordion(riderId)}
              >
                <div>
                  <h2 className="text-xl font-semibold">{rider.name}</h2>
                  <p className="text-gray-600">{rider.email}</p>
                </div>
                <span className="text-xl">
                  {openRiderId === riderId ? '−' : '+'}
                </span>
              </button>

              {openRiderId === riderId && (
                <div className="px-6 py-4 bg-white">
                  <h3 className="font-medium mb-2 text-lg">Assigned Orders:</h3>
                  {assignedOrders.length > 0 ? (
                    <ul className="space-y-4">
                      {assignedOrders.map(order => (
                        <li key={order._id} className="border p-4 rounded-lg bg-gray-50">
                          <p><span className="font-semibold">Order ID:</span> {order._id}</p>
                          <p><span className="font-semibold">Address:</span> {order.Address}</p>
                          <p><span className="font-semibold">Amount:</span> ₹{order.totalAmount}</p>
                          <p><span className="font-semibold">Status:</span> {order.status}</p>
                          <p><span className="font-semibold">Created At:</span> {new Date(order.createdAt).toLocaleString()}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No orders assigned.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RiderPage;
