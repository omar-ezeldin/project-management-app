import { useState } from 'react';
import Header from './components/Navigation/Header';
import NoProjects from './components/NoProject/NoProjects';
import AddProject from './components/AddProject/AddProject';
import ProjectSection from './components/ProjectSection/ProjectSection';
import Sidebar from './components/Navigation/Sidebar';
import EditProject from './components/EditProject/EditProject';

type ActivePage =
	| 'noProjectPage'
	| 'projectPage'
	| 'addProjectPage'
	| 'editPage';

function App() {
	// UI and Navigation States
	const [activePage, setActivePage] = useState<ActivePage>('noProjectPage');
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

	// Project Logic State
	const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
	const [projects, setProjects] = useState<Project[] | []>(
		JSON.parse(localStorage.getItem('projects') || '[]')
	);

	const addProject = (newProject: Project): void => {
		setProjects((prev) => {
			const newProjects = [...prev, newProject];
			localStorage.setItem('projects', JSON.stringify(newProjects));
			return [...newProjects];
		});
		setActiveProjectId(newProject.id);
		setActivePage('projectPage');
	};

	const deleteProject = (projectId: string) => {
		setProjects((prev) => {
			const newProjects = prev.filter((project) => project.id !== projectId);
			localStorage.setItem('projects', JSON.stringify(newProjects));
			return [...newProjects];
		});
		setActiveProjectId(null);
		setActivePage('noProjectPage');
	};

	const editProject = (projectId: string, newProject: Project) => {
		setProjects((prev) => {
			const newProjects = prev.map((project) => {
				if (project.id !== projectId) {
					return project;
				} else {
					return newProject;
				}
			});
			localStorage.setItem('projects', JSON.stringify(newProjects));
			return [...newProjects];
		});
		setActivePage('projectPage');
	};

	const addTask = (projectId: string, task: Task) => {
		setProjects((prev) => {
			const newProjects = prev.map((project) => {
				if (project.id !== projectId) return project;
				const newTasks = [task, ...project.tasks];
				return {
					...project,
					tasks: newTasks,
				};
			});
			localStorage.setItem('projects', JSON.stringify(newProjects));
			return [...newProjects];
		});
	};

	const toggleTaskCompletion = (projectId: string, taskId: string) => {
		setProjects((prev) => {
			const newProjects = prev.map((project) => {
				if (project.id !== projectId) return project;
				const newTasks = project.tasks.map((task) => {
					if (task.id !== taskId) return task;
					return {
						...task,
						completed: !task.completed,
					};
				});
				return {
					...project,
					tasks: newTasks,
				};
			});
			localStorage.setItem('projects', JSON.stringify(newProjects));
			return [...newProjects];
		});
	};

	const deleteTask = (projectId: string, taskId: string) => {
		setProjects((prev) => {
			const newProjects = prev.map((project) => {
				if (project.id !== projectId) return project;
				const newTasks = project.tasks.filter((task) => task.id !== taskId);
				return {
					...project,
					tasks: newTasks,
				};
			});
			localStorage.setItem('projects', JSON.stringify(newProjects));
			return [...newProjects];
		});
	};

	const handleSidebarClick = (project: Project) => {
		setActiveProjectId(project.id);
		setActivePage('projectPage');
		setIsSidebarOpen(false);
	};

	return (
		<main className="flex flex-col h-screen">
			<Header
				isSidbarOpen={isSidebarOpen}
				openSidebar={() => setIsSidebarOpen(true)}
				closeSidebar={() => setIsSidebarOpen(false)}
			/>
			<Sidebar
				open={isSidebarOpen}
				onProjectClick={handleSidebarClick}
				onClose={() => setIsSidebarOpen(false)}
				activeProject={activeProjectId}
				projects={projects}
				onAddProject={() => {
					setActivePage('addProjectPage');
					setIsSidebarOpen(false);
				}}
			/>
			{activePage === 'noProjectPage' && (
				<NoProjects onClick={() => setActivePage('addProjectPage')} />
			)}
			{activePage === 'addProjectPage' && (
				<AddProject
					onSubmit={addProject}
					onCancel={() => setActivePage('noProjectPage')}
				/>
			)}
			{activePage === 'projectPage' && activeProjectId && (
				<ProjectSection
					projects={projects}
					activeProjectId={activeProjectId}
					deleteProject={deleteProject}
					addTask={addTask}
					deleteTask={deleteTask}
					toggleTaskCompletion={toggleTaskCompletion}
					openEditPage={() => setActivePage('editPage')}
				/>
			)}
			{activePage === 'editPage' && activeProjectId && (
				<EditProject
					editProject={editProject}
					onCancel={() => setActivePage('noProjectPage')}
					projects={projects}
					activeProjectId={activeProjectId}
				/>
			)}
		</main>
	);
}

export default App;
