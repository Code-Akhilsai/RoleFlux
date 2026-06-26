import { useEffect, useState } from "react";
import axios from "axios";

const backend = import.meta.env.VITE_BACKEND_URL;
const Profile = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    const loadProfile = async () => {
      const res = await axios.get(`${backend}/api/v1/profile`, {
        withCredentials: true,
      });
      setData(res.data.user ?? {});
    };

    loadProfile();
  }, []);
  return (
    <>
      <h1 className="text-white">Profile page</h1>
      <h3 className="text-white">name: {data.username}</h3>
    </>
  );
};

export default Profile;
