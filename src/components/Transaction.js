import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TransactionInfo from "./TransactionInfo";
import { fetchTransaction } from "../actions";
import store from "../store";

class Transaction extends React.Component {
  componentDidMount() {
    store.dispatch(fetchTransaction(this.props.txId));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      store.dispatch(fetchTransaction(nextProps.txId));
    }
  }

  render() {
    const { txId, txInfo, txReceipt, txTrace, txFetching } = this.props;

    return (
      <div>
        <p>
          Transaction ID: <b>{txId}</b>
        </p>
        {txFetching ? <p>Loading...</p> : <TransactionInfo info={txInfo} receipt={txReceipt} trace={txTrace} />}
      </div>
    );
  }
}

Transaction.propTypes = {
  txId: PropTypes.string,
  txInfo: PropTypes.object,
  txFetching: PropTypes.bool,
  txReceipt: PropTypes.object,
  txTrace: PropTypes.arrayOf(PropTypes.object),
  currentNode: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  return {
    txId: ownProps.match.params.txId,
    txInfo: state.transactions.transaction,
    txFetching: state.transactions.txIsFetching,
    txReceipt: state.transactions.transactionReceipt,
    txTrace: state.transactions.transactionTrace,
    currentNode: state.nodes.current,
  };
};

export default connect(mapStateToProps, null)(Transaction);
