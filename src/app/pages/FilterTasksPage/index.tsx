import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import './index.scss';
import { Checkbox } from "@/components/ui/checkbox"
import { allTodos, allFilteredCategories, allCategoriesUser } from "@/app/data/api";

interface Task {
	id: number;
	title: string;
	status: boolean;
}

const FilterTasksPage: React.FC = () => {
	const [filterCategory, setFilterCategory] = useState([]);
	const [categoryName, setCategoryName] = useState("");
	const { id } = useParams<{ id: number }>(); // Получаем id из URL

	useEffect(() => {

		Promise.all([
			allCategoriesUser(),
			allFilteredCategories(id)	
		])
			.then(([categories, tasks]) => {
				if (categories) {
					const categoryName = categories.filter((item) => item.id === Number(id))[0]?.title || "Unknown";
					setCategoryName(categoryName);
					console.log(`Название шестой категори: ${categoryName}`, categories);
				}

				if (tasks) {
					setFilterCategory(tasks);
				}
			})
			.catch((err) => {
				console.error("DATA ERROR", err)
			});
		}, [id]);

		const [inputText, setInputText] = useState("")
		const timeOut = React.useRef();

		useEffect(() => {
			return () => clearTimeout(timeOut.current);
		}, []);

		const inputHandler = (e) => {
			clearTimeout(timeOut.current);
			
			timeOut.current = setTimeout(() => {
				console.log(`Save textInput value: ${inputText}`)
			}, 1000);

			setInputText(e.target.value);
		};

	return (
		<div className='tasks-page-container'>
			{/* <div className='tasks-page'>Category ID: {id} ОТЛАДОЧНЫЙ КОД */}
			<div className='tasks-page'>
			<h2 className="title-2xl">{categoryName}</h2>
				{filterCategory.map(({id, title}) => {
          return (
            <div key={id}>
              <p>{title}</p>
            </div>
          )
        })}
				<input type="text" onChange={inputHandler} value={inputText} />
			</div>
		</div>
	);
}

export default FilterTasksPage;
