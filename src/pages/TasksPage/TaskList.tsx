import TaskCard from './TaskCard'
import useTaskState from './TaskState'

const TaskList = () => {
	const tasks = useTaskState((state) => state.tasks)

	return (
		<div className='flex flex-col gap-4'>
			{tasks.map((task) => (
				<TaskCard key={task.id} task={task} />
			))}
		</div>
	)
}

export default TaskList
