import { ipcMain } from 'electron'
import User from 'db/models/user'

ipcMain.handle('user:register', async (e, args) => {
  try {
    console.log(args)
    const { name, email, password } = args
    const user = new User({ name, email, password })
    return { result: null, data: await user.save() }
  } catch (err) {
    console.error(err)
    return { result: 'err', error: err }
  }
})

ipcMain.handle('user:checkEmail', async (e, email) => {
  return await User.exists({ email: email })
})

ipcMain.handle('user:login', async (e, args) => {
  const { email, password } = args
  const user = await User.findOne({ email: email })
  if (!user) return { result: false, data: '사용자가 존재 하지 않습니다.' }
  const confirmPassword = await user.verifyPassword(password)
  if (!confirmPassword)
    return { result: false, data: '비밀번호가 일치하지 않습니다.' }
  return { result: true, data: JSON.stringify(user) }
})
