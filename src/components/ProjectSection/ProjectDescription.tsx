import { useEffect, useRef, useState } from 'react';

interface Props {
	description: Project['description'];
}

function ProjectDescription({ description }: Props) {
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const [showToggle, setShowToggle] = useState<boolean>(false);
	const descriptionRef = useRef<HTMLParagraphElement>(null);

	const maxLines = 4;

	useEffect(() => {
		if (!descriptionRef.current) return;
		const descriptionHeight = descriptionRef.current.scrollHeight;
		const lineHeight = parseInt(
			getComputedStyle(descriptionRef.current).lineHeight,
			10
		);
		const lines = descriptionHeight / lineHeight;

		if (lines > maxLines) {
			setShowToggle(true);
		} else {
			setShowToggle(false);
		}
	}, [description]);

	const toggleDescription = () => {
		setIsExpanded((prev) => !prev);
	};

	return (
		<div className="w-full flex flex-col justify-between bg-stone-200 rounded-md p-3 gap-3">
			<p
				ref={descriptionRef}
				className={`whitespace-pre-wrap text-pretty break-words ${
					!description ? 'italic text-stone-500' : undefined
				} ${!isExpanded ? 'line-clamp-4' : undefined}`}>
				{description || 'No description'}
			</p>
			{showToggle && (
				<p
					onClick={toggleDescription}
					className="italic text-sm cursor-pointer hover:underline text-stone-500">
					{isExpanded ? 'Show Less' : 'Show More'}
				</p>
			)}
		</div>
	);
}
export default ProjectDescription;
