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
  const {
    reset,
  } = useForm({ mode: "onChange" });

  const handleReset = () => {
    reset({
      title: "",
      technology: "",
      status: "",
      level: "",
      type: "",
      term: "",
      capacity: "",
      describe: "",
    });
  };

  const CreatCourse = async (values) => {
    const dataForm = new FormData();

    const setCourses = {
      // CourseId :values.id,
      // Title : values.title,
      // Describe : values.desc,
    };
    const keys = Object.keys(setCourses);
    keys.forEach((key) => {
      const item = setCourses[key];
      data.append(key, item);
      //console.log(data);
    });
    const res = await http.post(`/Course`,dataForm);
    return res;
  };

  const { data, status } = useQuery("CreatCourse", CreatCourse);

  {
    return (
      <Formik
        initialValues={{
          title:"",
          technology:"",
          status: "",
          level: "",
          type: "",
          term: "",
          capacity: "",
          describe:"",
        }}
        validationSchema={validation}
        onSubmit={CreatCourse}
      >
        <Card>
          <CardHeader>
            <CardTitle tag="h4">ایجاد دوره جدید </CardTitle>
          </CardHeader>
          <CardBody>
            {({ values, handleSubmit, handleChange }) => (
              <form  onSubmit={handleSubmit}>
                <SelectOptions/>
              </form>
            )}
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
      </Formik>
    );
  }
};

export default FormCreatCourse;
