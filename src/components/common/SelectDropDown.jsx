import React, { Fragment, useState } from "react";
import Select from "react-dropdown-select";
import checked from "../../assets/images/checked.png";
import unChecked from "../../assets/images/unchecked.png";
import radioChecked from "../../assets/images/radio-checked.svg";
import radioUnChecked from "../../assets/images/radio-uncheck.svg";
import tick from "../../assets/images/tick.svg";
import tickeCheck from "../../assets/images/ticke-check-green.svg";

const SelectDropDown = ({ options, ...props }) => {
  const [showPopup, setshowPopup] = useState(true);
  
  /** CUSTOMIZED SINGLE SELECT DROPDOWN */
  const singleSelectDropdown = ({ props, state, methods }) => {
    const regexp = new RegExp(state.search, "i");
    state.searchResults = props?.options?.filter(
      (item) =>
        regexp.test(item[props?.labelField]) ||
        regexp.test(item[props?.valueField])
    );
    return (
      <div className="dropdwonList-main">
        {props.title && <p className="dropdwonList-head">{props.title}</p>}
        <div className="dropdwonLists single">
          {props.options
            .filter((item) =>
              regexp.test(item[props.searchBy] || item[props.labelField])
            )
            .map((option) => (
              <>
                <p
                  className={
                    option.disabled
                      ? "dropdwonLists-label disabled"
                      : "dropdwonLists-label"
                  }
                  key={option[props.valueField]}
                  onClick={() => methods.addItem(option)}
                  disabled={option.disabled}
                >
                  {props.optionType && props.optionType == "radio" && (
                    <img
                      onChange={() => methods.addItem(option)}
                      className="checkbox-img"
                      src={
                        state.values.filter(
                          (o) =>
                            o[props.valueField] === option[props.valueField]
                        ).length > 0
                          ? radioChecked
                          : radioUnChecked
                      }
                      alt=""
                    />
                  )}
                  {props.optionType && props.optionType === "tick" && (
                    <img
                      onChange={() => methods.addItem(option)}
                      className="checkbox-img"
                      src={option.status === "close" ? tickeCheck : tick}
                      alt=""
                    />
                  )}
                  <label>{option[props.labelField]}</label>
                </p>
              </>
            ))}
          {state?.searchResults?.length === 0 && (
            <p className="error-show">No result found</p>
          )}
        </div>
      </div>
    );
  };

  const multiSelectDropdown = ({ props, state, methods }) => {
    const regexp = new RegExp(state.search, "i");
    state.searchResults = props?.options?.filter(
      (item) =>
        regexp.test(item[props?.labelField]) ||
        regexp.test(item[props?.valueField])
    );
    const setOptionValue = (option)=>{
      // console.log('option',option);
      
      methods.addItem(option)
    }
        
    return (
      <div className="dropdwonList-main">
        {props.title && <p className="dropdwonList-head">{props.title}</p>}
        <div className="dropdwonLists">
          {props.options
            .filter((item) =>
              regexp.test(item[props.searchBy] || item[props.labelField])
            )
            .map((option) => (
              <>
                <p
                  className={
                    option.disabled
                      ? "dropdwonLists-label disabled"
                      : "dropdwonLists-label"
                  }
                  key={option[props.valueField]}
                  onClick={() => setOptionValue(option)}
                  disabled={option.disabled}
                >
                  {props.optionType && props.optionType == "checkbox" && (
                    <img
                      onChange={() => methods.addItem(option)}
                      className="checkbox-img"
                      src={
                        state.values.filter(
                          (o) =>
                            o[props.valueField] === option[props.valueField]
                        ).length > 0
                          ? checked
                          : unChecked
                      }
                      alt=""
                    />
                  )}
                  <label>{option[props.labelField]}</label>
                </p>
              </>
            ))}
          {state?.searchResults?.length === 0 && (
            <p className="error-show">No result found</p>
          )}
        </div>
      </div>
    );
  };

  /** CUSTOMIZED DROPDOWN RENDER - Lested List */
  const nestedListCustomDropdownRenderer = ({ props, state, methods }) => {
    return (
      <div className="dropdwonList-main">
        {props.title && <p className="dropdwonList-head">{props.title}</p>}
        <div className="dropdwonLists">
          {props.options.map((option, i) => (
            <Fragment key={i + "1"}>
              {option.countryList && (
                <p className="dropdwonList-subhead">{option.name}</p>
              )}
              {option.countryList &&
                option.countryList.map((opt, k) => {
                  return (
                    <Fragment key={k + "2"}>
                      <p
                        className={
                          option.disabled
                            ? "dropdwonLists-label sub-list disabled"
                            : "dropdwonLists-label sub-list"
                        }
                        disabled={option.disabled}
                        key={opt.countryId}
                        onClick={() => methods.addItem(opt)}
                      >
                        <img
                          onChange={() => methods.addItem(opt)}
                          className="checkbox-img"
                          src={
                            state.values.find(
                              (o) => o.countryId === opt.countryId
                            )
                              ? checked
                              : unChecked
                          }
                          alt=""
                        />
                        <label>{opt.name + " (" + opt.code + ")"}</label>
                      </p>
                    </Fragment>
                  );
                })}
            </Fragment>
          ))}
        </div>
      </div>
    );
  };

  /** CUSTOMIZED DROPDOWN RENDER - Add Member */
  const addMembercustomDropdownRenderer = ({ props, state, methods }) => {
    const regexp = new RegExp(state.search, "i");
    setshowPopup(true);
    //INCLUDE MEMBERS TO SELECTED MEMBER BOX
    // console.log('methods',state);
    // const includeMemebers = () => {
    //   setAddMemberList(state?.values);
    //   setErrorRole(false);
    //   setshowPopup(false);
    // };
    state.searchResults = props?.options?.filter(
      (item) =>
        regexp.test(item[props?.labelField]) ||
        regexp.test(item[props?.valueField])
    );
    state.dropdown = showPopup;
    return (
      <div className="dropdwonList-main">
        <div className="dropdwonLists">
          {props?.options
            .filter(
              (item) =>
                regexp.test(item[props?.labelField]) ||
                regexp.test(item[props?.valueField])
            )
            .map((option, i) => (
              <Fragment key={i + "1"}>
                <p
                  className={
                    option.disabled
                      ? "dropdwonLists-label disabled"
                      : "dropdwonLists-label"
                  }
                  disabled={option.disabled}
                  key={option?.regId}
                  onClick={() => methods?.addItem(option)}
                >
                  {props.optionType && props.optionType == "checkbox" && (
                    <img
                      onChange={() => methods?.addItem(option)}
                      className="checkbox-img"
                      src={
                        state.values.filter(
                          (o) =>
                            o[props?.valueField] === option[props?.valueField]
                        )?.length > 0
                          ? checked
                          : unChecked
                      }
                      alt=""
                    />
                  )}
                  {props.optionType && props.optionType == "radio" && (
                    <img
                      onChange={() => methods?.addItem(option)}
                      className="checkbox-img"
                      src={
                        state.values.filter(
                          (o) =>
                            o[props?.valueField] === option[props?.valueField]
                        )?.length > 0
                          ? radioChecked
                          : radioUnChecked
                      }
                      alt=""
                    />
                  )}
                  <span className="lable-field">
                    <label>{option[props?.labelField]}</label>
                    {option?.email && (
                      <label className="mail-field">{option?.email}</label>
                    )}
                  </span>
                </p>
              </Fragment>
            ))}
          {state?.searchResults?.length === 0 && (
            <p className="error-show">Not Found User/Member</p>
          )}
        </div>
        {/* {props?.title === "Add Member" && state?.searchResults?.length > 0 && (
            <div className="flex-btn">
              <button onClick={methods.clearAll} className="reset-btn">
                Reset
              </button>
              <button onClick={includeMemebers} className="includemember-btn">
                Add
              </button>
            </div>
          )} */}
      </div>
    );
  };

  return (
    <Select
      options={options}
      {...props}
      dropdownRenderer={
        props.nestedList && props.multi === true
          ? nestedListCustomDropdownRenderer
          : props.addMember === true
          ? addMembercustomDropdownRenderer
          : props.multi
          ? multiSelectDropdown
          : singleSelectDropdown
      }
    ></Select>
  );
};

export default SelectDropDown;
