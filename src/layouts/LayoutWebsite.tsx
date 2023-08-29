import { Outlet } from "react-router-dom"

const LayoutWebsite = () => {
    return (
        <div>
            <h2>LayoutWebsite</h2>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default LayoutWebsite