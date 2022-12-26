import { useState } from 'react'
import { Box, Button, TextField, useMediaQuery, Typography, useTheme } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLogin } from 'state'
import Dropzone from 'react-dropzone'
import FlexBetween from 'components/FlexBetween'
import { SERVER_URL } from 'Constants'

const registerSchema = yup.object().shape({
  firstName: yup.string().required('required'),
  lastName: yup.string().required('required'),
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
  location: yup.string().required('required'),
  occupation: yup.string().required('required'),
  picture: yup.string().required('required'),
})

const loginSchema = yup.object().shape({
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
})

const initialValueRegister = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  location: '',
  occupation: '',
  picture: '',
}

const initialValueLogin = {
  email: '',
  password: '',
}

const Form = () => {
  const [pageType, setPageType] = useState('login')
  const { palette } = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const isLogin = pageType === 'login'
  const isRegister = pageType === 'register'

  const register = async (values, onSubmitProps) => {
    const formData = new FormData() // allow to send form info with IMAGE
    for (let value in values) {
      formData.append(value, values[value])
    }
    formData.append('picturePath', values.picture.name)
    const savedUserResponse = await fetch(`${SERVER_URL}/auth/register`, {
      method: 'POST',
      body: formData,
    })
    const savedUser = await savedUserResponse.json()
    onSubmitProps.resetForm()

    if (savedUser) setPageType('login')
  }

  const login = async (values, onSubmitProps) => {
    console.log(process.env)
    const loggedInResponse = await fetch(`${SERVER_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    const loggedIn = await loggedInResponse.json()
    onSubmitProps.resetForm()
    if (loggedIn) {
      // 给redux发送action!
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      )
      navigate('/home')
    }
  }

  const handleFormSubmit = async (val, onSubmitProps) => {
    if (isLogin) await login(val, onSubmitProps)
    if (isRegister) await register(val, onSubmitProps)
  }

  return (
    /* 利用formik创建form表单 */
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValueLogin : initialValueRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}>
      {/* Formik用法就是要包含一堆这些东西 */}
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          {/* 所有的输入填写区域 */}
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4,minmax(0,1fr))"
            sx={{ '&>div': { gridColumn: isNonMobile ? undefined : 'span 4' } }}>
            {/* Register页面的表单 */}
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: 'span 4' }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: 'span 4' }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem">
                  {/* 设置图片上传 */}
                  <Dropzone
                    acceptedFiles=".jpg, .jpeg, .png"
                    multiple={false}
                    /* 上传后获取上传图片的名称到values中 - setFieldValue */
                    onDrop={(acceptedFiles) => setFieldValue('picture', acceptedFiles[0])}>
                    {/* 以下两个函数是dropzone要求的, 相当于把dropzone的几个props传到下面的函数中 */}
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()} //赋予这个组件可以打开本地文件的功能
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ '&:hover': { cursor: 'pointer' } }}>
                        <input {...getInputProps()} />
                        {/* 若上传了则显示图片名字, 否则提示上传图片 */}
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            {/* 接下来的两项是register和login都要用到的 */}
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: 'span 4' }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: 'span 4' }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            {/* login/register时显示不同的button名字 */}
            <Button
              fullWidth
              type="submit"
              sx={{
                m: '2rem 0',
                p: '1rem',
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                '&:hover': { color: palette.primary.main },
              }}>
              {isLogin ? 'LOGIN' : 'REGISTER'}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? 'register' : 'login')
                resetForm()
              }}
              sx={{
                textDecoration: 'underline',
                color: palette.primary.main,
                '&:hover': { cursor: 'pointer', color: palette.primary.light },
              }}>
              {isLogin
                ? "Don't have an account? Sign Up here."
                : 'Already have an account? Login here.'}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default Form
