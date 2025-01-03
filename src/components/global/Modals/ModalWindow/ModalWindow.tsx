import useModalWindowState from './useModalWindowState'
import './ModalWindow.sass'

const ModalWindow = () => {
	const history = useModalWindowState((s) => s.history)
	const currentIndex = useModalWindowState((s) => s.currentIndex)
	const content =
		currentIndex !== -1 ? history[currentIndex].content : undefined
	const close = useModalWindowState((s) => s.close)

	const stopDefaultPropagation = (
		event: React.MouseEvent<HTMLDivElement>
	) => {
		event.stopPropagation()
	}

	return (
		<div
			className={'modal-window ' + (currentIndex !== -1 ? 'open' : ' ')}
			onMouseDown={close}
		>
			<div
				className={'modal-window-content'}
				onMouseDown={stopDefaultPropagation}
			>
				{content}
			</div>
		</div>
	)
}

export default ModalWindow
