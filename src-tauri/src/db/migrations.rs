use sqlx::{migrate::Migrator, Pool, Sqlite};
use std::path::Path;

pub async fn run_migrations(pool: &Pool<Sqlite>) -> Result<(), sqlx::Error> {
    let migrator = Migrator::new(Path::new("./migrations")).await?;
    migrator.run(pool).await.map_err(|e| sqlx::Error::from(e))
}
