import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
	Goal,
	NewGoalData,
	GoalPriority,
	GoalComplexity,
} from '../../types/goal'
import useGoalTask from '../../storage/GoalTask'

interface GoalState {
	goals: Goal[]
	addGoal: (goal: NewGoalData) => void
	updateGoal: (goal: Goal) => void
	deleteGoal: (goal: number) => void
	addTaskToGoal: (goalId: number, taskId: number) => void
	removeTaskFromGoal: (goalId: number, taskId: number) => void
	getGoalById: (id: number) => Goal | null
	correctGoalDates: () => void
}

const useGoalState = create<GoalState>()(
	persist(
		(set, get) => ({
			goals: [],
			addGoal: (goal) =>
				set((state) => {
					const newGoal: Goal = {
						id: new Date().getTime(),
						title: goal.title,
						description: goal.description,
						created_dttm: new Date(),
						result: null,
						reason: null,
						priority: GoalPriority.Null,
						complexity: GoalComplexity.Null,
						edit_dttm: new Date(),
						start_dttm: null,
						finish_dttm: null,
						close_dttm: null,
					}

					return {
						...state,
						goals: [...state.goals, newGoal],
					}
				}),
			updateGoal: (goal) =>
				set((state) => ({
					...state,
					goals: state.goals.map((g) =>
						g.id === goal.id ? goal : g
					),
				})),
			deleteGoal: (goalId) =>
				set((state) => ({
					...state,
					goals: state.goals.filter((goal) => goal.id !== goalId),
				})),
			addTaskToGoal: (goalId, taskId) => {
				const addLink = useGoalTask((state) => state.addLink)
				addLink(taskId, goalId)
			},
			removeTaskFromGoal: (goalId, taskId) => {
				const deleteLink = useGoalTask((state) => state.deleteLink)
				deleteLink(taskId, goalId)
			},
			getGoalById: (goalId) => {
				return get().goals.find((goal) => goal.id === goalId) || null
			},
			correctGoalDates: () =>
				set((state) => ({
					...state,
					goals: state.goals.map((t) => ({
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
			name: 'goal-storage',
		}
	)
)

export default useGoalState
