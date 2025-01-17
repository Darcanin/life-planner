use tauri::command;
use sqlx::SqlitePool;
use crate::db::queries::task::types::{Task, NewTaskData};
use crate::db::queries::task::queries::{query_insert_task, query_update_task, query_delete_task, query_fetch_task_by_id, query_fetch_tasks};

#[command]
pub async fn add_task(new_task: NewTaskData, pool: tauri::State<'_, SqlitePool>) -> Result<(), String> {
    query_insert_task(&pool, new_task).await.map_err(|e| e.to_string())
}

#[command]
pub async fn update_task(task: Task, pool: tauri::State<'_, SqlitePool>) -> Result<(), String> {
    query_update_task(&pool, task).await.map_err(|e| e.to_string())
}

#[command]
pub async fn delete_task(task_id: i64, pool: tauri::State<'_, SqlitePool>) -> Result<(), String> {
    query_delete_task(&pool, task_id).await.map_err(|e| e.to_string())
}

#[command]
pub async fn get_task_by_id(task_id: i64, pool: tauri::State<'_, SqlitePool>) -> Result<Task, String> {
    query_fetch_task_by_id(&pool, task_id).await.map_err(|e| e.to_string())
}

#[command]
pub async fn get_tasks(pool: tauri::State<'_, SqlitePool>) -> Result<Vec<Task>, String> {
    query_fetch_tasks(&pool).await.map_err(|e| e.to_string())
}
