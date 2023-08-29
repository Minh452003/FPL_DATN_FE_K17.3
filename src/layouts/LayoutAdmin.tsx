import { Outlet } from "react-router-dom"

const LayoutAdmin = () => {
    return (
        <div>
            <aside>
                <h2>
                    LayoutAdmin
                </h2>
            </aside>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default LayoutAdmin