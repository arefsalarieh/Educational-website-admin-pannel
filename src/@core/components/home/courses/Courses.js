// ** React Imports
import { Fragment } from "react";

// ** Roles Components
// import Table from './Table'
import CourseCards from "./CourseCards";

const Courses = () => {
  return (
    <Fragment>
      <h3>لیست دوره‌ها بر اساس تکنولوژی</h3>
      <p className="mb-2">
        نقش دسترسی به منوها و ویژگی های از پیش تعریف شده را بسته به آن فراهم می
        کند نقشی به یک مدیر اختصاص داده شده که بتواند به آنچه نیاز دارد دسترسی
        داشته باشد.
      </p>
      <CourseCards />
    </Fragment>
  );
};

export default Courses;
