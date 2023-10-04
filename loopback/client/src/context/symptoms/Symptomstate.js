import React from "react";
import Symptomcontext from './Symptomcontext'

const Symptomstate = (props)=>{
    const states = []
    return (
        <Symptomcontext.Provider value={states}>
            {props.children};
        </Symptomcontext.Provider>
    )
}

export default Symptomstate;