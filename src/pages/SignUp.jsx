import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"
// import { UserAuth } from "../context/AuthContext"
import { useContext, useEffect, useState } from "react"
import { logOut, signUp } from "../firebase"
import { Context } from "../context/AuthContext"

const SignUp = () => {

    const navigate = useNavigate()
    const [success, setSuccess] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [secondPassword, setSecondPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const {user} = useContext(Context)

    const handleSignUp = async (e) => {
        setLoading(true)
        setError('')
        e.preventDefault()
        try{
            if(password===secondPassword){
                await signUp(email, password).then((result) => {
                    console.log('result: ', result)
                    if(typeof result === 'object'){
                        console.log('object')
                        setSuccess(true)
                        setLoading(false)
                    }else{
                        console.log('else')
                        setError(result)
                        setSuccess(false)
                        setLoading(false)
                        console.log('error: ',error)
                    }
                })
            }else{
                setError('Password not match!')
                setLoading(false)
            }
        }catch(error){
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
        <div className="background-image bg-white h-screen">
            { user && !loading ? 
                <div className="flex justify-center">
                    <div className='absolute w-full h-screen bg-black bg-opacity-70 z-10'></div>
                    <div className='absolute top-56 w-64 h-52 bg-white bg-opacity-80 rounded-md z-10'>
                        <p className='pt-8 pb-4 px-2 text-center'>You need to log out first to make an account.</p>
                        <div className='h-20 flex gap-2 justify-center items-end font-bold text-[19px]'>
                            <button onClick={(e) => navigate('/home')} className="rounded-md hover:text-white hover:bg-gray-500 px-5 py-1">Cancel</button>
                            <button onClick={(e) => handleLogOut() } className='text-red-700 rounded-md hover:text-white hover:bg-red-700 px-5 py-1'>Confirm</button>
                        </div>
                    </div>
                </div>
            : null }
            { loading ? 
                    <div className="custom-loader absolute top-20 left-[50%] z-10"></div>
            : null }
            <div className="absolute w-full h-screen sm:bg-black sm:bg-opacity-70"></div>
            <FontAwesomeIcon onClick={(e) => navigate('/')} className="absolute right-0 p-5 text-3xl sm:text-white opacity-90 cursor-pointer" icon={faXmark} />
            <div className="pt-32 flex flex-col justify-center items-center text-center opacity-90">
                <h1 className="text-black font-bold text-3xl sm:text-white">Ready to watch?</h1>
                <p className="w-[90%] text-xl text-gray-600 sm:text-gray-200 py-10">Enter your email to create or sign in to your account.</p>
                <input onChange={(e) => setEmail(e.target.value)} className="border-green-500 border-2 pr-20 pl-5 py-2 rounded-lg mb-5" type="text" placeholder="Email" />
                <input onChange={(e) => setPassword(e.target.value)} className="border-green-500 border-2 pr-20 pl-5 py-2 rounded-lg mb-5" type="password" placeholder="Password" />
                <input onChange={(e) => setSecondPassword(e.target.value)} className="border-green-500 border-2 pr-20 pl-5 py-2 rounded-lg mb-2" type="password" placeholder="Re-type password" />
                {error ? <p className="text-red-500 text-md pb-5">{error}</p> : null}
                <button onClick={handleSignUp} className="text-white font-bold bg-red-600 rounded-md py-2 px-28">Sign Up</button>
            </div>
        </div>
    )
}

export default SignUp