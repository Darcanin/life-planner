use std::fs;
// use std::path::Path;

pub fn setup_db_path() -> String {
    let appdata_path = dirs::data_dir().expect("Failed to get AppData directory");
    let db_path = appdata_path.join("life-planner/db/main.sqlite");

    if let Some(parent_dir) = db_path.parent() {
        if !parent_dir.exists() {
            fs::create_dir_all(parent_dir).expect("Failed to create directories for DB");
        }
    }

    if !db_path.exists() {
        fs::File::create(&db_path).expect("Failed to create DB file");
    }

    db_path.to_str()
        .expect("Failed to convert path to string")
        .replace("\\", "/") // Приведение пути к корректному формату
}
