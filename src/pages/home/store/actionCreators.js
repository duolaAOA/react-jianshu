import axios from 'axios';
import * as constants from './constants';
import { fromJS } from 'immutable';

const changHomeData = (result) => ({
	type: constants.CHANGE_HOME_DATA,
	topicList: result.topicList,
	articleList: result.articleList,
	recommendList: result.recommendList,
	writerList: result.writerList
});

const changeWriterList = (data) => ({
	type: constants.CHANGE_WRITER_PAGE,
	data: fromJS(data),
	writerTotalPage: Math.ceil(data.length / 5)
})

const addHomeList = (list, nextPage) => ({
	type: constants.ADD_ARTICLE_LIST,
	list: fromJS(list),
	nextPage
})

export const changeWriterPage = (writerPage) => ({
	type: constants.CHANGE_WRITER_PAGE,
	writerPage
})

export const getHomeInfo = () => {
	return (dispatch) => {
		axios.get('/api/home.json').then((res) => {
			if (res.data.success) {
				const result = res.data.data;
				dispatch(changHomeData(result));
			}
		}).catch(() => {
			console.log("network error")
		});
	}
}

export const getMoreList = (page) => {
	return (dispatch) => {
		axios.get('/api/homeList.json?page=' + page).then((res) => {
			const result = res.data.data;
			dispatch(addHomeList(result, page + 1));
		});
	}
}

export const getWriterList = (page) => {
	return (dispatch) => {
		axios.get('/api/writerList.json').then((res) => {
			const data = res.data;
			dispatch(changeWriterList(data.data));
		}).catch(() => {
			console.log('error');
		})
	}
}

export const toggleTopShow = (show) => ({
	type: constants.TOGGLE_SCROLL_TOP,
	show
})
