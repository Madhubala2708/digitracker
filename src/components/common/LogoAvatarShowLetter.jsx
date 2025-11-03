/** This component created by Ramesh R ***/
import React, { Fragment } from "react";
import { colorCodeCardName } from "../../constant/ColorCodes";

const LogoAvatarShowLetter = ({
  genaralData,
  profilePhotoName,
  profileName,
  outerClassName,
  innerClassName,
  index,
}) => {
  const temp = colorCodeCardName?.filter(
    (c) =>
      c?.name ===
      genaralData[profileName]
        ?.replace(/([0-9_ -]+)/, "")
        .slice(0, 1)
        .toLowerCase()
  )[0];
  const userName = genaralData[profileName]?.trim()?.split(" ");
  const genaralDataPhoto = profilePhotoName
    ? genaralData[profilePhotoName]
    : genaralData?.photo;

  let initials;
  if (userName?.length === 1) {
    initials = userName[0]?.slice(0, 2)?.toUpperCase();
  } else {
    initials = userName
      ?.slice(0, 2)
      ?.map((name) => name?.slice(0, 1))
      ?.join("")
      ?.toUpperCase();
  }

  return (
    <Fragment>
      {genaralData?.logo &&
        (genaralDataPhoto !== undefined || genaralDataPhoto !== null) && (
          <div
            className={outerClassName ? outerClassName : ""}
            key={index ? index : "1"}
            id={index ? index : "1"}
          >
            {genaralData?.logo && (
              <img
                src={genaralData?.logo}
                alt="logo"
                className={innerClassName ? innerClassName : ""}
                title={genaralData[profileName]}
              />
            )}
            {genaralData?.userStatus && (
              <span
                className={`${
                  "user-profile__image__status icon-" +
                  `${
                    genaralData.userStatus === "active"
                      ? "online"
                      : genaralData?.userStatus === "busy"
                      ? "busy"
                      : "away"
                  }`
                }`}
              >
                {" "}
                <b>
                  {" "}
                  {genaralData?.userStatus === "active"
                    ? "Online"
                    : genaralData?.userStatus === "busy"
                    ? "Busy"
                    : "Away"}{" "}
                </b>
              </span>
            )}
          </div>
        )}
      {genaralDataPhoto && genaralData?.logo !== null && (
        <div
          className={outerClassName ? outerClassName : ""}
          key={index ? index : "1"}
          id={index ? index : "1"}
        >
          {genaralDataPhoto && (
            <img
              src={`data:image/png;base64,${genaralDataPhoto}`}
              alt="userImage"
              className={innerClassName ? innerClassName : ""}
              title={genaralData[profileName]}
            />
          )}
          {genaralData?.userStatus && (
            <span
              className={`${
                "user-profile__image__status icon-" +
                `${
                  genaralData.userStatus === "active"
                    ? "online"
                    : genaralData?.userStatus === "busy"
                    ? "busy"
                    : "away"
                }`
              }`}
            >
              {" "}
              <b>
                {" "}
                {genaralData?.userStatus === "active"
                  ? "Online"
                  : genaralData?.userStatus === "busy"
                  ? "Busy"
                  : "Away"}{" "}
              </b>
            </span>
          )}
        </div>
      )}
      {((genaralData?.logo == null &&
        (genaralDataPhoto == null || genaralDataPhoto === "")) ||
        (genaralDataPhoto == null && genaralData?.logo !== undefined)) && (
        <div
          className={outerClassName ? outerClassName : ""}
          style={{
            backgroundColor: temp ? temp.color : colorCodeCardName[1].color,
          }}
          key={index ? index : "1"}
          id={index ? index : "1"}
        >
          <span
            className={innerClassName ? innerClassName : ""}
            title={genaralData[profileName]}
          >
            {initials}
          </span>
          {genaralData?.userStatus && (
            <span
              className={`
                user-profile__image__status 
               icon-genaralData?.userStatus
              `}
            ></span>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default LogoAvatarShowLetter;
