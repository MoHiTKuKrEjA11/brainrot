import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './Homepage'
import JobList from './JobList';
 const App = () => {
    return (
        <>
        
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Homepage />}></Route>
                <Route exact path='/internships' element={<JobList />}></Route>
                <Route exact path='/newgrad' element={<JobList />}></Route>
            </Routes>
        </BrowserRouter>
        </>
    )
}
export default App;
