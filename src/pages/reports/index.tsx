import React from 'react';
import { Box, Breadcrumb, BreadcrumbItem, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ReportFilterForm from '../../components/ReportFilterForm';
import ClientAccordian from '../../components/clientAccordian';
import { ReactComponent as ExportIcon } from '../../assets/images/exportIcon.svg';

const Reports = () => {
  return (
    <Box>
      <Box p='15px 55px 80px' className='wrapper'>
        <Breadcrumb m='15px 0' fontSize='14px' spacing='4px'>
          <BreadcrumbItem>
            <Link to='/'>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Text color='textLight'>Projects</Text>
          </BreadcrumbItem>
        </Breadcrumb>
        <Text
          pb='28px'
          color='textColor'
          fontSize='22px'
          textStyle='sourceSansProBold'
          lineHeight='27.65px'
        >
          Reports
        </Text>
        <Box>
          <ReportFilterForm />
        </Box>
        <Box pt='28px'>
          <Text
            color='textColor'
            fontSize='22px'
            textStyle='sourceSansProBold'
            lineHeight='27.65px'
          >
            July 01, 2022 - July 31, 2022
          </Text>
          <Box pt='15px'>
            <Text
              color='textGray'
              fontSize='14px'
              textStyle='sourceSansProRegular'
              lineHeight='17.6px'
            >
              Axioned
            </Text>
            <Text
              color='textColor'
              fontSize='22px'
              textStyle='sourceSansProBold'
              lineHeight='27.65px'
            >
              Axioned Website
            </Text>
          </Box>
          <Flex
            m='10px 0 5px'
            justifyContent='space-between'
            alignItems='center'
            textStyle='sourceSansProBold'
          >
            <Text fontSize='18px' lineHeight='22.63px'>
              Time entered for task
            </Text>
            <Box display='flex' justifyContent='flex-end' cursor='pointer'>
              <ExportIcon />
              <Text
                pl='5px'
                color='textColor'
                textAlign='right'
                fontSize='14px'
                lineHeight='17.6px'
              >
                Print report
              </Text>
            </Box>
          </Flex>
          <Box>
            <Flex
              p='12px 25px'
              bg='purple'
              color='white'
              fontSize='18px'
              justifyContent='space-between'
              textStyle='sourceSansProBold'
            >
              <Text lineHeight='22.63px'>
                Results for July 01, 2022 - July 31, 2022 :
              </Text>
              <Text pr='9%' lineHeight='22.63px'>
                100:00
              </Text>
            </Flex>
            <Flex
              p='8px 25px'
              justifyContent='space-between'
              bg='bgGray'
              color='grayLight'
              textStyle='sourceSansProBold'
              fontSize='14px'
              lineHeight='17.6px'
            >
              <Text lineHeight='17.6px'>Client name</Text>
              <Text pr='7.7%' lineHeight='17.6px'>
                Time entered
              </Text>
            </Flex>
            <ClientAccordian />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Reports;
