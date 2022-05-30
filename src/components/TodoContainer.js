import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./TodoList";
import Header from "./Header";
import InputTodo from "./InputTodo";

class TodoContainer extends Component {
	state = {
		todos: [
			/* 	{
				id: uuidv4(),
				title: "Setup development environment",
				completed: true,
			},
			{
				id: uuidv4(),
				title: "Develop website and add content",
				completed: false,
			},
			{
				id: uuidv4(),
				title: "Deploy to live server",
				completed: false,
			}, */
		],
	};

	//Fetch Todos
	/* 	componentDidMount() {
		fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
			.then((res) => res.json())
			.then((data) => this.setState({ todos: data }));
	} */

	//LocalStorage
	componentDidUpdate(prevProps, prevState) {
		if (prevState.todos !== this.state.todos) {
			const temp = JSON.stringify(this.state.todos);
			localStorage.setItem("todos", temp);
		}
	}

	componentDidMount() {
		const temp = localStorage.getItem("todos");
		const loadedTodos = JSON.parse(temp);
		if (loadedTodos) {
			this.setState({
				todos: loadedTodos,
			});
		}
	}

	handleChange = (id) => {
		this.setState((prevState) => ({
			todos: prevState.todos.map((todo) => {
				if (todo.id === id) {
					return {
						...todo,
						completed: !todo.completed,
					};
				}
				return todo;
			}),
		}));
	};

	deleteTodo = (id) => {
		this.setState({
			todos: [
				...this.state.todos.filter((todo) => {
					return todo.id !== id;
				}),
			],
		});
	};

	addTodoItem = (title) => {
		const newTodo = {
			id: uuidv4(),
			title: title,
			completed: false,
		};
		console.log(newTodo);
		this.setState({
			todos: [...this.state.todos, newTodo],
		});
	};

	setUpdate = (updatedTitle, id) => {
		this.setState({
			todos: this.state.todos.map((todo) => {
				if (todo.id === id) {
					todo.title = updatedTitle;
				}
				return todo;
			}),
		});
	};

	render() {
		return (
			<div className="container">
				<div className="inner">
					<Header />
					<InputTodo addTodoProps={this.addTodoItem} />
					<TodoList
						todos={this.state.todos}
						handleChangeProps={this.handleChange}
						deleteTodoProps={this.deleteTodo}
						setUpdate={this.setUpdate}
					/>
				</div>
			</div>
		);
	}
}

export default TodoContainer;
