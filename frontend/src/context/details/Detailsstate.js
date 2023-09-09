import React from "react";
import Detailscontext from './Detailscontext'

const Detailsstate = (props)=>{
    const states = []
    return (
        <Detailscontext.Provider value={states}>
            {props.children};
        </Detailscontext.Provider>
    )
}

export default Detailsstate;