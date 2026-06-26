import axios from "axios";
import { useNavigate } from "react-router-dom";
const backend = import.meta.env.VITE_BACKEND_URL;
const Dashboard = () => {
  const nav = useNavigate();
  const handleProfile = async () => {
    const res = await axios.get(`${backend}/api/v1/profile`, {
      withCredentials: true,
    });

    if (res.status == 200) {
      nav("/profile");
    } else {
      alert("Error");
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>
      <button onClick={handleProfile} className="text-white">
        profile
      </button>
    </div>
  );
};

export default Dashboard;
