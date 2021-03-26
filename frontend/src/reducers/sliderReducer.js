import {
	CREATE_SLIDER_FAIL,
	CREATE_SLIDER_REQUEST,
	CREATE_SLIDER_SUCCESS,
	CREATE_SLIDER_RESET,
	SLIDER_LIST_FAIL,
	SLIDER_LIST_REQUEST,
	SLIDER_LIST_SUCCESS,
	SLIDE_SHOW_REQUEST,
	SLIDE_SHOW_SUCCESS,
	SLIDE_SHOW_FAIL,
} from '../constants/sliderConstants'

export const sliderListReducer = (state = { images: [] }, action) => {
	switch (action.type) {
		case SLIDER_LIST_REQUEST:
			return { loading: true, images: [] }
		case SLIDER_LIST_SUCCESS:
			return { loading: false, images: action.payload }
		case SLIDER_LIST_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const createSliderReducer = (state = {}, action) => {
	switch (action.type) {
		case CREATE_SLIDER_REQUEST:
			return { loading: true }
		case CREATE_SLIDER_SUCCESS:
			return { loading: false, success: true }
		case CREATE_SLIDER_FAIL:
			return { loading: false, error: action.payload }
		case CREATE_SLIDER_RESET:
			return {}
		default:
			return state
	}
}

export const slideShowReducer = (state = {slides:[]},action) => {
	switch (action.type) {
		case SLIDE_SHOW_REQUEST:
			return { loading: true }
		case SLIDE_SHOW_SUCCESS:
			return { loading: false, slides: action.payload }
		case SLIDE_SHOW_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}