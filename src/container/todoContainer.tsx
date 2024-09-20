"use client";
import React, { useState } from "react";
import { FaTrash, FaEdit, FaCalendarAlt } from "react-icons/fa"; // Added edit icon

const TodoContainer = () => {
  const [inputValue, setInputValue] = useState(""); // To handle the input field value
  const [todos, setTodos] = useState<any>([]); // To handle the list of todos
  const [selectedTodos, setSelectedTodos] = useState<any>([]); // To track selected todos for deletion
  const [isEditing, setIsEditing] = useState<number | null>(null); // Track the ID of the todo being edited
  const [editValue, setEditValue] = useState(""); // To handle the edited value

  const handleAddTodo = async () => {
    if (inputValue.trim()) {
      const newTodo = { id: Date.now(), content: inputValue };
      setTodos([newTodo, ...todos]);
      setInputValue("");

      try {
        const response = await fetch('http://localhost:3000/api/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              mutation CreateToDo($input: ToDoInput!) {
                createToDo(input: $input) {
                  title
                }
              }
            `,
            variables: {
              input: {
                title: newTodo.content,
              },
            },
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Created todo:', data.data.createToDo);
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const handleDeleteSelectedTodos = () => {
    const updatedTodos = todos.filter((todo) => !selectedTodos.includes(todo.id));
    setTodos(updatedTodos);
    setSelectedTodos([]);
  };

  const handleSelectTodo = (id: any) => {
    if (selectedTodos.includes(id)) {
      setSelectedTodos(selectedTodos.filter((selectedId) => selectedId !== id));
    } else if (selectedTodos.length === todos.length - 1) {
      setSelectedTodos(todos.map((todo: any) => todo.id));
    } else {
      setSelectedTodos([...selectedTodos, id]);
    }
  };

  // const handleSelectAll = () => {
  //   if (selectedTodos.length === todos.length) {
  //     setSelectedTodos([]);
  //   } else {
  //     setSelectedTodos(todos.map((todo: any) => todo.id));
  //   }
  // };

  const handleEditTodo = (todo: any) => {
    setIsEditing(todo.id);
    setEditValue(todo.content); // Set the current value to be edited
  };

  const handleSaveEdit = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, content: editValue } : todo
    );
    setTodos(updatedTodos);
    setIsEditing(null);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f3f4f6",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          width: "900px",
          height: "550px",
          position: "relative",
        }}
      >
        <h1 style={{ fontWeight: "bold", fontSize: "48px", color: "#007BFF", textAlign: "center", marginBottom: "20px" }}>
          Todo-s
        </h1>

        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add new .."
            style={{
              width: "100%",
              height: "40px",
              padding: "10px",
              fontSize: "16px",
              backgroundColor: "#f3f4f6",
              border: "2px solid #e2e8f0",
              borderRadius: "5px",
              marginRight: "10px",
            }}
          />
          <button
            onClick={handleAddTodo}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            Add
          </button>
        </div>

        <ul style={{ padding: 0, maxHeight: "300px", overflowY: "auto" }}>
          {todos.map((todo, index) => (
            <li
              key={todo.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                listStyleType: "none",
                width: "100%",
              }}
            >
              <input
                type="checkbox"
                checked={selectedTodos.includes(todo.id)}
                onChange={() => handleSelectTodo(todo.id)}
                style={{ marginRight: "10px" }}
              />
              {isEditing === todo.id ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  style={{ flexGrow: 1, marginRight: "10px" }}
                />
              ) : (
                <span style={{ fontSize: "18px", width: "100%" }}>{todo.content}</span>
              )}

              {isEditing === todo.id ? (
                <button
                  onClick={() => handleSaveEdit(todo.id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    marginRight: "10px",
                    cursor: "pointer",
                  }}
                >
                  Save
                </button>
              ) : (
                <FaEdit
                  onClick={() => handleEditTodo(todo)}
                  style={{ marginLeft: "10px", cursor: "pointer", color: "#007BFF" }}
                />
              )}
            </li>
          ))}
        </ul>

        {selectedTodos.length > 0 && (
          <button
            onClick={handleDeleteSelectedTodos}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              position: "absolute",
              bottom: "20px",
              right: "30px",
            }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoContainer;
