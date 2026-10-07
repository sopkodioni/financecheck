import { useSelector } from "react-redux"
import type { RootState } from "../store/store"

const DashboardPage = () => {
    const { user } = useSelector((state: RootState) => state.auth)

    return (
        <>
            <h1>Hello, {user.name}!</h1>
            <p>Email: {user.email}</p>
        </>
    )
}

export default DashboardPage 