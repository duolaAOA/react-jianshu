import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { WriterWrapper, WriterItems, WriterItem, LoadMoreWriter } from '../style';
import {actionCreators} from "../store";

class Writer extends PureComponent {

	getListArea() {
		const { list, writerPage } = this.props;
		const newList = list.toJS();
		const pageList = [];

		if (newList.length) {
			for (let i = (writerPage - 1) * 5; i < writerPage * 5; i++) {
				if (i < newList.length) {
					let map = new Map(Object.entries(newList[i]));
					pageList.push(
						<WriterItem key={newList[i]}>
							<li className='list-item' key={map.get('id')}>
								<a href={map.get('imgUrl')} target="_blank" className="avatar" rel="noreferrer">
									<img className="writer-pic" src={map.get('imgUrl')} alt=""/>
								</a>
								<a className="follow">关注</a>
								<a href="/" target="_blank" className="name">{map.get('author')}</a>
								<p className='desc'>{map.get('words')}字 {map.get('liked')}喜欢</p>
							</li>
						</WriterItem>
					)
				}
			}
		}

		return (
			<WriterItems>
				{pageList}
			</WriterItems>
		)
	}

	render() {
		const { writerPage, writerTotalPage, handleChangePage } = this.props;
		return (
			<WriterWrapper>
				<div className="title">
					<span className="author">推荐作者</span>
					<span
						className="page-change"
						onClick={() => handleChangePage(writerPage, writerTotalPage, this.spinIcon)}
					>
						<i ref={(icon) => {this.spinIcon = icon}} className="iconfont spin" >&#xe851;</i>
						换一批
					</span>
				</div>

				{this.getListArea()}
				{/*<WriterItem>*/}
				{/*	{*/}
				{/*		list.map((item) => (*/}
				{/*			<li className='list-item' key={item.get('id')}>*/}
				{/*				<a href={item.get('imgUrl')} target="_blank" className="avatar" rel="noreferrer">*/}
				{/*					<img className="writer-pic" src={item.get('imgUrl')} alt=""/>*/}
				{/*				</a>*/}
				{/*				<a className="follow">关注</a>*/}
				{/*				<a href="/" target="_blank" className="name">{item.get('author')}</a>*/}
				{/*				<p className='desc'>{item.get('words')}字 {item.get('liked')}喜欢</p>*/}
				{/*			</li>*/}
				{/*		))*/}
				{/*	}*/}
				{/*</WriterItem>*/}
				<LoadMoreWriter>更多作者</LoadMoreWriter>

			</WriterWrapper>
		)
	}
}

const mapStateToProps = (state) => ({
	list: state.getIn(["home","writerList"]),
	writerPage: state.getIn(["home", "writerPage"]),
	writerTotalPage: state.getIn(["home", "writerTotalPage"])
});

const mapDispathToProps = (dispatch) => {
	return {
		handleChangePage(page, totalPage, spin) {
			let originAngle = spin.style.transform.replace(/[^0-9]/ig, '');
			if (originAngle) {
				originAngle = parseInt(originAngle, 10);
			}else {
				originAngle = 0;
			}
			spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)';

			console.log(page, totalPage);
			if (page < totalPage) {
				dispatch(actionCreators.changeWriterPage(page + 1));
			} else {
				dispatch(actionCreators.changeWriterPage(1));
			}
		}
	}
}

export default connect(mapStateToProps,mapDispathToProps)(Writer);
