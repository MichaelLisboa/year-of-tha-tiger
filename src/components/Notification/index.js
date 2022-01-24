import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import {useSpring, useChain, animated as a} from "react-spring";
import usePortal from "../../hooks/usePortal";

import "./Notification.css";

const Notification = ({isActive, children, ...props}) => {
    const target = usePortal("NotificationParent");
    const [isShowing, setIsShowing] = useState(false);
    const showingRef = useRef(false);

    useEffect(
        () => {
            let timer;
            if (isActive) {
                setIsShowing(true);
                document.body.style.top = `-${window.scrollY}px`;
                document.body.style.overflow = "hidden";
            } else {
                timer = setTimeout(() => {
                    setIsShowing(showingRef.current);
                }, 1000)
                const scrollY = document.body.style.top;
                document.body.style.position = "";
                document.body.style.top = "";
                document.body.style.overflow = "";
                window.scrollTo(0, parseInt(scrollY || "0") * -1);
            }
            return () => clearTimeout(timer);
        }, [isActive]
    )

    const notificationCard = useSpring({
        opacity: isActive ? 1 : 0,
        bottom: isActive ? -1 : -45,
    });

    return (
        isShowing ?
            ReactDOM.createPortal(
                <a.div
                    id="notificationRoot"
                    tabIndex={-1} role="dialog"
                    style={notificationCard}>
                    {children}
                </a.div>,
                target
            )
        :
        null
    )
}

export default Notification;
