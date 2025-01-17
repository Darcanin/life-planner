use sqlx::sqlite::SqlitePool;

pub async fn establish_connection(db_path: &str) -> Result<SqlitePool, sqlx::Error> {
    let database_url = format!("sqlite://{}", db_path);
    SqlitePool::connect(&database_url).await
}
