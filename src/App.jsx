import { Route,BrowserRouter as Router, Routes, } from "react-router-dom";
import Navbar from "./components/navbar.component"
import UserAuthForm from "./components/userAuthForm"
import UserSignForm from "./components/userSignForm"
import { BlogEditor } from "./components/blog-editor.component";
import HomePage from "./components/home-component"
import {Layout} from "./components/layout"
import BlogPage from "./components/blog-page";

const App = () => {
    return (
        <Router>
            <Navbar /> 
            
            <Routes>
                <Route path="/signup" element={<UserAuthForm />}/>
                <Route path="/" element={<HomePage />}/>
                <Route path="/blogeditor" element={<BlogEditor/>}/>
                {/* <Route path="/blog" element={<Blog/>}/> */}
                <Route path="/signin" element={<UserSignForm />} />   
                <Route path="blog/:blog_id" element={<BlogPage />} />
            </Routes>
            
        </Router>

    //     <Router>
            
    //     <Routes>
    //         <Route path="/" element={<Layout/>}>
    //         <Route path="signup" element={<UserAuthForm />}/>
    //         <Route path="home" element={<HomePage />}/>
    //         <Route path="signin" element={<UserSignForm />} /> 

    //         </Route>
    //         <Route path="/blogeditor" element={<BlogEditor/>}/>
            
    //         {/* <Route path="/blog" element={<Blog/>}/> */}
              
    //     </Routes>
    // </Router>




        
    )
}

export default App;