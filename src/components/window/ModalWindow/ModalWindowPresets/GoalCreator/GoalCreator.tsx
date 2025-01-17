import { SubmitHandler, useForm } from 'react-hook-form'
import useGoalState from '../../../../../pages/GoalsPage/GoalState'
import { NewGoalData } from '../../../../../types/goal'
import useModalWindowState from '../../useModalWindowState'
import FieldInput from '../../../../form/FieldInput/FieldInput'
import FieldTextarea from '../../../../form/FieldTextarea/FieldTextarea'
import Button from '../../../../simple/Button'
import { MdModeEdit, MdOutlineSubtitles } from 'react-icons/md'

interface IGoalCreator {
	title: string
	description: string
}

const GoalCreator = () => {
	const close = useModalWindowState((s) => s.close)
	const addGoal = useGoalState((state) => state.addGoal)

	const { register, handleSubmit, formState } = useForm<IGoalCreator>({
		mode: 'onChange',
	})

	const onSubmit: SubmitHandler<IGoalCreator> = (data) => {
		const newGoal: NewGoalData = {
			title: data.title,
			description: data.description,
		}

		addGoal(newGoal)
		close()
	}

	return (
		<form className='modal-window-form' onSubmit={handleSubmit(onSubmit)}>
			<span>Создание цели</span>
			<FieldInput
				registerInput={register('title', {
					required: 'Название обязательное ёпта!',
				})}
				autoComplete='off'
				placeholder='Название цели...'
				fieldIcon={<MdModeEdit size={20} />}
				error={formState.errors.title?.message}
			/>
			<FieldTextarea
				registerTextarea={register('description')}
				autoComplete='off'
				placeholder='Описание цели...'
				fieldIcon={<MdOutlineSubtitles size={20} />}
			/>

			<div className='footer'>
				<Button type='submit'>Создать цель</Button>
				<Button type='reset' onClick={close}>
					Отмена
				</Button>
			</div>
		</form>
	)
}

export default GoalCreator
