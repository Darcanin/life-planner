import GoalCreator from '../../components/window/ModalWindow/ModalWindowPresets/GoalCreator/GoalCreator'
import useModalWindowState from '../../components/window/ModalWindow/useModalWindowState'
import Button from '../../components/simple/Button'
import style from './GoalPage.module.sass'

const GoalTopPanel = () => {
	const open = useModalWindowState((s) => s.open)

	const onCreateGoal = () => {
		open({ content: <GoalCreator />, modalWindowOptions: [] })
	}

	return (
		<div className={style['goal-top-panel']}>
			<Button className='green-button-m' onClick={onCreateGoal}>
				{' '}
				Создать{' '}
			</Button>
		</div>
	)
}

export default GoalTopPanel
