import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

const InputTodo = (props) => {
	const [inputText, setInputText] = useState({
		title: "",
	});

	/* const onChange = (e) => {
		setInputText((prevState) => {
			return {
				...prevState,
				[e.target.name]: e.target.value,
			};
		});
	}; */

	const onChange = (e) => {
		setInputText({
			...inputText,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (inputText.title.trim()) {
			props.addTodoProps(inputText.title);
			setInputText({
				title: "",
			});
		} else {
			alert("Please write item");
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="form-container">
				<input
					type="text"
					className="input-text"
					placeholder="Add todo"
					value={inputText.title}
					name="title"
					onChange={onChange}
				/>
				{/* <input
					type="text"
					className="input-text"
					placeholder="Add last name"
					value={inputText.lastName}
					name="lastName"
					onChange={onChange}
				/>
				<input
					type="text"
					className="input-text"
					placeholder="Add email"
					value={inputText.email}
					name="email"
					onChange={onChange}
				/> */}
				<button className="input-submit">
					<FaPlusCircle color="darkcyan" size="20px" />
				</button>
			</form>
		</>
	);
};

export default InputTodo;
