import React from "react";
import { Link } from "react-router-dom";
import { Badge, List, Tag } from 'antd';
import { formatData, formatTopics } from "../util";

const TransactionLog = ({ log }) => (
  <div>
    <p>
      <h3>Address</h3>
      <Badge count={log.logIndex} />
      &nbsp;
      <Link to={`/address/${log.address}/`}>
        <Tag color="magenta">{log.address}</Tag>
      </Link>
    </p>
    <List
      size="small"
      header={<h3>Topics</h3>}
      dataSource={log.topics}
      renderItem={(item, index) => (<List.Item><Badge count={index} showZero />&nbsp;<pre>{item}</pre></List.Item>)}
      split={false}
    />
    <div>
      <h3>Data</h3>
      <pre>
      {formatData(log.data).join('\n')}
      </pre>
    </div>
  </div>
);

export default TransactionLog;
