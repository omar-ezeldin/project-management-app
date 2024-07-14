import XIcon from '../../icons/XIcon';

interface Props {
	projects: Project[];
	open: boolean;
	activeProject: string | null;
	onClose: () => void;
	onAddProject: () => void;
	onProjectClick: (project: Project) => void;
}

function Sidebar({
	projects,
	open,
	activeProject,
	onClose,
	onAddProject,
	onProjectClick,
}: Props) {
	return (
		<>
			<aside
				className={`w-full bg-stone-500 absolute h-[100vh] top-0 left-0 transition-transform duration-300 text-stone-50 p-10 overflow-auto md:w-1/2 lg:w-1/3 z-50 ${
					open ? undefined : '-translate-x-full'
				}`}>
				<div className="flex justify-between items-center">
					<h1 className="text-3xl">Projects</h1>
					<i
						onClick={onClose}
						className="cursor-pointer p-1 hover:bg-stone-600 rounded-md">
						<XIcon />
					</i>
				</div>
				<button
					onClick={onAddProject}
					className="my-10 px-4 py-2 rounded-md border-2 block mx-auto hover:bg-stone-600 transition-colors">
					Add a new project
				</button>
				<ul className="text-xl flex flex-col gap-5 p-5 ">
					{projects.map((project) => (
						<li key={project.id}>
							<button
								onClick={() => onProjectClick(project)}
								className={`w-full text-left p-1 px-3 rounded-md hover:bg-stone-600 transition-colors truncate ${
									project.id === activeProject ? 'bg-stone-600' : undefined
								}`}>
								{project.title}
							</button>
						</li>
					))}
				</ul>
			</aside>
			<div
				className={`h-full w-full absolute top-0 left-0 z-40 bg-transparent md:bg-[rgba(0,0,0,0.7)] ${
					open ? 'block' : 'hidden'
				}`}
				onClick={onClose}></div>
		</>
	);
}
export default Sidebar;
