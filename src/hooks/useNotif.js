import { useState } from "react";

const useNotif = () => {
    const [notifShowing, setNotifShowing] = useState(false);

    function toggle() {
        setNotifShowing(!notifShowing);
    }

    return {
        notifShowing,
        toggle,
    }
};

export default useNotif;
