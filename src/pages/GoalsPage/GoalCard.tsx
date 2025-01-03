import Button from '../../components/simple/Button'
import { Goal } from '../../types/goal'
import style from './GoalPage.module.sass'

import { MdDeleteOutline } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'
import useModalWindowState from '../../components/global/Modals/ModalWindow/useModalWindowState'
import GoalEditorForm from '../../components/global/Modals/ModalWindow/ModalWindowPresets/GoalEditorForm/GoalEditorForm'
import useGoalState from './GoalState'

const GoalCard = ({ goal }: { goal: Goal }) => {
	const { id, title, priority, complexity } = goal
	const open = useModalWindowState((state) => state.open)
	const deleteGoal = useGoalState((state) => state.deleteGoal)

	const onGoalEdit = () => {
		open({
			content: <GoalEditorForm goalId={id} />,
			modalWindowOptions: [],
		})
	}

	return (
		<div className={style['goal-card']}>
			<div className={style['header']}>
				<h3>{title}</h3>
				<div className={style['goal-options']}>
					<Button className={style['goal-edit']} onClick={onGoalEdit}>
						<FaRegEdit size={20} />
					</Button>
					<Button
						className={style['goal-delete']}
						onClick={() => {
							deleteGoal(goal.id)
						}}
					>
						<MdDeleteOutline size={20} />
					</Button>
				</div>
			</div>
			<div className={style['content']}>
				<div className={style['parameters']}>
					<div className={style['content-parameter']}>
						<span className={style['parameter-name']}>
							Приоритет:
						</span>
						<span className={style['parameter-value']}>
							{priority ?? '<не задано>'}
						</span>
					</div>
					<div className={style['content-parameter']}>
						<span className={style['parameter-name']}>
							Сложность:
						</span>
						<span className={style['parameter-value']}>
							{complexity ?? '<не задано>'}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default GoalCard
