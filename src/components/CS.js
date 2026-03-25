import React from 'react';

export const CSType =({children}) =>(
    <span style={{color: '#4EC9B0', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '16px'}}>
        {children}
    </span>
);

export const CSName =({children}) =>(
    <span style={{color: '#8dc7e5', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '16px'}}>
        {children}
    </span>
)

export const CSDefault =({children}) =>(
    <span style={{color: '#bdbdbd', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '16px'}}>
        {children}
    </span>
)

export const CSClass =({children}) =>(
    <span style={{color: '#90dd79', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '16px'}}>
        {children}
    </span>
)

export const CSConst =({children}) =>(
    <span style={{color: '#dd7985', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '16px'}}>
        {children}
    </span>
)

export const OptionalType =() =>(
    <span style={{color: '#cace84', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '16px'}}>
        [Optional]
    </span>
)

export const CSFlagNothing = () => (
    <span style={{color: '#ffffff', fontWeight: 'bold',
        fontFamily: 'monospace', fontSize: '16px',
        backgroundColor: 'rgba(255,17,17,0.2)', borderRadius: '12px', padding: '2px 16px', borderLeft: '8px solid rgba(255,17,17,0.6)'}}>
        nothing
    </span>
)

export const CSFlagStatic = () => (
    <span style={{color: '#ffffff', fontWeight: 'bold',
        fontFamily: 'monospace', fontSize: '16px',
        backgroundColor: 'rgba(17,203,255,0.2)', borderRadius: '8px', padding: '6px 16px', borderLeft: '8px solid rgba(17,203,255,0.6)'}}>
        static
    </span>
)

export const CSFlagVirtual = () => (
    <span style={{color: '#ffffff', fontWeight: 'bold',
        fontFamily: 'monospace', fontSize: '16px',
        backgroundColor: 'rgba(255,17,203,0.2)', borderRadius: '8px', padding: '6px 16px', borderLeft: '8px solid rgba(255,17,203,0.6)'}}>
        virtual
    </span>
)

export const CSFlagPublic = () => (
    <span style={{color: '#ffffff', fontWeight: 'bold',
        fontFamily: 'monospace', fontSize: '16px',
        backgroundColor: 'rgba(247,255,17,0.2)', borderRadius: '8px', padding: '6px 16px', borderLeft: '8px solid rgba(247,255,17,0.6)'}}>
        public
    </span>
)