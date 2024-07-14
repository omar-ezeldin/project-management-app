interface Task {
	id: string;
	completed: boolean;
	title: string;
}

interface Project {
	id: string;
	title: string;
	description: string | null;
	date: string;
	tasks: Task[] | [];
}
