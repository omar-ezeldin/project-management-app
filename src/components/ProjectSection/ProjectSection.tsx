import ProjectInfo from './ProjectInfo';
import TaskInputSection from '../TaskSection/TaskInputSection';
import TasksList from '../TaskSection/TasksList';

interface Props {
	projects: Project[];
	activeProjectId: string;
	deleteProject: (projectId: string) => void;
	addTask: (projectId: string, task: Task) => void;
	deleteTask: (projectId: string, taskId: string) => void;
	toggleTaskCompletion: (projectId: string, taskId: string) => void;
	openEditPage: () => void;
}

function ProjectSection({
	projects,
	activeProjectId,
	deleteProject,
	addTask,
	deleteTask,
	toggleTaskCompletion,
	openEditPage,
}: Props) {
	const activeProject = projects.find(
		(project) => project.id === activeProjectId
	)!;

	return (
		<section className="w-full flex-grow bg-stone-100 p-5">
			<div className="flex flex-col items-start gap-2 justify-between text-stone-800 mx-auto md:w-[60%] lg:w-[50%] ">
				<ProjectInfo
					project={activeProject}
					deleteProject={deleteProject}
					openEditPage={openEditPage}
				/>
				<div className="w-full">
					<TaskInputSection addTask={addTask} projectId={activeProjectId} />
					<TasksList
						project={activeProject}
						deleteTask={deleteTask}
						toggleTaskCompletion={toggleTaskCompletion}
					/>
				</div>
			</div>
		</section>
	);
}
export default ProjectSection;
