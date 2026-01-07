import { Button } from "@/components/ui/button";
import React from "react";

const Navbar = () => {
  return (
    <div className=" bg-gray-500">
      <div className=" flex items-center justify-between">
        <h1 className=" font-bold text-lg p-2">Todo App</h1>
        <Button>Logout</Button>
      </div>
    </div>
  );
};

export default Navbar;
