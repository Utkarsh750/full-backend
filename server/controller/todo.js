import { Todo } from "../models/todo.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(403).json({
        message: "All fields are required",
        success: false,
      });
    }

    const todo = new Todo({ title, description });
    todo.save();

    return res.status(200).json({
      success: true,
      message: "Todo created",
      todo,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const todo = await Todo.find();

    return res.status(200).json({
      success: true,
      todo,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const { title } = req.body;

    const todo = await Todo.findByIdAndUpdate(todoId, { title }, { new: true });
    todo.save();
    return res.status(200).json({
      success: true,
      todo,
      message: "Todo Updated",
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    await Todo.findByIdAndDelete(todoId);

    return res.status(200).json({
      success: true,
      message: "Todo delete successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
