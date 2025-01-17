export interface Goal {
	id: number
	title: string
	description: string
	priority: GoalPriority
	complexity: GoalComplexity
	result: string | null
	reason: string | null
	created_dttm: Date
	edit_dttm: Date
	start_dttm: Date | null
	finish_dttm: Date | null
	close_dttm: Date | null
}

export interface NewGoalData {
	title: string
	description: string
}

export enum GoalPriority {
	Low = 'low',
	Medium = 'medium',
	High = 'high',
	Null = 'null',
}

export enum GoalComplexity {
	Simple = 'simple',
	Medium = 'medium',
	Hard = 'hard',
	Null = 'null',
}

export const GoalPriorityOptions = [
	{ value: GoalPriority.Null, label: 'Не выбрано' },
	{ value: GoalPriority.Low, label: 'Низкий' },
	{ value: GoalPriority.Medium, label: 'Средний' },
	{ value: GoalPriority.High, label: 'Высокий' },
]

export const GoalComplexityOptions = [
	{ value: GoalComplexity.Null, label: 'Не выбрано' },
	{ value: GoalComplexity.Simple, label: 'Простая' },
	{ value: GoalComplexity.Medium, label: 'Средняя' },
	{ value: GoalComplexity.Hard, label: 'Сложная' },
]

// результат - (опишите) какой результат должен быть получен после выполнения работы
// целесообразность - (опишите) почему эта проделанная работа будет полезна в будущем
