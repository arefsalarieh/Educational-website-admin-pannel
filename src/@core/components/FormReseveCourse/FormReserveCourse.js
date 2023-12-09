// ** React Imports
import { Fragment } from "react";

// ** Third Party Components
import * as yup from "yup";
import toast from "react-hot-toast";
import { Check } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  // Form,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import { useQuery } from "react-query";
import http from "../../interceptor";
import { Formik, Form } from "formik";

const FormReserveCourse = () => {
  const validation = yup.object().shape({
    courseId: yup.string().required("لطفا درس برای رزرو مشخص کنید"),
    courseGroupId: yup.string().required("لطفا   گروه درسی را وارد نمایید"),
    studentId: yup.string().required("لطفادانشجویی که درس را رزر کردمشخص کنید"),
  });

  // ** Hooks
  const { reset } = useForm({ mode: "onChange" });

  const CreatCourse = async (values) => {
    const dataForm = new FormData();

    const setCourses = {
      Title: values.Title,
      Describe: values.Describe,
      MiniDescribe: values.MiniDescribe,
      Capacity: values.Capacity,
      CourseTypeId: values.CourseTypeId,
      SessionNumber: values.SessionNumber,
      CurrentCoursePaymentNumber: 0,
      CoursePrerequisiteId: null,
      TremId: values.TremId,
      ClassId: values.ClassId,
      CourseLvlId: values.CourseLvlId,
      TeacherId: values.TeacherId,
      Cost: values.Cost,
      UniqeUrlString: values.UniqeUrlString,
      ShortLink: values.ShortLink,
      TumbImageAddress: values.TumbImageAddress,
      ImageAddress: values.ImageAddress,
      Image: values.Image,
    };
    const keys = Object.keys(setCourses);
    keys.forEach((key) => {
      const item = setCourses[key];
      dataForm.append(key, item);
      console.log(dataForm);
    });
    const res = await http.post(`/Course`, dataForm);
    return res;
  };

  const reseveCourseFnc = async (values) => {
    const userobj = {
      courseId: values.courseId,
      courseGroupId: values.courseGroupId,
      studentId: values.studentId,
    };

    console.log(values.remember);
    console.log(userobj);
    const user = await loginAPI(userobj);
    console.log(user);
    setItem("token", user.token);
    if (user.success === true) {
      // toast.success(user.message);
      swal(user.message, "", "success");
      setTimeout(() => {
        navigate("/studentPanel");
      }, "2000");
    } else {
      // toast.error(user.message);
      sweetAlert("", user.message, "error");
    }
  };
  {
    return (
      <Formik
        initialValues={{
          Title: "",
          technology: "",
          courseStatus: "",
          CourseLvlId: "",
          CourseTypeId: "",
          TremId: "",
          Describe: "",
          MiniDescribe: "",
          Capacity: "",
          CourseTypeId: "",
          SessionNumber: "",
          CurrentCoursePaymentNumber: "",
          ClassId: "",
          CourseLvlId: "",
          TeacherId: "",
          Cost: "",
          StartTime: "",
          EndTime: "",
          GoogleSchema: "",
          GoogleTitle: "",
          CoursePrerequisiteId: "",
          ShortLink: "",
          TumbImageAddress: "",
          ImageAddress: "",
          Image: "",
          UniqeUrlString: "",
        }}
        validationSchema={validation}
        onSubmit={CreatCourse}
      >
        {({ values, handleSubmit, handleChange }) => (
          <Form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">ایجاد دوره جدید </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="d-flex">
                  <Button className="me-1" color="primary" type="submit">
                    اضافه کردن
                  </Button>
                  <Button outline color="secondary" type="reset">
                    ffffffffffffffffffffffffffffffffffff
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Form>
        )}
      </Formik>
    );
  }
};

export default FormReserveCourse;
