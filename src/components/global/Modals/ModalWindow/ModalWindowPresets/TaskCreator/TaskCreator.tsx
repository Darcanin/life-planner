import useTaskState from '../../../../../../pages/TasksPage/TaskState'
import { NewTaskData } from '../../../../../../types/task'
import useModalWindowState from '../../useModalWindowState'

const TaskCreator = () => {
	const close = useModalWindowState((s) => s.close)
	const addTask = useTaskState((state) => state.addTask)

	const onTaskCreated = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const form = event.currentTarget

		const title = (form.elements.namedItem('title') as HTMLInputElement)
			.value
		const description = (
			form.elements.namedItem('description') as HTMLTextAreaElement
		).value

		const newTaskData: NewTaskData = {
			title: title,
			description: description,
		}

		addTask(newTaskData)
		form.reset()
		close()
	}

	return (
		<form action='#' className='form' onSubmit={onTaskCreated}>
			<div className='form-title'>Создание задачи</div>
			<div className='field-container'>
				<input
					type='text'
					name='title'
					id='title'
					placeholder='название...'
					autoComplete='off'
				/>
			</div>
			<div className='field-container'>
				<textarea
					name='description'
					id='description'
					placeholder='описание...'
					autoComplete='off'
				/>
			</div>

			<button type='submit' className='create-task'>
				Создать задачу
			</button>
		</form>
	)
}

export default TaskCreator
