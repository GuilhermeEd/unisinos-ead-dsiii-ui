import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Modal } from 'antd';

import { fetchUsers, fetchUser } from '../../store/users/actions';
import ActionList from '../lists/ActionList';
import DonatorForm from '../forms/DonatorForm';
import InstitutionForm from '../forms/InstitutionForm';

const UsersTable = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { user, users, loading, userUpdated } = useSelector(state => state.users);
  const dispatch = useDispatch();

  const toggleEditModal = record => {
    const newModalState = !isEditModalOpen;

    if (newModalState && record) {
      dispatch(fetchUser(record.codigo));
    }

    setIsEditModalOpen(newModalState);
  };

  useEffect(() => {
    if (userUpdated) {
      toggleEditModal();
    }
  }, [userUpdated]);

  const renderActions = (text, record) => <ActionList onEdit={() => toggleEditModal(record)} />;

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome'
    },
    {
      title: 'Tipo',
      dataIndex: 'tipo',
      key: 'tipo'
    },
    {
      title: 'Editar',
      key: 'actions',
      render: renderActions
    }
  ];

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      <Table bordered columns={columns} dataSource={users} loading={loading} rowKey="codigo" />
      <Modal visible={isEditModalOpen} onCancel={toggleEditModal} footer={null}>
        {!!user && user.tipo === 'D' && (
          <DonatorForm isEdit initialValues={user} loading={loading} />
        )}
        {!!user && user.tipo === 'I' && (
          <InstitutionForm isEdit initialValues={user} loading={loading} />
        )}
      </Modal>
    </>
  );
};

export default UsersTable;
