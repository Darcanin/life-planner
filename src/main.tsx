import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
);

// import { createDir, BaseDirectory, exists } from '@tauri-apps/plugin-fs'

// /**
//  * Проверяет существование директории и создаёт её, если она отсутствует.
//  * @param path - путь к директории (например, 'LF/data')
//  */
// export const ensureDirectoryExists = async (path: string) => {
//   const directoryExists = await exists(path, { dir: BaseDirectory.App });
//   if (!directoryExists) {
//     await createDir(path, { dir: BaseDirectory.App, recursive: true });
//   }
// }
