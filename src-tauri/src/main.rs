// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod db;
mod utils;

use db::{connection::establish_connection, migrations::run_migrations};
use utils::appdata::setup_db_path;
use crate::db::queries::task::commands::{add_task, update_task, delete_task, get_task_by_id, get_tasks};


#[tokio::main]
async fn main() -> Result<(), sqlx::Error> {
    // Init
    println!("\n\n[BackEnd]: init main.rs");

    // Устанавливаем путь к БД
    let db_path = setup_db_path();

    println!("[BackEnd]: DB_path='{}'", db_path);
    
    // Создаём соединение с БД
    let pool = establish_connection(&db_path).await?;
    
    // Применяем миграции
    run_migrations(&pool).await?;


    tauri::Builder::default()
        // .manage(pool.clone())
        .invoke_handler(tauri::generate_handler![add_task, update_task, delete_task, get_task_by_id, get_tasks])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}