import React from 'react';
import Loadable from 'react-loadable';

// 异步加载也没
const LoadableComponent = Loadable({
  loader: () => import('./index'),
  loading() {
  	return <div>正在加载</div>
  }
});

export default () => <LoadableComponent/>
