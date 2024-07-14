import { useRef } from 'react';
import CheckIcon from '../../icons/CheckIcon';
import Modal, { ModalHandle } from '../GeneralComponents/Modal';
import UndoIcon from '../../icons/UndoIcon';

interface Props {
	task: Task;
	projectId: string;
	deleteTask: (projectId: string, taskId: string) => void;
	toggle: (projectId: string, taskId: string) => void;
}

function Task({ task, deleteTask, projectId, toggle }: Props) {
	const taskDetailsRef = useRef<ModalHandle>(null);
	return (
		<>
			<li className="flex items-center justify-between bg-stone-200 text-stone-800 p-3 rounded-md">
				<p
					onClick={() => taskDetailsRef.current?.open()}
					className={`${
						task.completed ? 'line-through' : undefined
					} truncate w-full`}>
					{task.title}
				</p>
				<i
					onClick={() => toggle(projectId, task.id)}
					className="cursor-pointer block hover:bg-stone-300 rounded-md p-1">
					{task.completed ? <UndoIcon /> : <CheckIcon />}
				</i>
			</li>
			<Modal
				title="Task Details"
				message={task.title}
				ref={taskDetailsRef}
				actionButtonText="Delete"
				action={() => deleteTask(projectId, task.id)}
			/>
		</>
	);
}
export default Task;
