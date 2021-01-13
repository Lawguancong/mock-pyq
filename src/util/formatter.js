import moment from 'moment';
import { isNumber, startCase, isArray, isFunction, get } from 'lodash';


const formatDateToDash = strDate => {
    if (!strDate) {
        return '';
    }
    if (moment(strDate).add(1, 'days').format('YYYY') !== moment(new Date()).format('YYYY')) {
        return moment(strDate).format('MMMM Do YYYY h:mm a')
    }
    if (moment(strDate).format('YYYY-MM-DD') === moment(new Date()).format('YYYY-MM-DD')) {
        return `Today ${moment(strDate).format('h:mm a')}`
    }
    if (moment(strDate).add(1, 'days').format('YYYY-MM-DD') === moment(new Date()).format('YYYY-MM-DD')) {
        return `Yesterday ${moment(strDate).format('h:mm a')}`
    }
    return moment(strDate).format('MMMM Do h:mm a')
} 

const compressImage = (imgUrl, size, quality) => {
    return `${imgUrl}?x-oss-process=image/resize,w_${size || 500},h_${size || 500}/quality,q_${quality || 80}`;
}

const isApple = (navigator) => {
    if (/(iPhone|iPad|iPod|iOS)/i.test(get(navigator, 'userAgent'))) {
        return true;
    } else if (/(Android)/i.test(get(navigator, 'userAgent'))) {
        return false
    } else {
        // alert('isPC'); // PC端 非移动端
        return false
    }
}
export {
    formatDateToDash,
    compressImage,
    isApple
}