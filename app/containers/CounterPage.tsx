import { connect } from 'dva'
import { Counter } from '../components/Counter';
import { IState } from '../models/count'

function mapStateToProps(state: IState) {
  return {
    counter: state.count,
  };
}

<<<<<<< HEAD
export default connect(mapStateToProps)(Counter);
=======
function mapDispatchToProps(dispatch: Dispatch<IState>): Partial<IProps> {
  // return bindActionCreators(CounterActions as any, dispatch);
  return bindActionCreators(CounterActions as any, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Counter) as any as React.StatelessComponent<IProps>);
>>>>>>> package
