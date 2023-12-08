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
import { Formik,Form } from "formik";
import SelectOptions from "./SelectOptions";

const FormCreatCourse = () => {
  const validation = yup.object().shape({
    Title: yup.string().required("لطفا عنوان مورد نظر را وارد نمایید"),
    coursetechnol: yup.string().required("لطفا تکنولوژی یاد گیری را وارد نمایید"),
    courseStatus: yup.string().required("لطفا وضعیت  کلاس را مشخص کنید"),
    courseLvl: yup.string().required("لطفا سطح کلاس را وارد نمایید."),
    courseType: yup.string().required("لطفا نوع کلاس را مشخص کنید"),
    courseterm: yup.string().required("لطفا ترم کلاس مربوطه را مشخص کنید"),
    Capacity: yup.string().required("ظرفیت کلاس را مشخص کنید"),
    Describe: yup.string().required("لطفا توضیحات  را وارد نمایید"),
    courseroom: yup.string().required("لطفاشماره کلاس را وارد نمایید"),
    courseteach: yup.string().required("لطفاشماره استاد   را مشخص کنید"),
    MiniDescribe: yup.string().required("لطفا مینی توضیح  را وارد نمایید."),
    TeacherId: yup.string().required("لطفاآی دی  را مشخص کنید"),
    StartTime: yup.string().required("لطفا زمان شروع دورهرا مشخص کنید"),
    EndTime: yup.string().required(" زمان پایان دوره را مشخص کنید"),
    GoogleSchema: yup.string().required("لطفا شمای گوگل  را وارد نمایید"),
    GoogleTitle: yup.string().required("لطفا عنوان کلاس را مشخص کنید"),
    ImageAddress: yup.string().required("لطفا آدرس عکس را مشخص کنید"),
    TumbImageAddress: yup.string().required(" عکس کوچک شده را مشخص کنید"),
    ShortLink: yup.string().required("لطفا لینک کوتاه  را وارد نمایید"),
    Image: yup.string().required("لطفا نوع کلاس را مشخص کنید"),
    Cost: yup.string().required("لطفا قیمت   را مشخص کنید"),
    SessionNumber: yup.string().required(" تعداد جلسات را مشخص کنید"),
    UniqeUrlString: yup.string().required("لطفا یوآر ال  را وارد نمایید"),
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
      CoursePrerequisiteId:null,
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
        }}
        validationSchema={validation}
        onSubmit={CreatCourse}
      >
        {({ values, handleSubmit, handleChange }) => (
          <Form>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">ایجاد دوره جدید </CardTitle>
              </CardHeader>
              <CardBody>
                <SelectOptions values={values} />
                <div className="d-flex">
                  <Button className="me-1" color="primary" type="submit"  onSubmit={CreatCourse}>
                    اضافه کردن
                  </Button>
                  <Button
                    outline
                    color="secondary"
                    type="reset"
                  >
                    ریست
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

export default FormCreatCourse;
