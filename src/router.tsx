import * as React from 'react';
import { LocaleProvider } from 'antd';
import { routerRedux, Route, Switch } from 'dva/router';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import Layout from './components/Layout';

const { ConnectedRouter } = routerRedux;
function RouterConfig({history, app}:any) {
    return (
        <LocaleProvider locale={zhCN}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path="/user" component={Layout}/>
                </Switch>
            </ConnectedRouter>
        </LocaleProvider>
    );
}

export default RouterConfig;