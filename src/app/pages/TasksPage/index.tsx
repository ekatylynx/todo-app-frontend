import React, { useState } from "react";
import './index.scss';
import EditorTask from '../../components/EditorTask';
import Button from '../../components/Button';
import { Checkbox } from "@/components/ui/checkbox";


interface Task {
  id: number;
  title: string;
	status: boolean;
}

const TasksPage: React.FC = () => {
	const [ tasks, setTasks ] = useState<Task[]>([]);
	const [ open, setOpened ] = useState<boolean>(false);

	const getTasks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/todos/", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data: Task[] = await response.json(); // Указание ожидаемого типа данных
      setTasks(data);
			console.log(data)
    } catch (error) {
      console.error("Ошибка при получении задач:", error);
    }
  };

	return (
		<div className='tasks-page-container'>
			<div className='tasks-page'>
				<h2 className='title-2'>All tasks</h2>
				
				{!open ? (<Button
					text={'Add task'}
					icon={'/src/assets/icons/icon-add-el-black.svg'}
					textColor={'black'}
					textWeight={'normal'}		
					classNameAdd={'btn-add-todo'}
					iconMedium
					style={{backgroundColor: 'var(--glob-color-accent-gray)', border: '1px solid var(--glob-color-accent-gray)'}}
					onClick={(e) => {
						e.preventDefault();
						setOpened(true);
					}}
					/>) : (<EditorTask close={() => setOpened(false)} />)}
					
					{/* {bool ? () : ()} */}
				
				{/* Список todo тасок */}
				<ul className="task-list">
					{tasks.map((task) => {
						return (
							<li className="task-item" key={task.id}>
								<Checkbox
									className="checkbox-meow"
									checked={task.status}
                  onCheckedChange={(checked) => {
										console.log(`Id ${task.id} check ${checked}`)
									}}
								/>
								{task.title}
							</li>
						);
					})}
				</ul>

				<button className='editor-task-button' onClick={(e) => {
					e.preventDefault();
					getTasks();
				}}>get all tasks</button>
				
			</div>
		</div>
	);
}

export default TasksPage;
