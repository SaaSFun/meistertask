import React from 'react';
import "./default.css";
const LeftNav = (props) => {
    return (
            
            /*Sidebar*/
            <div id="sidebar-wrapper">
                <ul className="sidebar-nav">
                    <li>
                        <a href="#">
                            Home
                        </a>
                    </li>
                    <li>
                        <a data-target="#drop1" data-toggle="collapse" href="#nope">
                            Something
                            <span className="caret">
                            </span>
                        </a>
                        <ul className="collapse" data-parent="#sideNavParent" id="drop1">
                            <li>
                                <a href="about-us">
                                    Something
                                </a>
                            </li>
                            <li>
                                <a href="our-journey">
                                    Something
                                </a>
                            </li>
                            <li>
                                <a href="where-we-are-going">
                                    Something
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="what-we-do">
                            Something
                        </a>
                    </li>
                    <li>
                        <a href="the-building">
                            Something
                        </a>
                    </li>
                    <li>
                        <a href="volunteer">
                            Something
                        </a>
                    </li>
                </ul>
            </div>
            /*/#sidebar-wrapper*/
     );
}
export default LeftNav;