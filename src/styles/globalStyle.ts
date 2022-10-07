export const styles = {
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
      border: '0  px solid #FFF',
    },
    '.date_row div:nth-of-type(7n)': {
      borderRight: '1px solid #FFF',
    },
    '.date_row div:nth-of-type(1n)': {
      borderLeft: '1px solid #FFF',
      borderTop: '1px solid #FFF',
    },
    '.date_row:last-child div': {
      borderBottom: '1px solid #FFF',
    },
    '.date_row .selectedDate': {
      border: '2px solid #4657CE !important',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '.date_row .selectedDate + div': {
      borderLeft: 'none',
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
  '.middle_container': {
    height: 'calc(100vh - 78px)',
    overflowY: 'auto',
  },
  '.middle_container::-webkit-scrollbar': {
    width: '3px',
  },
  '.middle_container::-webkit-scrollbar-thumb': {
    backgroundColor: '#DFDFDF',
  },
  '.not-allowed': {
    cursor: 'not-allowed',
  },
  '.form-btn': {
    verticalAlign: 'middle',
  },
  '.error_align': {
    position: 'absolute',
    bottom: '-18px',
    left: '0',
  },
};
