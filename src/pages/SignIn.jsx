import { useNavigate } from "react-router-dom"
import { logOut, signIn } from "../firebase"
import { useContext, useEffect, useState } from "react"
import { Context } from "../context/AuthContext"

const SignIn = () => {

    const navigate = useNavigate()
    const [success, setSuccess] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const {user} = useContext(Context)

    const handleSignIn = async(e) => {
        setLoading(true)
        setError('')
        e.preventDefault()
        try{
            signIn(email, password).then((result) => {
                console.log(result)
                if(typeof result === "object"){
                    setSuccess(true)
                    setLoading(false)
                }else{
                    setError(result)
                    setSuccess(false)
                    setLoading(false)
                }
            })
        }catch(error){
            console.log('error when sign-in: ', error)
            setError(error.message)
            setLoading(false)
        }
    }

    const handleLogOut = async() => {
        setLoading(true)
        try{
            await logOut()
            setLoading(false)
        }catch(error){
            console.log('error logout: ', error)
            setLoading(false)
        }
    }

    useEffect(() => {
        if(success){
            navigate('/home')
        }
    },[success])

    return(
        <div className="background-image">
            { user ? 
                <>
                    <div className='absolute w-full h-screen bg-black bg-opacity-70 z-20'></div>
                    <div className='absolute left-0 right-0 mx-auto top-56 w-56 h-40 z-30 bg-white bg-opacity-90 rounded-md'>
                        <p className='pt-8 pb-4 px-2 text-center'>You're already signed in. Do you wan't to logout?</p>
                        <div className='flex justify-center items-center gap-10 font-bold text-[19px]'>
                            <button onClick={(e) => navigate('/home')}>Cancel</button>
                            <button onClick={(e) => handleLogOut() } className='text-red-700'>Log out</button>
                        </div>
                    </div>
                </>
            : null }
            { loading ? 
                    <div className="custom-loader absolute top-20 left-[50%] z-10"></div>
            : null }
            <div className="absolute w-full h-screen bg-black bg-opacity-60"></div>
            <h1 onClick={(e) => navigate('/')} className="text-red-600 text-2xl font-bold p-5 cursor-pointer opacity-90">NETFLIX</h1>
            <h1 className="text-white w-full text-center font-bold text-3xl p-5 mb-5 opacity-90">Sign In</h1>
            <div className="flex flex-col justify-center items-center text-center gap-5 opacity-90">
                <div className="bg-white rounded-md">
                    <input onChange={(e) => setEmail(e.target.value)} className="text-white bg-black/90 rounded-md border-2 border-gray-500 py-4 pr-36 pl-6" type="text" placeholder="Email" />
                </div>
                <div className="bg-white rounded-md mb-4">
                    <input onChange={(e) => setPassword(e.target.value)} className="text-white bg-black/90 rounded-md border-2 border-gray-500 py-4 pr-36 pl-6" type="password" placeholder="Password" />
                </div>
                { error ? <p className="text-red-500 text-md pb-5">{error}</p> : null}
                <button onClick={handleSignIn} className="text-white text-xl bg-red-600 font-bold py-2 px-36 rounded-md">Sign In</button>
            </div>
            <p className="text-gray-400 p-5 pt-40 opacity-90">New to netflix? <a className="text-white" href="/sign-up">Sign up now.</a></p>
        </div>
    )
}

export default SignIn