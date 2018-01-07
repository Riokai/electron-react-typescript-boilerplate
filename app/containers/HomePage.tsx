import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { Home, Props } from '../components/Home';
import * as SystemActions from '../actions/system';
import { IState } from '../reducers';

function mapDispatchToProps(dispatch: Dispatch<IState>): Partial<Props> {
  // return bindActionCreators(CounterActions as any, dispatch);
  return bindActionCreators(SystemActions as any, dispatch);
}

export default (connect(null, mapDispatchToProps)(Home) as any as React.StatelessComponent<Props>);
