
import React, { Component } from 'react';
import { Provider} from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import store from '@/store';
import { ComLoading } from '@/components'

import './index.scss';

const Home = Loadable({ loader: () => import('@/routes/home'), loading: ComLoading });
const PostPhoto = Loadable({ loader: () => import('@/routes/post-photo'), loading: ComLoading });
const PostVideo = Loadable({ loader: () => import('@/routes/post-video'), loading: ComLoading });
const Map = Loadable({ loader: () => import('@/routes/map'), loading: ComLoading });
const Console = Loadable({ loader: () => import('@/routes/console'), loading: ComLoading });
const PostText = Loadable({ loader: () => import('@/routes/post-text'), loading: ComLoading });
const PostCover = Loadable({ loader: () => import('@/routes/post-cover'), loading: ComLoading });
const PostAvatar = Loadable({ loader: () => import('@/routes/post-avatar'), loading: ComLoading });
const NoMatch = Loadable({ loader: () => import('@/routes/no-match'), loading: ComLoading });


export default class App extends Component {
    render () {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/postPhoto" component={PostPhoto} />
                        <Route path="/postVideo" component={PostVideo} />
                        <Route path="/postText" component={PostText} />
                        <Route path="/postCover" component={PostCover} />
                        <Route path="/postAvatar" component={PostAvatar} />
                        <Route path="/console" component={Console} />
                        <Route path="/map" component={Map} />
                        <Route component={NoMatch} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}