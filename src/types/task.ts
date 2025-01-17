export interface Task {
	id: number;
	title: string;
	description: string;
	priority: TaskPriority;
	complexity: TaskComplexity;
	spent_time: number | null;
	created_dttm: Date;
	edit_dttm: Date;
	start_dttm: Date | null;
	finish_dttm: Date | null;
	close_dttm: Date | null;
}

export interface NewTaskData {
	title: string;
	description: string;
}

export type TaskPriority = "low" | "medium" | "high" | null;
export type TaskComplexity = "simple" | "medium" | "hard" | null;
