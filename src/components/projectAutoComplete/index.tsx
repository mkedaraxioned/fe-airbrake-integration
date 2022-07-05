import React, { useEffect, useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

const ProjectAutoCompleteElem = () => {
  const [clients, setClients] = useState([]);
  const items = [
    {
      id: 0,
      name: 'ClearForMe Ongoing Retainer Agreement',
      clientName: 'harvest',
    },
    {
      id: 1,
      name: 'WordPress Maintenance',
      clientName: 'harvest',
    },
    {
      id: 2,
      name: 'harvest Project 2',
      clientName: 'harvest',
    },
    {
      id: 3,
      name: 'harvest project 3',
      clientName: 'harvest',
    },
    {
      id: 4,
      name: 'Evok project 1',
      clientName: 'Evok',
    },
    {
      id: 5,
      name: 'Evok project 2',
      clientName: 'Evok',
    },
    {
      id: 6,
      name: 'Evok project 3',
      clientName: 'Evok',
    },
  ];
  useEffect(() => {
    setClients(utilClientName(items));
  }, []);

  const utilClientName = (arr: any) => {
    const newArr: any = [];
    arr?.filter((item: any) => {
      const i = newArr.findIndex((x: any) => x === item.clientName);
      if (i <= -1) {
        newArr.push(item.clientName);
      }
      return null;
    });
    return newArr;
  };

  const formatResult = (item: any) => {
    return (
      <>
        {clients.map((client) => {
          return (
            <div key={client}>
              <h3>{client}</h3>
              {client === item?.clientName ? (
                <span
                  style={{
                    display: 'block',
                    textAlign: 'left',
                    color: '#676767',
                  }}
                >
                  {item.name}
                </span>
              ) : null}
            </div>
          );
        })}
      </>
    );
  };

  const changeHandler = (value: any) => {
    console.log(value);
  };
  return (
    <div>
      <ReactSearchAutocomplete
        items={items}
        onSelect={changeHandler}
        formatResult={formatResult}
        placeholder='Search here...'
        showIcon={false}
        styling={{
          height: '40px',
          border: '1px solid #E2E8F0',
          borderRadius: '5px',
          backgroundColor: 'white',
          boxShadow: 'none',
          color: '#676767',
          fontSize: '14px',
          fontFamily: 'Source Sans Pro',
          iconColor: '#676767',
          lineColor: '#E2E8F0',
          placeholderColor: '#676767',
          zIndex: 2,
        }}
      />
    </div>
  );
};

export default ProjectAutoCompleteElem;
