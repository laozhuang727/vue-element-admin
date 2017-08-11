import fetch from 'utils/fetch';


export function fetchList(query) {
  query.searchOrder = query.searchOrder.toUpperCase()
  return fetch({
    url: '/api/trainData/search_all',
    method: 'get',
    params: query
  });
}

export function createTrainData(entity) {
  return fetch({
    url: '/api/trainData/create',
    method: 'post',
    params: entity
  });
}

export function updateTrainData(entity) {
  return fetch({
    url: '/api/trainData/update',
    method: 'post',
    params: entity
  });
}
export function deleteTrainData(id) {
  return fetch({
    url: '/api/trainData/delete',
    method: 'post',
    params: id
  });
}





