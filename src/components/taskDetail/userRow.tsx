import React from 'react';
import { Flex, ListItem, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { convertMinutes } from '../../utils/common';
import { ReactComponent as EditTimeCardSvg } from '../../assets/images/editTimeCardSVG.svg';
import { ProjectActivity } from '../../interfaces/projectDetails';

interface Props {
  activity: ProjectActivity;
  isPrinting?: boolean;
}

const UserRow = ({ activity, isPrinting }: Props) => {
  const formatTimeCardDate = 'EEEE, MMMM dd, yyyy';
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
        <Flex flexBasis='28%'>
          {!isPrinting && (
            <Link to={`/dashboard/${activity.timecardId}`}>
              <EditTimeCardSvg />
            </Link>
          )}
          <Text pl='11px'>
            {format(new Date(activity.date), formatTimeCardDate)}
          </Text>
        </Flex>
        <Text flexBasis='45%'>{activity.comments}</Text>
        <Text pl='18px' flexBasis='10%' textAlign={'right'}>
          {convertMinutes(activity.logTime)}
        </Text>
        {isPrinting && (
          <Text flexBasis='8%' textAlign={'right'} hidden>
            {activity.updateAt}
          </Text>
        )}
      </Flex>
    </ListItem>
  );
};

export default UserRow;
