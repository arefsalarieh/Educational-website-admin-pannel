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
  let flag = param?.id;
  const [initialValues, setInitialValues] = useState({
    title: "",
    miniDesc: "",
    desc: "",
    Keyword: "",
    sliderShow: true,
    image: null,
  });

  const {
    data: newsData,
    refetch,
    isSuccess,
  } = useQuery(
    "getNewsDetail",
    () => {
      return instance.get(`/News/${param.id}`);
    },
    { enabled: false }
  );

  useEffect(() => {
    if (isSuccess) {
      setInitialValues({
        id: newsData?.detailsNewsDto.id,
        title: newsData?.detailsNewsDto.title,
        miniDesc: newsData?.detailsNewsDto.miniDescribe,
        desc: newsData?.detailsNewsDto.describe,
        Keyword: newsData?.detailsNewsDto.Keyword,
        sliderShow: newsData?.detailsNewsDto.isSlider,
        image: newsData?.detailsNewsDto.currentImageAddress,
      });
    }
    console.log(newsData?.detailsNewsDto);
  }, [isSuccess]);

  useEffect(() => {
    if (param?.id) refetch();
  }, [param]);

  // const addNews = useMutation({
  //   mutationFn: (formNewsData) => {
  //     instance.post(
  //       instance.post("/News/CreateNews", formNewsData).then((res) => {
  //         res.success === true
  //           ? toast.success(res.message)
  //           : toast.error(res.message);
  //       })
  //     );
  //   },
  // });

  // const updateNews = useMutation((data) =>
  //   instance.put("/News/UpdateNews", data).then((res) => {
  //     res.success === true && toast.success("عملیات با موفقیت انجام شد");
  //     res.error === true && toast.error("خطایی اتفاق افتاده، مجددا تلاش کنید.");
  //   })
  // );

  const onSubmit = async (values) => {
    if (param?.id !== undefined || null) {
      const updateNewsObj = {
        Id: newsData?.detailsNewsDto.id,
        SlideNumber: 1,
        CurrentImageAddress: newsData?.detailsNewsDto.currentImageAddress,
        CurrentImageAddressTumb:
          newsData?.detailsNewsDto.currentImageAddressTumb,
        Active: newsData?.detailsNewsDto.active,
        Title: values.title,
        GoogleTitle: values.title + " " + values.title,
        GoogleDescribe:
          values.miniDesc + " " + values.miniDesc + " " + values.miniDesc,
        MiniDescribe: values.miniDesc,
        Describe: values.desc,
        Keyword: values.Keyword,
        IsSlider: values.sliderShow,
        NewsCatregoryId: 1,
        Image: values.Image,
      };
      const keys = Object.keys(updateNewsObj);
      keys?.forEach((key) => {
        const item = updateNewsObj[key];
        data.append(key, item);
      });
      const res = await instance.post("/News/CreateNews", data);
      res?.success === true && toast.success("خبر جدید با موفقیت آپدیت شد.")
      res?.errors.forEach((element) => {
        toast.error(element);
      });
    } else {
      const newsObj = {
        Title: values.title,
        GoogleTitle: values.title + " " + values.title,
        GoogleDescribe:
          values.miniDesc + " " + values.miniDesc + " " + values.miniDesc,
        MiniDescribe: values.miniDesc,
        Describe: values.desc,
        Keyword: values.Keyword,
        IsSlider: values.sliderShow,
        NewsCatregoryId: 1,
        Image: values.Image,
      };
      const keys = Object.keys(newsObj);
      keys.forEach((key) => {
        const item = newsObj[key];
        data.append(key, item);
      });

      const res = await instance.post("/News/CreateNews", data);
      console.log(res);
      res?.success === true && toast.success("خبر جدید با موفقیت درج شد.")
      res?.errors.forEach((element) => {
        toast.error(element);
      });
    }
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
          enableReinitialize
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
