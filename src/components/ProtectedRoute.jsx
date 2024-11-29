import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { Context } from "../context/AuthContext"


const ProtectedRoute = ({ children }) => {

    const navigate = useNavigate()
    const {user} = useContext(Context)

    console.log('protected route user: ', user)

    return user ? children : navigate('/')

}

export default ProtectedRoute