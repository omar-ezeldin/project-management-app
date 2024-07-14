import { useRef } from 'react';
import Input from '../GeneralComponents/Input';
import Modal, { ModalHandle } from '../GeneralComponents/Modal';
import Button from '../GeneralComponents/Button';

interface Props {
	editProject: (projectId: string, newProject: Project) => void;
	onCancel: () => void;
	projects: Project[];
	activeProjectId: string;
}

function EditProject({
	editProject,
	onCancel,
	projects,
	activeProjectId,
}: Props) {
	const activeProject = projects.find(
		(project) => project.id === activeProjectId
	)!;

	const titleRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);
	const dateRef = useRef<HTMLInputElement>(null);
	const validationRef = useRef<ModalHandle>(null);

	const validate = (pattern: RegExp, str: string): boolean => {
		return pattern.test(str);
	};

	const handleClick = () => {
		if (!titleRef.current || !descriptionRef.current || !dateRef.current)
			return;

		const isTitleValid = validate(/\S/, titleRef.current.value);
		const isDateValid = validate(/.+/, dateRef.current.value);

		if (!isTitleValid || !isDateValid) {
			validationRef.current?.open();
			return;
		}

		const newProject: Project = {
			...activeProject,
			title: titleRef.current.value.trim(),
			date: dateRef.current.value,
			description: descriptionRef.current.value.trim() || null,
		};

		editProject(activeProjectId, newProject);
	};

	return (
		<section className="bg-stone-100 text-stone-800 w-full flex-grow">
			<div className="md:max-w-[60%] lg:max-w-[50%] mx-auto flex flex-col p-10 gap-8 md:gap-5">
				<h1 className="text-2xl font-semibold text-center">Edit Project</h1>
				<Input
					defaultValue={activeProject.title}
					label="Project Name"
					type="text"
					ref={titleRef}
				/>
				<Input
					defaultValue={activeProject.description || ''}
					label="Description"
					type="textarea"
					ref={descriptionRef}
					isTextarea
				/>
				<Input
					defaultValue={activeProject.date}
					label="Date"
					type="date"
					ref={dateRef}
				/>
				<div className="flex w-full gap-2 my-2 md:ml-auto md:w-[40%]">
					<Button
						title="Save"
						textColor="text-white"
						color="bg-stone-800"
						hoverColor="bg-stone-700"
						onClick={handleClick}
					/>
					<Button
						title="Cancel"
						textColor="text-stone-800"
						color="bg-stone-300"
						hoverColor="bg-stone-200"
						onClick={onCancel}
					/>
				</div>
			</div>
			<Modal
				title="Invalid Inputs"
				message="Please enter valid data in each input"
				ref={validationRef}
			/>
		</section>
	);
}
export default EditProject;
