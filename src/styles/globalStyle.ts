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
  '.custom_select_menu_list': {
    padding: '0 !important',
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
  '.react-datepicker-popper': {
    zIndex: '4 !important',
  },

  '.date_picker_react': {
    width: '88%',
    marginLeft: '11px',
    outline: 'none',
    position: 'relative',
    zIndex: '3',
  },
  '.date_picker_react .react-datepicker-popper': {
    zIndex: '5 !important',
  },
};
