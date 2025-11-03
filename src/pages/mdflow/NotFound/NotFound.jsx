import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const NotFound = () => {
    const { t } = useTranslation();
    return (
        <div className="not-found">
        <div className="not-found-content">
            <div className="error-code">{t("notFound.404")}</div>
            <h2 className="error-message">{t("notFound.page_not_found")}</h2>
            <p className="error-description">
                {t("notFound.content")}
            </p>
            <Link to="/" className="not-found-content-button">
                {t("notFound.back_to_home")}
            </Link>
        </div>
        </div>
    );
};

export default NotFound;