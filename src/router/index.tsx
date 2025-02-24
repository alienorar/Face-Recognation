import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import App from '../App.tsx';
import {
    SignIn,
    AdminPanel,
    TeacherPanel,
    TeacherList,
    FaceList,
    NotFound,
} from '@modules'

const Index = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route path="/" element={<App />}>
                    <Route path="/" element={<SignIn />} />
                    <Route path="admin-panel" element={<AdminPanel />}>
                        <Route index element={<TeacherList />} />
                        <Route path="face-list/:id" element={<FaceList />} />
                    </Route>
                    <Route path="teacher-panel" element={<TeacherPanel/>}>

                    </Route>
                </Route>
                <Route path="*" element={<NotFound />}></Route>
            </Route>
        )
    )
    return <RouterProvider router={router} />;
}
export default Index;

