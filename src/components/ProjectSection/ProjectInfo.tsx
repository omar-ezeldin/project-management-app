import { useRef } from 'react';
import Modal, { ModalHandle } from '../GeneralComponents/Modal';
import ProjectDescription from './ProjectDescription';
import Button from '../GeneralComponents/Button';
import EditIcon from '../../icons/EditIcon';
import TrashIcon from '../../icons/TrashIcon';

interface Props {
	project: Project;
	deleteProject: (projectId: string) => void;
	openEditPage: () => void;
}

function ProjectInfo({ project, deleteProject, openEditPage }: Props) {
	const titleViewRef = useRef<ModalHandle>(null);
	const deleteRef = useRef<ModalHandle>(null);

	const formatDate = (dateStr: string): string => {
		const date = new Date(dateStr);
		const options: Intl.DateTimeFormatOptions = {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		};
		return date.toLocaleDateString('en-US', options);
	};
	return (
		<div className="w-full flex flex-col gap-3 md:flex-row md:items-end">
			<div className="w-full md:w-[70%]">
				<div className="w-full flex items-center justify-between mb-1">
					<h1
						onClick={() => titleViewRef.current?.open()}
						className="text-2xl font-bold truncate w-[70%]">
						{project.title}
					</h1>
					<p className="text-stone-600 text-sm">{formatDate(project.date)}</p>
				</div>

				<ProjectDescription description={project.description} />
			</div>

			<menu className="w-full flex gap-3 border-b-2 border-b-stone-800 pb-2 md:border-none md:flex-col md:pb-0 md:w-[30%]">
				<Button
					title="Edit"
					icon={<EditIcon />}
					color="bg-stone-500"
					hoverColor="bg-stone-600"
					textColor="text-white"
					onClick={openEditPage}
				/>
				<Button
					title="Delete"
					icon={<TrashIcon />}
					color="bg-red-500"
					hoverColor="bg-red-600"
					textColor="text-white"
					onClick={() => deleteRef.current?.open()}
				/>
			</menu>
			<Modal title="Title" message={project.title} ref={titleViewRef} />
			<Modal
				title="Deletion Confirmation"
				message="Are you sure you want to delete this project?"
				ref={deleteRef}
				actionButtonText="Delete"
				action={() => deleteProject(project.id)}
			/>
		</div>
	);
}
export default ProjectInfo;
