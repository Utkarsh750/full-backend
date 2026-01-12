import { Button } from "@/components/ui/button";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/user/logout");
      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/login");
      }
    } catch (error) {}
  };
  return (
    <div className=" bg-gray-500">
      <div className=" flex items-center justify-between">
        <h1 className=" font-bold text-lg p-2">Todo App</h1>
        <Button onClick={logoutHandler}>Logout</Button>
      </div>
    </div>
  );
};

export default Navbar;
