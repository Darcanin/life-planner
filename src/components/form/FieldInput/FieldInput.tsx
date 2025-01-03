import Tooltip from 'rc-tooltip'
import React from 'react'
import { ReactNode } from 'react'
import { FaQuestionCircle } from 'react-icons/fa'
import { FaChevronRight } from 'react-icons/fa'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: string
	errorClassName?: string
	errorStyle?: React.CSSProperties
	registerInput?: any
	fieldIcon?: ReactNode
	tooltipContent?: ReactNode
}

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
				{fieldIcon ? fieldIcon : <FaChevronRight size={20} />}
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
