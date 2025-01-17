import useTaskState from '../../../../../pages/TasksPage/TaskState'
import Button from '../../../../simple/Button'
import useModalWindowState from '../../useModalWindowState'
import FieldInput from '../../../../form/FieldInput/FieldInput'
import FieldDateTime from '../../../../form/FieldDateTime/FieldDateTime'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import FieldTextarea from '../../../../form/FieldTextarea/FieldTextarea'

interface ITaskEditor {
	title: string
	description: string
	start_dttm: Date | null
	finish_dttm: Date | null
}

const TaskEditor = ({ taskId }: { taskId: number }) => {
	const getTaskById = useTaskState((s) => s.getTaskById)
	const startData = getTaskById(taskId)
	if (!startData) return

	console.log(startData)

	const close = useModalWindowState((s) => s.close)
	const updateTask = useTaskState((s) => s.updateTask)
	const { register, handleSubmit, setValue, reset, getValues } =
		useForm<ITaskEditor>()

	// Устанавливаем значения по умолчанию
	useEffect(() => {
		reset({
			title: startData.title,
			description: startData.description,
			start_dttm: startData.start_dttm,
			finish_dttm: startData.finish_dttm,
		})
	}, [])

	// Сохраняем изменения
	const onSubmit: SubmitHandler<ITaskEditor> = (data) => {
		const updatedTask = {
			...startData,
			title: data.title,
			description: data.description,
			start_dttm: data.start_dttm,
			finish_dttm: data.finish_dttm,
		}

		updateTask(updatedTask)
		close()
	}

	return (
		<form
			className='modal-window-form'
			onSubmit={handleSubmit(onSubmit)}
			onReset={close}
		>
			<span>Редактирование задачи</span>
			<FieldInput registerInput={register('title')} autoComplete='off' />
			<FieldTextarea
				registerTextarea={register('description')}
				autoComplete='off'
			/>
			<FieldDateTime
				defaultDatetime={getValues('start_dttm')}
				setFieldValue={(value) => setValue('start_dttm', value)}
			/>
			<FieldDateTime
				defaultDatetime={getValues('finish_dttm')}
				setFieldValue={(value) => setValue('finish_dttm', value)}
			/>
			{/*  */}
			<div className='footer'>
				<Button type='submit'>Сохранить</Button>
				<Button type='reset'>Отменить</Button>
			</div>
		</form>
	)
}

export default TaskEditor
