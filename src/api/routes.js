import {
	BASE_TOKEN,
	API_URL,
} from 'config/auth'


export default {
	TOKEN_URL: BASE_TOKEN + 'oauth/token',
	CURRENT_USER_URL : API_URL + "users/user",
	endpoints: {
		USERS_URL: API_URL + "users",
		POSTS_URL: API_URL + "posts",
		// resource_url : API_URL + "resource"
	}
}