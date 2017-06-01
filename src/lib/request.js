// export const Type = {
//     LOADING: 'LOADING',
//     LOADED: 'LOADED',
//     ERROR: 'ERROR',
// };
//
// export const fetchVersion = () => {
//     const endpoint = '/api/versions.json';
//     return fetch(endpoint).then(resp => {
//         if (resp.status !== 200) {
//             throw new Error(resp.statusText);
//         }
//         return resp.json();
//     });
// };
//
// export const loadVersion = () => {
//     return fetchVersion()
//         .then(data => ({ type: Type.LOADED, data: data }))
//         .catch(err => ({ type: Type.ERROR, error: err }));
// };
