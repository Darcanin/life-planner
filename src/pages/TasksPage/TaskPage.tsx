import TaskHeader from './TaskHeader'
import TaskList from './TaskList'
import style from './TaskPage.module.sass'

const TaskPage = () => {
	return (
		<div className={style['task-page']}>
			<TaskHeader />
			<TaskList />
		</div>
	)
}

export default TaskPage
