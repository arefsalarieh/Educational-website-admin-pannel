import { useRef } from "react";

export const inputTimeout = (fn, ms) => {
    const ref = useRef();

    return () => {
        clearTimeout(ref.current);
        const timeout = setTimeout(fn, ms);
        ref.current = timeout;
    }
}