import { IoAddCircleOutline } from 'react-icons/io5'
import useModalWindowState from '../../components/global/Modals/ModalWindow/useModalWindowState'
import Button from '../../components/simple/Button'
import TaskCreator from '../../components/global/Modals/ModalWindow/ModalWindowPresets/TaskCreator/TaskCreator'

import style from './TaskPage.module.sass'

const TaskHeader = () => {
	const open = useModalWindowState((s) => s.open)

	const hendleOpenTaskCreator = () => {
		open({
			content: <TaskCreator />,
			modalWindowOptions: [],
		})
	}

	return (
		<div className={style['task-header']}>
			<Button
				className='green-button-m'
				onClickEvent={hendleOpenTaskCreator}
				text='Создать'
			>
				<IoAddCircleOutline size={19} />
			</Button>
		</div>
	)
}

export default TaskHeader
