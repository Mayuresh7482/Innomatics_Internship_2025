import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, toggleComplete, editTodo, deleteTodo }) => {
  return (
    <ul className="mt-4 space-y-2">
      {todos.length === 0 ? (
        <p className="text-center text-gray-500">No tasks yet! Add some tasks. 😊</p>
      ) : (
        todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} toggleComplete={toggleComplete} editTodo={editTodo} deleteTodo={deleteTodo} />
        ))
      )}
    </ul>
  );
};

export default TodoList;
