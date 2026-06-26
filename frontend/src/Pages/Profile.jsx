import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const backend = import.meta.env.VITE_BACKEND_URL;
const Profile = () => {
  const [data, setData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      const res = await axios.get(`${backend}/api/v1/profile`, {
        withCredentials: true,
      });
      setData(res.data.user ?? {});
    };

    loadProfile();
  }, []);

  const handlelogout = async () => {
    try {
      const res = await axios.post(`${backend}/api/v1/logout`, null, {
        withCredentials: true,
      });
      if (res.status === 200) {
        alert("Logout successful");
        navigate("/");
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred during logout");
    }
  };
  return (
    <>
      <h1 className="text-white">Profile page</h1>
      <h3 className="text-white">name: {data.username}</h3>
      <button className="text-white" onClick={handlelogout}>
        Logout
      </button>
    </>
  );
};

export default Profile;
