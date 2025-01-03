import useGoalState from './GoalState'
import GoalCard from './GoalCard'
import style from './GoalPage.module.sass'

const GoalList = () => {
	const goals = useGoalState((state) => state.goals)

	return (
		<div className={style['goal-list']}>
			{goals.map((goal) => (
				<GoalCard key={goal.id} goal={goal} />
			))}
		</div>
	)
}

export default GoalList
