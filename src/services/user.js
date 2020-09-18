import request from '@/utils/request';
export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}
export async function selectCheckout(){
  return request('http://localhost:4200/data', {
    method: 'GET'
  });
}
