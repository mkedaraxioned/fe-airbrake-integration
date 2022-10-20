import React from 'react';
import { Flex, ListItem, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { minutesToDecimal } from '../../utils/common';
import { ReactComponent as EditTimeCardSvg } from '../../assets/images/editTimeCardSVG.svg';
import { ProjectActivity } from '../../interfaces/projectDetails';

interface Props {
  activity: ProjectActivity;
  isPrinting?: boolean;
  onOpen?: any;
  setTimeLogId?: any;
}

const UserRow = ({ activity, isPrinting, onOpen, setTimeLogId }: Props) => {
  const formatTimeCardDate = 'EEE, MMM dd, yyyy';
  const timeCardEdit = (id: string) => {
    onOpen();
    setTimeLogId(id);
  };
  return (
    <ListItem>
      <Flex
        p='15px 4% 15px 2%'
        borderColor='borderColor'
        fontSize='14px'
        lineHeight='17.6px'
        color='grayLight'
        textStyle='sourceSansProRegular'
        justifyContent={isPrinting ? 'space-between' : 'initial'}
        borderTop={isPrinting ? '1px solid #E2E8F0' : '1px solid #E2E8F0'}
      >
        <Flex flexBasis='22%'>
          {!isPrinting && (
            <Text
              cursor='pointer'
              onClick={() => timeCardEdit(activity.timecardId)}
            >
              <EditTimeCardSvg />
            </Text>
          )}
          <Text pl='11px'>
            {format(new Date(activity.date), formatTimeCardDate)}
          </Text>
        </Flex>
        <Text flexBasis='51%'>{activity.comments}</Text>
        <Text flexBasis='10%' textAlign={'right'}>
          {minutesToDecimal(activity.logTime)}
        </Text>
        {isPrinting && (
          <Text flexBasis='10%' textAlign={'right'} hidden>
            {activity.updateAt}
          </Text>
        )}
      </Flex>
    </ListItem>
  );
};

export default UserRow;
