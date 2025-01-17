import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { invoke } from '@tauri-apps/api/core'
import { NewTaskData, Task } from '../../types/task'

interface TaskState {
	tasks: Task[]
	addTask: (task: NewTaskData) => void
	updateTask: (task: Task) => void
	deleteTask: (taskId: number) => void
	getTaskById: (id: number) => Task | null
	getTaskByTitle: (str: string) => Task[]
	correctTaskDates: () => void
	fetchTasks: () => void
	sortTasks: (field: keyof Task, order: 'asc' | 'desc') => void
}

const parseTaskDates = (task: Task): Task => ({
	...task,
	created_dttm: new Date(task.created_dttm),
	edit_dttm: new Date(task.edit_dttm),
	start_dttm: task.start_dttm ? new Date(task.start_dttm) : null,
	finish_dttm: task.finish_dttm ? new Date(task.finish_dttm) : null,
	close_dttm: task.close_dttm ? new Date(task.close_dttm) : null,
})

const useTaskState = create<TaskState>()(
	devtools((set, get) => ({
		tasks: [],
		addTask: async (task) => {
			const newTask: Omit<Task, 'id'> = {
				...task,
				created_dttm: new Date(),
				edit_dttm: new Date(),
				start_dttm: null,
				finish_dttm: null,
				close_dttm: null,
				priority: null,
				complexity: null,
				spent_time: null,
			}
			await invoke('add_task', { newTask })
			get().fetchTasks()
		},
		updateTask: async (task) => {
			await invoke('update_task', { task })
			get().fetchTasks()
		},
		deleteTask: async (taskId) => {
			await invoke('delete_task', { taskId })
			get().fetchTasks()
		},
		getTaskById: (id) => {
			const task = get().tasks.find((task) => task.id === id)
			return task ? parseTaskDates(task) : null
		},
		getTaskByTitle: (str) => {
			const tasks = get().tasks.filter(
				(task) =>
					task.title.toLowerCase().indexOf(str.toLowerCase()) !== -1
			)
			return tasks.map(parseTaskDates)
		},
		correctTaskDates: () => {
			get().fetchTasks()
			set((state) => ({
				...state,
				tasks: state.tasks.map(parseTaskDates),
			}))
		},
		fetchTasks: async () => {
			const tasks = await invoke<Task[]>('get_tasks')
			set({ tasks: tasks.map(parseTaskDates) })
		},
		sortTasks: (field, order) => {
			const sortedTasks = [...get().tasks].sort((a, b) => {
				if (a[field] == null) return order === 'asc' ? -1 : 1
				if (b[field] == null) return order === 'asc' ? 1 : -1
				if (a[field] < b[field]) return order === 'asc' ? -1 : 1
				if (a[field] > b[field]) return order === 'asc' ? 1 : -1
				return 0
			})
			set({ tasks: sortedTasks })
		},
	}))
)

export default useTaskState
