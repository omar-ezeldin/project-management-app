import { useState } from 'react';
import ChevronDownIcon from '../../icons/ChevronDownIcon';
import ChevronRightIcon from '../../icons/ChevronRightIcon';
import Task from './Task';

interface Props {
	project: Project;
	deleteTask: (projectId: string, taskId: string) => void;
	toggleTaskCompletion: (projectId: string, taskId: string) => void;
}

function TasksList({ project, deleteTask, toggleTaskCompletion }: Props) {
	const [isCompletedTasksExpanded, setIsCompletedTasksExpanded] =
		useState<boolean>(false);

	return (
		<div>
			<ul className="flex flex-col gap-2 my-2">
				{project.tasks.map(
					(task) =>
						!task.completed && (
							<Task
								key={task.id}
								deleteTask={deleteTask}
								projectId={project.id}
								toggle={toggleTaskCompletion}
								task={task}
							/>
						)
				)}
			</ul>
			<h3
				onClick={() => setIsCompletedTasksExpanded((prev) => !prev)}
				className="font-semibold p-3 flex gap-2 justify-start items-center cursor-pointer">
				Completed{' '}
				{isCompletedTasksExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
			</h3>
			<ul
				className={`flex-col gap-2 my-2 ${
					isCompletedTasksExpanded ? 'flex' : ' hidden'
				}`}>
				{project.tasks.filter(({ completed }) => completed === true).length ===
				0 ? (
					<p className="p-3 bg-stone-200 rounded-md">No Completed Tasks</p>
				) : (
					project.tasks.map(
						(task) =>
							task.completed && (
								<Task
									key={task.id}
									deleteTask={deleteTask}
									projectId={project.id}
									toggle={toggleTaskCompletion}
									task={task}
								/>
							)
					)
				)}
			</ul>
		</div>
	);
}
export default TasksList;
