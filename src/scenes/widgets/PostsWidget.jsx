import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from 'state'
import PostWidget from './PostWidget'

const PostsWidget = ({ userId, isProfile = false }) => {
  /* 注意两种情况: 1)获取所有posts 2)获取当前user的posts */
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts)
  const token = useSelector((state) => state.token)

  const getPosts = async () => {
    /* 从服务端获取post并且dispatch setPosts acton给redux用以更新post*/
    const response = await fetch('https://vibes-media-server.onrender.com/posts', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    dispatch(setPosts({ posts: data }))
  }

  const getUserPosts = async () => {
    /* 从服务端获取post并且dispatch setPosts acton给redux用以更新post*/
    const response = await fetch(`https://vibes-media-server.onrender.com/posts/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    dispatch(setPosts({ posts: data }))
  }

  useEffect(() => {
    if (isProfile) getUserPosts()
    else getPosts()
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            isProfile={isProfile}></PostWidget>
        )
      )}
    </>
  )
}

export default PostsWidget
