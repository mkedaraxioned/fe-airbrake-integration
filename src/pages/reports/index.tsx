import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Flex,
  HStack,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ReportFilterForm from '../../components/ReportFilterForm';
import ClientAccordian from '../../components/clientAccordian';
import { ReactComponent as ExportReport } from '../../assets/images/exportReportCSV.svg';
import { FilterFormData } from '../../interfaces/reports';
import { format, lastDayOfWeek, startOfWeek } from 'date-fns';
import { minutesToDecimal } from '../../utils/common';
import PeopleAccordian from '../../components/peopleAccordian';
import axios from 'axios';
import { variables } from '../../constants/backend';
import { _get } from '../../utils/api';
import usePrintHook from '../../hooks/usePrintHook';
import PrintReport from '../../components/PrintPage/PrintReport';
import { ReactComponent as PrintReportIcon } from '../../assets/images/printReportCSV.svg';

interface FilterData {
  startDate: string;
  endDate: string;
  users: string[];
  clients: string[];
}

const Reports = () => {
  const componentRef = useRef(null);
  const date = format(new Date(), 'yyyy-MM-dd');

  const [formData, setFormData] = useState<FilterFormData>({
    clientId: '',
    userId: '',
    projectId: '',
    groupBy: 'client',
    billableType: '',
    startDate: new Date(startOfWeek(new Date())),
    endDate: new Date(lastDayOfWeek(new Date())),
  });
  const [searchQueryValues, setSearchQueryValues] = useState<FilterFormData>({
    ...formData,
  });
  const [filteredData, setFilteredData] = useState<FilterData | any>({
    startDate: '',
    endDate: '',
    users: [],
    clients: [],
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchReportData();
  }, [searchQueryValues]);

  const startDate = format(formData.startDate as Date, 'yyyy-MM-dd');
  const endDate = format(formData.endDate as Date, 'yyyy-MM-dd');

  useEffect(() => {
    if (searchQueryValues.startDate && searchQueryValues.endDate) {
      setFormData({
        ...searchQueryValues,
        startDate: new Date(searchQueryValues.startDate),
        endDate: new Date(searchQueryValues.endDate),
      });
    } else {
      setFormData({
        ...formData,
        startDate: new Date(startOfWeek(new Date())),
        endDate: new Date(lastDayOfWeek(new Date())),
      });
    }
  }, [searchQueryValues]);

  const fetchReportData = async () => {
    try {
      setLoaded(true);
      setFilteredData({ ...filteredData, clients: [], users: [] });
      const res: any = await _get(
        `api/reports?startDate=${searchQueryValues.startDate}&endDate=${searchQueryValues.endDate}&groupBy=${searchQueryValues.groupBy}&billableType=${searchQueryValues.billableType}&clientId=${searchQueryValues.clientId}&projectId=${searchQueryValues.projectId}&userId=${searchQueryValues.userId}`,
      );
      if (res?.data.data) {
        setFilteredData(res.data.data);
      }
      setLoaded(false);
    } catch (error) {
      setLoaded(false);
    }
  };

  const csvDownload = async () => {
    try {
      const response = await axios.get(
        `${variables.BACKEND_URL}api/reports?startDate=${startDate}&endDate=${endDate}&groupBy=${formData?.groupBy}&billableType=${formData?.billableType}&clientId=${formData?.clientId}&userId=${formData?.userId}&projectId=${formData?.projectId}&exportType=csv`,
        {
          responseType: 'blob',
          headers: {
            'Content-Type': 'text/csv',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      const blob = response.data;
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = response.headers['content-disposition']
        .replace(/"/g, '')
        .split('filename=')[1];
      link.click();
      setTimeout(() => URL.revokeObjectURL(link.href), 0);
    } catch (error) {
      console.log(error);
    }
  };

  // Print Report Data
  const docTitle =
    formData.groupBy === 'client'
      ? `report-by-client-${date}`
      : `report-by-people-${date}`;
  const [isPrinting, handlePrint] = usePrintHook({
    componentRef,
    docTitle,
  });

  const clickHandle = () => handlePrint();

  return (
    <Box>
      <Box p='15px 0 80px' className='wrapper'>
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
          <HStack textStyle='sourceSansProBold' color='reportCta'>
            <Flex onClick={clickHandle} cursor='pointer'>
              <PrintReportIcon width='16px' />
              <Text
                ml='8px'
                mr='30px'
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
                onClick={csvDownload}
                fontSize='14px'
                textStyle='sourceSansProBold'
                lineHeight='17.6px'
                cursor='pointer'
              >
                Export CSV
              </Text>
            </Flex>
          </HStack>
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
              p='12px 32px'
              bg='bgGrayLight'
              color='grayLight'
              fontSize='18px'
              textStyle='sourceSansProBold'
              lineHeight='22.63px'
              border='1px'
              borderColor='borderColor'
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
            {filteredData?.startDate &&
              (filteredData?.clients?.length <= 0 ||
                filteredData?.users?.length <= 0) && (
                <Skeleton isLoaded={!loaded}>
                  <Box
                    p='12px 32px'
                    borderBottom='1px'
                    borderLeft='1px'
                    borderRight='1px'
                    borderColor='borderColor'
                    fontSize='16px'
                    textStyle='sourceSansProRegular'
                    lineHeight='17.6px'
                  >
                    <Text>No data found.</Text>
                  </Box>
                </Skeleton>
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
                      {minutesToDecimal(client.logTime)}
                    </Text>
                  </Flex>
                  <ClientAccordian projects={client.projects} />
                </Box>
              );
            })}
            {filteredData?.users?.map((users: any, index: number) => {
              return <PeopleAccordian user={users} key={index} />;
            })}
          </Box>
        </Box>
        {!isPrinting && (
          <PrintReport
            filteredData={filteredData}
            searchQueryValues={searchQueryValues}
            isPrinting={isPrinting}
            ref={componentRef}
          />
        )}
      </Box>
    </Box>
  );
};

export default Reports;
