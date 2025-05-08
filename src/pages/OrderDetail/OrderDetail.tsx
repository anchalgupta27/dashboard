import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { baseURL } from '../../BaseUrl';

const orderStatuses = ['pending', 'shipped'];

const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<any>(null);
  const [status, setStatus] = useState<string>('pending');
  const [error, setError] = useState<string | null>(null);
  const [assignedRider, setAssignedRider] = useState<any>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`${baseURL}/api/order/${id}`);
        const result = await response.json();
        if (response.ok) {
          setOrder(result);
          setStatus(result.status);
        } else {
          setError(result.message || 'Failed to load order');
        }
      } catch (error) {
        console.error('Error fetching order data', error);
      }
    };

    fetchOrder();
  }, [id]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const data = {
        orderId: order._id,
        status,
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
        window.alert('Order updated');
        setError(null);
        setAssignedRider(result.order.orderRider.rider);
        setLastUpdated(result.order.orderRider.rider.assignedAt);
        setOrder(result.order.orderRider);
      } else {
        setError(result.message || 'Failed to update order');
      }
    } catch (error) {
      console.error('Error updating order', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Order Details</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
        >
          ← Back
        </button>
      </div>

      {order ? (
        <>
          <div className="space-y-4 text-lg text-gray-700">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
          </div>

          <div className="mt-6">
            <label className="block text-lg font-medium mb-2">Update Status</label>
            <select
              value={status}
              onChange={handleStatusChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {orderStatuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {assignedRider && (
            <div className="mt-6 bg-gray-100 p-4 rounded-md shadow-sm">
              <p className="text-lg"><strong>Rider Assigned:</strong> {assignedRider.name}</p>
              <p className="text-lg"><strong>Status:</strong> {assignedRider.status}</p>
              <p className="text-lg"><strong>Assigned At:</strong> {new Date(lastUpdated || '').toLocaleString()}</p>
            </div>
          )}

          {(!assignedRider && status === 'pending') && (
            <div className="mt-6 bg-yellow-50 p-4 rounded-md border border-yellow-200">
              <p className="text-lg font-semibold text-yellow-700">Rider Unassigned</p>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition focus:ring-2 focus:ring-blue-400"
            >
              Update Order
            </button>
          </div>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </>
      ) : (
        <p className="text-center text-gray-600 text-lg">Loading order details...</p>
      )}
    </div>
  );
};

export default OrderDetailPage;
