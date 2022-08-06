import { object } from "prop-types";
import React, { useState, useEffect } from "react";
import { AddTarea } from "./addTarea.jsx";

const Home = () => {
	const [input, setInput] = useState("");
	const [lista, setLista] = useState([]);
	const [loading, setLoading] = useState();

	// petición de la API
	useEffect(()=>{
		const getInput = async () => {
			setLoading(true);
			try { 
				await fetch ('http://assets.breatheco.de/apis/fake/todos/user/natigalsan')
					.then ((response) => response.json())
					.then ((data) => setLista(data));
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		getInput();
	}, []);

	// este fetch sincronizará las tareas con el servidor cada vez que la lista varíe:
	const putInput = async (lista) => {
		try {
			await fetch ('http://assets.breatheco.de/apis/fake/todos/user/natigalsan', {
				method: 'PUT',
				body: JSON.stringify(lista),
				headers: {
					"Content-Type": "application/json",
				},
			})
		} catch (error) {
			console.log(error);
		}
	};

	// llama a la función putInput solo cuando la lista no esté vacía: 
	useEffect(()=>{
		if (lista.length >0) {
			putInput(lista);
		}
	}, [lista]);

	// delete todas las tareas:
	const deleteAllInput = async () => {
		setLista([]);
		try {
			fetch ('http://assets.breatheco.de/apis/fake/todos/user/natigalsan', {
				method: 'PUT',
				body: JSON.stringify([lista]),
				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	// creo una función para que me guarde las tareas: 
	const handleInput = (e) => {
		if (e.key === "Enter") {
			if (input !== "") {
				setLista([...lista, {label: input, done: false}]);
				setInput("");
			} else {
				alert ("Introduzca su tarea");
			}
		}
	};


	// función para eliminar una tarea:
	const deleteInput = (indexToDelete) => {
		setLista(
			lista.filter((input, inputIndex) => inputIndex !== indexToDelete)
		);
	};


	

	return (
		<div className="container" id="hoja_de_tareas" style = {{width: "500px", border: "5px double #4242ff", minHeight: "300px", marginTop: "30px", padding: "20px", background: "#d5d5ff"}}>
			<div className="header" id="header">
				<div className="row">
					<h1 className="d-flex justify-content-center" id="titulo" style = {{color: "#4242ff"}}>
						Lista de Tareas
					</h1>
				</div>
				<div className="row">
					<div className="col-7">
						<input
							className="d-flex justify-content-center"
							style = {{border: "1px solid #4242ff" }}
							id="Entrada"
							type="text"
							onChange={(e) => setInput(e.target.value)}
							value={input}
							placeholder="Please, write something." //capturo el elemtno en el input
							onKeyDown={handleInput}
						/>
						{/* <button 
						onClick={()=>{
							setLista([...lista, {label: tarea, done: false}])
						}}
						></button> */}
						{lista?.map((object, index)=> {
							return <div key = {index}>{object.label}</div>
						})}
					</div>
					<div className="col-5">
						<button
							className="button btn-light d-flex justify-content-left"
							style = {{background: "#ffdd75"}}
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