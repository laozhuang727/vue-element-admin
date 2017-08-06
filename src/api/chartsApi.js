import fetch from 'utils/fetch';

export function getRelationshipData() {
  return fetch({
    url: '/charts/relationship',
    method: 'get'
  });
}


