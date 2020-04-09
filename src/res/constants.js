import Dimensions from 'react-native';

const {HEIGHT,WIDTH} = Dimensions.get('window');
const constAdjustResize = (HEIGHT+WIDTH)/(570+330);

const constants = {
    WIDTH: WIDTH,
    HEIGHT: HEIGHT,
    adjustResize: constAdjustResize
}

export default constAdjustResize;