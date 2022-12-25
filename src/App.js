import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import HomePage from 'scenes/homePage'
import LoginPage from 'scenes/loginPage'
import ProfilePage from 'scenes/profilePage'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { themeSettings } from './theme'

function App() {
  const mode = useSelector((state) => state.mode) // 拿到store中的状态
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  const isAuth = Boolean(useSelector((state) => state.token)) // 查看token是否存在
  // useMemo的目的是“减少组件重新渲染时不必要的函数计算”
  // useMemo可以将某些函数的计算结果(返回值)挂载到react底层原型链上，并返回该函数返回值的索引。
  // 当组件重新渲染时，如果useMemo依赖的数据变量未发生变化，那么直接使用原型链上保存的该函数计算结果，跳过本次无意义的重新计算，达到提高组件性能的目的
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {/* reset the original css */}
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
