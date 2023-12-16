// ** React Imports
import { Fragment } from "react";

// ** Roles Components
// import Table from './Table'
import RoleCards from "./RoleCards";

const Roles = () => {
  return (
    <Fragment>
      <h3>لیست رولها</h3>
      <p className="mb-2">
        نقش دسترسی به منوها و ویژگی های از پیش تعریف شده را بسته به آن فراهم می
        کند نقشی به یک مدیر اختصاص داده شده که بتواند به آنچه نیاز دارد دسترسی
        داشته باشد.
      </p>
      <RoleCards />
    </Fragment>
  );
};

export default Roles;
