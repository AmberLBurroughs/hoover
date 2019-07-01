export default {
	getInstructions: () => {
		return fetch("http://localhost:8000/api/hoover", {
            method: 'GET',
            credentials: 'include',
            mode: 'cors'
        });
    }
}