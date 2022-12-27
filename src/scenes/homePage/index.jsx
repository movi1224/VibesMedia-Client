import { Box, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
import Navbar from 'scenes/navbar'
import UserWidget from 'scenes/widgets/UserWidget'
import MyPostWidget from 'scenes/widgets/MyPostWidget'
import PostsWidget from 'scenes/widgets/PostsWidget'
import AdvWidget from 'scenes/widgets/AdvWidget'
import FriendListWidget from 'scenes/widgets/FriendListWidget'
const HomePage = () => {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)')
  const isLargeScreens = useMediaQuery('(min-width:2000px)')
  const { _id, picturePath } = useSelector((state) => state.user)

  return (
    <Box>
      <Navbar />
      <Box
        width={isLargeScreens ? '75%' : '100%'}
        margin="0 auto"
        padding="2rem 6%"
        display={isNonMobileScreens ? 'flex' : 'block'}
        alignSelf="center"
        gap="0.5rem"
        justifyContent="space-between">
        {/* 左侧用户信息框 */}
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        {/* 中间feed posts框 */}
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}>
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {/* 右侧广告和好友框 */}
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default HomePage
