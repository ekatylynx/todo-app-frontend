import React, { useState, useEffect } from "react";
import './index.scss';

import calendarIcon from '../../../assets/icons/icon-calendar.svg';
import folderIcon from '../../../assets/icons/icon-folder.svg';
import priorityIcon from '../../../assets/icons/icon-priority.svg';
import marksIcon from '../../../assets/icons/icon-marks.svg';

interface EditorTaskProps {
  close: () => void; // Указываем, что `close` — это функция без аргументов
}

const EditorTask: React.FC<EditorTaskProps> = ({ close, ...props }) => {
	const [ title, setTitle ] = useState<string>("");
	const [ description, setDescription ] = useState<string>("");
	// const [ description, setDescription ] = useState<string>("");
	// const to = useRef();

	// Функция отправки данных
  // const send = async () => {
  //   try {
  //     const response = await fetch("http://127.0.0.1:8000/todos/create/", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ title, description }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Ошибка HTTP: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log("Задача добавлена:", data);
  //   } catch (error) {
  //     console.error("Ошибка при добавлении задачи:", error);
  //   }
  // };

	// Эффект для примера
  useEffect(() => {
    console.log("EditorTask компонент смонтирован");
    return () => {
      console.log("EditorTask компонент размонтирован");
    };
  }, []);

	// useEffect(() => {
	// 	console.log("!!!");
	// }, []);

	// useEffect(() => {
	//   clearTimeout(to.current);

	//   to.current = setTimeout(() => {
	//     // console.log(title);
	//     send();
	//   }, 3000);
	// }, [title]);

	return (
		<div className={'manager-tasks'}>
			<form className='editor-tasks'>
				<div className='editor-task-fields' >
					<input onChange={(e) => {
						setTitle(e.target.value)
					}} value={title} 
						className='editor-task-field editor-task-name' placeholder='Название задачи' />
					
					<input onChange={(e) => {
						setDescription(e.target.value)
					}} value={description}
					 className='editor-task-field editor-task-description' placeholder='Описание' />
				</div>
				
				<div className='editor-task-buttons'>
					<div className='editor-task-deadline'>
						<button className='editor-task-button button-option transition-colors'>
							<img className='icon-small' src={calendarIcon} alt="icon calendar" />
							Срок выполнения</button>
					</div>

					<button className='editor-task-button button-option transition-colors'>
						<img className='icon-small' src={folderIcon} alt="icon folder" />
						Тип</button>
					<button className='editor-task-button button-option transition-colors'>
						<img className='icon-small' src={priorityIcon} alt="icon priority" />Приоритет</button>
					<button className='editor-task-button button-option transition-colors'><img className='icon-small' src={marksIcon} alt="icon marks"/>Метки</button>
				</div>
				<div className='editor-task-buttons'>
					<button className='editor-task-button button-task transition-colors button-negative' onClick={(e) => {
							e.preventDefault();
							close();
					}}>Cancel</button>

					<button className='editor-task-button button-task transition-colors' onClick={(e) => {
							e.preventDefault();
							send();
					}}>Add task</button>

				</div>
			</form>
		</div>
	);
}

	// const send = () => {
	// 	fetch('http://127.0.0.1:8000/todos/', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Accept': 'application/json',
	// 			'Content-Type': 'application/json'
	// 		},
	// 		body: JSON.stringify({title})
	// 	})
	// 	.then((res) => res.json())
	// 	.then((data) => {
	// 		console.log("PASSED", data);
	// 	})
	// 	.catch(console.error);
	// };

export default EditorTask;



