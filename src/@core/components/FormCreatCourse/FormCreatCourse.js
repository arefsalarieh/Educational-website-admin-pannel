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
  Form,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import { useQuery } from "react-query";
import http from "../../interceptor";
import { Formik } from "formik";
import SelectOptions from "./SelectOptions";

const FormCreatCourse = () => {
  const validation = yup.object().shape({
    title: yup.string().required("لطفا عنوان مورد نظر را وارد نمایید"),
    technology: yup.string().required("لطفا تکنولوژی یاد گیری را وارد نمایید"),
    status: yup.string().required("لطفا وضعیت  کلاس را مشخص کنید"),
    level: yup.string().required("لطفا سطح کلاس را وارد نمایید."),
    type: yup.string().required("لطفا نوع کلاس را مشخص کنید"),
    term: yup.string().required("لطفا ترم کلاس مربوطه را مشخص کنید"),
    capacity: yup.string().required("ظرفیت کلاس را مشخص کنید"),
    describe: yup.string().required("لطفا توضیحات  را وارد نمایید"),
  });

  // ** Hooks
  const { reset } = useForm({ mode: "onChange" });

  const handleReset = () => {
    reset({
      Title: "",
      technology: "",
      status: "",
      CourseLvlId: "",
      CourseTypeId: "",
      TremId: "",
      Describe: "",
      MiniDescribe:"",
      Capacity:"",
      CourseTypeId:"",
      SessionNumber:"",
      CurrentCoursePaymentNumber:"",
      ClassId:"",
      CourseLvlId:"",
      TeacherId:"",
      Cost:"",
      StartTime:"",
      EndTime:"",
      GoogleSchema:"",
      GoogleTitle:"",
      CoursePrerequisiteId:"",
      ShortLink:"",
      TumbImageAddress:"",
      ImageAddress:""
    });
  };

  const CreatCourse = async (values) => {
    const dataForm = new FormData();

    const setCourses = {
       Title :values.Title,
       Describe : values.Describe,
       MiniDescribe : values.MiniDescribe,
       Capacity :values.Capacity,
       CourseTypeId : values.CourseTypeId,
       SessionNumber : values.SessionNumber,
       CurrentCoursePaymentNumber :values.CurrentCoursePaymentNumber,
       TremId : values.TremId,
       ClassId : values.ClassId,
       CourseLvlId :values.CourseLvlId,
       TeacherId : values.TeacherId,
       Cost : values.Cost,
       UniqeUrlString :values.UniqeUrlString,
       ShortLink : values.ShortLink,
       TumbImageAddress : values.TumbImageAddress,
       ImageAddress :values.ImageAddress,
    };
    const keys = Object.keys(setCourses);
    keys.forEach((key) => {
      const item = setCourses[key];
      dataForm.append(key, item);
      console.log(data);
    });
    const res = await http.post(`/Course`, dataForm);
    return res;
  };


  {
    return (
      <Formik
        initialValues={{
          Title: "",
          technology: "",
          // status: "",
          CourseLvlId: "",
          CourseTypeId: "",
          TremId: "",
          Describe: "",
          MiniDescribe:"",
          Capacity:"",
          CourseTypeId:"",
          SessionNumber:"",
          CurrentCoursePaymentNumber:"",
          ClassId:"",
          CourseLvlId:"",
          TeacherId:"",
          Cost:"",
          StartTime:"",
          EndTime:"",
          GoogleSchema:"",
          GoogleTitle:"",
          CoursePrerequisiteId:"",
          ShortLink:"",
          TumbImageAddress:"",
          ImageAddress:""
        }}
        validationSchema={validation}
        onSubmit={CreatCourse}
      >
        {({ values, handleSubmit, handleChange }) => (
          <Card>
            <CardHeader>
              <CardTitle tag="h4">ایجاد دوره جدید </CardTitle>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <SelectOptions values={values}/>
              </form>

              <div className="d-flex">
                <Button className="me-1" color="primary" type="submit">
                  اضافه کردن
                </Button>
                <Button
                  outline
                  color="secondary"
                  type="reset"
                  onClick={handleReset}
                >
                  ریست
                </Button>
              </div>
            </CardBody>
          </Card>
        )}
      </Formik>
    );
  }
};

export default FormCreatCourse;
