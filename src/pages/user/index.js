import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Row, Col, Button, Popconfirm } from 'antd'
import Page from 'components/Page'
// import { stringify } from 'qs'
import List from './components/List'
import Filter from './components/Filter'
import Modal from './components/Modal'
import { queryUserList, showModal, hideModal  } from '@/store/actions/user'

@connect(
	state => state.getIn(['user']),
	dispatch => bindActionCreators({ queryUserList, showModal, hideModal }, dispatch)
)
class User extends PureComponent {
  constructor(props) {
      super(props);
      this.state = {
        selectedRowKeys: [],
      }
  }

  componentDidMount() {
    const params = {
      page: 1,
      pageSize: 10
    }
    this.props.queryUserList(params);
  }

  render() {
    const {
      location,
      list,
      pagination,
      currentItem,
      modalVisible,
      modalType,
    } = this.props;
    const { selectedRowKeys } = this.state;
    const { query } = location


    const handleRefresh = newQuery => {
      // router.push({
      //   pathname,
      //   search: stringify(
      //     {
      //       ...query,
      //       ...newQuery,
      //     },
      //     { arrayFormat: 'repeat' }
      //   ),
      // })
    }

    const modalProps = {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      maskClosable: false,
      // confirmLoading: loading.effects[`user/${modalType}`],
      title: `${
        modalType === 'create' ? 'Create User' : 'Update User'
      }`,
      centered: true,
      onOk: (data) => {
        // dispatch({
        //   type: `user/${modalType}`,
        //   payload: data,
        // }).then(() => {
        //   handleRefresh()
        // })
      },
      onCancel: () => {
        this.props.hideModal();
      },
    }

    const listProps = {
      dataSource: list,
      // loading: loading.effects['user/query'],
      pagination,
      onChange(page) {
        handleRefresh({
          page: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: async(id)=> {
        // await this.props.removeUser({id});
        // this.handleRefresh({
        //   page:
        //     list.length === 1 && pagination.current > 1
        //       ? pagination.current - 1
        //       : pagination.current,
        // })
      },
      onEditItem(item) {
        // dispatch({
        //   type: 'user/showModal',
        //   payload: {
        //     modalType: 'update',
        //     currentItem: item,
        //   },
        // })
      },
      rowSelection: {
        selectedRowKeys,
        onChange: keys => {
          // dispatch({
          //   type: 'user/updateState',
          //   payload: {
          //     selectedRowKeys: keys,
          //   },
          // })
        },
      },
    }

    const filterProps = {
      filter: {
        ...query,
      },
      onFilterChange(value) {
        handleRefresh({
          ...value,
          page: 1,
        })
      },
      onAdd: () => {
        const payload = {
          modalType: 'create',
        }
        this.props.showModal(payload);
      },
    }

    const handleDeleteItems = () => {
      // dispatch({
      //   type: 'user/multiDelete',
      //   payload: {
      //     ids: selectedRowKeys,
      //   },
      // }).then(() => {
      //   handleRefresh({
      //     page:
      //       list.length === selectedRowKeys.length && pagination.current > 1
      //         ? pagination.current - 1
      //         : pagination.current,
      //   })
      // })
    }

    return (
      <Page inner>
        <Filter {...filterProps} />
        {selectedRowKeys.length > 0 && (
          <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
            <Col>
              {`Selected ${selectedRowKeys.length} items `}
              <Popconfirm
                title="Are you sure delete these items?"
                placement="left"
                onConfirm={handleDeleteItems}
              >
                <Button type="primary" style={{ marginLeft: 8 }}>
                  Remove
                </Button>
              </Popconfirm>
            </Col>
          </Row>
        )}
        <List {...listProps} />
        {modalVisible && <Modal {...modalProps} />}
      </Page>
    )
  }
}

User.propTypes = {
  location: PropTypes.object,
  loading: PropTypes.object,
}

export default User
