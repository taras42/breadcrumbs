import React from 'react';

import resourceType from '../service/enum/resourceType';

export default (props) => {
    const style = {
        listStyleType: 'none'
    };

    if (props.resource.type === resourceType.FILE) {
        return (
            <p>THIS IS FILE: {props.resource.name}</p>
        );
    }

    return (
        <ul style={style}>
            {
                props.content.map((resource, index) => {
                    return (
                        <li key={index} style={{cursor: 'pointer'}} onClick={() => props.onClick(resource)}>{resource.name}</li>
                    )
                })
            }
        </ul>
    )
}