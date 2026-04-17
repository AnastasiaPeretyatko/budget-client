import Lottie from 'lottie-react';
import * as loading from './Loading.json';
import { Flex } from '@chakra-ui/react';

const LoadingComponent = () => {
  return (
    <Flex width={'100%'} height={'100vh'} align={'center'} justify={'center'}>
      <Lottie animationData={loading} loop style={{ maxHeight: '200px', maxWidth: '200px' }}/>
    </Flex>
  )
}
export default LoadingComponent;
