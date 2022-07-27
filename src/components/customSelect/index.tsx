import { Box, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import Select, { components } from 'react-select';
import { utilClientName } from '../../utils/common';

export interface Options {
  id: string;
  name: string;
}

interface Props {
  onChange: (item: any) => void;
}
const CustomSelect = ({ onChange }: Props) => {
  const options: Options[] = [
    { id: '1', name: 'Evok' },
    { id: '2', name: 'Evok' },
    { id: '3', name: 'Shutterstock' },
    { id: '4', name: 'Shutterstock' },
    { id: '5', name: 'beta' },
    { id: '6', name: 'beta' },
  ];

  const [noDataFound, setNoDataFound] = useState<boolean>(false);

  const customStyles = {
    option: (provide: any, state: any) => {
      return {
        ...provide,
        backgroundColor: state.isFocused
          ? '#E2E8F0'
          : state.isSelected
          ? '#E2E8F0'
          : '#fff',
        color: state.isSelected ? '#4657CE' : '#050505',
        padding: '2px 5px 2px 25px',
        fontSize: '14px',
        margin: '0',
      };
    },
    indicatorSeparator: () => ({
      display: 'none',
    }),
    control: () => ({
      padding: '4px 0',
      border: '1px solid #E2E8F0',
      display: 'flex',
      borderRadius: '5px',
      fontSize: '14px',
      lineHeight: '17.6px',
    }),
    dropdownIndicator: () => ({
      padding: '5px 10px 0',
      svg: {
        width: '16px',
        color: '#676464',
      },
    }),
    menu: (provided: any) => {
      return {
        ...provided,
        maxHeight: '250px',
        border: '1px solid #E2E8F0',
        top: '34px',
        overflow: 'scroll',
        '::-webkit-scrollbar': {
          width: '2px',
          height: '0',
        },
        '::-webkit-scrollbar-track': {
          background: '#f1f1f1',
        },
        '::-webkit-scrollbar-thumb': {
          background: '#4657CE',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: '#555',
        },
      };
    },
  };

  const CustomMenuList = ({ selectProps, ...props }: any) => {
    const { MenuList } = components;
    const clients = utilClientName(props.options);
    return (
      <Box className='customSearchInput'>
        {clients.map((val: any) => {
          const getChildren: React.ReactNode =
            props.children.length > 0 &&
            props.children?.map((child: any) =>
              child.props.data.clientName === val ? child : null,
            );
          const getChildChildrent: React.ReactNode =
            props.children.length > 0 &&
            props.children?.map((child: any) =>
              child.props.data.clientName === val
                ? child.props.data.clientName
                : null,
            );
          if (getChildren) setNoDataFound(false);
          return (
            <Box key={val}>
              {Array.isArray(getChildChildrent) &&
                getChildChildrent.length > 0 &&
                getChildChildrent.includes(val) && (
                  <Text
                    p='0px 15px'
                    m='0'
                    fontSize='14px'
                    textTransform='uppercase'
                    textStyle='sourceSansProBold'
                  >
                    {val}
                  </Text>
                )}
              {getChildren ? (
                <MenuList
                  {...props}
                  className='custom_select_menu_list'
                  selectProps={selectProps}
                >
                  {getChildren}
                </MenuList>
              ) : (
                setNoDataFound(true)
              )}
            </Box>
          );
        })}
        {noDataFound && (
          <Text
            p='7px 15px'
            m='0'
            fontSize='14px'
            textStyle='sourceSansProRegular'
          >
            Not found
          </Text>
        )}
      </Box>
    );
  };
  return (
    <Box>
      <Select
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.id}
        onChange={onChange}
        options={options}
        styles={customStyles}
        placeholder='Search project'
        components={{ MenuList: CustomMenuList }}
      />
    </Box>
  );
};

export default CustomSelect;
