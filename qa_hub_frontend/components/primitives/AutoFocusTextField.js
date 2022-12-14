import {useEffect, useRef} from "react";
import {TextField} from "@mui/material";

export default function AutoFocusTextField(props) {
    const inputRef = useRef();

    function moveCaretAtEnd(e) {
        let temp_value = e.target.value
        e.target.value = ''
        e.target.value = temp_value
    }
    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         inputRef.current.focus();
    //     }, 100);
    //
    //     return () => {
    //         clearTimeout(timeout);
    //     };
    // }, []);

    return <TextField inputRef={inputRef} {...props} autoFocus onFocus={moveCaretAtEnd}/>;
}