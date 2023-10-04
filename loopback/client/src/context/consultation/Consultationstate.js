import React from "react";
import Consultationcontext from './Consultationcontext'

const Consultationstate = (props)=>{
    const states = []
    return (
        <Consultationcontext.Provider value={states}>
            {props.children};
        </Consultationcontext.Provider>
    )
}

export default Consultationstate;


