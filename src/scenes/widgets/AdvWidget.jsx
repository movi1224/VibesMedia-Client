import { Typography, useTheme, Link } from '@mui/material'
import FlexBetween from 'components/FlexBetween'
import WidgetWrapper from 'components/WidgetWrapper'
import { SERVER_URL } from 'Constants'
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
        src="https://i.328888.xyz/2022/12/28/UIsgP.png"
        // {`${SERVER_URL}/assets/info4.jpeg`}
        style={{ borderRadius: '0.75rem', margin: '0.75rem 0' }}
      />
      <FlexBetween>
        <Typography color={main}>Victor's Portfolio</Typography>
        <Link href="https://portfolio-victor-he.vercel.app/" color={medium}>
          Visit
        </Link>
      </FlexBetween>
      <Typography color={medium} my="0.5rem">
        Explorer Victor's Portfolio website to know more about him, feel free to contact him with
        opportunities or anything!
      </Typography>
      {/* <Typography color={medium} my="0.5rem">
        Your pathway to stunning and immaculate beauty and made sure your skin is exfoliating skin
        and shining like light.
      </Typography> */}
    </WidgetWrapper>
  )
}

export default AdvWidget
