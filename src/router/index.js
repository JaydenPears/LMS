import Auth from "../pages/Auth";
import CatalogOfCourses from "../pages/CatalogOfCourses";
import CourseDescription from "../pages/CourseDescription";
import HomePage from "../pages/HomePage";
import Task from "../pages/Task";


export const arrayRoutes = [
    {id: 0, path: "", element: <HomePage/>, exact: true},
    {id: 1, path: "/auth", element: <Auth/>, exact: true},
    {id: 2, path: "/about", element: <div></div>, exact: true},
    {id: 3, path: "/catalog", element: <CatalogOfCourses/>, exact: true},
    {id: 4, path: "/course_info/:id", element: <CourseDescription/>, exact: true},
    {id: 5, path: "/task/:id", element: <Task/>, exact: true},
]