
import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LayoutComponent from '../components/Layout';
import { AppState } from '../interface/appState';
import { Button, Input, Form, Typography, message, Tag } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import { translateAction } from '../action/translateAction';

import '../css/layout.css';

const { TextArea } = Input;
const { Paragraph } = Typography;

const Translate: React.FC = () => {
   const [form] = Form.useForm();
   const dispatch = useDispatch();
   const stateTranslate = useSelector<AppState, AppState['translate']>(state => state.translate);

   const [inputWord, setInputWord] = useState<string>('');

   const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
      setInputWord(e.target.value);
   }

   const handleSubmit = (): void => {
      dispatch(translateAction(inputWord));
   }

   return (
      <div>
         <LayoutComponent selectedKey='2' breadcrumb='Dịch'>
            <div className="site-layout-background" style={{ minHeight: 360 }}>
               <Form onFinish={handleSubmit} form={form}>
                  <Form.Item
                     name='inputWord'
                  >
                     <Content style={{ display: 'flex' }}>
                        <TextArea onChange={handleChange} style={{ width: '100%' }}
                           allowClear={true}
                           autoSize={true} placeholder='Nhập từ hoặc đoạn văn'
                           autoComplete='off' showCount maxLength={1000} />
                        <Button onClick={handleSubmit} style={{ marginLeft: 10 }} type='primary' danger>Translate</Button>
                     </Content>
                  </Form.Item>
               </Form>

               <Tag color="#108ee9">Result Translate</Tag>

               <div style={{
                  minHeight: '64vh',
                  padding: 8,
                  border: '1px solid #55efc4',
               }}>
                  {
                     stateTranslate && <Paragraph
                        copyable={{
                           text: stateTranslate,
                           onCopy: () => message.success('Copied to clipboard!'),
                        }}
                        type='success' className='text-translate'>{stateTranslate}
                     </Paragraph>
                  }
               </div>

            </div>
         </LayoutComponent>
      </div>
   )
}
export default Translate



