import Tooltip from 'rc-tooltip'
import React from 'react'
import { ReactNode } from 'react'
import { FaChevronRight, FaQuestionCircle } from 'react-icons/fa'

interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	error?: string
	errorClassName?: string
	errorStyle?: React.CSSProperties
	registerTextarea?: any
	fieldIcon?: ReactNode
	tooltipContent?: ReactNode
}

const FieldTextarea = ({
	error,
	errorClassName,
	errorStyle,
	registerTextarea,
	fieldIcon,
	tooltipContent,
	...rest
}: TextareaProps) => {
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
				<textarea
					{...rest}
					{...registerTextarea}
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

export default FieldTextarea
