import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState, createContext } from "react"

export const Context = createContext()

export const AuthContext = ({children}) => {
    
    const auth = getAuth()
    const [user, setUser] = useState()
    const [detailedMovie, setDetailedMovie] = useState([])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser){
                setUser(currentUser)
            }else{
                setUser(null)
            }
        })
        return () => {
            if(unsubscribe) unsubscribe()
        }
    },[])

    const values = {
        user: user,
        setUser: setUser,
        detailedMovie: detailedMovie,
        setDetailedMovie: setDetailedMovie
    }
    return <Context.Provider value={values}>{children}</Context.Provider>
}