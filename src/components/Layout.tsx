
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Menu, Layout, Breadcrumb, Avatar, Input, Row, Col, Tag, Form } from 'antd';

import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { searchAction } from '../action/searchAction';

import { Link } from 'react-router-dom';

import {
   PlusOutlined,
   RetweetOutlined,
   YoutubeOutlined,
} from '@ant-design/icons';

import '../css/layout.css';

const { Header, Sider, Content } = Layout;

interface PropTable {
   selectedKey: string,
   breadcrumb: string,
   children: React.ReactNode
}

const LayoutComponent: React.FC<PropTable> = ({ breadcrumb, selectedKey, children }) => {
   const [form] = Form.useForm();
   const location = useLocation();
   const dispatch = useDispatch();

   const [collapsed, setCollapsed] = useState<boolean>(false);
   const [currentPath] = useState<string>(location.pathname);
   const [inputSearch, setInputSearch] = useState<string>('');
   const [lengthWords, setLengthWords] = useState<number>(0);


   useEffect(() => {
      const local = localStorage.getItem('words');
      if (local) {
         const datas = JSON.parse(local);
         setLengthWords(datas.length);
      }
      return () => { }
   }, [localStorage.getItem('words')])

   const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
      setInputSearch(e.target.value);
      dispatch(searchAction(e.target.value));
   }

   const handleSearch = () => {
      if (inputSearch.length > 0)
         dispatch(searchAction(inputSearch));
   }

   return (
      <Layout style={{ minHeight: '100vh' }}>
         <Header>
            <Row align='middle'>
               <Col span={18}>
                  <a href="https://www.facebook.com/su.thuan.16/" target='_blank' rel='noreferrer'>
                     <Avatar size={"large"} src='../assets/teemo.jpg' />
                  </a>
               </Col>

               <Col span={6}>
                  <Row align='middle'>
                     <Col span={24}>
                        <Form form={form} onFinish={handleSearch}>
                           <Input onChange={handleChange} value={inputSearch} placeholder="Search Word" />
                        </Form>
                     </Col>
                  </Row>
               </Col>
            </Row>
         </Header>

         <Layout>
            <Layout>
               <Sider collapsible onCollapse={() => setCollapsed(!collapsed)}>
                  <Menu style={{ transform: 'translateY(-4px)' }} theme="dark" defaultSelectedKeys={[`${selectedKey}`]} mode="inline">
                     <Menu.Item key="1" icon={<PlusOutlined />}>
                        <Link to='/'>Thêm từ mới</Link>
                     </Menu.Item>

                     <Menu.Item key="2" icon={<RetweetOutlined />}>
                        <Link to='/translate'>Dịch</Link>
                     </Menu.Item>

                  </Menu>
               </Sider>

               <Content>
                  <Layout style={{ height: '100%' }}>
                     <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                           <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>

                           <Breadcrumb.Item>
                              {breadcrumb} {currentPath === '/' && <Tag color="cyan"> {lengthWords} {lengthWords > 1 ? 'Words' : 'Word'}</Tag>}
                           </Breadcrumb.Item>
                        </Breadcrumb>

                        {children}

                     </Content>
                  </Layout>
               </Content>
            </Layout>
         </Layout>

      </Layout>
   )
}

export default React.memo(LayoutComponent);