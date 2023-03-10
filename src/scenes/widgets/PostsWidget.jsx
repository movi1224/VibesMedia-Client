import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from 'state'
import PostWidget from './PostWidget'
import { SERVER_URL } from 'Constants'

const PostsWidget = ({ userId, isProfile = false }) => {
  /* 注意两种情况: 1)获取所有posts 2)获取当前user的posts */
  const dispatch = useDispatch()
  const rawPosts = useSelector((state) => state.posts)
  const posts = [...rawPosts].reverse()
  const token = useSelector((state) => state.token)

  const getPosts = async () => {
    /* 从服务端获取post并且dispatch setPosts acton给redux用以更新post*/
    const response = await fetch(`${SERVER_URL}/posts`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    dispatch(setPosts({ posts: data }))
  }

  const getUserPosts = async () => {
    /* 从服务端获取post并且dispatch setPosts acton给redux用以更新post*/
    const response = await fetch(`${SERVER_URL}/posts/${userId}`, {
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
          createdAt,
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
            isProfile={isProfile}
            createdAt={createdAt}></PostWidget>
        )
      )}
    </>
  )
}

export default PostsWidget
