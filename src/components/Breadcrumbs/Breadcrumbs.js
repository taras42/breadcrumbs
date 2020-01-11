import React from 'react';

const breadcrumbsStyle = {
    display: 'flex',
    padding: '10px'
}

const DefaultBreadcrumb = (props) => {
    const breadcrumbStyle = {
        cursor: 'pointer'
    };

    return (
        <div style={breadcrumbStyle} onClick={props.onClick} className="breadcrumbs__breadcrumb">{props.label}</div>
    )
}

const DefaultSeparator = () => {
    const separatorStyle = {
        paddingLeft: '5px',
        paddingRight: '5px'
    }

    return (
        <div style={separatorStyle} className="breadcrumbs__separator">></div>
    )
}

const Breadcrumbs = (props) => {
    const BreadcrumbComponent = props.Breadcrumb || DefaultBreadcrumb;
    const SeparatorComponent = props.Separator || DefaultSeparator;

    return (
        <div style={breadcrumbsStyle} className="breadcrumbs">
            {
                props.breadcrumbs.map((breadcrumb, index) => {
                    return (
                        <>
                            {index !== 0 ? <SeparatorComponent/> : <></>}
                            <BreadcrumbComponent {...breadcrumb} onClick={() => {
                                props.onClick(breadcrumb, index)
                            }} />
                        </>
                    )
                })
            }
        </div>
    )
}

export default Breadcrumbs;