// ** React Imports
import { Fragment, lazy } from "react";
import { Navigate } from "react-router-dom";
// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";

// ** Utils
import { isObjEmpty } from "@utils";

// import TableCourses from "../../@core/components/CourseTable/TableCourses";
// import FormDetailCourse from "../../@core/components/DetailCourse/FormDetailCourse";
// import FormCreatCourse from "../../@core/components/FormCreatCourse/FormCreatCourse";
// import ReserveCourselist from "../../@core/components/CourseTable/ReserveCourselist/ReserveCourselist";


const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/login";


const Home = lazy(() => import("../../@core/components/home"));
const ReserveCourseList = lazy(() => import("../../@core/components/CourseTable/ReserveCourseList/ReserveCourseList"));
const News = lazy(() => import("../../@core/components/news/News"));
const AllUsers = lazy(() => import("../../@core/components/UserTable/AllUsers"));
const AdminTable = lazy(() => import("../../@core/components/UserTable/AdminTable"));
const TeacherTable = lazy(() => import("../../@core/components/UserTable/TeacherTable"));
const StudentTable = lazy(() => import("../../@core/components/UserTable/StudentTable"));
const FreeUserTable = lazy(() => import("../../@core/components/UserTable/FreeUserTable"));
const MentorsTable = lazy(() => import("../../@core/components/UserTable/MentorsTable"));
const CreateUser = lazy(() => import("../../@core/components/CreateUser/CreateUser"));
const Profile = lazy(() => import('../../@core/components/profile'))
const UpdadeUsre = lazy(() => import('../../@core/components/UpdadeUsre/UpdadeUsre'))
const TableCourses = lazy(() => import('../../@core/components/CourseTable/TableCourses'))
const FormDetailCourse = lazy(() => import('../../@core/components/DetailCourse/FormDetailCourse'))
const FormCreatCourse = lazy(() => import('../../@core/components/FormCreatCourse/FormCreatCourse'))
const UpdateCourse = lazy(() => import('../../@core/components/UpdateCourse/UpdateCourse'))
const SecondPage = lazy(() => import("../../pages/SecondPage"));
const Login = lazy(() => import("../../pages/Login"));
const Register = lazy(() => import("../../pages/Register"));
const ForgotPassword = lazy(() => import("../../pages/ForgotPassword"));
const Error = lazy(() => import("../../pages/Error"));
const Sample = lazy(() => import("../../pages/Sample"));
const AddNews = lazy(() => import("../../@core/components/news/AddNews"));
const NewsDetail = lazy(() => import("../../@core/components/news/details"));

// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/UsersList/AllUsers",
    element: <AllUsers />,
  },    
  {
    path: "/UsersList/AdminTable",
    element: <AdminTable />,
  },  
  {
    path: "/UsersList/TeacherTable",
    element: <TeacherTable />,
  },  
  {
    path: "/UsersList/StudentTable",
    element: <StudentTable />,
  },   
  {
    path: "/UsersList/FreeUserTable",
    element: <FreeUserTable />,
  }, 
  {
    path: "/UsersList/MentorsTable",
    element: <MentorsTable />,
  }, 
  {
    path: "/UsersList/CreateUser",
    element: <CreateUser />,
  },  
  {
    path: '/pages/profile/:id',
    element: <Profile />
  },
  {
    path: '/pages/UpdadeUsre/:id',
    element: <UpdadeUsre />
  },
  {
    path: '/TableCourses',
    element: <TableCourses />
  },  
  {
    path: '/ReserveCourseList',
    element: <ReserveCourseList />
  },
  {
    path: "/DetailCourse/:id",
    element: <FormDetailCourse />,
  },
  {
    path: "/FormCreatCourse",
    element: <FormCreatCourse />,
  },  
  {
    path: "/UpdateCourse/:id",
    element: <UpdateCourse />,
  },    
  {
    path: "/sample",
    element: <Sample />,
  },
  //
  {
    path: "/news",
    element: <News />,
  },
  {
    path: "/news/newsDetail/:id",
    element: <NewsDetail />,
  },
  {
    path: "/addNews",
    element: <AddNews />,
  },
  {
    path: "/editNews/:id",
    element: <AddNews />,
  },
  {
    path: "/second-page",
    element: <SecondPage />,
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "*",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
