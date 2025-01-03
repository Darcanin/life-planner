import { useRef } from "react";
import style from "./TimePicker.module.sass";

interface TimePickerProps {
	timeID: string;
	startHours: string | null;
	startMinutes: string | null;
	onHoursChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
	onMinutesChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
	onBlurHours?: (event: React.FocusEvent<HTMLInputElement>) => void;
	onBlurMinutes?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const TimePicker = ({
	timeID,
	startHours,
	startMinutes,
	onHoursChange,
	onMinutesChange,
	onBlurHours,
	onBlurMinutes,
}: TimePickerProps) => {
	const minuteInput = useRef<HTMLInputElement | null>(null);

	// const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	const value = validateInput(e.target.value, 23);

	// 	if (value.length === 2) minuteInput.current?.focus();
	// };

	// const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	const value = validateInput(e.target.value, 59);
	// };

	return (
		<div className={style["time-picker"]}>
			<input
				id={timeID + "-h"}
				name={timeID + "-h"}
				type="text"
				value={startHours ? startHours : undefined}
				onChange={onHoursChange}
				onBlur={onBlurHours}
				onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
					e.target.select();
				}}
				maxLength={2}
				placeholder="hh"
				autoComplete="off"
			/>
			<span>:</span>
			<input
				id={timeID + "-m"}
				name={timeID + "-m"}
				type="text"
				value={startMinutes ? startMinutes : undefined}
				onChange={onMinutesChange}
				onBlur={onBlurMinutes}
				onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
					e.target.select();
				}}
				ref={minuteInput}
				maxLength={2}
				placeholder="mm"
				autoComplete="off"
			/>
		</div>
	);
};

export default TimePicker;
