import Tooltip from 'rc-tooltip'
import React from 'react'
import { ReactNode } from 'react'
import { FaQuestionCircle } from 'react-icons/fa'
import { MdModeEdit } from 'react-icons/md'

/**
 * @typedef {Object} InputProps
 * @property {string} [error] - Сообщение об ошибке
 * @property {string} [errorClassName] - Класс для сообщения об ошибке
 * @property {React.CSSProperties} [errorStyle] - Стили для сообщения об ошибке
 * @property {any} [registerInput] - Регистрация инпута
 * @property {ReactNode} [fieldIcon] - Иконка поля
 * @property {ReactNode} [tooltipContent] - Содержимое подсказки
 */

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: string
	errorClassName?: string
	errorStyle?: React.CSSProperties
	registerInput?: any
	fieldIcon?: ReactNode
	tooltipContent?: ReactNode
}

/**
 * Компонент для отображения поля ввода с подсказками и иконками.
 *
 * @param {InputProps} props - Пропсы компонента
 * @returns {JSX.Element} JSX элемент
 */

const FieldInput = ({
	error,
	errorClassName,
	errorStyle,
	registerInput,
	fieldIcon,
	tooltipContent,
	...rest
}: InputProps) => {
	return (
		<div className='form-field'>
			<div className='field'>
				{tooltipContent && (
					<Tooltip
						placement='top'
						trigger={['hover']}
						overlay={tooltipContent}
					>
						<div className='field-hint'>
							<FaQuestionCircle size={16} color='#999' />
						</div>
					</Tooltip>
				)}
				{fieldIcon ? fieldIcon : <MdModeEdit size={20} />}
				<input
					{...rest}
					{...registerInput}
					className={error && 'invalid'}
				/>
			</div>
			{error && (
				<span
					style={
						errorStyle ? { color: 'tomato', margin: 0 } : errorStyle
					}
					className={errorClassName}
				>
					{error}
				</span>
			)}
		</div>
	)
}

export default FieldInput
