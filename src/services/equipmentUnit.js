import request from '@/utils/request';

export async function getEUList(params) {
    return request('http://192.168.41.249:7400/getDeviceUnitList', {
        method: 'POST',
        body: params,
    });
}
