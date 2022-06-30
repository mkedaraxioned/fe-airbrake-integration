import React from 'react';
import './autoComplete.modules.css';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { MemberObj } from '../../interfaces/newProjectForm';

interface Props {
  items: MemberObj[];
  onChange: (item: MemberObj) => void;
}

const AutoCompleteElem = ({ onChange, items }: Props) => {
  const formatResult = (item: MemberObj) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left', color: '#050505' }}>
          {item.name}
        </span>
      </>
    );
  };
  return (
    <div>
      <ReactSearchAutocomplete
        items={items}
        onSelect={onChange}
        formatResult={formatResult}
        placeholder='Search here...'
        showIcon={false}
        styling={{
          height: '40px',
          border: '1px solid #E2E8F0',
          borderRadius: '5px',
          backgroundColor: 'white',
          boxShadow: 'none',
          color: '#050505',
          fontSize: '12px',
          fontFamily: 'Courier',
          iconColor: '#676767',
          lineColor: '#E2E8F0',
          placeholderColor: '#676767',
          zIndex: 2,
        }}
      />
    </div>
  );
};

export default AutoCompleteElem;
