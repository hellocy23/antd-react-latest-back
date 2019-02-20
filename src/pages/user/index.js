import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Row, Col, Button, Popconfirm } from 'antd'
import Page from 'components/Page'
import List from './components/List'
import Filter from './components/Filter'
import Modal from './components/Modal'
import { queryUserList, showModal, hideModal, createUser, updateUser, removeUser, multiDelete, updateState  } from '@/store/actions/user'

@connect(
	state => state.getIn(['user']),
	dispatch => bindActionCreators({ queryUserList, showModal, hideModal, createUser, updateUser, removeUser, multiDelete, updateState }, dispatch)
)
class User extends PureComponent {

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
      loading,
      selectedRowKeys
    } = this.props;
    const { query } = location

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
        const { createUser, updateUser } = this.props;
        modalType === 'create' ? createUser(data): updateUser({...data, id: currentItem.id});
      },
      onCancel: () => {
        this.props.hideModal();
      },
    }

    const listProps = {
      dataSource: list,
      loading,
      pagination,
      onDeleteItem: async(id)=> {
        await this.props.removeUser(id, selectedRowKeys);
        const payload = {
          page: list.length === 1 && pagination.current > 1
              ? pagination.current - 1
              : pagination.current,
          pageSize: pagination.pageSize
        }
        this.props.queryUserList(payload);
      
      },
      onEditItem: (item) => {
        const payload = {
          modalType: 'update',
          currentItem: item,
        };
        this.props.showModal(payload);
      },
      rowSelection: {
        selectedRowKeys,
        onChange: keys => {
          const payload = {
            selectedRowKeys: keys,
          }
          this.props.updateState(payload);
        },
      },
    }

    const filterProps = {
      filter: {
        ...query,
      },
      onFilterChange: (value)=> {
        const payload = { page: 1, pageSize: 10, ...value };
        this.props.queryUserList(payload);
      },
      onAdd: () => {
        const payload = {
          modalType: 'create',
        }
        this.props.showModal(payload);
      },
    }

    const handleDeleteItems = async() => {
      await this.props.multiDelete({ids: selectedRowKeys});
      const payload = {
        page:
          list.length === selectedRowKeys.length && pagination.current > 1
            ? pagination.current - 1
            : pagination.current,
        pageSize: pagination.pageSize
      }
      this.props.queryUserList(payload);
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
