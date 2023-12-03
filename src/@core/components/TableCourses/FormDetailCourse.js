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

const FormDetailCourse = () => {
  const SignupSchema = yup.object().shape({
    title: yup.string().required(),
    technology: yup.string().required(),
    status: yup.string().required(),
    level: yup.string().required(),
    type: yup.string().required(),
    term: yup.string().required(),
    capacity: yup.string().required(),
    describe: yup.string().required(),
  });

  // ** Hooks
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(SignupSchema) });

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      toast(
        <div className="d-flex">
          <div className="me-1">
            <Avatar size="sm" color="success" icon={<Check size={12} />} />
          </div>
          <div className="d-flex flex-column">
            {/* <h6>Form Submitted!</h6> */}
            <ul className="list-unstyled mb-0">
              <li>
                <strong> عنوان دوره</strong>: {data.title}
              </li>
              <li>
                <strong>آموزش و یادگیری</strong>: {data.technology}
              </li>
              <li>
                <strong>سطح دوره</strong>: {data.level}
              </li>
              <li>
                <strong>وضعیت دوره</strong>: {data.status}
              </li>
              <li>
                <strong> نوع کلاس</strong>: {data.type}
              </li>
              <li>
                <strong>ترم </strong>: {data.term}
              </li>
              <li>
                <strong> ظرفیت</strong>: {data.capacity}
              </li>
              <li>
                <strong> توضیحات </strong>: {data.describe}
              </li>
            </ul>
          </div>
        </div>
      );
    }
  };

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

  const getCreatCourse = async () => {
    const result = await http.get(`/Course/GetCreate`);
    return result;
  };

  const { data, status } = useQuery("getCreatCourse", getCreatCourse);

  const setCreatCourse = async () => {
    const creatData = new FormData();
    creatData.append("dataGet", data);
    const res = await http.post(`/Course`,creatData);
  };

  const { dataSet, statuset } = useQuery("setCreatCourse", setCreatCourse);

  {
    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h4">جزییات دوره  </CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-1">
              <Label className="form-label" for="title">
                عنوان دوره
              </Label>
              <Controller
                id="title"
                name="title"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="عنوان"
                    invalid={errors.title && true}
                  />
                )}
              />
              {errors.title && (
                <FormFeedback>{errors.title.message}</FormFeedback>
              )}
            </div>
            <div className="mb-1">
              <Label className="form-label" for="technology">
                آموزش و یادگیری
              </Label>
              <Controller
                id="technology"
                name="technology"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="آموزش و یادگیری"
                    invalid={errors.technology && true}
                  />
                )}
              />
              {errors.technology && (
                <FormFeedback>{errors.technology.message}</FormFeedback>
              )}
            </div>

            <div className="mb-1">
              <Label className="form-label" for="level">
                سطح دوره
              </Label>
              <Controller
                id="level"
                name="level"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="سطح دوره"
                    invalid={errors.level && true}
                  />
                )}
              />
              {errors.level && (
                <FormFeedback>{errors.level.message}</FormFeedback>
              )}
            </div>
            <div className="mb-1">
              <Label className="form-label" for="status">
                وضعیت دوره
              </Label>
              <Controller
                id="status"
                name="status"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="وضعیت دوره"
                    invalid={errors.status && true}
                  />
                )}
              />
              {errors.status && (
                <FormFeedback>{errors.status.message}</FormFeedback>
              )}
            </div>
            <div className="mb-1">
              <Label className="form-label" for="type">
                نوع کلاس
              </Label>
              <Controller
                id="type"
                name="type"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="type"
                    placeholder="نوع کلاس"
                    invalid={errors.type && true}
                  />
                )}
              />
              {errors.type && (
                <FormFeedback>{errors.type.message}</FormFeedback>
              )}
            </div>
            <div className="mb-1">
              <Label className="form-label" for="term">
                ترم
              </Label>
              <Controller
                id="term"
                name="term"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="ترم"
                    invalid={errors.term && true}
                  />
                )}
              />
              {errors.term && (
                <FormFeedback>{errors.term.message}</FormFeedback>
              )}
            </div>
            <div className="mb-1">
              <Label className="form-label" for="capacity">
                ظرفیت
              </Label>
              <Controller
                id="capacity"
                name="capacity"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="capacity"
                    placeholder="ظرفیت"
                    invalid={errors.capacity && true}
                  />
                )}
              />
              {errors.capacity && (
                <FormFeedback>{errors.capacity.message}</FormFeedback>
              )}
            </div>
            <div className="mb-1">
              <Label className="form-label" for="describe">
                توضیحات
              </Label>
              <Controller
                id="describe"
                name="describe"
                defaultValue=""
                type="textarea"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="توضیحات"
                    invalid={errors.describe && true}
                  />
                )}
              />
              {errors.describe && (
                <FormFeedback>{errors.describe.message}</FormFeedback>
              )}
            </div>
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
          </Form>
        </CardBody>
      </Card>
    );
  }
};

export default FormDetailCourse;