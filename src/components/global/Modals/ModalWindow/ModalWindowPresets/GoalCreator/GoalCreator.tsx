import useGoalState from "../../../../../../pages/GoalsPage/GoalState";
import { NewGoalData } from "../../../../../../types/goal";
import useModalWindowState from "../../useModalWindowState";

const GoalCreator = () => {
	const close = useModalWindowState((s) => s.close);
	const addGoal = useGoalState((state) => state.addGoal);

	const onGoalCreated = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const form = event.currentTarget;

		const title = (form.elements.namedItem("title") as HTMLInputElement)
			.value;
		const description = (
			form.elements.namedItem("description") as HTMLTextAreaElement
		).value;

		const newGoalData: NewGoalData = {
			title: title,
			description: description,
		};

		addGoal(newGoalData);
		form.reset();
		close();
	};

	return (
		<form action="#" className="form" onSubmit={onGoalCreated}>
			<div className="form-title">Создание цели</div>
			<div className="field-container">
				<input
					type="text"
					name="title"
					id="title"
					placeholder="название..."
					autoComplete="off"
				/>
			</div>
			<div className="field-container">
				<textarea
					name="description"
					id="description"
					placeholder="описание..."
					autoComplete="off"
				/>
			</div>

			<button type="submit" className="create-task">
				Создать цель
			</button>
		</form>
	);
};

export default GoalCreator;
