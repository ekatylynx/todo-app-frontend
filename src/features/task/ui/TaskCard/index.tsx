import React from "react";
import Input from "@/shared/ui/Input";

import "./index.scss";

import { Checkbox } from "@/shared/components/ui/checkbox";
import { Todo } from "@/entities/todo/model";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { updateTodoStatus } from "@/entities/todo/redux/todoSlice";

interface TaskCardProps {
  todo: Todo;
}

export const TaskCard: React.FC<TaskCardProps> = ({ todo }) => {
  const dispatch = useDispatch<AppDispatch>();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date"; // Или другое значение по умолчанию
    }
    const formatter = new Intl.DateTimeFormat("en", {
      weekday: "short",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
    return formatter.format(date);
  };

  const handleStatusChange = (checked: boolean | "indeterminate") => {
    if (checked === "indeterminate") {
      console.warn("Indeterminate state is not handled.");
      return;
    }
    dispatch(updateTodoStatus({ id: todo.id, status: checked === true }));
  };

  return (
    <li className="tasks-card">
      <div>
        <Checkbox
          className="checkbox-meow"
          checked={todo.status}
          onCheckedChange={handleStatusChange}
        />
      </div>
      <div className="tasks-card-info">
        <Input
          isChangeInput={true}
          className="tasks-card-title"
          defaultValue={todo.title}
          onChange={(e) => e.target.value} // Пока оставляем заглушку
        />
        <span className="tasks-card-descrip">{todo.description}</span>
        <span className="tasks-card-time">{formatDate(todo.created_at)}</span>
      </div>
    </li>
  );
};