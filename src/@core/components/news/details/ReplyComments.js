import React from 'react'
import { useQuery } from 'react-query';
import instance from '../../../interceptor';
import cmtImg from "@src/assets/images/portrait/small/avatar-s-11.jpg";
import { Card, CardBody, CardHeader, CardText } from 'reactstrap';
import Avatar from "@components/avatar";
import { CornerUpLeft, ThumbsDown, ThumbsUp } from 'react-feather';
import { Link } from 'react-router-dom';


function ReplyComments({parentId}) {

    const { data } =useQuery("replyComments", () => {return instance.get(`/News/GetRepliesComments?Id=${parentId}`)})

    return data?.map((comment, index) => {
      return (
        <Card className="ms-5 mb-3 border-top" key={index}>
            <CardHeader>
                <h4 className='text-primary'>پاسخ</h4>
            </CardHeader>
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
                    <Link className="d-inline-flex align-items-center">
                      <ThumbsUp size={18} className="me-50" />
                      <span className="me-1">{comment.likeCount}</span>
                    </Link>
                    <Link className="d-inline-flex align-items-center">
                      <ThumbsDown size={18} className="me-50" />
                      <span>{comment.dissLikeCount}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      );
    });
  };
export default ReplyComments