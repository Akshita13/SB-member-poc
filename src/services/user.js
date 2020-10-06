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
export async function selectCheckout() {
  return request('http://localhost:4200/data', {
    method: 'GET',
  });
}
export async function productDetails() {
  return request('http://localhost:4300/data', {
    method: 'GET',
  });
}
export async function submitNotificationForm(param) {
  return request('http://localhost:4400/notification', {
    method: 'POST',
    data: { ...param.notification },
  });
}

export async function updateNotificationForm(param) {
  return request(`http://localhost:4400/notification/${param.id}`, {
    method: 'PUT',
    data: { ...param.notification },
  });
}
export async function getNotification() {
  return request('http://localhost:4400/notification', {
    method: 'GET',
  });
}
export async function notificationDel(id) {
  return request(`http://localhost:4400/notification/${id}`, {
    method: 'DELETE',
  });
}
export async function submitMembership(formValues) {
  return request('http://localhost:4500/formData', {
    method: 'POST',
    data: formValues,
  });
}
export async function getMembership() {
  return request('http://localhost:4500/formData', {
    method: 'GET',
  });
}
