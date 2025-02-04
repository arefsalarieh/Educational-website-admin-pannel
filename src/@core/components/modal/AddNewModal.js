// ** React Imports
import { useState } from "react";

// ** Third Party Components
import Flatpickr from "react-flatpickr";
import {
  User,
  Briefcase,
  Mail,
  Calendar,
  DollarSign,
  X,
  Command,
} from "react-feather";

// ** Reactstrap Imports
import {
  Modal,
  Input,
  Label,
  Button,
  ModalHeader,
  ModalBody,
  InputGroup,
  InputGroupText,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { Formik } from "formik";

const AddNewModal = ({ open, handleModal, refetch }) => {
  // ** State

  // ** Custom close btn
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={handleModal} />
  );

  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className="sidebar-sm"
      modalClassName="modal-slide-in"
      contentClassName="pt-0">
      <ModalHeader
        className="mb-1"
        toggle={handleModal}
        close={CloseBtn}
        tag="div">
        <h5 className="modal-title">خبر جدید</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <Formik>
          <form>
            <div className="mb-1">
              <Label className="form-label" for="full-name">
                عنوان خبر
              </Label>
              <InputGroup>
                <InputGroupText>
                  <User size={15} />
                </InputGroupText>
                <Input id="full-name" placeholder="عنوان خبر" />
              </InputGroup>
            </div>
            <div className="mb-1">
              <Label className="form-label" for="full-name">
                عبارت گوگل
              </Label>
              <InputGroup>
                <InputGroupText>
                  <Command size={15} />
                </InputGroupText>
                <Input id="full-name" placeholder="عبارت گوگل" />
              </InputGroup>
            </div>
            <div className="mb-1">
              <Label className="form-label" for="full-name">
                توضیحات گوگل
              </Label>
              <InputGroup>
                <InputGroupText>
                  <Command size={15} />
                </InputGroupText>
                <Input id="full-name" placeholder="توضیحات گوگل" />
              </InputGroup>
            </div>
            <div className="mb-1">
              <Label className="form-label" for="post">
                خلاصه توضیحات
              </Label>
              <InputGroup>
                <InputGroupText>
                  <Briefcase size={15} />
                </InputGroupText>
                <Input id="post" placeholder="Web Developer" />
              </InputGroup>
            </div>
            <div className="mb-1">
              <Label className="form-label" for="email">
                توضیحات کامل
              </Label>
              <InputGroup>
                <InputGroupText>
                  <Mail size={15} />
                </InputGroupText>
                <Input
                  type="email"
                  id="email"
                  placeholder="brucewayne@email.com"
                />
              </InputGroup>
            </div>
            <div className="mb-1">
              <Label className="form-label" for="joining-date">
                عکس
              </Label>
              <InputGroup>
                <InputGroupText>
                  <Calendar size={15} />
                </InputGroupText>
                <Input
                  type="email"
                  id="email"
                  placeholder="brucewayne@email.com"
                />
              </InputGroup>
            </div>
            <div className="mb-1">
              <Label className="form-label" for="salary">
                Salary
              </Label>
              <InputGroup>
                <InputGroupText>
                  <DollarSign size={15} />
                </InputGroupText>
                <Input type="number" id="salary" />
              </InputGroup>
            </div>
            <Button className="me-1" color="primary" onClick={handleModal}>
              Submit
            </Button>
            <Button color="secondary" onClick={handleModal} outline>
              Cancel
            </Button>
          </form>
        </Formik>
      </ModalBody>
    </Modal>
  );
};

export default AddNewModal;
