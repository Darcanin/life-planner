import GoalList from './GoalList'
import style from './GoalPage.module.sass'
import GoalTopPanel from './GoalTopPanel'

const GoalPage = () => {
	return (
		<div className={style['goal-page']}>
			<GoalTopPanel />
			<GoalList />
		</div>
	)
}

export default GoalPage
