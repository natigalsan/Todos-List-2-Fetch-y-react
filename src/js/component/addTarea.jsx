import React, { useEffect } from "react";

export const AddTarea = ({ Tareas, setLista }) => {
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