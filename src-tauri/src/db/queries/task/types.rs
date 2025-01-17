use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Task {
    pub id: i64,
    pub title: String,
    pub description: String,
    pub priority: Option<String>,
    pub complexity: Option<String>,
    pub spent_time: Option<i64>,
    pub created_dttm: String,
    pub edit_dttm: String,
    pub start_dttm: Option<String>,
    pub finish_dttm: Option<String>,
    pub close_dttm: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NewTaskData {
    pub title: String,
    pub description: String,
    pub priority: Option<String>,
    pub complexity: Option<String>,
    pub spent_time: Option<i64>,
    pub created_dttm: String,
    pub edit_dttm: String,
    pub start_dttm: Option<String>,
    pub finish_dttm: Option<String>,
    pub close_dttm: Option<String>,
}
