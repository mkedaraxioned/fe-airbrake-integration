import { Box, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Select, { components } from 'react-select';
import { RootState } from '../../store';

export interface Options {
  id: string;
  name: string;
}

interface Props {
  onChange: (item: any) => void;
}
const CustomSelect = ({ onChange }: Props) => {
  const [noDataFound, setNoDataFound] = useState<boolean>(false);
  const { projects } = useSelector((state: RootState) => state.allProjects);
  const { clients } = useSelector((state: RootState) => state.allClients);
  const optionsData = projects.map((elem: any) => {
    const client = clients?.find(
      ({ id }: { id: string }) => id === elem.clientId,
    );
    return client
      ? {
          label: elem.title,
          value: elem.id,
          clientName: client?.name,
          clientId: client?.id,
        }
      : null;
  });

  const sortOptions = optionsData?.sort(
    (a: { clientName: string }, b: { clientName: string }) =>
      a?.clientName.toLowerCase() > b?.clientName.toLowerCase() ? 1 : -1,
  );

  const utilClientName = (arr: any) => {
    const newArr: { clientName: string; id: string }[] = [];
    arr?.filter((item: any) => {
      const i = newArr.findIndex((x: any) => x.clientName === item.clientName);
      if (i <= -1) {
        newArr.push({ clientName: item.clientName, id: item.clientId });
      }
      return null;
    });
    return newArr;
  };

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
    const Allclients = utilClientName(props.options);
    return (
      <Box className='customSearchInput'>
        {Allclients.map((val: any) => {
          const getChildren: React.ReactNode =
            props.children.length > 0 &&
            props.children?.map((child: any) =>
              child.props.data.clientName === val.clientName ? child : null,
            );
          const getChildChildrent: React.ReactNode =
            props.children.length > 0 &&
            props.children?.map((child: any) =>
              child.props.data.clientName === val.clientName
                ? child.props.data.clientName
                : null,
            );
          if (getChildren) setNoDataFound(false);
          return (
            <Box key={val?.clientName}>
              {Array.isArray(getChildChildrent) &&
                getChildChildrent.length > 0 &&
                getChildChildrent.includes(val.clientName) && (
                  <Text
                    p='0px 15px'
                    m='0'
                    fontSize='14px'
                    textTransform='uppercase'
                    textStyle='sourceSansProBold'
                  >
                    {val?.clientName}
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
  console.log(optionsData, 'optionsDataoptionsData');
  return (
    <Box>
      <Select
        // getOptionLabel={(option) => option.name}
        // getOptionValue={(option) => option.id}
        onChange={onChange}
        options={sortOptions}
        styles={customStyles}
        placeholder='Search project'
        components={{ MenuList: CustomMenuList }}
      />
    </Box>
  );
};

export default CustomSelect;
