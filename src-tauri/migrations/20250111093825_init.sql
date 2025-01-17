CREATE TABLE goal (
	id SERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	description TEXT NOT NULL,
	priority VARCHAR(10) NOT NULL,
	complexity VARCHAR(10) NOT NULL,
	result TEXT,
	reason TEXT,
	created_dttm TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	edit_dttm TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	start_dttm TIMESTAMP,
	finish_dttm TIMESTAMP,
	close_dttm TIMESTAMP
);

CREATE TABLE task (
	id SERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	description TEXT NOT NULL,
	priority VARCHAR(10) NOT NULL,
	complexity VARCHAR(10) NOT NULL,
	spent_time INT,
	created_dttm TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	edit_dttm TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	start_dttm TIMESTAMP,
	finish_dttm TIMESTAMP,
	close_dttm TIMESTAMP
);

CREATE TABLE goal_task (
	goal_id INT NOT NULL,
	task_id INT NOT NULL,
	PRIMARY KEY (goal_id, task_id),
	FOREIGN KEY (goal_id) REFERENCES goal(id) ON DELETE CASCADE,
	FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE
);