import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;

export const User = styled.div`
  display: flex;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 0.5rem;
`;

export const UserAvatar = styled.div``;

export const Content = styled.section`
  flex: 1;
`;
