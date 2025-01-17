import { SubmitHandler, useForm } from 'react-hook-form'
import useTaskState from '../../../../../pages/TasksPage/TaskState'
import { NewTaskData } from '../../../../../types/task'
import useModalWindowState from '../../useModalWindowState'
import FieldInput from '../../../../form/FieldInput/FieldInput'
import FieldTextarea from '../../../../form/FieldTextarea/FieldTextarea'
import Button from '../../../../simple/Button'
import { MdModeEdit, MdOutlineSubtitles } from 'react-icons/md'

interface ITaskCreator {
	title: string
	description: string
}

const TaskCreator = () => {
	const close = useModalWindowState((s) => s.close)
	const addTask = useTaskState((state) => state.addTask)

	const { register, handleSubmit, formState } = useForm<ITaskCreator>({
		mode: 'onChange',
	})

	const onSubmit: SubmitHandler<ITaskCreator> = (data) => {
		const newTask: NewTaskData = {
			title: data.title,
			description: data.description,
		}

		addTask(newTask)
		close()
	}

	return (
		<form className='modal-window-form' onSubmit={handleSubmit(onSubmit)}>
			<span>Создание задачи</span>
			<FieldInput
				registerInput={register('title', {
					required: 'Заполни, заебал!',
				})}
				placeholder='Название задачи...'
				autoComplete='off'
				error={formState.errors.title?.message}
				fieldIcon={<MdModeEdit size={20} />}
			/>
			<FieldTextarea
				registerTextarea={register('description')}
				placeholder='Описание задачи...'
				autoComplete='off'
				fieldIcon={<MdOutlineSubtitles size={20} />}
			/>

			<div className='footer'>
				<Button type='submit'>Создать задачу</Button>
				<Button type='reset' onClick={close}>
					Отмена
				</Button>
			</div>
		</form>
	)
}

export default TaskCreator
