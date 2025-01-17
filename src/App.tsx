import { createPortal } from 'react-dom'
import ModalWindow from './components/window/ModalWindow/ModalWindow'
import TaskPage from './pages/TasksPage/TaskPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'

import './styles/main.sass'
import './styles/App.css'

import { pageConfig } from './config/page.config'

import GoalPage from './pages/GoalsPage/GoalPage'
import Header from './components/layout/header/Header'
import HomePage from './pages/HomePage/HomePage'
import useGoalState from './pages/GoalsPage/GoalState'
import useTaskState from './pages/TasksPage/TaskState'

function App() {
	const correctTaskDates = useTaskState((state) => state.correctTaskDates)
	const correctGoalDates = useGoalState((state) => state.correctGoalDates)

	useEffect(() => {
		correctTaskDates()
		correctGoalDates()
	}, [])

	return (
		<div className='app'>
			<BrowserRouter>
				<Header />
				<div className='screen'>
					<Routes>
						<Route path={pageConfig.home} element={<HomePage />} />
						<Route path={pageConfig.task} element={<TaskPage />} />
						<Route path={pageConfig.goal} element={<GoalPage />} />
					</Routes>
				</div>
			</BrowserRouter>

			{createPortal(<ModalWindow />, document.body)}
		</div>
	)
}

export default App
