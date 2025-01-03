import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface GoalTaskList {
	taskId: number
	goalId: number
	order?: number
}

interface useGoalTaskFormat {
	links: GoalTaskList[]
	addLink: (taskId: number, goalId: number, order?: number) => void
	reLinkAll: (goalId: number, tasks: number[]) => void
	deleteLink: (taskId: number, goalId: number) => void
	deleteAllLinks: (goalId: number) => void
	getTasksByGoal: (goalId: number) => number[]
	getGoalsByTask: (taskId: number) => number[]
}

/**
 * A custom hook that manages the state of goal-task links.
 *
 * @typedef {Object} useGoalTaskFormat
 * @property {GoalTaskList[]} links - An array of goal-task links.
 * @property {function(taskId: string, goalId: string): void} addLink - Adds a new link between a task and a goal.
 * @property {function(taskId: string, goalId: string): void} deleteLink - Deletes a link between a task and a goal.
 * @property {function(goalId: string): string[]} getTaskByGoal - Retrieves all task IDs associated with a given goal ID.
 * @property {function(taskId: string): string[]} getGoalByTask - Retrieves all goal IDs associated with a given task ID.
 *
 * @returns {useGoalTaskFormat} The state and actions for managing goal-task links.
 */

const useGoalTask = create<useGoalTaskFormat>()(
	persist(
		(set, get) => ({
			links: [] as GoalTaskList[],
			addLink: (taskId, goalId, order) => {
				if (
					get().links.find(
						(link) =>
							link.goalId === goalId && link.taskId === taskId
					)
				)
					set((state) => ({
						links: [...state.links, { taskId, goalId, order }],
					}))
			},
			reLinkAll: (goalId, tasks) => {
				get().deleteAllLinks(goalId)
				tasks.forEach((task, index) =>
					get().addLink(task, goalId, index)
				)
			},
			deleteLink: (taskId, goalId) => {
				if (
					get().links.find(
						(link) =>
							link.goalId === goalId && link.taskId === taskId
					)
				)
					set((state) => ({
						links: state.links.filter(
							(link) =>
								taskId !== link.taskId && goalId !== link.goalId
						),
					}))
			},
			deleteAllLinks(goalId) {
				set((state) => ({
					...state,
					links: state.links.filter((link) => link.goalId !== goalId),
				}))
			},
			getTasksByGoal: (goalId) => {
				return get()
					.links.filter((link) => link.goalId === goalId)
					.map((link) => link.taskId)
			},
			getGoalsByTask: (taskId) => {
				return get()
					.links.filter((link) => link.taskId === taskId)
					.map((link) => link.goalId)
			},
		}),
		{
			name: 'goal-task-storage',
		}
	)
)

export default useGoalTask
