import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams } from 'react-router-dom';
import './index.scss';

import { allFilteredCategories, allCategoriesUser } from "@/entities/category/api";

import { Categories } from "@/entities/category/model";

const FilterTasksPage: React.FC = () => {
	const [filterCategory, setFilterCategory] = useState<Categories[]>([]);
	const [categoryName, setCategoryName] = useState("");
	const { id } = useParams<{ id: string }>(); // Получаем id из URL
	const [inputText, setInputText] = useState("")
	const timeOut = React.useRef<number | undefined>(undefined);

	useEffect(() => {

		Promise.all([
			allCategoriesUser(),
			allFilteredCategories(Number(id))	
		])
			.then(([categories, tasks]) => {
				if (categories) {
					const categoryName = categories.filter((item) => item.id === Number(id))[0]?.title || "Unknown";
					setCategoryName(categoryName);
					// console.log(`Название шестой категори: ${categoryName}`, categories);
				}

				if (tasks) {
					setFilterCategory(tasks);
				}
			})
			.catch((err) => {
				console.error("DATA ERROR", err)
			});
		}, [id]);


		useEffect(() => {
			return () => clearTimeout(timeOut.current);
		}, []);

		const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
			clearTimeout(timeOut.current);
			
			timeOut.current = setTimeout(() => {
				console.log(`Save textInput value: ${e.target.value}`)
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
