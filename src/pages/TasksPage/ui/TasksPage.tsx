import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import './index.scss';
import EditorTask from '@/app/components/EditorTask';
import Button from '@/shared/ui/Button';
import IconAddElement from '@/shared/assets/icons/icon-add-el-black.svg';
import { TaskCard } from "@/features/task/ui/TaskCard";
import Loader from "@/shared/ui/Loader";

import { RootState, AppDispatch } from "@/app/store/store";
import { fetchTodos } from "@/entities/todo/redux/todoSlice";

const TasksPage: React.FC = () => {
	// TODO: 
	// - [ ] Разобраться с ошибками в компоненте и добавить типы
	// - [ ] Вынести в отдельный файл типы которые часто повторяются (типы entity сущностей (todo/category и т.д.))
	// - [ ] Перенести и переписать все компоненты согласно FSD

	const [open, setOpened] = useState<boolean>(false);
	const dispatch = useDispatch<AppDispatch>();
	const { todos, loading, error } = useSelector((state: RootState) => state.todos);

	useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

	if (loading === "pending") return <Loader />;
  if (error) return <div className="error-message">{error}</div>;

	return (
		<div className='tasks-page-container'>
			<div className='tasks-page'>
				<h2 className='title-2'>All tasks</h2>
				<ul className="tasks-cards">
					{todos.map((todo) => (
						<TaskCard
							key={todo.id}
							todo={todo}
						/>
					))}
				</ul>

				{!open ? (<Button
					text={'Add task'}
					width={'full'}
					icon={IconAddElement}
					textColor={'black'}
					textWeight={'normal'}
					classNameAdd={'btn-add-todo'}
					iconMedium
					style={{ 
						backgroundColor: 'var(--glob-color-accent-gray)', 
						border: '1px solid var(--glob-color-accent-gray)' }}
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
