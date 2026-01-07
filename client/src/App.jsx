import "./App.css";
import { Button } from "./components/ui/button";
import Navbar from "./pages/Navbar";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { useState } from "react";
import axios from "axios";

function App() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const addTodoHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/todo",
        { title },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(res);
      if (res.success) {
        alert(res.data.message);
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div>
      <Navbar />
      <div className=" flex items-center mt-5 gap-5">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Add a new task .."
          className="w-1/4"
        />
        <Button onClick={addTodoHandler}>Lets build something creative</Button>
      </div>
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Write a description"
        className="w-1/4 mt-3"
      />
    </div>
  );
}

export default App;
