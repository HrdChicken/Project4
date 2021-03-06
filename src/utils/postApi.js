import tokenService from "./tokenService"

const BASE_URL = '/api/posts/'

export function create(postInfoFromTheForm){
	return fetch(BASE_URL, {
		method: 'POST',
		body: postInfoFromTheForm,
		headers: {
			'Authorization': 'Bearer ' + tokenService.getToken()
		}
	}).then(res => {
		if (res.ok) return res.json();
		throw new Error('Error submitting the Form! Hey Check the Express Terminal');
	  })
}

export function getAll() {
	return fetch(BASE_URL, {
	  headers: {
		'Authorization': 'Bearer ' + tokenService.getToken()
	  }
	})
	.then(res => res.json());
  }