import { useRef } from "react";
import { BiCalendarEdit } from "react-icons/bi";

import "react-day-picker/style.css";
import { DayPicker } from "react-day-picker";
import { ru } from "react-day-picker/locale";
import style from "./DatePicker.module.sass";

interface DatePickerProps {
	dateID: string;
	defaultDateValue?: Date | undefined;
	onDateChange: (date: Date | undefined) => void;
}

const DatePicker = ({
	dateID,
	defaultDateValue,
	onDateChange,
}: DatePickerProps) => {
	const dialogRef = useRef<HTMLDialogElement | null>(null);

	const openSelector = () => {
		dialogRef.current?.showModal();
	};

	const closeSelector = () => {
		dialogRef.current?.close();
	};

	return (
		<>
			<div className={style["date-picker"]}>
				<input
					id={dateID}
					name={dateID}
					type="text"
					value={defaultDateValue?.toLocaleDateString()}
					placeholder="выберите -> "
					disabled
				/>
				<button type="button" onClick={openSelector}>
					<BiCalendarEdit size={20} />
				</button>

				<dialog
					className={style["dialog-overlay"]}
					ref={dialogRef}
					onClick={closeSelector}
				>
					<div
						className={style["dialog-content"]}
						onClick={(e: React.MouseEvent<HTMLDivElement>) => {
							e.stopPropagation();
						}}
					>
						<DayPicker
							locale={ru}
							mode="single"
							selected={defaultDateValue}
							onSelect={onDateChange}
							footer={
								defaultDateValue
									? `Выбрана дата: ${defaultDateValue.toLocaleDateString()}`
									: "Выберите дату."
							}
						/>
					</div>
				</dialog>
			</div>
		</>
	);
};

export default DatePicker;
