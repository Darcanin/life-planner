import React, { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	text?: string;
	onClickEvent?: () => void;
	buttonOptions?: React.ButtonHTMLAttributes<HTMLButtonElement>;
	children?: ReactNode;
}

const Button = ({
	text,
	type = "button",
	form,
	className,
	onClickEvent,
	buttonOptions,
	children,
	...rest
}: ButtonProps) => {
	return (
		<button
			style={buttonStyles}
			form={form}
			type={type}
			className={className}
			onClick={onClickEvent}
			{...buttonOptions}
			{...rest}
		>
			{children}
			{text}
		</button>
	);
};

const buttonStyles: React.CSSProperties = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
};

export default Button;
