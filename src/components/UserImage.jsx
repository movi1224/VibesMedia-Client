import { Box } from '@mui/material'
import { SERVER_URL } from 'Constants'
/* 做一个简单样式组件放用户头像  */
const UserImage = ({ image, size = '60px' }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: 'cover', borderRadius: '50%' }}
        width={size}
        height={size}
        alt="user"
        src={`${SERVER_URL}/assets/${image}`}
      />
    </Box>
  )
}

export default UserImage
