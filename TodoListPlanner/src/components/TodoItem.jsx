import React, { useState } from "react";

const TodoItem = ({ todo, toggleComplete, editTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    editTodo(todo.id, newText);
    setIsEditing(false);
  };

  return (
    <li className="flex items-center justify-between bg-gray-100 p-3 rounded-md shadow-sm hover:bg-gray-200 transition-all duration-200">
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="flex-1 p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <span
          onClick={() => toggleComplete(todo.id)}
          className={`flex-1 cursor-pointer transition-all duration-300 ${
            todo.completed ? "line-through text-gray-500" : "text-gray-800"
          }`}
        >
          {todo.text}
        </span>
      )}

      {isEditing ? (
        <button onClick={handleEdit} className="ml-2 text-green-500 hover:text-green-600 transition-all duration-300">
          ✔
        </button>
      ) : (
        <button onClick={() => setIsEditing(true)} className="ml-2 text-blue-500 hover:text-blue-600 transition-all duration-300">
          ✏
        </button>
      )}

      <button onClick={() => deleteTodo(todo.id)} className="ml-2 text-red-500 hover:text-red-600 transition-all duration-300">
        ❌
      </button>
    </li>
  );
};

export default TodoItem;
