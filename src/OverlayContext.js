import React from 'react';

const OverlayContext = React.createContext();

export const OverlayProvider = OverlayContext.Provider;
export const OverlayConsumer = OverlayContext.Consumer;

export default OverlayContext;
