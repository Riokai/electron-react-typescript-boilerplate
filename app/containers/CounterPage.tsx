// import * as React from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'dva'
import { Counter } from '../components/Counter';
import { IState } from '../models/count'
// import * as CounterActions from '../actions/counter';
// import { IState } from '../reducers';

function mapStateToProps(state: IState) {
  return {
    counter: state.count,
  };
}

// function mapDispatchToProps(dispatch: Dispatch<IState>): Partial<IProps> {
//   return bindActionCreators(CounterActions as any, dispatch);
// }

export default connect(mapStateToProps)(Counter);
