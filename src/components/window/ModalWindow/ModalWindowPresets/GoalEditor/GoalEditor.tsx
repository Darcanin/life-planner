import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '../../../../simple/Button'
import FieldInput from '../../../../form/FieldInput/FieldInput'
import FieldTextarea from '../../../../form/FieldTextarea/FieldTextarea'
import FieldSelect from '../../../../form/FieldSelect/FieldSelect'

import { TbCalendarClock } from 'react-icons/tb'
import { TbCalendarCheck } from 'react-icons/tb'
import { GiConvergenceTarget } from 'react-icons/gi'

import { MdPriorityHigh } from 'react-icons/md'
import { MdManageHistory } from 'react-icons/md'

import { CgClose } from 'react-icons/cg'
import { IoIosAdd } from 'react-icons/io'

import { LuChartLine } from 'react-icons/lu'
import useGoalState from '../../../../../pages/GoalsPage/GoalState'
import { useEffect, useState } from 'react'
import useModalWindowState from '../../useModalWindowState'

import {
	GoalPriority,
	GoalComplexity,
	GoalPriorityOptions,
	GoalComplexityOptions,
} from '../../../../../types/goal'

import FieldDateTime from '../../../../form/FieldDateTime/FieldDateTime'
import useTaskState from '../../../../../pages/TasksPage/TaskState'
import { Task } from '../../../../../types/task'

export interface IGoalEditorForm {
	title: string
	description: string
	priority: GoalPriority
	complexity: GoalComplexity
	result: string | null
	reason: string | null
	start_dttm: Date | null
	finish_dttm: Date | null
	tasks: number[]
}

