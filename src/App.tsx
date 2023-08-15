import {lazy , Suspense} from "react";
import {Routes , Route} from "react-router-dom";
import {ROUTES} from "./routes";

import {Homepage} from "./pages/Homepage"
import './scss/app.scss';
import {PrivateRoute} from "./core/utils/router/privateRoute";
import {FormForEntry} from "./components";

const Header = lazy(() => import("./components/smart/Header"))
const NotFoundPage= lazy(() => import("./pages/NotFoundPage"))
const Cart = lazy(() => import("./pages/Cart"))
const Pizza = lazy(() => import("./pages/PizzaPage/Pizza"))
const Profile = lazy(() => import("./pages/Profile/Profile"))

function App() {
    return (
        <div className="wrapper">
            <Header />
            <div className='content'>
                <div className='container'>
                    <Suspense fallback={<div>... Идёт Загрузка</div>}>
                        <Routes>
                            <Route path={ROUTES.HOME} element={<Homepage />} />
                            <Route element={<PrivateRoute />} >
                                <Route path={ROUTES.PROFILE} element={<Profile />} />
                            </Route>
                            <Route path={ROUTES.NOTFOUND} element={<NotFoundPage />} />
                            <Route path={ROUTES.CART} element={<Cart />} />
                            <Route path={ROUTES.LOGIN} element={<FormForEntry />} />
                            <Route path="/pizza/:id" element={<Pizza />} />
                        </Routes>
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

export default App;
