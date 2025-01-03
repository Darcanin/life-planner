import TimePicker from "./TimePicker/TimePicker";
import DatePicker from "./DatePicker/DatePicker";
import style from "./DateTimePicker.module.sass";
import "react-day-picker/style.css";
import { useEffect, useState } from "react";

interface DateTimePickerProps {
	label: string;
	timeID: string;
	dateID: string;
	defaultDatetime?: Date;
	onChange: (value: Date | null) => void;
}

const DateTimePicker = ({
	label = "Название не задано",
	timeID,
	dateID,
	defaultDatetime,
	onChange,
}: DateTimePickerProps) => {
	const [date, setDate] = useState<Date | undefined>(undefined);
	const [hours, setHours] = useState<string | null>(null);
	const [minutes, setMinutes] = useState<string | null>(null);

	// Установка данных по умолчанию
	useEffect(() => {
		setHours(
			defaultDatetime
				? defaultDatetime.getHours().toString().padStart(2, "0")
				: null
		);
		setMinutes(
			defaultDatetime
				? defaultDatetime.getMinutes().toString().padStart(2, "0")
				: null
		);

		setDate(defaultDatetime ? defaultDatetime : undefined);
	}, [defaultDatetime]);

	// Если все данные даты заполнены, то изменяем дату в форме -> callBack
	useEffect(() => {
		if (date && hours && minutes) {
			const exportDateTime = date;
			exportDateTime.setHours(Number(hours));
			exportDateTime.setMinutes(Number(minutes));

			onChange(exportDateTime);
		}
	}, [date, hours, minutes]);

	const validateInput = (value: string, max: number): string => {
		const numericValue = value.replace(/\D/g, ""); // Удаляем всё, кроме цифр
		const parsed = parseInt(numericValue, 10); // Проверяем диапазон

		return isNaN(parsed) || parsed > max
			? numericValue.slice(0, -1)
			: numericValue;
	};

	const updateHours = (newValue: React.ChangeEvent<HTMLInputElement>) => {
		const value = validateInput(newValue.target.value, 23);
		setHours(value);
	};

	const updateMinutes = (newValue: React.ChangeEvent<HTMLInputElement>) => {
		const value = validateInput(newValue.target.value, 59);
		setMinutes(value);
	};

	const onBlurHours = (e: React.FocusEvent<HTMLInputElement>) => {
		let value = e.target.value;
		if (value.length != 2) {
			value = value.padStart(2, "0");
			setHours(value);
		}
	};

	const onBlurMinutes = (e: React.FocusEvent<HTMLInputElement>) => {
		let value = e.target.value;
		if (value.length != 2) {
			value = value.padStart(2, "0");
			setMinutes(value);
		}
	};

	return (
		<>
			<div className={style["field"]}>
				<label>{label}</label>
				<DatePicker
					dateID={dateID}
					defaultDateValue={date}
					onDateChange={setDate}
				/>
				<TimePicker
					timeID={timeID}
					startHours={hours}
					startMinutes={minutes}
					onHoursChange={updateHours}
					onMinutesChange={updateMinutes}
					onBlurHours={onBlurHours}
					onBlurMinutes={onBlurMinutes}
				/>
			</div>
		</>
	);
};

export default DateTimePicker;
