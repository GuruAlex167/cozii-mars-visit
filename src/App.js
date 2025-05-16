import Main from './Main';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" component={Main} />
                    <Route path="*" component={App} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
