import BarsIcon from '../../icons/BarsIcon';

interface Props {
	isSidbarOpen: boolean;
	openSidebar: () => void;
	closeSidebar: () => void;
}

function Header({ isSidbarOpen, openSidebar, closeSidebar }: Props) {
	return (
		<header className="bg-stone-100 text-stone-800 border-b-2 border-b-stone-800">
			<div className="w-full p-5 flex items-center justify-between mx-auto">
				<i
					onClick={isSidbarOpen ? closeSidebar : openSidebar}
					className="cursor-pointer p-1 hover:bg-stone-300 rounded-md transition-colors">
					<BarsIcon />
				</i>
				<h1 className="font-semibold md:text-xl">Project Management App</h1>
				<div className="hidden md:block"></div>
			</div>
		</header>
	);
}
export default Header;
