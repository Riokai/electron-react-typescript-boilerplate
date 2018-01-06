import { connect } from 'dva'
import { Counter } from '../components/Counter';
import { IState } from '../models/count'

function mapStateToProps(state: IState) {
  return {
    counter: state.count,
  };
}

export default connect(mapStateToProps)(Counter);
