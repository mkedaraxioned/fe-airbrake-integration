import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import Select, { components } from 'react-select';
import { utilClientName } from '../../utils/common';

export interface Options {
  value: string;
  label: string;
  clientName: string;
}

interface Props {
  onChange: (item: any) => void;
}
const CustomSelect = ({ onChange }: Props) => {
  const options: Options[] = [
    { value: 'pan', label: 'Pandemic Actions Network', clientName: 'Evok' },
    { value: 'alpha', label: 'Alpha', clientName: 'Evok' },
    {
      value: 'shutterstock',
      label: 'Shutterstock',
      clientName: 'Shutterstock',
    },
  ];

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
        padding: '2px 5px 2px 15px',
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
        {clients.map((val: string) => {
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
          return (
            <Box key={val}>
              {Array.isArray(getChildChildrent) &&
                getChildChildrent.length > 0 &&
                getChildChildrent.includes(val) && (
                  <Text
                    p='0px 12px'
                    m='0'
                    fontSize='14px'
                    textTransform='uppercase'
                    textStyle='sourceSansProBold'
                  >
                    {val}f
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
              ) : null}
            </Box>
          );
        })}
      </Box>
    );
  };
  return (
    <Box>
      <Select
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
