import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./TodoList";
import Header from "./Header";
import InputTodo from "./InputTodo";
import { Routes, Route } from "react-router-dom";

const TodoContainer = () => {
	//const [todos, setTodos] = useState([]);
	const [todos, setTodos] = useState(getInitialTodos());

	//LocalStorage --- Storing todos items
	useEffect(() => {
		const temp = JSON.stringify(todos);
		localStorage.setItem("todos", temp);
	}, [todos]);

	//LocalStorage --- Getting stored items
	function getInitialTodos() {
		const temp = localStorage.getItem("todos");
		const savedTodos = JSON.parse(temp);
		return savedTodos || [];
	}

	const handleChange = (id) => {
		setTodos((prevState) => {
			prevState.map((todo) => {
				if (todo.id === id) {
					return {
						...todo,
						completed: !todo.completed,
					};
				}
				return todo;
			});
		});
	};

	const deleteTodo = (id) => {
		setTodos([...todos.filter((todo) => todo.id !== id)]);
	};

	const addTodoItem = (title) => {
		const newTodo = {
			id: uuidv4(),
			title: title,
			completed: false,
		};
		setTodos([...todos, newTodo]);
	};

	const setUpdate = (updatedTitle, id) => {
		setTodos(
			todos.map((todo) => {
				if (todo.id === id) {
					todo.title = updatedTitle;
				}
				return todo;
			})
		);
	};

	return (
		<div className="container">
			<div className="inner">
				<Header />
				<InputTodo addTodoProps={addTodoItem} />
				<TodoList
					todos={todos}
					handleChangeProps={handleChange}
					deleteTodoProps={deleteTodo}
					setUpdate={setUpdate}
				/>
			</div>
		</div>
	);
};

export default TodoContainer;
