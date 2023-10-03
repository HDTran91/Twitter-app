import databaseService from '~/services/database.services'
import User from '~/models/schemas/User.schema'

class UsersService {
  register(payload: { email: string, password: string }) {
    const { email, password } = payload
    const result = databaseService.users.insertOne(new User({ email, password }))
    return result
  }
}

const usersService = new UsersService()
export default usersService
