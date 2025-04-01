import React, { useState } from "react";
import './index.scss';

import { createTask } from "@/entities/todo/api";

import calendarIcon from '@/shared/assets/icons/icon-calendar.svg';
import folderIcon from '@/shared/assets/icons/icon-folder.svg';
import priorityIcon from '@/shared/assets/icons/icon-priority.svg';
import marksIcon from '@/shared/assets/icons/icon-marks.svg';

interface EditorTaskProps {
  close: () => void; // Указываем, что `close` — это функция без аргументов
	author?: number;
}

const EditorTask: React.FC<EditorTaskProps> = ({ close, author }) => {
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [status] = useState(''); // Добавьте начальное состояние для статуса
  const [deadlineFrom] = useState(null); // Срок выполнения (от)
  const [deadlineTo] = useState(null); // Срок выполнения (до)

	const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Неявные поля, которые нужно заполнить
    const categories = 1; // Замените на реальный ID категории
    // const author = 1; НАМ ЭТО БОЛЬШЕ НЕ НУЖНО! подставляется автоматом в бэке
    const priority = 1; // Замените на реальный приоритет

		if (!author) {
      console.error('Author is required');
      return;
    }

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

export default EditorTask;



