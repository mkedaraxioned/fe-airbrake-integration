export const styles = {
  body: {
    backgroundColor: '#F9FAFB',
  },
  '.wrapper': {
    maxWidth: '1410px',
    width: '94%',
    margin: '0 auto',
    backgroundColor: '#FFFFFF',
  },
  '.menu-anchor': {
    width: '100%',
    display: 'inline-block',
  },
  '.date_body': {
    '.date_row div': {
      border: '.7px solid #E9F2F9',
    },
    '.date_row div:nth-of-type(7n)': {
      borderRight: 'none',
    },
    '.date_row div:nth-of-type(1n)': {
      borderLeft: 'none',
      borderTop: 'none',
    },
    '.date_row:last-child div': {
      borderBottom: 'none',
    },
  },
};
