import Main from './Main';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Main/>} />
                    <Route path="*" element={<NotFoundPage/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
