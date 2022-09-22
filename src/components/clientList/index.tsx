import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
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
  const {
    allClients: { clients },
  } = useSelector((state: RootState) => state.rootSlices);

  const editClient = (id: string, name: string) => {
    setFormData({ id, name });
    listContainer.current.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <Box ref={listContainer}>
      <Text
        mt='34px'
        color='grayLight'
        fontSize='18px'
        textStyle='sourceSansProBold'
        lineHeight='22.63px'
      >
        Client listing
      </Text>
      <Box>
        {clients &&
          clients.length > 0 &&
          clients.map(
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
                      to={`/projects?checked=false&searchVal=${client.name.replace(
                        ' ',
                        '+',
                      )}`}
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
      </Box>
    </Box>
  );
};

export default ClientList;
