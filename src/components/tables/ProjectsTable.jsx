import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, message } from 'antd';

import { fetchProjects, deleteProject } from '../../store/projects/actions';
import { isAdmin } from '../../utils/permissions';
import ActionList from '../lists/ActionList';
import CreateProjectButton from '../buttons/CreateProjectButton';

const ProjectsTable = () => {
  const { projects, loading } = useSelector(state => state.projects);
  const dispatch = useDispatch();

  const renderActions = (text, record) => (
    <ActionList
      onEdit={() => message.warn('Função ainda não implementada')}
      onDelete={() => dispatch(deleteProject(record.codigo))}
    />
  );

  const columns = [
    {
      title: 'Instituição',
      dataIndex: 'nome_instituicao',
      key: 'nome_instituicao'
    },
    {
      title: 'Nome',
      dataIndex: 'nome_projeto',
      key: 'nome_projeto'
    },
    {
      title: 'Ativo',
      dataIndex: 'ativo',
      key: 'ativo',
      render: text => (text ? 'Sim' : 'Não')
    },
    {
      title: 'Total de Doações',
      dataIndex: 'total_doacao',
      key: 'total_doacao',
      render: text => `R$ ${text}`
    },
    {
      title: <CreateProjectButton disabled={isAdmin()} />,
      key: 'actions',
      render: renderActions
    }
  ];

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <Table bordered columns={columns} dataSource={projects} loading={loading} rowKey="codigo" />
  );
};

export default ProjectsTable;