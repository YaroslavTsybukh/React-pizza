import {Routes , Route} from "react-router-dom";
import {useState , createContext} from "react";

import {Header} from "./components/Header";
import {Homepage} from "./pages/Homepage"
import {NotFoundPage} from "./pages/NotFoundPage";
import {Cart} from "./pages/Cart"

import './scss/app.scss';

export const SearchContext = createContext()

function App() {
    const [searchValue , setSearchValue] = useState("")
    return (
        <SearchContext.Provider value={{searchValue , setSearchValue}}>
            <div className="wrapper">
                <Header />
                <div className='content'>
                    <div className='container'>
                        <Routes>
                            <Route path="/" element={<Homepage />} />
                            <Route path="*" element={<NotFoundPage />} />
                            <Route path="/cart" element={<Cart />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </SearchContext.Provider>
    );
}

export default App;
