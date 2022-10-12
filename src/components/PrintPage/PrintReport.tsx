import {
  Box,
  Flex,
  Heading,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { forwardRef, LegacyRef } from 'react';

interface Props {
  filteredData?: any;
  searchQueryValues?: any;
  isPrinting?: boolean;
}

const PrintReport = forwardRef(
  (
    { filteredData, searchQueryValues, isPrinting }: Props,
    ref: LegacyRef<HTMLDivElement> | undefined,
  ) => {
    console.log({ filteredData });
    return (
      <Box display='none'>
        <Box ref={ref}>
          <Box p='15px 0' className='wrapper'>
            <Flex justifyContent='space-between' pb='20px'>
              <Box>
                <Text
                  fontSize='14px'
                  color='textGray'
                  textStyle='sourceSansProRegular'
                  lineHeight='17.6px'
                >
                  Harvest
                  {/* {projectBasics?.clientName} */}
                </Text>
                <Heading
                  as='h2'
                  m='0 !important'
                  color='textColor'
                  textStyle='sourceSansProBold'
                  fontSize='22px'
                  lineHeight='27.65px'
                >
                  123V
                  {/* {projectBasics?.projectName} */}
                </Heading>
              </Box>
              <HStack>
                <Flex border={'1px solid #E2E8F0'} p={'10px 1rem'}>
                  <Text as='b' mr='5px'>
                    {/* {convertMinutes(milestone?.logTime)} */}
                    180
                  </Text>
                  <Text>Hours</Text>
                </Flex>
              </HStack>
            </Flex>
            <TableContainer>
              <Table border='1px solid #E2E8F0'>
                <Thead background={'white'}>
                  <Tr>
                    <Th
                      w={'50%'}
                      color='textColor'
                      fontSize='16px'
                      lineHeight='20px'
                      textStyle='sourceSansProBold'
                    >
                      Phase 3
                    </Th>
                    <Th
                      w='50%'
                      color='textColor'
                      textAlign='right'
                      fontSize='16px'
                      lineHeight='20px'
                      textStyle='sourceSansProBold'
                    >
                      Total hours
                    </Th>
                  </Tr>
                </Thead>
                <Tbody></Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    );
  },
);

PrintReport.displayName = 'PrintReport';

export default PrintReport;
