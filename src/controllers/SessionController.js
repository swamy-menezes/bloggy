// import bcrypt from 'bcrypt'
import User from '../models/User'

class SessionController {
  async store(request, response) {
    const { email, password } = request.body

    const user = await User.findOne({ email })

    if (!user) {
      return response.status(401).json({ error: 'User is not registered.' })
    }

    if(!(await bcrypt.compare(password, user.password))) {
        return response.status(401).json({ error: 'Invalid password.' })
    }

    const { id, name } = user

    return response.status(201).json({ 
        user: {
            id,
            name,
            email
        }
    })

  }
}

export default new SessionController()
