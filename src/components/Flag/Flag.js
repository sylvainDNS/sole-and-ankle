import styled from "styled-components"
import { COLORS } from "../../constants"

const Flag = ({ variant }) => {
  if (variant === 'default') return null

  const variants = {
    'on-sale': {
      label: 'Sale',
      '--background-color': COLORS.primary,
    },
    'new-release': {
      label: 'Just Released!',
      '--background-color': COLORS.secondary,
    }
  }
  const { label, ...styles} = variants[variant]

  return <FlagWrapper style={styles}>{label}</FlagWrapper>
}
const FlagWrapper = styled.span`
  color: white;
  background-color: var(--background-color);
  border-radius: 2px;
  padding: 8px 10px;
  position: absolute;
  top: 12px;
  right: -4px;
`

export default Flag