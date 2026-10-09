import { useSelector } from "react-redux"
import type { RootState } from "../store/store"
import { Navigate, Outlet } from "react-router"

export const ProtectedRoute = () => {
    const { isAuth, isLoading } = useSelector( (state: RootState) => state.auth )

    if(isLoading) {
        return <div>Loading...</div>
    }

    if(!isAuth){
        return <Navigate to='/login' replace />
    }

    return <Outlet />
}

export default ProtectedRoute