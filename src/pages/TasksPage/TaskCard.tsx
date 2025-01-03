import Button from '../../components/simple/Button'
import { Task } from '../../types/task'
import useTaskState from './TaskState'
import style from './TaskPage.module.sass'

import { MdDeleteForever } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import useModalWindowState from '../../components/global/Modals/ModalWindow/useModalWindowState'
import TaskEditor from '../../components/global/Modals/ModalWindow/ModalWindowPresets/TaskEditor/TaskEditor'

import { MdAddTask } from 'react-icons/md'
import { GrCompliance } from 'react-icons/gr'

interface TaskCardProps {
	task: Task
}

const TaskCard = ({ task }: TaskCardProps) => {
	const open = useModalWindowState((s) => s.open)
	const deleteTask = useTaskState((state) => state.deleteTask)
	const updateTask = useTaskState((state) => state.updateTask)

	const toggleTaskCompletion = () => {
		updateTask({
			...task,
			close_dttm: task.close_dttm ? null : new Date(),
		})
	}

	const onChangeTask = () => {
		open({
			content: <TaskEditor taskId={task.id} />,
			modalWindowOptions: [],
		})
	}

	const onDeleteTask = () => {
		deleteTask(task.id)
	}

	return (
		<>
			{
				<div className={style['task-card']}>
					<div className={style['card-main-info']}>
						<div className={style['first-part']}>
							<Button
								onClickEvent={toggleTaskCompletion}
								className={style['task-completion-button']}
								title='Закрыть задачу'
							>
								{task.close_dttm ? '✅' : '💩'}
							</Button>
							<div
								className={style['task-edit-form']}
								title='Вызывайте дурку!'
							>
								☎
							</div>
						</div>
						<div className={style['second-part']}>
							<div className={style['card-title']}>
								{task.title}
							</div>
							<div className={style['card-date-space']}>
								{task.created_dttm.toLocaleDateString() +
									' ' +
									task.created_dttm.toLocaleTimeString()}
							</div>
						</div>
					</div>
					<div className={style['card-meta-data']}>
						<div className={style['md-parameters-wrapper']}>
							<div
								className={style['md-parameter']}
								title='Дата планируемого завершения задачи'
							>
								<MdAddTask size={14} color='a5ff51' />
								{task.finish_dttm
									? new Date(
											task.finish_dttm
									  ).toLocaleDateString() +
									  ' ' +
									  new Date(
											task.finish_dttm
									  ).toLocaleTimeString()
									: 'Не указано'}
							</div>
							<div
								className={style['md-parameter']}
								title='Дата создания задачи'
							>
								<GrCompliance size={14} color='ffc851' />
								{new Date(
									task.created_dttm
								).toLocaleDateString() +
									' ' +
									new Date(
										task.created_dttm
									).toLocaleTimeString()}
							</div>
						</div>
						<div className={style['card-options']}>
							<Button onClickEvent={onChangeTask}>
								<FiEdit size={23} color='ffc851' />
							</Button>
							<Button onClickEvent={onDeleteTask}>
								<MdDeleteForever size={26} color='ff7c51' />
							</Button>
						</div>
					</div>
				</div>
			}
		</>
	)
}

export default TaskCard
