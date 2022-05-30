export const styles = {
  body: {
    backgroundColor: 'bgPrimary',
  },
  '.wrapper': {
    maxWidth: '1410px',
    width: '94%',
    margin: '0 auto',
  },
  '.menu-anchor': {
    width: '100%',
    display: 'inline-block',
  },
  '.date_body': {
    '.date_row div': {
      border: '.7px solid #E0E0E0',
    },
    '.date_row div:nth-child(7n)': {
      borderRight: 'none',
    },
    '.date_row div:nth-child(1n)': {
      borderLeft: 'none',
      borderTop: 'none',
    },
    '.date_row:last-child div': {
      borderBottom: 'none',
    },
  },
};
