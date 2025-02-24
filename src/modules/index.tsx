import loadable from '@loadable/component'
import { Loading } from '@components';
import SignIn from './auth/sign-in/index'

const AdminPanel = loadable(() => import('./admin-panel'), {
  fallback: <Loading />
});
const TeacherPanel = loadable(() => import('./teacher-panel'), {
  fallback: <Loading />
});
const TeacherList = loadable(() => import('./admin-panel/teacher-list/pages'), {
  fallback: <Loading />
});


const FaceList = loadable(() => import('./admin-panel/face-list/pages'), {
  fallback: <Loading />
});

const NotFound = loadable(() => import('./not-found'), {
  fallback: <Loading />
});
export {
  SignIn,
  AdminPanel,
  TeacherPanel,
  TeacherList,
  FaceList,
  NotFound,
}