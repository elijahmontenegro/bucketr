// export * from './arrays';
// export * from './dates';
// export * from './media';
// export * from './objects';
// export * from './strings';
// export * from './validation';
export * from './authorization';


export const HeaderLink = ({ to }) => {
  const isRouteActive = window.location.pathname === to;
  console.log('pathname:', window.location.pathname)
  console.log('to:', to)
  console.log('isRouteActive:', isRouteActive)

  const defaultProps = {
    style: {
      display: "flex",
      height: "100%",
      marginRight: "2rem",
      color: 'white', 
      fontWeight: '500',
      alignItems: "center",
      textAlign: "center",
      justifyContent: "center",
    },
    to
  };

  const selectedProps = {
    ...defaultProps,
    style: {
      ...defaultProps.style,
      borderTop: "4px solid transparent",
      borderBottom: "4px solid rgba(0, 0, 0, 0.25)",
    }
  };

  return isRouteActive ? selectedProps : defaultProps;
};