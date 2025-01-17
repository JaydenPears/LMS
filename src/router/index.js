import Auth from "../pages/Auth";
import CatalogOfCourses from "../pages/CatalogOfCourses";
import CourseDescription from "../pages/CourseDescription";
import ResultOfTest from "../pages/ResultOfTest";
import Test from "../pages/Test";


export const arrayRoutes = [
    {id: 0, path: "", element: <CatalogOfCourses/>, exact: true},
    {id: 1, path: "/auth", element: <Auth/>, exact: true},
    {id: 2, path: "/about", element: <div></div>, exact: true},
    {id: 4, path: "/course_info/:id", element: <CourseDescription/>, exact: true},
    {id: 5, path: "/test/:id", element: <Test/>, exact: true},
    {id: 6, path: "/test/:id/get_result", element: <ResultOfTest/>}
]