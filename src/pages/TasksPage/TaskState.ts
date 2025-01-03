import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { NewTaskData, Task } from '../../types/task'

interface TaskState {
	tasks: Task[]
	addTask: (task: NewTaskData) => void
	updateTask: (task: Task) => void
	deleteTask: (taskId: number) => void
	getTaskById: (id: number) => Task | null
	getTaskByTitle: (str: string) => Task[]
	correctTaskDates: () => void
}

const useTaskState = create<TaskState>()(
	devtools(
		persist<TaskState>(
			(set, get) => ({
				tasks: [],
				addTask: (task) =>
					set((state) => {
						const newTask: Task = {
							id: new Date().getTime(),
							title: task.title,
							description: task.description,
							priority: null,
							complexity: null,
							spent_time: null,
							created_dttm: new Date(),
							edit_dttm: new Date(),
							start_dttm: null,
							finish_dttm: null,
							close_dttm: null,
						}

						return {
							...state,
							tasks: [...state.tasks, newTask],
						}
					}),
				updateTask: (task) =>
					set((state) => ({
						...state,
						tasks: state.tasks.map((t) =>
							t.id === task.id ? task : t
						),
					})),
				deleteTask: (taskId) =>
					set((state) => ({
						...state,
						tasks: state.tasks.filter((task) => task.id !== taskId),
					})),
				getTaskById: (id) => {
					const task = get().tasks.find((task) => task.id === id)
					return task || null
				},
				getTaskByTitle: (str) => {
					const tasks = get().tasks.filter(
						(task) =>
							task.title
								.toLowerCase()
								.indexOf(str.toLowerCase()) !== -1
					)
					return tasks
				},
				correctTaskDates: () =>
					set((state) => ({
						...state,
						tasks: state.tasks.map((t) => ({
							...t,
							created_dttm: t.created_dttm
								? new Date(t.created_dttm)
								: new Date(),
							edit_dttm: new Date(t.edit_dttm),
							start_dttm: t.start_dttm
								? new Date(t.start_dttm)
								: null,
							finish_dttm: t.finish_dttm
								? new Date(t.finish_dttm)
								: null,
							close_dttm: t.close_dttm
								? new Date(t.close_dttm)
								: null,
						})),
					})),
			}),
			{
				name: 'tasks-storage',
			}
		)
	)
)

export default useTaskState
