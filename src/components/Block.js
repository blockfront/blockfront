import React from "react";
import { connect } from "react-redux";
import BlockInfo from "./BlockInfo";
import { fetchBlock } from "../actions";
import store from "../store";


class Block extends React.Component {
  componentDidMount() {
    store.dispatch(fetchBlock(this.props.blockNumber));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      store.dispatch(fetchBlock(nextProps.blockNumber));
    }
  }

  render() {
    const { blockFetching, blockInfo } = this.props;

    return (
      <div>
        <div>{blockFetching ? <p>Loading...</p> : <BlockInfo blockInfo={blockInfo} />}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    blockNumber: ownProps.match.params.blockNumber,
    blockInfo: state.blocks.block,
    blockFetching: state.blocks.blockIsFetching
  };
};

export default connect(mapStateToProps, null)(Block);