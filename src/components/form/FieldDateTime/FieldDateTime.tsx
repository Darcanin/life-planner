import { ReactNode, useEffect, useState } from 'react'
import { FaQuestionCircle } from 'react-icons/fa'
import Tooltip from 'rc-tooltip'
import { TbCalendarQuestion } from 'react-icons/tb'
// import 'rc-tooltip/assets/bootstrap.css'

interface datetimeState {
	year: number | undefined
	month: number | undefined
	date: number | undefined
	hour: number | undefined
	minute: number | undefined
}

interface FieldDateTimeProps {
	defaultDatetime: Date | null
	setFieldValue: (value: Date | null) => void
	fieldIcon?: ReactNode
	tooltipContent?: ReactNode
}

const FieldDateTime = ({
	defaultDatetime,
	setFieldValue,
	fieldIcon,
	tooltipContent,
}: FieldDateTimeProps) => {
	// Установка значений по умолчанию
	const [datetime, setDatetime] = useState<datetimeState>({
		year: defaultDatetime ? defaultDatetime.getFullYear() : undefined,
		month: defaultDatetime ? defaultDatetime.getMonth() + 1 : undefined,
		date: defaultDatetime ? defaultDatetime.getDate() : undefined,
		hour: defaultDatetime ? defaultDatetime.getHours() : undefined,
		minute: defaultDatetime ? defaultDatetime.getMinutes() : undefined,
	})

	// Отправка значения в useForm -> setFieldValue
	useEffect(() => {
		if (
			datetime.year !== undefined &&
			datetime.month !== undefined &&
			datetime.date !== undefined &&
			datetime.hour !== undefined &&
			datetime.minute !== undefined
		) {
			const datetimeString = new Date()
			datetimeString.setFullYear(datetime.year)
			datetimeString.setMonth(datetime.month - 1)
			datetimeString.setDate(datetime.date)
			datetimeString.setHours(datetime.hour)
			datetimeString.setMinutes(datetime.minute)

			setFieldValue(datetimeString)
		} else {
			setFieldValue(null)
		}
	}, [datetime])

	const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, '')
		if (value.length <= 4) {
			setDatetime({
				...datetime,
				year: value ? parseInt(value) : undefined,
			})
		}
	}

	const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, '')
		const month = value ? parseInt(value) : undefined
		if (
			value.length <= 2 &&
			(month === undefined || (month >= 1 && month <= 12))
		) {
			setDatetime({
				...datetime,
				month,
			})
		}
	}

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, '')
		const date = value ? parseInt(value) : undefined
		if (
			value.length <= 2 &&
			(date === undefined || (date >= 1 && date <= 31))
		) {
			setDatetime({
				...datetime,
				date,
			})
		}
	}

	const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, '')
		const hour = value ? parseInt(value) : undefined
		if (
			value.length <= 2 &&
			(hour === undefined || (hour >= 0 && hour <= 23))
		) {
			setDatetime({
				...datetime,
				hour,
			})
		}
	}

	const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, '')
		const minute = value ? parseInt(value) : undefined
		if (
			value.length <= 2 &&
			(minute === undefined || (minute >= 0 && minute <= 59))
		) {
			setDatetime({
				...datetime,
				minute,
			})
		}
	}

	return (
		<div className='form-field-datetime'>
			<div className='field'>
				{fieldIcon ? fieldIcon : <TbCalendarQuestion size={20} />}
				<div className='field-date'>
					<input
						className='input-year'
						placeholder='YYYY'
						title='YYYY'
						type='text'
						value={datetime.year ?? ''}
						onChange={handleYearChange}
					/>
					<input
						className='input-month'
						placeholder='MM'
						title='MM'
						type='text'
						value={datetime.month ?? ''}
						onChange={handleMonthChange}
					/>
					<input
						className='input-date'
						placeholder='DD'
						title='DD'
						type='text'
						value={datetime.date ?? ''}
						onChange={handleDateChange}
					/>
				</div>
				<div className='field-time'>
					<input
						className='input-hour'
						placeholder='HH'
						title='HH'
						type='text'
						value={datetime.hour ?? ''}
						onChange={handleHourChange}
					/>
					<input
						className='input-minute'
						placeholder='MM'
						title='MM'
						type='text'
						value={datetime.minute ?? ''}
						onChange={handleMinuteChange}
					/>
				</div>
			</div>
			{tooltipContent && (
				<Tooltip
					placement='top'
					trigger={['hover']}
					overlay={tooltipContent}
				>
					<div className='field-tooltip'>
						<FaQuestionCircle size={16} color='#999' />
					</div>
				</Tooltip>
			)}
			{/* {error} */}
		</div>
	)
}

export default FieldDateTime
