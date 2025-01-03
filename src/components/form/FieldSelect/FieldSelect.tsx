import Tooltip from 'rc-tooltip'
import { ReactNode } from 'react'
import { FaChevronRight, FaQuestionCircle } from 'react-icons/fa'

interface FieldSelectProps
	extends React.SelectHTMLAttributes<HTMLSelectElement> {
	options: { value: string; label: string }[]
	registerSelect?: any
	fieldIcon: ReactNode
	tooltipContent?: ReactNode
}

const FieldSelect = ({
	options,
	registerSelect,
	fieldIcon,
	tooltipContent,
	...rest
}: FieldSelectProps) => {
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
				<select {...rest} {...registerSelect}>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</div>
		</div>
	)
}

export default FieldSelect
