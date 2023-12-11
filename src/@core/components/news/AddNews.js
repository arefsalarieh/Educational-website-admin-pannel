// ** Reactstrap Imports
import { Formik } from "formik";
import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Card,
  Label,
  Input,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
} from "reactstrap";
import { makeFormData } from "../../utils/makeFormData";
import { useMutation, useQuery } from "react-query";
import instance from "../../interceptor";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const validation = yup.object().shape({
  title: yup.string().required().min(10).max(70),
  miniDesc: yup.string().required().min(10).max(150),
  desc: yup.string().required().min(70),
  tags: yup.number().required().min(10),
});

const VerticalForm = () => {
  const data = new FormData();
  const param = useParams();
  const [initialValues, setInitialValues] = useState({
    title: "",
    miniDesc: "",
    desc: "",
    Keyword: "",
    sliderShow: true,
    image: null,
  });


  // useEffect(()=>{
  //   isEditing(param?.id)
  // },[param?.id])

  const isEditing = (id) => {
    const { data } = useQuery("getNewsDetail", () =>
      instance.get(`/News/${id}`).then((res) => {
        return res.detailsNewsDto;
      })
    );

    setInitialValues({
      title: data?.title,
      miniDesc: data?.miniDescribe,
      desc: data?.describe,
      Keyword: data?.Keyword,
      sliderShow: data?.isSlider,
      image: data?.currentImageAddress,
    });
  };

  const addNews = useMutation({
    mutationFn: (formNewsData) => {
      instance.post(
        instance.post("/News/CreateNews", formNewsData).then((res) => {
          res.success === true
            ? toast.success(res.message)
            : toast.error(res.message);
        })
      );
    },
  });

  const onSubmit = async (values) => {
    const newsObj = {
      Title: values.title,
      GoogleTitle: values.title + " " + values.title,
      GoogleDescribe:
        values.miniDesc +
        " " +
        values.miniDesc +
        " " +
        values.miniDesc +
        " " +
        values.miniDesc +
        " " +
        values.miniDesc,
      MiniDescribe: values.miniDesc,
      Describe: values.desc,
      Keyword: values.Keyword,
      IsSlider: values.sliderShow,
      NewsCatregoryId: 1,
      Image: values.Image,
    };

    console.log(newsObj);

    const keys = Object.keys(newsObj);
    keys.forEach((key) => {
      const item = newsObj[key];
      data.append(key, item);
    });

    const res = await instance.post("/News/CreateNews", data);
    console.log(res);
    res?.errors.forEach((element) => {
      toast.error(element);
    });

    // const data = makeFormData(newsObj)

    // const res = addNews.mutate(data);
    // console.log("mutate result", res);
    // addNews.isError ? toast.error("عملیات با خطا مواجه شد") : null;
    // addNews.isSuccess ? toast.success("ثبت موفقیت آمیز") : null;
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle tag="h4">درج خبر</CardTitle>
      </CardHeader>

      <CardBody>
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          //   validationSchema={validation}
        >
          {({ values, handleSubmit, handleChange, setFieldValue, errors }) => (
            <form onSubmit={handleSubmit}>
              <Row>
                <Col sm="12" className="mb-1">
                  <Label className="form-label" for="title">
                    عنوان خبر
                  </Label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="عنوان خبر"
                    value={values.title}
                    onChange={handleChange}
                  />
                </Col>
                <Col sm="12" className="mb-1">
                  <Label className="form-label" for="miniDesc">
                    شرح کوتاه
                  </Label>
                  <Input
                    type="text"
                    name="miniDesc"
                    id="miniDesc"
                    placeholder="شرح کوتاه"
                    value={values.miniDesc}
                    onChange={handleChange}
                  />
                </Col>
                <Col sm="12" className="mb-1">
                  <Label className="form-label" for="desc">
                    شرح کامل
                  </Label>
                  <Input
                    type="textarea"
                    name="desc"
                    id="desc"
                    placeholder="شرح کامل"
                    value={values.desc}
                    onChange={handleChange}
                  />
                </Col>
                <Col sm="12" className=" mb-1">
                  <Label className="form-label" for="Keyword">
                    کلمات کلیدی
                  </Label>
                  <Input
                    type="text"
                    name="Keyword"
                    id="Keyword"
                    placeholder="کلمات کلیدی"
                    value={values.Keyword}
                    onChange={handleChange}
                    // errors={console.log(validation.tags) && true}
                  />
                </Col>
                <Col
                  sm="12"
                  className="d-flex align-items-center justify-content-around my-2">
                  <div className="form-check">
                    <Input
                      type="checkbox"
                      name="sliderShow"
                      id="slider-show"
                      defaultChecked={true}
                      value={values.IsSlider}
                      onChange={handleChange}
                    />
                    <Label className="form-check-label" for="slider-show">
                      نمایش در اسلایدر
                    </Label>
                  </div>
                  <div className="form-check d-flex">
                    <Label className="form-check-label" for="img">
                      درج عکس
                    </Label>
                    <Input
                      name="Image"
                      type="file"
                      id="img"
                      //   value={values.Image}
                      onChange={(e) => {
                        setFieldValue("Image", e.target.files[0]);
                      }}
                    />
                  </div>
                </Col>
                <Col sm="12">
                  <div className="d-flex justify-content-center">
                    <Button
                      className="me-1"
                      color="primary"
                      type="submit"
                      name="image">
                      ثبت خبر
                    </Button>
                    <Button outline color="secondary" type="reset">
                      پاکسازی فرم
                    </Button>
                  </div>
                </Col>
              </Row>
            </form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};
export default VerticalForm;
