import { object } from "prop-types";
import React, { useState, useEffect } from "react";
import { AddTarea } from "./addTarea.jsx";

const Home = () => {
	const [input, setInput] = useState("");
	const [lista, setLista] = useState([]);

	function conseguirDatos() {
		var requestOptions = {
			method: 'GET', 
			redirect: 'follow'
		}
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/natigalsan",
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => setLista(result))
			.catch((error) => console.log("error", error));
	}

	useEffect((setLista) => {
		conseguirDatos(setLista);
	}, []);

	return (
		<div className="container" id="hoja_de_tareas">
			<div className="header" id="header">
				<div className="row">
					<h1 className="d-flex justify-content-center" id="titulo">
						Lista de Tareas
					</h1>
				</div>
				<div className="row">
					<div className="col-7">
						<input
							className="d-flex justify-content-center"
							id="Entrada"
							type="text"
							onChange={(e) => setInput(e.target.value)}
							value={input}
							placeholder="Please, write something." //capturo el elemtno en el input
						/>
						<button 
						onClick={()=>{
							setLista([...lista, {label: tarea, done: false}])
						}}
						></button>
						{lista?.map((object, index)=> {
							return <li key = {index}>{object.label}</li>
						})}
					</div>
					<div className="col-5">
						<button
							className="button btn-light d-flex justify-content-left"
							onClick={() => {
								setLista([...lista, input]); // almacena las nuevas tareas acumulando las anteriores en consola
							}}>
							Add
						</button>
					</div>
				</div>
			</div>

			<div className="taskList">
				<AddTarea Tareas={lista} setLista={setLista} />
			</div>
		</div>
	);
};

export default Home;

// const AddTarea = input.map((AgregarTarea, i) => {
// 	return (
// 		<div className="addTarea">
// 			{AgregarTarea}
// 			<button className="eliminar">
// 				<i className="far fa-trash-alt"></i>
// 			</button>
// 		</div>
// 	);
// });