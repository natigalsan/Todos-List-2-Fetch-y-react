import React, { useEffect, useState } from "react";

export const AddTarea = ({ Tareas, setLista }) => {

	let url = ("http://assets.breatheco.de/apis/fake/todos/user/natigalsan")
	let options = {
		method: 'GET', 
		// or POST
		headers: {'Content-Type': aplication:J ""}
	}
    // const [tasks, setTasks] = useState ("")
    // const [task0List, setTaskList] = useState([]);
    // const [loading, setLoading] = useState();

	// // Petición de la API:
	// useEffect(()=>{
		

	// },[]);


	return (
		<>
			<div className="row">
				{Tareas.map((e, i) => {
					// denominado un callback (módulo 17)
					return (
						<>
							<div className="row taskList">
								<div className="col-5" key={i}>
									{e}
								</div>
                                {/*-------------- BUTTON DE ELIMINAR TAREA---------------- */}
								<div className="col-3">
									<button
										onClick={function () {
											let re = Tareas.filter(
												(valor, index) => {
													console.log(i, index);
													return index != i;
												}
											);
											setLista(re);
										}}>
										<i className="far fa-trash-alt"></i>
									</button>
								</div>
							</div>
						</>
					); //i es la posición de mi elemento e. --> key es la puerta que hace que inicie una nueva posición.
				})}
			</div>
		</>
	);
};
//me retorna un elemento cada vez k escribo en el input