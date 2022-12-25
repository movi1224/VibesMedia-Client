import { Box } from '@mui/material'
import { styled } from '@mui/system'

/* 做一个简单的styled component作为组件wrapper, 设定flex, spacebetween, itmescenter */
const FlexBetween = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export default FlexBetween
