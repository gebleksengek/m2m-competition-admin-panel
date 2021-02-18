// ** Third Party Components
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import Ripples from 'react-ripples'

// ** Theme Colors Object
const baseColors = {
  primary: 'rgba(115, 103, 240, .2)',
  secondary: 'rgba(130, 134, 139, .2)',
  success: 'rgba(40, 199, 111, .2)',
  warning: 'rgba(255, 159, 67, .2)',
  danger: 'rgba(234, 84, 85, .2)',
  info: 'rgba(0, 207, 232, .2)',
  dark: 'rgba(30, 30, 30, .2)',
  light: 'rgba(246, 246, 246, .2)'
}

const RippleButton = ({ color, className, during, outline, block, ...rest }) => {
  // ** Return Button Color Based On Variant
  const btnColor = () => {
    if (outline) {
      return baseColors[color]
    } else if (color !== undefined && color.startsWith('flat')) {
      return baseColors[color.substring(5)]
    } else {
      return 'rgba(255, 255, 255, .5)'
    }
  }

  return (
    <Ripples color={btnColor()} during={during} className={`${block ? 'd-block' : ''}`}>
      <Button className={className} color={color} block={block} outline={outline} {...rest} />
    </Ripples>
  )
}

// ** PropTypes
RippleButton.propTypes = {
  ...Button.propTypes,
  rippleColor: PropTypes.string,
  during: PropTypes.number
}

Button.Ripple = RippleButton
