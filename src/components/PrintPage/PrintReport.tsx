import { Box, Flex, Text, List, ListItem } from '@chakra-ui/react';
import { format } from 'date-fns';
import React, { forwardRef, LegacyRef } from 'react';
import { minutesToDecimal } from '../../utils/common';

interface Props {
  printData?: any;
  searchQueryValues?: any;
  isPrinting?: boolean;
}

const PrintReport = forwardRef(
  (
    { printData, searchQueryValues, isPrinting }: Props,
    ref: LegacyRef<HTMLDivElement> | undefined,
  ) => {
    console.log(printData, 'vprintData');
    return (
      <Box>
        {printData.data?.map((client: any, index: number) => {
          return <Box key={index}></Box>;
        })}
      </Box>
    );
  },
);

PrintReport.displayName = 'PrintReport';

export default PrintReport;
