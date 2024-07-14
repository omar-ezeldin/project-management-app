import { useRef } from 'react';
import Button from '../GeneralComponents/Button';
import Input from '../GeneralComponents/Input';
import Modal, { ModalHandle } from '../GeneralComponents/Modal';
import { v4 } from 'uuid';

interface Props {
	addTask: (projectId: string, task: Task) => void;
	projectId: string;
}

function TaskInputSection({ projectId, addTask }: Props) {
	const taskRef = useRef<HTMLInputElement>(null);
	const validationRef = useRef<ModalHandle>(null);

	const validate = (pattern: RegExp, str: string): boolean => {
		return pattern.test(str);
	};

	const handleAddTask = () => {
		if (!taskRef.current) return;
		const isTaskValid = validate(/\S/, taskRef.current.value);
		if (!isTaskValid) {
			validationRef.current?.open();
			return;
		}
		const newTask: Task = {
			id: v4(),
			title: taskRef.current.value.trim(),
			completed: false,
		};
		addTask(projectId, newTask);
		taskRef.current.value = '';
	};
	return (
		<>
			<h1 className="text-xl font-semibold mt-3">Projects Tasks:</h1>
			<div className="flex justify-between gap-3 h-10 my-5">
				<Input placeholder="Task Title" ref={taskRef} type="text" />
				<Button
					title="Add"
					color="bg-green-500"
					hoverColor="bg-green-400"
					textColor="text-white"
					width="w-[25%]"
					onClick={handleAddTask}
				/>
			</div>
			<Modal
				title="Invalid Input"
				message="Please enter valid data in the tasks input"
				ref={validationRef}
			/>
		</>
	);
}
export default TaskInputSection;
