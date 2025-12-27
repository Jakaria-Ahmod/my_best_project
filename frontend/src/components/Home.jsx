import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Home = () => {
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loding, setLoading] = useState(false);

  const handleClick = () => {
    console.log('Logout button clicked');
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/product/get`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      setData(res.data.products);
    } catch (err) {
      console.error(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <button
          onClick={handleClick}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {loding ? (
        <p className="text-gray-500 text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map(item => (
            <div
              key={item._id}
              className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <p className="text-green-600 font-bold mb-2">
                Price: ${item.price}
              </p>
              <div className="text-sm text-gray-500 mt-2">
                <p>Author: {item.createdBy.username}</p>
                <p>Email: {item.createdBy.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
