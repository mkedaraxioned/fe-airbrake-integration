import React from 'react';
import { Flex, ListItem, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { convertMinutes } from '../../utils/common';
import { ReactComponent as EditGreyIcon } from '../../assets/images/editGreyIcon.svg';
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
        borderTop='1px'
        borderColor='borderColor'
        fontSize='14px'
        lineHeight='17.6px'
        color='grayLight'
        textStyle='sourceSansProRegular'
        justifyContent={'space-between'}
      >
        <Flex flexBasis='25%'>
          {!isPrinting && (
            <Link to={`/dashboard/${activity.timecardId}`}>
              <EditGreyIcon />
            </Link>
          )}
          <Text pl='11px'>
            {format(new Date(activity.date), formatTimeCardDate)}
          </Text>
        </Flex>
        <Text flexBasis='48%'>{activity.comments}</Text>
        <Text pl='18px' flexBasis='10%' textAlign={'right'}>
          {convertMinutes(activity.logTime)}
        </Text>
        {!isPrinting && (
          <Text flexBasis='17%' textAlign={'right'} hidden>
            {activity.updateAt}
          </Text>
        )}
      </Flex>
    </ListItem>
  );
};

export default UserRow;
