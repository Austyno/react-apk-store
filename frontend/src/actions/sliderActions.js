import axios from 'axios';
import {
	CREATE_SLIDER_FAIL,
	CREATE_SLIDER_REQUEST,
	CREATE_SLIDER_SUCCESS,
	SLIDER_LIST_FAIL,
	SLIDER_LIST_REQUEST,
	SLIDER_LIST_SUCCESS,
	SLIDE_SHOW_REQUEST,
	SLIDE_SHOW_SUCCESS,
	SLIDE_SHOW_FAIL,
} from '../constants/sliderConstants';

export const listSliders = () => async (dispatch, getState) => {
	dispatch({
		type: SLIDER_LIST_REQUEST,
	});

	const userLogin = getState().userLogin;
	const {
		userInfo: { token },
	} = userLogin;

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	try {
		const res = await axios.get('/api/sliders/slides', config);
		const data = res.data.data;

		dispatch({
			type: SLIDER_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: SLIDER_LIST_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		});
	}
};

export const createSlider = postData => async (dispatch, getState) => {
	dispatch({
		type: CREATE_SLIDER_REQUEST,
	});

	const userLogin = getState().userLogin;
	const {
		userInfo: { token },
	} = userLogin;

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	try {
		const res = await axios.post('/api/sliders/slides', postData, config);

		const data = res.data.data;

		dispatch({
			type: CREATE_SLIDER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: CREATE_SLIDER_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		});
	}
};

export const slideShow = () => async dispatch => {
	dispatch({
		type: SLIDE_SHOW_REQUEST,
	});
	try {
		const res = await axios.get('/api/sliders');
		const data = res.data.data;
		dispatch({
			type: SLIDE_SHOW_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: SLIDE_SHOW_FAIL,
			payload:
				error.response && error.response.data.error
					? error.response.data.error
					: error.message,
		});
	}
};
