import Admin from '@/components/admin/index/Index'
import Cate from '@/components/admin/cate/Cate'
import CateCreate from '@/components/admin/cate/CateCreate'
import CateEdit from '@/components/admin/cate/CateEdit'
import Articel from '@/components/admin/articel/Articel'
import Login from '@/components/admin/login/Login'

let routes = [
  {
    path: '/admin/login',
    name: "Login",
    component: Login
  },
  {
    path: '/',
    name: 'Admin',
    component: Admin,
    default: 'Admin',
    children: [

      {
        path: '',
        name: 'Cate',
        component: Cate,
      },
      {
        path: '/admin/cate/create',
        name: 'CateCreate',
        component: CateCreate,
      },
      {
        path: '/admin/cate/:id/edit',
        name: 'CateEdit',
        component: CateEdit,
        props: true
      },
      {
        path: '/admin/articel',
        name: 'Articel',
        component: Articel
      }
    ]
  }
];

export default routes;
