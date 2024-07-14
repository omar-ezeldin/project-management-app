import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	isTextarea?: boolean;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	isTextarea?: boolean;
}

type Props = InputProps | TextareaProps;

const baseClasses =
	'rounded-md flex-grow bg-stone-200 p-3 border-2 border-stone-800 w-full';

export default forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
	function Input({ label, isTextarea = false, ...props }, ref) {
		return (
			<div className="flex flex-col w-full">
				{label && (
					<label className="text-sm uppercase font-semibold ml-2">
						{label}
					</label>
				)}
				{isTextarea ? (
					<textarea
						className={`${baseClasses} h-32 resize-none`}
						ref={ref as React.Ref<HTMLTextAreaElement>}
						{...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
					/>
				) : (
					<input
						className={`${baseClasses} h-10`}
						ref={ref as React.Ref<HTMLInputElement>}
						{...(props as InputHTMLAttributes<HTMLInputElement>)}
					/>
				)}
			</div>
		);
	}
);
