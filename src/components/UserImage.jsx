import { Box } from '@mui/material'
import { SERVER_URL } from 'Constants'
import { useState } from 'react'

/* 做一个简单样式组件放用户头像  */
const UserImage = ({ image, size = '60px' }) => {
  const [imgPath, setImgPath] = useState(`${SERVER_URL}/assets/${image}`)
  // 如果请求图片丢失 用默认头像
  const onError = () => {
    setImgPath(`../assets/defaultAvatar.png`)
  }
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: 'cover', borderRadius: '50%' }}
        width={size}
        height={size}
        alt="user"
        src={imgPath}
        onError={onError}
      />
    </Box>
  )
}

export default UserImage
