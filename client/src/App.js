import Login from "./components/admin/Login";
import Home from "./components/admin/Home";
import Register from "./components/admin/Register";
import Courses from "./components/admin/Courses";
import {BrowserRouter as Router , Routes , Route} from "react-router-dom";
import AllCourses from "./components/admin/AllCourses";
import EditCourse from "./components/admin/EditCourse";


function App() {
  return (
   <Router>
    
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/admin/login" element={<Login/>}/>
    <Route path="/admin/register" element={<Register/>}/>
    <Route path="/admin/courses" element={<Courses/>}/>
    <Route path="/admin/allcourses" element={<AllCourses/>}/>
    <Route path="/admin/editcourse/:courseId" element={<EditCourse/>}/>
    
    
    </Routes>




   </Router>
  );
}

export default App;
