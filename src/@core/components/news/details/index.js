// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Third Party Components
import axios from "axios";
import classnames from "classnames";
import {
  Share2,
  GitHub,
  Gitlab,
  Twitter,
  Bookmark,
  Facebook,
  Linkedin,
  CornerUpLeft,
  MessageSquare,
  Copy,
  Heart,
  ThumbsUp,
  ThumbsDown,
} from "react-feather";

// ** Utils
import { kFormatter } from "@utils";

// ** Custom Components
import Sidebar from "./BlogSidebar";
import Avatar from "@components/avatar";
import Breadcrumbs from "@components/breadcrumbs";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Badge,
  Input,
  Label,
  Button,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

// ** Styles
import "@styles/base/pages/page-blog.scss";

// ** Images
import cmtImg from "@src/assets/images/portrait/small/avatar-s-11.jpg";
import banner from "@src/assets/images/NewImage/banner-12.jpg";
import { useMutation, useQuery } from "react-query";
import instance from "../../../interceptor";
import { Link, useNavigate, useNavigation, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ErrorMessage, Formik } from "formik";
import * as yup from "yup";
import ReplyComments from "./ReplyComments";
import ProjSpinner from "../../common/Spinner";
import NoItemFromDb from "../../common/NoItemFromDb";
import DbError from "../../common/DbError";

const validation = yup.object().shape({
  title: yup.string().required("لطفا مقدار عنوان را وارد کنید"),
  describe: yup
    .string()
    .min(3, "حداقل تعداد 10 کاراکتر می باشد")
    .max(390, "حداکثر تعداد 390 کاراکتر می باشد")
    .required("لطفا مقدار کامنت را وارد کنید"),
});

