import {useState} from "react";

export const useNotification = (initialMode = false) => {
    const [notificationOpen, setNotificationOpen] = useState(initialMode);
    const toggle = () => setNotificationOpen(!notificationOpen);

    return [notificationOpen, setNotificationOpen, toggle];
}

export const useNotificationWithData = (initialMode = false, initialSelected = null) => {
    const [notificationOpen, setNotificationOpen] = useNotification(initialMode);
    const [selected, setSelected] = useState(initialSelected);
    const setNotificationState = state => {
        setNotificationOpen(state);
        if (state === false) {
            setSelected(null)
        }
    }

    return {notificationOpen, setNotificationOpen, selected, setSelected, setNotificationState};
}
