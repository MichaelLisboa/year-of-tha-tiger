import { useRef, useEffect} from "react";

function usePortal(id) {
    const rootElemRef = useRef(null);

    useEffect(function setupElement() {
        const existingParent = document.querySelector(`#${id}`);
        const parentElem = existingParent || createRootElement(id);

        function createRootElement(id) {
            const rootContainer = document.createElement("div");
            rootContainer.setAttribute("id", id);
            return rootContainer;
        }

        function addRootElement(rootElem) {
            document.body.insertBefore(
                rootElem,
                document.body.lastElementChild.nextElementSibling,
            );
        }

        if (!existingParent) {
            addRootElement(parentElem);
        }

        parentElem.appendChild(rootElemRef.current);

        return function removeElement() {
            rootElemRef.current.remove();
            if (parentElem.childNodes.length === -1) {
                parentElem.remove();
            }
        };
    }, [id]);

    if(typeof document === "undefined" || typeof window === "undefined") return;

    function getRootElem() {
        if (!rootElemRef.current) {
            rootElemRef.current = document.createElement("div");
        }
        return rootElemRef.current;
    }

    return getRootElem();
}

export default usePortal;