const BlogDetails = () => {
  // ** States
  const [replyParams, setReplyParams] = useState(null);
  const param = useParams();
  const navigate = useNavigate();

  const {
    data: newsObj,
    status,
    refetch,
  } = useQuery("newsObj", () => instance.get(`/News/${param?.id}`));

  const addComment = useMutation((comment) =>
    instance.post("/News/CreateNewsComment", comment).then((res) => {
      res.success === true && toast.success("کامنت با موفقیت درج شد");
      res.error === true &&
        toast.error("خطایی پیش آمده لطفا مجددا تلاش نمایید" + res.message);
    })
  );
  addComment.isError && toast.error("خطایی پیش آمده لطفا مجددا تلاش نمایید");

  const addReplyComment = useMutation((reply) =>
    instance.post("/News/CreateNewsReplyComment", reply).then((res) => {
      res.success === true && toast.success("پاسخ به کامنت با موفقیت درج شد");
      res.error === true &&
        toast.success(
          "خطایی پیش آمده لطفا مجددا تلاش نمایید" + res.error.message
        );
    })
  );
  addReplyComment.isError &&
    toast.error("خطایی پیش آمده لطفا مجددا تلاش نمایید");

  const onSubmit = (values) => {
    if (replyParams !== null) {
      setReplyParams({
        ...replyParams,
        title: values.title,
        describe: values.describe,
      });
      console.log(replyParams);
      addReplyComment.mutate(replyParams);
      refetch();
    } else {
      const comment = {
        newsId: param.id,
        title: values.title,
        describe: values.describe,
        userId: newsObj?.detailsNewsDto.userId,
      };
      addComment.mutate(comment);
      refetch();
    }
  };

  const commentLike = useMutation((id, likeOrUnlike) =>
    instance
      .post(`/News/CommentLike/${id}&LikeType=${likeOrUnlike}`)
      .then((res) => {
        res.success === true && toast.success("پاسخ به کامنت با موفقیت درج شد");
        res.error === true &&
          toast.success("خطایی پیش آمده لطفا مجددا تلاش نمایید");
      })
  );

  const likeNews = useMutation((id) =>
    instance.post(`/News/NewsLike/${id}`).then((res) => {
      res.success === true && toast.success("عملیات با موفقیت انجام شد");
      res.error === true && toast.error("خطایی اتفاق افتاده، مجددا تلاش کنید.");
    })
  );
  likeNews.isError &&
    toast.error("خطایی در ارتباط با سرور اتفاق افتاده، مجددا تلاش کنید.");

  const dislikeNews = useMutation((id) =>
    instance.post(`/News/NewsDissLike/${id}`).then((res) => {
      res.success === true && toast.success("عملیات با موفقیت انجام شد");
      res.error === true && toast.error("خطایی اتفاق افتاده، مجددا تلاش کنید.");
    })
  );
  dislikeNews.isError &&
    toast.error("خطایی در ارتباط با سرور اتفاق افتاده، مجددا تلاش کنید.");

  const onLikeNews = (id) => {
    likeNews.mutate(id);
    refetch();
  };
  const onDislikeNews = (id) => {
    dislikeNews.mutate(id);
    refetch();
  };

  const onLikeComment = (id) => {
    // type > 0 ? commentLike.mutate(id, false) : commentLike.mutate(id, true);
    // const like = type > 0 ? true : false
    try {
      const res = instance.post(`/News/CommentLike/${id}`);
      res.success && toast.success(",ملیات با موفقیت انجام شد");
      res.error && toast.error("خطایی رخ داده");
      refetch();
    } catch (error) {
      toast.error("خطایی رخ داده" + error.message);
    }
  };

  const onDislikeLikeComment = (id) => {
    try {
      const res = instance.post("News/DeleteCommentLikeNews", {
        deleteEntityId: id,
      });

      res.success && toast.success(",ملیات با موفقیت انجام شد");
      res.error && toast.error("خطایی رخ داده");
    } catch (error) {
      toast.error("خطایی رخ داده" + error.message);
    }
  };

  // const getCommentReplies = useMutation({
  //   mutationFn: (commentId) => {
  //     return instance.get(`/News/GetRepliesComments?Id=${commentId}`);
  //   },
  // });

  const badgeColorsArr = {
    Quote: "light-info",
    Fashion: "light-primary",
    Gaming: "light-danger",
    Video: "light-warning",
    Food: "light-success",
  };

  // const onShowCommentReplies = (id) => {
  //   const replyComment = getCommentReplies.mutate(id);
  //   console.log(replyComment);
  //   return <p>hi</p>;
  // };

  // const renderTags = () => {
  //   return newsObj?.detailsNewsDto?.keyword.map((tag, index) => {
  //     return (
  //       <a key={index} href="/" onClick={(e) => e.preventDefault()}>
  //         <Badge
  //           className={classnames({
  //             "me-50": index !== newsObj?.detailsNewsDto?.keyword.length - 1,
  //           })}
  //           color={badgeColorsArr[tag]}
  //           pill>
  //           {tag}
  //         </Badge>
  //       </a>
  //     );
  //   });
  // };

  const renderComments = () => {
    if (newsObj?.commentDtos.length === 0) {
      return <NoItemFromDb />;
    }
    return newsObj?.commentDtos.map((comment, index) => {
      return (
        <Card className="mb-3" key={index}>
          <CardBody>
            <div className="d-flex">
              <div>
                <Avatar
                  className="me-75"
                  img={comment.pictureAddress ? comment.pictureAddress : cmtImg}
                  imgHeight="38"
                  imgWidth="38"
                />
              </div>
              <div className="w-100">
                <h6 className="fw-bolder mb-25">{comment.autor}</h6>
                <CardText>{comment.title}</CardText>
                <CardText>{comment.describe}</CardText>
                <div className="d-flex justify-content-between">
                  <a
                    href="leave-comment"
                    onClick={(e) => {
                      e.preventDefault();
                      setReplyParams({
                        newsId: newsObj?.detailsNewsDto.id,
                        userId: newsObj?.detailsNewsDto.userId,
                        parentId: comment.id,
                        title: "",
                        describe: "",
                      });
                      const element = document.getElementById("leave-comment");
                      element.scrollIntoView();
                    }}>
                    <div className="d-inline-flex align-items-center">
                      <CornerUpLeft size={18} className="me-50" />
                      <span>Reply</span>
                    </div>
                  </a>
                  <div className="d-flex justify-content-between">
                    <Link
                      className={
                        comment.currentUserIsLike === true
                          ? "text-success d-inline-flex align-items-center"
                          : "text-primary d-inline-flex align-items-center"
                      }
                      onClick={() => onLikeComment(comment.id)}>
                      <ThumbsUp size={18} className="me-50" />
                      <span className="me-1">{comment.likeCount}</span>
                    </Link>

                    <Link
                      className={
                        comment.currentUserIsDissLike === true
                          ? "text-warning d-inline-flex align-items-center"
                          : "text-primary d-inline-flex align-items-center"
                      }
                      onClick={() => onDislikeLikeComment(comment.id)}>
                      <ThumbsDown size={18} className="me-50" />
                      <span>{comment.dissLikeCount}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
          {comment.replyCount > 0 ? (
            <ReplyComments parentId={comment.id} />
          ) : null}
        </Card>
      );
    });
  };

  if (status === "loading") {
    return <ProjSpinner />;
  } else if (status === "error") {
    return <DbError />;
  }
  return (
    <Fragment>
      <Breadcrumbs
        title="Blog Details"
        data={[{ title: "News" }, { title: "Details" }]}
      />
      <div className="blog-wrapper">
        <div className="content-detached content-left">
          <div className="content-body">
            {newsObj !== null ? (
              <Row>
                <Col sm="12">
                  <Card className="mb-3">
                    <CardImg
                      src={
                        newsObj?.detailsNewsDto?.currentImageAddress
                          ? newsObj?.detailsNewsDto?.currentImageAddress
                          : banner
                      }
                      className="img-fluid"
                      top
                    />
                    <CardBody>
                      <CardTitle
                        className="d-flex justify-content-between"
                        tag="h4">
                        <div>{newsObj?.detailsNewsDto?.title}</div>
                        <div className="d-flex justify-content-between">
                          <Link
                            className={
                              newsObj?.detailsNewsDto.currentUserIsDissLike ===
                              true
                                ? "text-success d-inline-flex align-items-center"
                                : "text-primary d-inline-flex align-items-center"
                            }
                            onClick={() =>
                              onLikeNews(newsObj?.detailsNewsDto.id)
                            }>
                            <ThumbsUp size={18} className="me-50" />
                            <span className="me-1">
                              {newsObj?.detailsNewsDto.currentLikeCount}
                            </span>
                          </Link>

                          <Link
                            className={
                              newsObj?.detailsNewsDto.currentUserIsDissLike ===
                              true
                                ? "text-warning d-inline-flex align-items-center"
                                : "text-primary d-inline-flex align-items-center"
                            }
                            onClick={() =>
                              onDislikeNews(newsObj?.detailsNewsDto.id)
                            }>
                            <ThumbsDown size={18} className="me-50" />
                            <span>
                              {newsObj?.detailsNewsDto.currentDissLikeCount}
                            </span>
                          </Link>
                        </div>
                      </CardTitle>
                      <div className="d-flex">
                        <Avatar
                          className="me-50"
                          img={
                            newsObj?.detailsNewsDto?.currentImageAddress
                              ? newsObj?.detailsNewsDto?.currentImageAddress
                              : cmtImg
                          }
                          imgHeight="24"
                          imgWidth="24"
                        />
                        <div>
                          <small className="text-muted me-25">by </small>
                          <small>
                            <a
                              className="text-body"
                              href="/"
                              onClick={(e) => e.preventDefault()}>
                              {newsObj?.detailsNewsDto?.addUserFullName}
                            </a>
                          </small>
                          <span className="text-muted ms-50 me-25">|</span>
                          <small className="text-muted">
                            {newsObj?.detailsNewsDto?.insertDate.slice(0, 10)}
                          </small>
                        </div>
                      </div>
                      <div className="my-1 py-25">{/* {renderTags()} */}</div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: newsObj?.detailsNewsDto?.describe,
                        }}></div>
                      {/* <div className="d-flex">
                        <div>
                          <Avatar
                            img={cmtImg}
                            className="me-2"
                            imgHeight="60"
                            imgWidth="60"
                          />
                        </div>
                        <div>
                          <h6 className="fw-bolder">Willie Clark</h6>
                          <CardText className="mb-0">
                            Based in London, Uncode is a blog by Willie Clark.
                            His posts explore modern design trends through
                            photos and quotes by influential creatives and web
                            designer around the world.
                          </CardText>
                        </div>
                      </div> */}
                      <hr className="my-2" />
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <div className="d-flex align-items-center me-1">
                            <a
                              className="me-50"
                              href="/"
                              onClick={(e) => e.preventDefault()}>
                              <MessageSquare
                                size={21}
                                className="text-body align-middle me-1"
                              />
                              {newsObj?.commentDtos.length}
                            </a>
                            <a href="/" onClick={(e) => e.preventDefault()}>
                              <div className="text-body align-middle">
                                {/* {kFormatter(newsObj?.commentDtos.comments)} */}
                              </div>
                            </a>
                          </div>
                          <div className="d-flex align-items-center me-1">
                            <a
                              className="me-50"
                              href="/"
                              onClick={(e) => e.preventDefault()}>
                              <Bookmark
                                size={21}
                                className="text-body align-middle me-1"
                              />
                              {newsObj?.detailsNewsDto.currentLikeCount}
                            </a>
                            <a href="/" onClick={(e) => e.preventDefault()}>
                              <div className="text-body align-middle">
                                {/* {data.blog.bookmarked} */}
                              </div>
                            </a>
                          </div>
                        </div>
                        <div className="d-flex justify-content-around align-items-center">
                          <Button color="primary" className="me-2" onClick={e => {e.preventDefault(); navigate(`/editNews/${newsObj?.detailsNewsDto.id}`)}}>تغییر محتویات خبر</Button>
                          <UncontrolledDropdown className="dropdown-icon-wrapper">
                            <DropdownToggle tag="span">
                              <Share2
                                size={21}
                                className="text-body cursor-pointer"
                              />
                            </DropdownToggle>
                            <DropdownMenu end>
                              {/* <DropdownItem className="py-50 px-1">
                              <GitHub size={18} />
                            </DropdownItem>
                            <DropdownItem className="py-50 px-1">
                              <Gitlab size={18} />
                            </DropdownItem>
                            <DropdownItem className="py-50 px-1">
                              <Facebook size={18} />
                            </DropdownItem>
                            <DropdownItem className="py-50 px-1">
                              <Twitter size={18} />
                            </DropdownItem>
                            <DropdownItem className="py-50 px-1">
                              <Linkedin size={18} />
                            </DropdownItem> */}
                              <DropdownItem
                                className="py-50 px-1"
                                onClick={() => {
                                  navigator.clipboard.writeText(location.href);
                                  toast.success(
                                    "لینک خبر در کلیپ بورد کپی شد."
                                  );
                                }}>
                                <Copy size={18} />
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm="12" id="blogComment">
                  <h6 className="section-label">Comment</h6>
                  {renderComments()}
                </Col>
                <Col sm="12">
                  <h6 id="leave-comment" className="section-label">
                    Leave a Comment
                  </h6>
                  <Card>
                    <CardBody>
                      <Formik
                        initialValues={{}}
                        onSubmit={onSubmit}
                        validationSchema={validation}>
                        {({ values, handleSubmit, handleChange, errors }) => (
                          <form className="form" onSubmit={handleSubmit}>
                            <Row>
                              <Col sm="12">
                                <div className="mb-2">
                                  <Input
                                    type="text"
                                    name="title"
                                    placeholder="عنوان"
                                    onChange={handleChange}
                                    value={values.title}
                                    onError={
                                      errors.title
                                        ? toast.error(errors.title)
                                        : null
                                    }
                                  />
                                </div>
                              </Col>
                              <Col sm="12">
                                <div className="mb-2">
                                  <Input
                                    className="mb-2"
                                    type="textarea"
                                    name="describe"
                                    rows="4"
                                    placeholder="کامنت"
                                    onChange={handleChange}
                                    value={values.describe}
                                    onError={
                                      errors.describe
                                        ? toast.error(errors.describe)
                                        : null
                                    }
                                  />
                                </div>
                              </Col>
                              <Col sm="12">
                                <Button type="submit" color="primary">
                                  ثبت
                                </Button>
                              </Col>
                            </Row>
                          </form>
                        )}
                      </Formik>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            ) : null}
          </div>
        </div>
        <Sidebar />
      </div>
    </Fragment>
  );
};

export default BlogDetails;
