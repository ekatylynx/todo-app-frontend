import React, { useState, useEffect } from "react";
import './index.scss';

import { createTask } from "@/app/data/api";

import calendarIcon from '@/shared/assets/icons/icon-calendar.svg';
import folderIcon from '@/shared/assets/icons/icon-folder.svg';
import priorityIcon from '@/shared/assets/icons/icon-priority.svg';
import marksIcon from '@/shared/assets/icons/icon-marks.svg';

interface EditorTaskProps {
  close: () => void; // Указываем, что `close` — это функция без аргументов
}

const EditorTask: React.FC<EditorTaskProps> = ({ close, ...props }) => {
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [status, setStatus] = useState(''); // Добавьте начальное состояние для статуса
  const [deadlineFrom, setDeadlineFrom] = useState(null); // Срок выполнения (от)
  const [deadlineTo, setDeadlineTo] = useState(null); // Срок выполнения (до)

	const handleSubmit = async (e) => {
    e.preventDefault();

    // Неявные поля, которые нужно заполнить
    const categories = 1; // Замените на реальный ID категории
    // const author = 1; НАМ ЭТО БОЛЬШЕ НЕ НУЖНО! подставляется автоматом в бэке
    const priority = 1; // Замените на реальный приоритет

    try {
      await createTask({
        title,
        description,
        status,
        deadlineFrom,
        deadlineTo,
        categories,
        author,
        priority,
      });
      close(); // Закрываем форму после успешного создания задачи
    } catch (error) {
      console.error('Error creating task:', error);
      // Обработка ошибки, например, показ сообщения пользователю
    }
  };
	
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
  // useEffect(() => {
  //   console.log("EditorTask компонент смонтирован");
  //   return () => {
  //     console.log("EditorTask компонент размонтирован");
  //   };
  // }, []);

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
				<div className='editor-task-fields'>
					<input
						onChange={(e) => setTitle(e.target.value)}
						value={title}
						className='editor-task-field editor-task-name' 
						placeholder='Title task' />
					
					<input 
						onChange={(e) => setDescription(e.target.value)} 
						value={description}
					 	className='editor-task-field editor-task-description' 
						placeholder='Description task' />
				</div>
				
				<div className='editor-task-buttons'>
					<div className='editor-task-deadline'>
						<button className='editor-task-button button-option transition-colors'>
							<img className='icon-small' src={calendarIcon} alt="icon calendar" />
							Completion date</button>
					</div>

					<button className='editor-task-button button-option transition-colors'>
						<img className='icon-small' src={folderIcon} alt="icon folder" />
						Type</button>
					<button className='editor-task-button button-option transition-colors'>
						<img className='icon-small' src={priorityIcon} alt="icon priority" />Priority</button>
					<button className='editor-task-button button-option transition-colors'><img className='icon-small' src={marksIcon} alt="icon marks"/>Marks</button>
				</div>
				<div className='editor-task-buttons'>
					<button 
						className='editor-task-button button-task transition-colors button-negative' 
						onClick={(e) => {
							e.preventDefault();
							close();
					}}>Cancel</button>

					<button 
						className='editor-task-button button-task transition-colors'
						type='submit'
						onClick={(e) => {
							e.preventDefault();
							handleSubmit(e);
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



