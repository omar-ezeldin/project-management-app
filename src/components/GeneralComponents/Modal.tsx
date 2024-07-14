import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

type Props =
	| {
			title: string;
			message: string;
			actionButtonText: string;
			action: () => void;
	  }
	| {
			title: string;
			message: string;
			actionButtonText?: undefined;
			action?: undefined;
	  };

export interface ModalHandle {
	open: () => void;
}

const Modal = forwardRef<ModalHandle, Props>(function Modal(
	{ title, message, actionButtonText, action },
	ref
) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const submitRef = useRef<HTMLButtonElement>(null);

	useImperativeHandle(ref, () => ({
		open: () => dialogRef.current?.showModal(),
	}));

	return createPortal(
		<dialog
			ref={dialogRef}
			className="w-96 rounded-xl bg-stone-50 border-2 border-stone-800 text-stone-800 shadow-xl m-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop:bg-[rgba(0,0,0,0.7)] animate-fade">
			<div className="h-full w-full p-5 flex flex-col">
				<h1 className="text-xl font-semibold mb-3">{title}</h1>
				<p className="break-words">{message}</p>
				<div className="mt-10 flex justify-end gap-3">
					<button
						onClick={() => submitRef.current?.click()}
						className="py-2 px-4 rounded-md bg-stone-200  text-stone-800 hover:text-stone-700 hover:bg-stone-300 transition-colors">
						Cancel
					</button>
					{actionButtonText && (
						<button
							className="py-2 px-4 rounded-md text-stone-100 bg-stone-800 hover:bg-stone-700 transition-colors"
							onClick={() => {
								action();
								submitRef.current?.click();
							}}>
							{actionButtonText}
						</button>
					)}
				</div>
			</div>
			<form method="dialog" className="hidden">
				<button ref={submitRef}></button>
			</form>
		</dialog>,
		document.getElementById('modal')!
	);
});

export default Modal;
