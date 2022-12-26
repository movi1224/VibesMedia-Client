import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from '@mui/icons-material'
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from '@mui/material'
import FlexBetween from 'components/FlexBetween'
import Dropzone from 'react-dropzone'
import UserImage from 'components/UserImage'
import WidgetWrapper from 'components/WidgetWrapper'
/* 逻辑 */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from 'state'

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch()
  const [isImage, setIsImage] = useState(false)
  const [image, setImage] = useState(null)
  const [post, setPost] = useState('')
  const { palette } = useTheme()
  const { _id } = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)')
  const mediumMain = palette.neutral.mediumMain
  const medium = palette.neutral.medium

  const handlePost = async () => {
    // 发布post逻辑, 先生成formData然后append各项数据
    const formData = new FormData()
    formData.append('userId', _id)
    formData.append('description', post)
    if (image) {
      formData.append('picture', image)
      formData.append('picturePath', image.name)
    }
    const response = await fetch(`https://vibes-media-server.onrender.com/posts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
    const posts = await response.json()
    dispatch(setPosts({ posts }))
    setImage(null)
    setPost('')
  }

  return (
    <WidgetWrapper>
      {/* 第一行: 左边user image, 右边输入post文本 */}
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What vibe now?"
          onChange={(e) => setPost(e.target.value)}
          value={post}
          multiline={true}
          sx={{
            width: '100%',
            backgroundColor: palette.neutral.light,
            borderRadius: '2rem',
            padding: '1rem 2rem',
          }}
        />
      </FlexBetween>
      {/* 第二行: 点击Image时出现的上传图片部分, 平时隐藏 */}
      {isImage && (
        <Box border={`1px solid ${medium}`} borderRadius="5px" mt="1rem" p="1rem">
          <Dropzone
            acceptedFiles=".jpg, .jpeg, .png"
            multiple={false}
            /* 上传后获取上传图片的名称到Image状态中 */
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}>
            {/* 以下两个函数是dropzone要求的, 相当于把dropzone的几个props传到下面的函数中 */}
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                {/* 显示文字提示上传区域 */}
                <Box
                  {...getRootProps()} //赋予这个组件可以打开本地文件的功能
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ '&:hover': { cursor: 'pointer' } }}>
                  <input {...getInputProps()} />
                  {/* 若上传了则显示图片名字和edit按钮, 否则提示上传图片 */}
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>

                {/* 上传后右边增加一个删除按钮 */}
                {image && (
                  <IconButton onClick={() => setImage(null)} sx={{ width: '15%' }}>
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}
      <Divider sx={{ margin: '1.25rem 0' }} />

      {/* 第三行: 功能按钮区域 */}
      <FlexBetween>
        {/* Image按钮 点击时出现上方上传区域, 再次点击关闭 */}
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography color={mediumMain} sx={{ '&:hover': { cursor: 'pointer', color: 'medium' } }}>
            Image
          </Typography>
        </FlexBetween>
        {/* 其他三个mock的按钮区域, 手机屏幕时显示为省略号 */}
        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachement</Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}
        {/* POST按钮 */}
        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: '3rem',
          }}>
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  )
}

export default MyPostWidget
