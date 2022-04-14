import { Component } from 'react'
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { PAGE_POSITION, DEFAULT_PAGESIZE, PAGESIZE_OPTIONS } from './constant'
import classNames from 'classnames';

export default class _Table extends Component {

  static propTypes = {
    columns: PropTypes.array,
    dataSource: PropTypes.array,
    rowKey: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string
    ]),
    // 分页器，参考配置项或 pagination 文档，设为 false 时不展示和进行分页
    pagination: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object
    ]),
    pageManage: PropTypes.object,               // 分页数据
    onChange: PropTypes.func,                   // 点击页码
    onShowSizeChange: PropTypes.func,           // 选择每页显示数量
  }

  static defaultProps = {
    columns: [],
    dataSource: [],
    rowKey: 'key',
    pagination: {
      position: [PAGE_POSITION],              // 指定分页显示的位置
      showQuickJumper: true,                  // 是否可以快速跳转至某页
      hideOnSinglePage: true,                 // 只有一页时是否隐藏分页器
      defaultPageSize: DEFAULT_PAGESIZE,      // 默认的每页条数
      pageSizeOptions: PAGESIZE_OPTIONS,      // 指定每页可以显示多少条
      current: 1,                             // 当前页数
      pageSize: PAGESIZE_OPTIONS,
      total: 0,
      showTotal: () => '共 0 条',
      onChange: () => {},
      onShowSizeChange: () => {}
    },
    pageManage: {
      current: 1,
      pageSize: DEFAULT_PAGESIZE,
      total: 0
    },
  }

  render() {

    let {
      columns,
      dataSource,
      rowKey,
      pagination,
      pageManage,
      onChange,
      onShowSizeChange,
      ..._props
    } = this.props;

    if(pagination !== false) {
      pagination.current = pageManage.current;
      pagination.pageSize = pageManage.pageSize;
      pagination.total = pageManage.total;
      pagination.showTotal = () => `共 ${pageManage.total} 条`;
      if(onChange) {
        pagination.onChange = onChange
      }
      if(onShowSizeChange) {
        pagination.onShowSizeChange = onShowSizeChange
      }
    }

    return <Table
      {..._props}
      className={classNames('advanced-table', _props.className)}
      rowKey={rowKey}
      columns={columns}
      dataSource={dataSource}
      pagination={pagination}
    />
  }

}