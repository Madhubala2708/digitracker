import React, { useLayoutEffect, useState, useEffect } from "react";

const PopupModal = ({
  closeModal,
  headerText,
  children,
  customClass,
  fullBleed,
  ariaLabel,
  hiddenHeader = false,
  modalRootClassName = "",
  viewType,
}) => {
  const [fade, setFade] = useState(true);
  const mclose = (e) => {
    if (e.type === "click" || e.key === "Enter") {
      setFade(false);
      closeModal(false);
    } else return;
  };

  useLayoutEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  });

  const [divHeight, setDivHeight] = useState(window.innerHeight);
  useEffect(() => {
    const handleResize = () => {
      setDivHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /****  Below variable add by Ramesh R ****/
  const modalMaxHeightStyle = {
    maxHeight: `${
      divHeight - (customClass === "addUpdateRequirement" ? -20 : 50)
    }px`,
    transition: "max-height 1s ease-in-out",
    /* Other styles if needed */
  };

  return (
    <>
      <div
        className={`popupModal fade${fullBleed ? " fullBleed" : ""} ${
          fade ? "show" : ""
        }`}
        aria-label={ariaLabel}
      >
        <div
          className={`popupModal__container ${customClass ? customClass : ""}`}
        >
          <div
            className={"popupModal__root " + modalRootClassName}
            style={modalMaxHeightStyle}
          >
            {!hiddenHeader && (
              <div className="popupModal__heading">
                {headerText && (
                  <h2>
                    {headerText} {viewType && <span>{viewType}</span>}
                  </h2>
                )}
                <span
                  className="icon-close"
                  onClick={mclose}
                  tabIndex={0}
                  onKeyDown={mclose}
                ></span>
              </div>
            )}
            <div className={`popupModal__body ${hiddenHeader ? "p-0" : "p-0"}`}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopupModal;
