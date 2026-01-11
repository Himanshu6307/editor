import { useEffect } from "react"
import { useDispatch } from "react-redux"
import {setUserProjects } from "../Store/Slices/user.slice"
import axios from "axios"

const useGetCurrentUserProjects = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/v1/user/userproject", {
                    withCredentials: true,
                })
                console.log(response.data)
                dispatch(setUserProjects(response.data))

            }catch (error) {
                console.error("error in frontend hook getuser", error)
            }
        })()
    }, [dispatch])
}

export default useGetCurrentUserProjects