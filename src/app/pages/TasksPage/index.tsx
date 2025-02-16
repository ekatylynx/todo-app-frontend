import React, { useState, useEffect } from "react";

import './index.scss';
import EditorTask from '../../components/EditorTask';
import Button from '../../components/Button';
import { Checkbox } from "@/components/ui/checkbox"

import { allTodos } from "@/app/data/api";


interface Task {
	id: number;
	title: string;
	status: boolean;
}

const TasksPage: React.FC = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [open, setOpened] = useState<boolean>(false);

	const [todos, setTodos] = useState([]);
	const getTodos = () => allTodos().then(setTodos);
	useEffect(() => {
		getTodos()
			.catch(() => {
				getTodos();
			});
	}, []);

	const formatter = new Intl.DateTimeFormat('en', {
		weekday: 'short',
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: false,
	});

	return (
		<div className='tasks-page-container'>
			<div className='tasks-page'>
				<h2 className='title-2'>All tasks</h2>
				<div>
					<ul className="tasks-cards">
					{todos.map(({ id, title, created_at_moscow, status }) => {
						const taskDate = new Date(created_at_moscow);
						return (
							<li key={id} className='tasks-card'>
								<div>
									<Checkbox
									className="checkbox-meow"
									checked={todos.status}
									onCheckedChange={(checked) => {
										console.log(`Id ${todos.id} check ${checked}`)
									}}/>
								</div>
								<div className="tasks-card-info">
									<h3 className="tasks-card-title">{title}</h3>
									<span className="tasks-card-time">{formatter.format(taskDate)}</span>
								</div>
								
							</li>
						);
					})}
					</ul>
				</div>

				{!open ? (<Button
					text={'Add task'}
					icon={'/src/assets/icons/icon-add-el-black.svg'}
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
				
				{/* Отладочный код */}
				{/* <button className='editor-task-button' onClick={(e) => {
					e.preventDefault();
					getTasks();
				}}>get all tasks</button> */}

			</div>
		</div>
	);
}

export default TasksPage;
