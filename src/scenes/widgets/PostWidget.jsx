import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  DeleteOutlined,
} from '@mui/icons-material'
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material'
import FlexBetween from 'components/FlexBetween'
import Friend from 'components/Friend'
import WidgetWrapper from 'components/WidgetWrapper'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPost, setPosts } from 'state'
import { SERVER_URL } from 'Constants'

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  createdAt,
}) => {
  const [isComments, setIsComments] = useState(false) // 是否点击了comment list
  const dispatch = useDispatch()
  const token = useSelector((state) => state.token)
  const loggedInUserId = useSelector((state) => state.user._id)
  const isLiked = Boolean(likes[loggedInUserId]) // 查看当前user是否like过这个post
  const likeCount = Object.keys(likes).length // 获取当前like的总数

  const { palette } = useTheme()
  const primary = palette.primary.main
  const main = palette.neutral.main
  const timeStamp = new Date(createdAt).toLocaleString()

  const patchLike = async () => {
    const response = await fetch(`${SERVER_URL}/posts/${postId}/like`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    })
    const updatedPost = await response.json()
    dispatch(setPost({ post: updatedPost }))
  }

  const deletePost = async () => {
    const response = await fetch(`${SERVER_URL}/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    })
    const updatedPosts = await response.json()
    dispatch(setPosts({ posts: updatedPosts }))
  }

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} fontSize="1rem" sx={{ mt: '1rem', wordWrap: 'break-word' }}>
        {description}
      </Typography>
      {/* 如果是带图片的post就放图片 */}
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
          src={`${SERVER_URL}/assets/${picturePath}`}
        />
      )}
      <Typography textAlign="right" fontSize="0.75rem" sx={{ color: palette.neutral.medium }}>
        {timeStamp}
      </Typography>
      {/* 下一排按钮区域 */}
      <FlexBetween mt="0.25rem">
        {/* 装左边按钮的区域 */}
        <FlexBetween gap="1rem">
          {/* like按钮 */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? <FavoriteOutlined sx={{ color: primary }} /> : <FavoriteBorderOutlined />}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
          {/* 评论按钮 */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        {/* 右边按钮区域 */}
        <FlexBetween gap="0.5rem">
          {/* 如果是当前用户的post会有删除按钮 */}
          {loggedInUserId === postUserId && (
            <IconButton onClick={deletePost}>
              <DeleteOutlined />
            </IconButton>
          )}

          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: '0.5rem 0', pl: '1rem' }}>{comment}</Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  )
}

export default PostWidget
