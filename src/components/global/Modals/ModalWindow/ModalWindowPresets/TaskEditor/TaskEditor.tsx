import { useState } from 'react'
import style from './TaskEditor.module.sass'
import useTaskState from '../../../../../../pages/TasksPage/TaskState'
import { Task } from '../../../../../../types/task'
import Button from '../../../../../simple/Button'
import useModalWindowState from '../../useModalWindowState'
import DateTimePicker from '../../../../../form/DateTimePicker/DateTimePicker'

interface TaskEditorProps {
	taskId: number
}

const TaskEditor = ({ taskId }: TaskEditorProps) => {
	const close = useModalWindowState((s) => s.close)
	const updateTask = useTaskState((s) => s.updateTask)
	const getTaskById = useTaskState((s) => s.getTaskById)
	const [formState, setFormState] = useState<Task | null>(() => {
		return getTaskById(taskId)
	})

	const onUpdateTask = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!formState) return

		const updatedTask = formState
		updatedTask.edit_dttm = new Date()

		updateTask(formState)
		close()
	}

	const updetaTimeToLocalTimeZone = (date: Date) => {
		const inputDate = new Date(date)
		const offsetTime = new Date(
			inputDate.getTime() - inputDate.getTimezoneOffset() * 60 * 1000
		)

		return offsetTime.toISOString().slice(0, 16)
	}

	const updateFormData = (name: keyof Task, value: Date | string | null) => {
		setFormState((prevState) => {
			if (!prevState) {
				console.error('formState is null. Cannot update.')
				return null
			}

			return {
				...prevState,
				[name]: value,
			}
		})
	}

	if (!formState) return <> Задача не найдена </>
	else
		return (
			<form
				className={'form ' + style['form']}
				onSubmit={onUpdateTask}
				onReset={close}
				id='task-editor'
			>
				<div className='form-title'>Редактирование задачи</div>
				<div className={style['editable-fields']}>
					<div className='field-container'>
						<label htmlFor='title'> Название задачи </label>
						<input
							type='text'
							name='title'
							id='title'
							autoComplete='off'
							value={formState.title}
							onChange={(e) =>
								setFormState((prevState) => {
									if (!prevState) return null

									return {
										...prevState,
										title: e.target.value,
									}
								})
							}
						/>
					</div>
					<div className='field-container'>
						<label htmlFor='description'> Описание задачи </label>
						<textarea
							name='description'
							id='description'
							autoComplete='off'
							value={formState.description}
							onChange={(e) =>
								setFormState((prevState) => {
									if (!prevState) return null

									return {
										...prevState,
										description: e.target.value,
									}
								})
							}
						/>
					</div>
					<DateTimePicker
						label='Дата старта:'
						dateID='start_dt'
						timeID='start_tm'
						defaultDatetime={
							formState.start_dttm
								? formState.start_dttm
								: undefined
						}
						onChange={(value) =>
							updateFormData('start_dttm', value)
						}
					/>
					<DateTimePicker
						label='Дата окончания:'
						dateID='finish_dt'
						timeID='finish_tm'
						defaultDatetime={
							formState.finish_dttm
								? formState.finish_dttm
								: undefined
						}
						onChange={(value) =>
							updateFormData('finish_dttm', value)
						}
					/>
				</div>
				<div className={style['not-editable-fields']}>
					<div className={style['field-viewer']}>
						<label htmlFor='id'> Индентификатор </label>
						<input
							type='number'
							name='id'
							id='id'
							autoComplete='off'
							value={formState.id}
							readOnly
							disabled
						/>
					</div>
					<div className={style['field-viewer']}>
						<label htmlFor='created_dttm'>
							Дата создания задачи
						</label>
						<input
							type='datetime-local'
							name='created_dttm'
							id='created_dttm'
							autoComplete='off'
							value={
								formState
									? updetaTimeToLocalTimeZone(
											formState.created_dttm
									  )
									: ''
							}
							readOnly
							disabled
						/>
					</div>
				</div>
				<div className={style['task-editor-options']}>
					<Button form='task-editor' type='submit'>
						Сохранить
					</Button>
					<Button form='task-editor' type='reset'>
						Отменить
					</Button>
				</div>
			</form>
		)
}

export default TaskEditor
