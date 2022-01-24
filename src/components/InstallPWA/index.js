import React, { useEffect } from "react";
import Notification from "../Notification";
import { useNotification } from "../../hooks/useNotification";
import share from "../../images/AppleShare.png";
import close from "../../images/close.svg";
export const InstallPWA = ({...props}) => {
    const [notificationOpen, setNotificationOpen,] = useNotification();

    useEffect(
        () => {
            setNotificationOpen(true)
        }, []
    )
    return (
        <Notification
            isActive={notificationOpen}>
                <div style={{
                    height: "45px",
                    margin: "auto 8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start"
                }}>
                    <span>Tap</span>
                    <img
                        src={share}
                        style={{margin: "0 4px", display: "inline-block"}}
                        alt="Add to homescreen"
                        height="24"
                        width="24"
                        />
                        &nbsp;
                    <span>then &quot;Add to Home Screen&quot;</span>
                    <span
                        style={{
                            position: "absolute",
                            right: "16px"}}
                        onClick={() => setNotificationOpen(false)}>

                        <img
                            src={close}
                            alt="Close add to homescreen"
                            height="24"
                            width="24"
                            />

                    </span>
                </div>
        </Notification>
    )
}
