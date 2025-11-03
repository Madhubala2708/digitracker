import Department from "./Department/Index"
import Permissions from "./Permissions"
import SideNav from "./SideNav"
import { TopNav } from "./TopNav"

export default function RolesAndManagement () {
    return (
        <>
            <TopNav />
            <Permissions />
            <SideNav />
            {/* <Department /> */}
        </>
    )
}