import { createPortal } from 'react-dom'
import ModalWindow from './components/global/Modals/ModalWindow/ModalWindow'
import TaskPage from './pages/TasksPage/TaskPage'
import TaskPageState from './pages/TasksPage/TaskState'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'

import './styles/main.sass'
import './App.css'
import GoalPage from './pages/GoalsPage/GoalPage'
import Header from './components/global/Header/Header'
import HomePage from './pages/HomePage/HomePage'
import useGoalState from './pages/GoalsPage/GoalState'

function App() {
	const correctTaskDates = TaskPageState((state) => state.correctTaskDates)
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
						<Route path='/' element={<HomePage />} />
						<Route path='/tasks' element={<TaskPage />} />
						<Route path='/goals' element={<GoalPage />} />
					</Routes>
				</div>
			</BrowserRouter>

			{createPortal(<ModalWindow />, document.body)}
		</div>
	)
}

export default App
