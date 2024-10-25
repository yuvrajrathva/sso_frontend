import React, {useEffect} from "react";
import AuthContext from "../context/AuthContext";


function Landing() {

    const {verifySession} = React.useContext(AuthContext);

    useEffect(() => {
        verifySession();
    })

    return (<>
        <h2>Landing Page</h2>
    </>)
}

export default Landing;