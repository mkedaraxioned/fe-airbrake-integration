import { Box, Flex, Input, Text } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as EditGreyIcon } from '../../assets/images/editGreyIcon.svg';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux';
import { FormData } from '../addClient';

interface Props {
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onClose: () => void;
  listContainer: any;
}

const ClientList = ({ setFormData, onClose, listContainer }: Props) => {
  const [showClients, setShowClients] = useState([]);
  const {
    allClients: { clients },
  } = useSelector((state: RootState) => state.rootSlices);
  const searchElem = useRef<any>();

  const editClient = (id: string, name: string) => {
    setFormData({ id, name });
    listContainer.current.scrollIntoView({
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    if (clients) setShowClients(clients);
  }, []);

  const searchHandler = () => {
    const inputVal = searchElem.current.value;
    const filterVal = clients?.filter((val: { name: string }) =>
      val?.name.toLowerCase().includes(inputVal.toLowerCase()),
    );
    setShowClients(filterVal);
  };

  return (
    <Box ref={listContainer}>
      <Text
        mt='26px'
        color='grayLight'
        fontSize='18px'
        textStyle='sourceSansProBold'
        lineHeight='22.63px'
      >
        Client listing
      </Text>
      <Box w='full' p='10px 0'>
        <Input
          placeholder='Search client here'
          w='full'
          textStyle='sourceSansProRegular'
          boxSizing='border-box'
          border='1px'
          type='text'
          name='name'
          fontSize='14px'
          lineHeight='17.6px'
          className='searchInput'
          ref={searchElem}
          onChange={searchHandler}
        />
      </Box>
      <Box>
        {showClients &&
          showClients.length > 0 &&
          showClients.map(
            (
              client: { id: string; name: string; projects: string[] },
              index: number,
            ) => {
              return (
                <Flex
                  key={client.id}
                  p={index === 0 ? '8px 0' : '12px 0'}
                  justifyContent='space-between'
                  borderBottom={index < clients.length - 1 ? '1px' : ''}
                  borderColor='borderColor'
                >
                  <Flex alignItems='center'>
                    <Text
                      cursor='pointer'
                      title='Edit'
                      onClick={() => editClient(client.id, client.name)}
                    >
                      <EditGreyIcon />
                    </Text>
                    <Text pl='10px' color='grayLight'>
                      {client.name}
                    </Text>
                  </Flex>
                  <Box>
                    <Link
                      to={`/projects?search=${client.name.replace(' ', '+')}`}
                      onClick={onClose}
                    >
                      <Text
                        color='grayLight'
                        textDecor='underline'
                        _hover={{
                          opacity: '.8',
                        }}
                      >{`${client.projects.length} Projects`}</Text>
                    </Link>
                  </Box>
                </Flex>
              );
            },
          )}
        {showClients.length <= 0 && <Text>No client found</Text>}
      </Box>
    </Box>
  );
};

export default ClientList;
