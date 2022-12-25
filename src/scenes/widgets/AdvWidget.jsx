import { Typography, useTheme } from '@mui/material'
import FlexBetween from 'components/FlexBetween'
import WidgetWrapper from 'components/WidgetWrapper'

const AdvWidget = () => {
  const { palette } = useTheme()
  const dark = palette.neutral.dark
  const main = palette.neutral.main
  const medium = palette.neutral.medium

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advertising"
        src="http://localhost:3001/assets/info4.jpeg"
        style={{ borderRadius: '0.75rem', margin: '0.75rem 0' }}
      />
      <FlexBetween>
        <Typography color={main}>MikaCosmetics </Typography>
        <Typography color={medium}>MikaCosmetics.com </Typography>
      </FlexBetween>
      <Typography color={medium} my="0.5rem">
        Your pathway to stunning and immaculate beauty and made sure your skin is exfoliating skin
        and shining like light.
      </Typography>
    </WidgetWrapper>
  )
}

export default AdvWidget