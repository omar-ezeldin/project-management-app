import noProjectImage from '../../assets/logo.png';

interface Props {
	onClick: () => void;
}

function NoProjects({ onClick }: Props) {
	return (
		<section className="bg-stone-100 text-stone-800 w-full flex-grow flex flex-col items-center justify-center gap-5">
			<img
				className="h-20 object-contain"
				src={noProjectImage}
				alt="Clipboard Image"
			/>
			<h1 className="text-2xl md:text-3xl font-semibold">
				No project selected
			</h1>
			<p>Select a project or create a new one</p>
			<button
				onClick={onClick}
				className="bg-stone-800 text-stone-100 px-4 py-2 rounded-md hover:bg-stone-700 transition-colors">
				Create Project
			</button>
		</section>
	);
}
export default NoProjects;
