import { NavLink } from 'react-router-dom';

const SettingNav = () => {

    const menuContent = [{
        name: "Roles Management",
        url: "/settings/roles"
    }, {
        name: "Masters",
        url: "/settings/masters"
    }];

    return (
        <>
            <div className="settingnav-content">
                <NavLink to={"/settings"} className="settingnav-content-title link-tag">
                    {({ isActive, isPending }) => (
                        <>Settings</>
                    )}
                </NavLink>
                <div className="settingnav-content-menu">
                    {
                        menuContent.map((data) => {
                            return (
                                <div key={data.url}> {/* Use data.url as the key */}
                                    <NavLink to={data.url} className="link-tag">
                                        {({ isActive, isPending }) => (
                                            <>
                                                {data.name}
                                                <span className="icon-chevron-thin-right"></span>
                                            </>
                                        )}
                                    </NavLink>
                                </div>
                            );
                        })
                    }

                </div>
            </div>
        </>
    );
};

export default SettingNav;