const GoalEditor = ({ goalId }: { goalId: number }) => {
	const getGoalById = useGoalState((state) => state.getGoalById)
	const startData = getGoalById(goalId)
	if (!startData) return

	const getTaskById = useTaskState((state) => state.getTaskById)
	const getTaskByTitle = useTaskState((state) => state.getTaskByTitle)

	const [findTasks, setFindTasks] = useState<Task[]>([])

	const close = useModalWindowState((state) => state.close)
	const updateGoal = useGoalState((state) => state.updateGoal)

	const {
		register,
		handleSubmit,
		formState,
		reset,
		setValue,
		getValues,
		watch,
	} = useForm<IGoalEditorForm>({
		mode: 'onChange',
	})

	// Устанавливаем значения по умолчанию
	useEffect(() => {
		reset({
			title: startData.title,
			description: startData.description,
			priority: startData.priority,
			complexity: startData.complexity,
			result: startData.result,
			reason: startData.reason,
			start_dttm: startData.start_dttm,
			finish_dttm: startData.finish_dttm,
			tasks: [],
		})
	}, [])

	// Сохраняем изменения
	const onSubmit: SubmitHandler<IGoalEditorForm> = (data) => {
		const updatedGoal = {
			...startData,
			title: data.title,
			description: data.description,
			priority: data.priority,
			complexity: data.complexity,
			result: data.result,
			reason: data.reason,
			start_dttm: data.start_dttm ? new Date(data.start_dttm) : null,
			finish_dttm: data.finish_dttm ? new Date(data.finish_dttm) : null,
		}

		updateGoal(updatedGoal)
		close()
	}

	const goalTaskJSX =
		watch('tasks') &&
		watch('tasks').map((taskId) => {
			const taskData = getTaskById(taskId)

			return (
				taskData && (
					<div className='task' key={taskId}>
						<header title={taskData.title}>{taskData.title}</header>
						<div className='options'>
							<Button onClick={() => removeTask(taskData)}>
								<CgClose title='Открепить задачу' size={18} />
							</Button>
						</div>
					</div>
				)
			)
		})

	const removeTask = (taskData: Task) => {
		const goalTasks = getValues('tasks')

		if (goalTasks.indexOf(taskData.id) !== -1)
			setValue(
				'tasks',
				goalTasks.filter((taskId) => taskId !== taskData.id)
			)
	}

	const searchTaskJSX = findTasks.map((task) => (
		<div className='task' key={task.id}>
			<header> {task.title} </header>
			<div className='options'>
				<Button
					title='Добавить задачу к цели'
					onClick={() => addTask(task.id)}
				>
					<IoIosAdd title='Прикрепить задачу' size={18} />
				</Button>
			</div>
		</div>
	))

	const addTask = (taskId: number) => {
		const goalTasks = getValues('tasks')

		if (goalTasks.indexOf(taskId) === -1)
			setValue('tasks', [...goalTasks, taskId])
	}

	return (
		<form className='modal-window-form' onSubmit={handleSubmit(onSubmit)}>
			<span>Редактирование цели</span>
			<FieldInput
				tooltipContent={
					<div>
						<p>
							<b>Краткое название цели</b> - едрить, ну всё
							понятно жеж!
						</p>
					</div>
				}
				type='text'
				autoComplete='off'
				registerInput={register('title', {
					required: 'Заполни, заебал!',
				})}
				placeholder='Имя цели'
				title='Заголовок цели'
				error={formState.errors.title?.message}
			/>
			<FieldTextarea
				tooltipContent={
					<div>
						<b>Описание цели</b> - детальное описание что из себя
						представляет цель.
					</div>
				}
				placeholder='Описание цели'
				autoComplete='off'
				registerTextarea={{ ...register('description') }}
				title='Описание цели'
			/>
			<FieldSelect
				tooltipContent={
					<div>
						<b>Приоритет</b> - на сколько достижение этой цели важно
					</div>
				}
				title='Приоритет'
				options={GoalPriorityOptions}
				registerSelect={{ ...register('priority') }}
				fieldIcon={<MdPriorityHigh size={20} />}
			/>
			<FieldSelect
				tooltipContent={
					<div>
						<b>Сложность</b> - на сколько достижение этой цели
						трудоёмкое
					</div>
				}
				title='Сложность'
				options={GoalComplexityOptions}
				registerSelect={{ ...register('complexity') }}
				fieldIcon={<MdManageHistory size={20} />}
			/>
			<FieldInput
				type='text'
				autoComplete='off'
				registerInput={{ ...register('reason') }}
				placeholder='Почему это тебе нужно?'
				title='Почему ты считаешь достижения этой цели необходимым для себя? (Reason)'
				fieldIcon={<LuChartLine size={20} />}
			/>
			<FieldInput
				type='text'
				autoComplete='off'
				registerInput={{ ...register('result') }}
				placeholder='Что ты обретёшь при достижении цели?'
				title='Какие навыки, умения, знания ты получишь, когда завершишь цель? (Result)'
				fieldIcon={<GiConvergenceTarget size={20} />}
			/>
			<div className='form-field-dt'>
				<FieldDateTime
					tooltipContent={
						<div>
							<p>
								<b>Дата старта</b> - дата, с которой исполнитель
								приступит к процессу работы над выполнением
								цели.
							</p>
							<br />
							<p>
								Этот параметр необходим для определения
								временного интервала, в котором исполнитель
								работал над задачей.
							</p>
						</div>
					}
					defaultDatetime={startData.start_dttm}
					setFieldValue={(value) => setValue('start_dttm', value)}
					fieldIcon={
						<TbCalendarClock title='Дата начала.' size={20} />
					}
				/>
				<FieldDateTime
					tooltipContent={
						<div>
							<p>
								<b>Дата завершения</b> - дата, к которой
								исполнитель должен завершить работы над
								выполнением цели, а цель должна быть достигнута.
							</p>
							<br />
							<p>
								Этот параметр необходим для определения
								временного интервала, в котором исполнитель
								работал над задачей.
							</p>
							<p> Дедлайн крч. </p>
						</div>
					}
					defaultDatetime={startData.finish_dttm}
					setFieldValue={(value) => setValue('finish_dttm', value)}
					fieldIcon={
						<TbCalendarCheck title='Дата окончания.' size={20} />
					}
				/>
			</div>
			{/*  */}
			<div className='goal-task-menage'>
				<div className='goal-task-container'>
					<span>Задачи цели:</span>
					<div className='goal-task-list'>{goalTaskJSX}</div>
				</div>
				<div className='search-task-container'>
					<input
						type='search'
						placeholder='Поиск задач по названию'
						onChange={(e) => {
							let findTasks1 = getTaskByTitle(e.target.value)
							setFindTasks(findTasks1)
						}}
					/>
					<div className='search-task-list'>{searchTaskJSX}</div>
				</div>
			</div>
			<div className='footer'>
				<Button type='submit'>Сохранить изменения</Button>
				<Button type='reset' onClick={close}>
					Отменить
				</Button>
			</div>
		</form>
	)
}

export default GoalEditor
