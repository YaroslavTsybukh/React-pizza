import {Routes , Route} from "react-router-dom";
import {useState , createContext} from "react";

import {Header} from "./components/Header";
import {Homepage} from "./pages/Homepage"
import {NotFoundPage} from "./pages/NotFoundPage";
import {Cart} from "./pages/Cart"

import './scss/app.scss';

function App() {
    const [searchValue , setSearchValue] = useState("")
    return (
        <div className="wrapper">
            <Header value={searchValue} changeValue={setSearchValue}/>
            <div className='content'>
                <div className='container'>
                    <Routes>
                        <Route path="/" element={<Homepage searchValue={searchValue}/>} />
                        <Route path="*" element={<NotFoundPage />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
