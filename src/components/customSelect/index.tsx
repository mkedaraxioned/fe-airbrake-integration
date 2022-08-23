import { Box, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select, { components } from 'react-select';
import { updateSelectedProject } from '../../feature/timeCardSlice';
import { RootState } from '../../store';

export interface Options {
  id: string;
  name: string;
}

interface Props {
  onChange: (item: any) => void;
  linkLabel: string;
  notValid: boolean;
  updateStateProps: {
    borderColor: string;
    boxShadow: string;
  };
}
const CustomSelect = ({
  onChange,
  linkLabel,
  notValid,
  updateStateProps,
}: Props) => {
  const dispatch = useDispatch();
  const [noDataFound, setNoDataFound] = useState<boolean>(false);
  const { projects } = useSelector((state: RootState) => state.allProjects);
  const { clients } = useSelector((state: RootState) => state.allClients);
  const { selectedProject } = useSelector((state: RootState) => state.timeCard);

  const optionsData = projects.map((elem: any) => {
    const client = clients?.find(
      ({ id }: { id: string }) => id === elem.clientId,
    );
    return client
      ? {
          label: elem.title,
          value: elem.id,
          clientName: client.name,
          clientId: client.id,
        }
      : {
          label: elem.title,
          value: elem.id,
          clientName: null, // TODO: modify this logic once dev is back
          clientId: null,
        };
  });

  const sortOptions = optionsData?.sort(
    (a: { clientName: string }, b: { clientName: string }) =>
      a?.clientName?.toLowerCase() > b?.clientName?.toLowerCase() ? 1 : -1,
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
      border: `1px solid ${
        notValid
          ? '#E53E3E'
          : updateStateProps
          ? updateStateProps.borderColor
          : '#E2E8F0'
      }`,
      boxShadow: `${
        notValid
          ? '0 0 0 1px #E53E3E'
          : updateStateProps
          ? updateStateProps.boxShadow
          : 'none'
      }`,
      display: 'flex',
      borderRadius: '5px',
      fontSize: '14px',
      lineHeight: '17.6px',
      cursor: 'pointer',
    }),
    dropdownIndicator: () => ({
      padding: '5px 10px 0',
      svg: {
        width: '16px',
        color: '#676464',
      },
    }),
    placeholder: (provided: any) => {
      return {
        ...provided,
        fontSize: '13.5px',
        textStyle: 'sourceSansProRegular',
        color: '#363636',
      };
    },
    menu: (provided: any) => {
      return {
        ...provided,
        maxHeight: '250px',
        border: '1px solid #E2E8F0',
        top: '34px',
        overflowY: 'scroll',
        '::-webkit-scrollbar': {
          width: '5px',
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
            No matching results
          </Text>
        )}
      </Box>
    );
  };

  const handleChange = (val: any) => {
    onChange && onChange(val);
    dispatch(updateSelectedProject(val));
  };

  return (
    <Box>
      <Select
        id={linkLabel}
        onChange={handleChange}
        options={sortOptions}
        value={selectedProject}
        styles={customStyles}
        placeholder='Select project'
        components={{ MenuList: CustomMenuList }}
      />
    </Box>
  );
};

export default CustomSelect;
