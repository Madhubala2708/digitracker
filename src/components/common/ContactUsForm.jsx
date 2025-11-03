import React, { Fragment, useEffect, useRef, useState } from "react";
import { radioChecked, radioUnChecked } from "../../assets/images";
import Banner from "../../assets/images/contact-us-banner.svg";
import { useTranslation } from "react-i18next";
import Select from "react-dropdown-select";
import SelectDropDown from "./SelectDropDown";
import useAuth from "../../hooks/useAuth";
import LogoAvatarShowLetter from "./LogoAvatarShowLetter";
import { useDepartment } from "../../hooks/useMaster";
import { useSuggestedMembers } from "../../hooks/useTicketManagement";
import { getAgencyIssueType, submitContactUsForm } from "../../services";
import SuccessTick from "../../assets/images/success-tick-large.svg";

const ContactUsForm = ({ closePopup }) => {
  const [showApiLoading, setShowApiLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const [{ data }] = useAuth();
  const [formData, setFormData] = useState({
    issueType: [],
    department: [],
    departmentUser: [],
    description: "",
  });
  const [mandatoryField, setMandatoryField] = useState({
    issueType: true,
    department: false,
    departmentUser: false,
    description: true,
  });
  const [errorMsg, setErrorMsg] = useState({
    issueType: false,
    department: false,
    departmentUser: false,
    description: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [{ departmentList }, { getDepartmentData }] = useDepartment();
  const [suggestedMembersList, { getSuggestedMembers }] = useSuggestedMembers();
  const [departmentUserList, setDepartmentUserList] = useState([]);
  const [issueTypeMaster, setIssueTypeMaster] = useState([]);
  const [successFlag, setSuccessFlag] = useState(false);

  useEffect(() => {
    if (departmentList?.data?.length === 0) {
      getDepartmentData();
    }
    if (suggestedMembersList?.data === null) {
      getSuggestedMembers();
    }
    getAgencyIssueType().then((res) => {
      if (res.status) {
        setIssueTypeMaster(res.data);
      }
    });
  }, []);

  useEffect(() => {
    validateForm();
  }, [formData, mandatoryField, isSubmitted]);

  const validateForm = () => {
    const isIssueTypeValid = mandatoryField.issueType
      ? formData.issueType.length > 0
      : true;
    const isDepartmentValid = mandatoryField.department
      ? formData.department.length > 0
      : true;
    const isDepartmentUserValid = mandatoryField.departmentUser
      ? formData.departmentUser.length > 0
      : true;
    const isDescriptionValid = mandatoryField.description
      ? formData.description.trim() !== ""
      : true;

    setIsFormValid(
      isIssueTypeValid &&
        isDepartmentValid &&
        isDepartmentUserValid &&
        isDescriptionValid
    );
    if (isSubmitted) {
      setErrorMsg({
        issueType: !isIssueTypeValid,
        department: !isDepartmentValid,
        departmentUser: !isDepartmentUserValid,
        description: !isDescriptionValid,
      });
    }

    return isFormValid;
  };

  // const issueTypeMaster = [
  //   { name: "Cards not available", id: 1 },
  //   { name: "Unable to create card", id: 2 },
  //   { name: "Unable to open card", id: 3 },
  //   { name: "Contact the euroland team", id: 4 },
  //   { name: "Other issues", id: 5 },
  // ];

  /** AUTO FOCUS ON FIRST INPUT FIELD */
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleIssueTypeChange = (e) => {
    setFormData({
      ...formData,
      issueType: e,
      department: [],
      departmentUser: [],
    });
    if (e[0].issue_id !== 4) {
      setMandatoryField({
        ...mandatoryField,
        department: false,
        departmentUser: false,
      });
      setDepartmentUserList([]);
    } else {
      setMandatoryField({
        ...mandatoryField,
        department: true,
        departmentUser: true,
      });
    }
  };

  const handleDepartmentChange = (e) => {
    if (e.length === 0) {
      setDepartmentUserList([]);
      return;
    }
    setFormData({ ...formData, department: e, departmentUser: [] });
    setDepartmentUserList(
      suggestedMembersList.data?.find(
        (dept) => dept?.dept_code === e[0].deptCode
      )
    );
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validateForm()) {
      // TRIGGER API CALL TO REGISTER AGENCY USER
      try {
        const param = {
          issue_id: formData?.issueType[0]?.issue_id,
          dept_id:
            formData?.department?.length > 0
              ? formData?.department[0]?.deptId
              : 0,
          select_user_reg_id:
            formData?.departmentUser?.length > 0
              ? formData?.departmentUser[0]?.reg_id
              : null,
          mail_sent_to:
            formData?.departmentUser?.length > 0
              ? formData?.departmentUser[0]?.mail
              : "",
          description: formData?.description,
        };
        setShowApiLoading(true);
        submitContactUsForm(param).then((res) => {
          if (res.status) {
            setSuccessFlag(true);
            setTimeout(() => {
              setSuccessFlag(false);
              closePopup();
            }, [3000]);
            setShowApiLoading(false);
          } else {
            setShowApiLoading(false);
          }
        });
      } catch (error) {
        setShowApiLoading(false);
        // Handle errors
        // dispatch(showToast({ message: error, variant: "danger" }));
      }
    }
  };

  /** CUSTOMIZED DROPDOWN RENDER - DEPARTMENT */
  const customDropdownRenderer = ({ props, state, methods }) => {
    const regexp = new RegExp(state.search, "i");
    //INCLUDE MEMBERS TO SELECTED MEMBER BOX
    state.searchResults = props?.options?.filter(
      (item) =>
        regexp.test(item[props?.labelField]) ||
        regexp.test(item[props?.valueField])
    );
    return (
      <div className="dropdwonList-main">
        <h4 className="popup-header">{props.title}</h4>
        <div className="dropdwonLists">
          {props?.options
            .filter(
              (item) =>
                regexp.test(item[props?.labelField]) ||
                regexp.test(item[props?.valueField])
            )
            .map((option, i) => (
              <div
                className="dropdwonLists-label"
                key={option?.regId}
                onClick={() => methods?.addItem(option)}
              >
                <img
                  onChange={() => methods?.addItem(option)}
                  className="checkbox-img"
                  src={
                    state.values.filter(
                      (o) => o[props?.valueField] === option[props?.valueField]
                    )?.length > 0
                      ? radioChecked
                      : radioUnChecked
                  }
                  alt=""
                />
                <LogoAvatarShowLetter
                  genaralData={option}
                  profileName={"display_name"}
                  outerClassName={"list__image"}
                  innerClassName={"no-image"}
                  index={"teammeber-" + i}
                  key={"teammeber-" + i}
                ></LogoAvatarShowLetter>
                <span className="lable-field">
                  <label title={option[props?.labelField]}>
                    {option[props?.labelField]}
                  </label>
                  {(option?.job_title || option?.mail) && (
                    <label
                      className="mail-field"
                      title={
                        option?.job_title == null
                          ? option?.mail
                          : option?.job_title
                      }
                    >
                      {option?.job_title == null
                        ? option?.mail
                        : option?.job_title}
                    </label>
                  )}
                </span>
              </div>
            ))}
          {state?.searchResults?.length === 0 && (
            <p className="error-show">Not Found User/Member</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <div className="contactus__container">
        <img
          className="contactus__container__banner"
          src={Banner}
          alt="Contact Us Banner"
        />
        <div className="contactus__container__form">
          {!successFlag && (
            <>
              <h1 className="contactus__container__form_head">
                {t("contactus.title")}
              </h1>
              <form className="contactus__container__form_body">
                <div className="form_field">
                  <label>{t("contactus.label.userDetail")}</label>
                  <div className="form_field_flex">
                    <LogoAvatarShowLetter
                      genaralData={data.details}
                      profilePhotoName={"photo"}
                      profileName={"displayName"}
                      outerClassName={"form_field_userInfo-pic"}
                      innerClassName={"form_field_userInfo"}
                    ></LogoAvatarShowLetter>
                    <p className="form_field_userName" placeholder="User Name">
                      {data.details?.displayName
                        ? data.details?.displayName
                        : "User Name"}
                    </p>
                  </div>
                </div>
                <div className="form_field">
                  <label>
                    {t("contactus.label.issueType")} <sup>*</sup>
                  </label>
                  <SelectDropDown
                    multi={false}
                    options={issueTypeMaster}
                    labelField="issue_type"
                    valueField="issue_id"
                    values={formData.issueType}
                    searchable={false}
                    title={"Issue Type"}
                    onChange={(e) => handleIssueTypeChange(e)}
                    placeholder={"Select Issue Type"}
                    className="custom-dropdownRenderer1"
                    disabled={issueTypeMaster?.length === 0 ? true : false}
                    optionType="checkbox"
                    dropdownPosition="auto"
                  />
                  <label className="error-msg">
                    {" "}
                    {errorMsg.issueType === true &&
                      t("contactus.error.issueType")}{" "}
                  </label>
                </div>
                {formData &&
                  formData?.issueType?.length > 0 &&
                  formData?.issueType[0].issue_id === 4 && (
                    <div className="form_field_flex">
                      <div className="form_field">
                        <label>
                          {t("contactus.label.department")} <sup>*</sup>
                        </label>
                        <SelectDropDown
                          multi={false}
                          options={departmentList?.data}
                          labelField="deptName"
                          valueField="deptId"
                          values={formData.department}
                          searchable={true}
                          title={"Department"}
                          onChange={(e) => handleDepartmentChange(e)}
                          placeholder={"Select Department"}
                          className="custom-dropdownRenderer1"
                          disabled={
                            departmentList?.data?.length === 0 ? true : false
                          }
                          optionType="radio"
                          dropdownPosition="auto"
                        />
                        <label className="error-msg">
                          {" "}
                          {errorMsg.department === true &&
                            t("contactus.error.department")}{" "}
                        </label>
                      </div>
                      <div className="form_field">
                        <label>
                          {t("contactus.label.selectUser")} <sup>*</sup>
                        </label>
                        <Select
                          multi={false}
                          options={departmentUserList?.usersList}
                          labelField="display_name"
                          valueField="reg_id"
                          values={formData.departmentUser}
                          searchable={true}
                          searchBy={"displayName"}
                          onChange={(e) =>
                            setFormData({ ...formData, departmentUser: e })
                          }
                          placeholder="Select/Search Name"
                          className="custom-dropdownRenderer member-list"
                          disabled={
                            departmentUserList?.usersList?.length === 0
                              ? true
                              : false
                          }
                          dropdownRenderer={customDropdownRenderer}
                          dropdownPosition="auto"
                          keepSelectedInList={true}
                          // autoFocus={true}
                          // onDropdownOpen={closeOpen}
                          title={"Select User"}
                        ></Select>
                        <label className="error-msg">
                          {" "}
                          {errorMsg.departmentUser === true &&
                            t("contactus.error.departmentUser")}{" "}
                        </label>
                      </div>
                    </div>
                  )}

                <div className="form_field">
                  <label>
                    {t("contactus.label.description")} <sup>*</sup>
                  </label>
                  <textarea
                    className="form_field_description"
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder=""
                    value={formData.description}
                    maxLength={500}
                  />
                  <label className="error-msg">
                    {" "}
                    {errorMsg.description === true &&
                      t("contactus.error.description")}{" "}
                  </label>
                </div>

                <div className="flex-disp">
                  <span
                    className="cancel-btn"
                    onClick={closePopup}
                    tabIndex={0}
                  >
                    {t("common.cancel")}
                  </span>
                  <button
                    className={`submit-btn ${showApiLoading ? "loading" : ""}`}
                    onClick={handleSubmitForm}
                  >
                    {t("common.submit")}{showApiLoading ? "ting" : ""}
                  </button>
                </div>
              </form>
            </>
          )}

          {successFlag && (
            <div className="contactus__container__form_success">
              <img src={SuccessTick} alt="success tick" />
              <div className="contactus__container__form_success_content">
                <h1>{t("contactus.success.content1")}</h1> 
                <p>{t("contactus.success.content2")}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ContactUsForm;
