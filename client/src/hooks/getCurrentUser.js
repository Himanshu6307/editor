import { useEffect } from "react"
import { useDispatch } from "react-redux"
// import { AxiosInstance } from "../axios/axios"
import { setIsLoading, setUserDetail } from "../Store/Slices/user.slice"
import axios from "axios"

const useGetCurrentUser = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/v1/user/getcurrentuser", {
                    withCredentials: true,
                })
                console.log(response.data)
                dispatch(setUserDetail(response.data))
                dispatch(setIsLoading(false))

            } catch (error) {
                dispatch(setUserDetail(null)); 
                dispatch(setIsLoading(false))
                console.error("error in frontend hook getuser", error)
            }
        })()
    }, [dispatch])
}

export default useGetCurrentUser