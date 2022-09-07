import React, { useState } from 'react';
import { Box, Breadcrumb, BreadcrumbItem, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ReportFilterForm from '../../components/ReportFilterForm';
import ClientAccordian from '../../components/clientAccordian';
import { ReactComponent as ExportReport } from '../../assets/images/exportReportCSV.svg';
import { ReactComponent as PrintReport } from '../../assets/images/printReportCSV.svg';
import { FilterFormData } from '../../interfaces/reports';
import { useGetReportDataQuery } from '../../redux/apis/reports';
import { format } from 'date-fns';
import { getTimeInHours } from '../../utils/common';

const Reports = () => {
  const [formData, setFormData] = useState<FilterFormData>({
    clientId: '',
    userId: '',
    projectId: '',
    groupBy: 'client',
    billableType: '',
    startDate: new Date(),
    endDate: new Date(),
  });
  const [searchQueryValues, setSearchQueryValues] = useState<any>({});
  const { data: filteredData } = useGetReportDataQuery(searchQueryValues);

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
        <Flex justifyContent='space-between'>
          <Text
            pb='28px'
            color='textColor'
            fontSize='22px'
            textStyle='sourceSansProBold'
            lineHeight='27.65px'
          >
            Reports
          </Text>
          <Flex textStyle='sourceSansProBold' color='reportCta'>
            <Flex>
              <PrintReport width='16px' />
              <Text
                ml='8px'
                mr='51px'
                fontSize='14px'
                textStyle='sourceSansProBold'
                lineHeight='17.6px'
              >
                Print report
              </Text>
            </Flex>
            <Flex>
              <ExportReport width='16px' />
              <Text
                ml='8px'
                fontSize='14px'
                textStyle='sourceSansProBold'
                lineHeight='17.6px'
              >
                Export CSV
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Box>
          <ReportFilterForm
            formData={formData}
            setFormData={setFormData}
            searchQueryValues={searchQueryValues}
            setSearchQueryValues={setSearchQueryValues}
          />
        </Box>
        <Box pt='50px'>
          {filteredData?.startDate && filteredData?.endDate && (
            <Text
              p='12px 33px'
              bg='bgGrayLight'
              color='grayLight'
              fontSize='18px'
              textStyle='sourceSansProBold'
              lineHeight='22.63px'
            >
              {filteredData?.startDate &&
                filteredData?.endDate &&
                `Results for ${format(
                  new Date(filteredData?.startDate),
                  'MMMM dd, yyyy',
                )} - ${format(
                  new Date(filteredData?.endDate),
                  'MMMM dd, yyyy',
                )}`}
            </Text>
          )}
          <Box>
            {filteredData?.clients?.length <= 0 && (
              <Box p='25px 35px'>
                <Text>No data found...</Text>
              </Box>
            )}
            {filteredData?.clients?.map((client: any, index: number) => {
              return (
                <Box key={index}>
                  <Flex justifyContent='space-between' p='8px 50px' bg='bgGray'>
                    <Text
                      color='grayLight'
                      textStyle='sourceSansProBold'
                      fontSize='14px'
                      lineHeight='17.6px'
                    >
                      {client.name}
                    </Text>
                    <Text
                      color='grayLight'
                      textStyle='sourceSansProBold'
                      fontSize='14px'
                      lineHeight='17.6px'
                    >
                      {getTimeInHours(client.logTime)}
                    </Text>
                  </Flex>
                  <ClientAccordian projects={client.projects} />
                </Box>
              );
            })}
            <ClientAccordian projects={[]} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Reports;
