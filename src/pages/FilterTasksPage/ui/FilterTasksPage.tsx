import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/app/store/store";
import { fetchCategories, fetchFilteredTodos } from "@/entities/category/redux/categoriesSlice";

import { TaskCard } from "@/features/task/ui/TaskCard";
import Loader from "@/shared/ui/Loader";

import './index.scss';

const FilterTasksPage: React.FC = () => {
	const { id } = useParams<{ id: string }>(); // Получаем id из URL
	const categoryId = Number(id);
  const dispatch = useDispatch<AppDispatch>();
  const { categories, filteredTodos, loading, error } = useSelector(
    (state: RootState) => state.categories
  );
	const [inputText, setInputText] = useState("")
	const timeOut = React.useRef<NodeJS.Timeout | undefined>(undefined);

	useEffect(() => {
    dispatch(fetchCategories());
    if (categoryId) {
      dispatch(fetchFilteredTodos(categoryId));
    }
  }, [dispatch, categoryId]);

  useEffect(() => {
    return () => clearTimeout(timeOut.current);
  }, []);

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeOut.current);
    timeOut.current = setTimeout(() => {
      console.log(`Save textInput value: ${e.target.value}`);
    }, 1000);
    setInputText(e.target.value);
  };

  const categoryName =
    categories.find((cat) => cat.id === categoryId)?.title || "Unknown";
  const todos = filteredTodos[categoryId] || [];

  if (loading === "pending") return <Loader />;
  if (error) return <div>{error}</div>;

	return (
		<div className='tasks-page-container'>
			{/* <div className='tasks-page'>Category ID: {id} ОТЛАДОЧНЫЙ КОД */}
			<div className='tasks-page'>
			<h2 className="title-2xl">{categoryName}</h2>
			<ul className="tasks-cards">
				{todos.map((task) => (
            <TaskCard key={task.id} todo={task} />
        ))}
				</ul>
				<input type="text" onChange={inputHandler} value={inputText} />
			</div>
		</div>
	);
}

export default FilterTasksPage;
