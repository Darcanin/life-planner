use sqlx::SqlitePool;
use crate::db::queries::task::types::{Task, NewTaskData};

pub async fn query_insert_task(pool: &SqlitePool, new_task: NewTaskData) -> Result<(), sqlx::Error> {
    sqlx::query("INSERT INTO task (title, description, priority, complexity, spent_time, created_dttm, edit_dttm, start_dttm, finish_dttm, close_dttm) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
        .bind(new_task.title)
        .bind(new_task.description)
        .bind(new_task.priority)
        .bind(new_task.complexity)
        .bind(new_task.spent_time)
        .bind(new_task.created_dttm)
        .bind(new_task.edit_dttm)
        .bind(new_task.start_dttm)
        .bind(new_task.finish_dttm)
        .bind(new_task.close_dttm)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn query_update_task(pool: &SqlitePool, task: Task) -> Result<(), sqlx::Error> {
    sqlx::query("UPDATE task SET title = ?, description = ?, priority = ?, complexity = ?, spent_time = ?, created_dttm = ?, edit_dttm = ?, start_dttm = ?, finish_dttm = ?, close_dttm = ? WHERE id = ?")
        .bind(task.title)
        .bind(task.description)
        .bind(task.priority)
        .bind(task.complexity)
        .bind(task.spent_time)
        .bind(task.created_dttm)
        .bind(task.edit_dttm)
        .bind(task.start_dttm)
        .bind(task.finish_dttm)
        .bind(task.close_dttm)
        .bind(task.id)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn query_delete_task(pool: &SqlitePool, task_id: i64) -> Result<(), sqlx::Error> {
    sqlx::query("DELETE FROM task WHERE id = ?")
        .bind(task_id)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn query_fetch_task_by_id(pool: &SqlitePool, task_id: i64) -> Result<Task, sqlx::Error> {
    let task = sqlx::query_as::<_, Task>("SELECT * FROM task WHERE id = ?")
        .bind(task_id)
        .fetch_one(pool)
        .await?;
    Ok(task)
}

pub async fn query_fetch_tasks(pool: &SqlitePool) -> Result<Vec<Task>, sqlx::Error> {
    let tasks = sqlx::query_as::<_, Task>("SELECT * FROM task")
        .fetch_all(pool)
        .await?;
    Ok(tasks)
}
