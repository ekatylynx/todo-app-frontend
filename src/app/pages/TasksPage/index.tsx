import React, { useState, useEffect, Suspense } from "react";

import './index.scss';
import EditorTask from '@/app/components/EditorTask';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import { Checkbox } from "@/shared/components/ui/checkbox"
import IconAddElement from '@/shared/assets/icons/icon-add-el-black.svg';


import { allTodos, updateStatusTodo } from "@/app/data/api";

interface Task {
	id: number;
	title: string;
	status: boolean;
	description?: string;
	created_at_moscow: string;
}

const TasksPage: React.FC = () => {
	// TODO: 
	// - [ ] Разобраться с ошибками в компоненте и добавить типы
	// - [ ] Вынести в отдельный файл типы которые часто повторяются (типы entity сущностей (todo/category и т.д.))
	// - [ ] Перенести и переписать все компоненты согласно FSD

	const [open, setOpened] = useState<boolean>(false);
	const [todos, setTodos] = useState<Task[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		allTodos().then((data) => {
			if (data && Array.isArray(data)) {
				setIsLoading(true);
				// console.log("DATA COMPLETE")
				setTodos(data);
				console.log(data)
				// setStatusTodo(data.status)
			// } else {
				// console.log("NO DATA")
			}
	 	})
		.catch((err) => {
			setError("Failed to load tasks");
      console.error("Error fetching todos:", err);
		})
		.finally(() => {
			setIsLoading(false);
		})
	}, []);

  const formatDate = (dateString: string) => {
    const formatter = new Intl.DateTimeFormat('en', {
      weekday: 'short',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });
    return formatter.format(new Date(dateString));
  };

	// Обработка изменения статуса
  const handleStatusChange = async (id: number, newStatus: boolean) => {
    try {
      // Оптимистичное обновление UI
      setTodos((prevTodos) => {
        prevTodos.map((todo) => {
          return todo.id === id ? { ...todo, status: newStatus } : todo;
				})
			});


      // Отправка на сервер
      await updateStatusTodo(id, newStatus);
      
    } catch (err) {
      // Откат изменений при ошибке
      setTodos((prevTodos) => {
        prevTodos.map((todo) => {
          return todo.id === id ? { ...todo, status: !newStatus } : todo;
			})
		});
      setError("Failed to update task status");
      console.error("Error updating status:", err);
    }
  };

  if (isLoading) return <div className="loading-indicator">Loading tasks...</div>;
  if (error) return <div className="error-message">{error}</div>;

	return (
		<div className='tasks-page-container'>
			<div className='tasks-page'>
				<h2 className='title-2'>All tasks</h2>
					<div>
						<ul className="tasks-cards">
						{todos.map(({ id, title, description, created_at_moscow, status }) => {
							// const taskDate = new Date(created_at_moscow);
							return (
								<li key={id} className='tasks-card'>
									<div>
										<Checkbox
										className="checkbox-meow"
										checked={status}
										onCheckedChange={(checked) => {
											// console.log(checked.value)
											handleStatusChange(id, checked);
										}}/>
									</div>
									<div className="tasks-card-info">
										<Input isChangeInput={true} className="tasks-card-title" defaultValue={title} onChange={(e) => e.target.value} />
										<span className="tasks-card-descrip">{description}</span>
										<span className="tasks-card-time">{formatDate(created_at_moscow)}</span>
									</div>
								</li>
							);
						})}
						</ul>
					</div>
				
				{!open ? (<Button
					text={'Add task'}
					icon={IconAddElement}
					textColor={'black'}
					textWeight={'normal'}
					classNameAdd={'btn-add-todo'}
					iconMedium
					style={{ backgroundColor: 'var(--glob-color-accent-gray)', border: '1px solid var(--glob-color-accent-gray)' }}
					onClick={(e) => {
						e.preventDefault();
						setOpened(true);
					}}
				/>) : (<EditorTask close={() => setOpened(false)} />)}

				{/* {bool ? () : ()} */}
			</div>
		</div>
	);
}

export default TasksPage;
