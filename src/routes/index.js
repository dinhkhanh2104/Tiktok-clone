import config from '~/config'

// Layout
import { HeaderOnly } from "~/layouts"


// Page
import HomePage from "~/pages/Home"
import FollowingPage from "~/pages/Following"
import ProfilePage from "~/pages/Profile"
import UploadPage from "~/pages/Upload"
import SearchPage from "~/pages/Search"


// not request login to see page
const publicRoutes = [
    { path: config.routes.home, component: HomePage },
    { path: config.routes.following, component: FollowingPage },
    { path: config.routes.profile, component: ProfilePage },
    { path: config.routes.upload, component: UploadPage, layout: HeaderOnly },
    { path: config.routes.search, component: SearchPage, layout: null }

]

// must login to see page
const privateRoutes = [

]

export { publicRoutes, privateRoutes } 