import React from 'react';
import { Flex, ListItem, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { convertMinutes } from '../../utils/common';
import { ReactComponent as EditGreyIcon } from '../../assets/images/editGreyIcon.svg';

const UserRow = ({ activity }: any) => {
  const formatTimeCardDate = 'EEEE, MMMM dd, yyyy';
  return (
    <ListItem>
      <Flex
        p='15px 26px'
        borderTop='1px'
        borderColor='borderColor'
        fontSize='14px'
        lineHeight='17.6px'
        color='grayLight'
        textStyle='sourceSansProRegular'
      >
        <Flex flexBasis='25%'>
          <Link to={`/dashboard/${activity.timecardId}`}>
            <EditGreyIcon />
          </Link>
          <Text pl='11px'>
            {format(new Date(activity.date), formatTimeCardDate)}
          </Text>
        </Flex>
        <Text flexBasis='45%'>{activity.comments}</Text>
        <Text pl='18px' flexBasis='13%' textAlign={'right'}>
          {convertMinutes(activity.logTime)}
        </Text>
        <Text flexBasis='17%' textAlign={'right'} hidden>
          {activity.updateAt}
        </Text>
      </Flex>
    </ListItem>
  );
};

export default UserRow;
