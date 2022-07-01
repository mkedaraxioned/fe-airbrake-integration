import { Avatar, AvatarGroup, Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as CalenderIcon1 } from '../../assets/images/calenderIcon1.svg';
import { ReactComponent as CalenderIcon2 } from '../../assets/images/calenderIcon2.svg';

interface Props {
  calenderChng?: boolean;
}

const ProjectCard = ({ calenderChng }: Props) => {
  return (
    <Box
      w='full'
      border='1px'
      borderColor='borderColor'
      rounded='md'
      bg='bgPrimary'
      className='project-card'
      boxSizing='border-box'
    >
      <Link to='/projects/harvest'>
        <Flex
          alignItems='center'
          p='15px 22px'
          justifyContent='space-between'
          borderBottom='1px'
          borderColor='borderColor'
        >
          <Text
            color='textColor'
            fontSize='18px'
            textStyle='sourceSansProBold'
            lineHeight='22.63px'
          >
            Bed Linen
          </Text>
          {calenderChng ? <CalenderIcon2 /> : <CalenderIcon1 />}
        </Flex>
        <Box p='15px 22px'>
          <Text
            color='greenLight'
            fontSize='13.83px'
            textStyle='sourceSansProBold'
            lineHeight='17.39px'
          >
            20 hours remaining
          </Text>
          <Text
            color='textColor'
            p='5px 0 2px'
            fontSize='14px'
            textStyle='sourceSansProBold'
            lineHeight='17.6px'
          >
            Members:
          </Text>
          <AvatarGroup size='sm' flexWrap='wrap' w='60%'>
            <Avatar
              title='Vipin Y'
              name='Vipin Y'
              src='https://lh3.googleusercontent.com/a-/AOh14GgVaCdQ3H7ETdZugiK3ce4Kxvp91FFfq0k0_WcI=s48-p'
            />
            <Avatar
              name='Prajakta P'
              title='Prajakta P'
              src='https://lh3.googleusercontent.com/a-/AOh14GhzeVmBRp11Nni3bJKIknoM6Yav8yaCs8jex3qQlQ=s40-p'
            />
            <Avatar
              name='Vipin Y'
              title='Vipin Y'
              src='https://lh3.googleusercontent.com/a-/AOh14GgVaCdQ3H7ETdZugiK3ce4Kxvp91FFfq0k0_WcI=s48-p'
            />
            <Avatar
              name='Prajakta P'
              title='Prajakta P'
              src='https://lh3.googleusercontent.com/a-/AOh14GhzeVmBRp11Nni3bJKIknoM6Yav8yaCs8jex3qQlQ=s40-p'
            />
            <Avatar
              name='Dnyaneshwar I'
              title='Dnyaneshwar I'
              src='https://lh3.google.com/u/0/ogw/ADea4I6TpQUaF1Miu3OmVLI9N8qbf9Zre1W4dbdU9ysp=s32-c-mo'
            />
          </AvatarGroup>
        </Box>
      </Link>
    </Box>
  );
};

export default ProjectCard;
