import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Home = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [todos, setTodos] = useState([]);

  console.log(todos, "todos");

  const addTodoHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/todo",
        { title, description },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        setTodos([...todos, res.data.todo]);
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/todo", {
          withCredentials: true,
        });

        if (res.data.success) {
          setTodos(res.data.todo || []);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchTodo();
  }, []);
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

      <div className=" grid grid-cols-4 gap-5 mt-5">
        {todos.map((todo) => (
          <Card key={todo._id} className=" bg-gray-800 text-white">
            <CardHeader>
              <CardTitle>{todo.title}</CardTitle>
              <CardDescription>{todo.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
