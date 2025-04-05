import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { createTodo } from "@/entities/todo/redux/todoSlice";

import calendarIcon from '@/shared/assets/icons/icon-calendar.svg';
import folderIcon from '@/shared/assets/icons/icon-folder.svg';
import priorityIcon from '@/shared/assets/icons/icon-priority.svg';
import marksIcon from '@/shared/assets/icons/icon-marks.svg';

import './index.scss';

interface EditorTaskProps {
  close: () => void; // Указываем, что `close` — это функция без аргументов
}

const EditorTask: React.FC<EditorTaskProps> = ({ close }) => {
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [status] = useState<boolean>(false); // Начальное состояние для статуса
  const [from_deadline] = useState<string | null>(null); // Срок выполнения (от)
  const [until_deadline] = useState<string | null>(null); // Срок выполнения (до)
	const [priority] = useState<string>("P3"); // Приоритет задачи
	const [categories] = useState<number[] | undefined>(undefined); // Категории

	const dispatch = useDispatch<AppDispatch>();

	const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(
        createTodo({
          title,
          description,
          status,
          from_deadline,
          until_deadline,
          priority,
					categories,
        })
      ).unwrap(); // unwrap для обработки успешного результата
      setTitle(""); // Очищаем поля после успеха
      setDescription("");
      close(); // Закрываем форму
    } catch (error) {
      console.error("Error creating task:", error);
      // Здесь можно добавить уведомление об ошибке для пользователя
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
					}}
					>Add task</button>

				</div>
			</form>
		</div>
	);
}

export default EditorTask;



