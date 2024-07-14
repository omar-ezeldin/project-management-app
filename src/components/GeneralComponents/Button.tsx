import { ComponentProps } from 'react';

interface Props extends ComponentProps<'button'> {
	icon?: JSX.Element;
	title: string;
	color: string;
	textColor: string;
	hoverColor: string;
	width?: string;
}

function Button({
	icon,
	title,
	color,
	hoverColor,
	textColor,
	width = 'w-full',
	...props
}: Props) {
	return (
		<button
			className={`${width} flex items-center justify-center gap-3 p-3 rounded-md font-medium transition-colors ${textColor} ${color} hover:${hoverColor}`}
			{...props}>
			{icon}
			{title}
		</button>
	);
}
export default Button;
