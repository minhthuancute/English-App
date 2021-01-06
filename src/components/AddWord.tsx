
import React, { ChangeEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validationWord } from '../action/validitionAction';

import LayoutComponent from '../components/Layout';
import { AppState } from '../interface/appState';

import { Layout, Button, Input, Form, message } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import TableWords from '../components/TableWords';

import '../css/layout.css';

// Define type of item Datasource Table
type ItemDataSource = {
   key: string,
   name: string,
   IPA: string,
   audio: string,
   type: string,
   definitions: string,
   vi: string,
   idDelete: string
}

const AddWord: React.FC = () => {
   const [form] = Form.useForm();
   const dispatch = useDispatch();

   const validationState = useSelector<AppState, AppState['validition']>(state => state.validition);
   const searchState = useSelector<AppState, AppState['search']>(state => state.search);

   const [inputWord, setInputWord] = useState<string>('');
   const [local, setLocal] = useState<[]>([]);
   const [dataSource, setDataSource] = useState<[]>([]);
   const [isAdd, setIsAdd] = useState<boolean>(false);
   const [isDelete, setIsDelete] = useState<boolean>(false); // prop passing to Table Component


   const handleLocalStorage = (): void => {
      let local = localStorage.getItem('words');
      if (local) {
         let resLocal = JSON.parse(local);
         setLocal(resLocal);

         if (searchState.length > 0) {
            resLocal = resLocal.filter((val: any) => {
               const res = val['word'].toLowerCase().includes(searchState.toLowerCase());
               return res;
            })
         }
         else {
            resLocal = JSON.parse(local);
         }

         const dataSourceProp = resLocal.map((val: any, index: number) => {
            const res: ItemDataSource = {
               key: index.toString(),
               name: val['word'],
               IPA: val['phonetics'][0]['text'],
               audio: val['phonetics'][0]['audio'],
               type: val['meanings'][0]['partOfSpeech'],
               definitions: val['meanings'][0]['definitions'][0]['definition'],
               vi: val['vi'],
               idDelete: val['word']
            }
            return res;
         });

         setDataSource(dataSourceProp); // prop of Table Words
      }
   }


   useEffect(() => { // Handle effect when add new word
      handleLocalStorage();

      if (validationState && inputWord.length > 0) {
         message.success('Add new word success!');
      }
      if (validationState === false && isAdd) {
         message.error('Please input correct word!');
      }

      return () => { }
   }, [validationState, searchState])


   useEffect(() => {
      handleLocalStorage();
      setIsDelete(false);
      return () => { }
   }, [isDelete])

   const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
      setInputWord(e.target.value);
   }

   const handleSubmit = (): void => {
      const isUnique = local.some((val: any) => val['word'].toLowerCase() === inputWord.toLowerCase());
      if (!isAdd)
         setIsAdd(true);
      if (isUnique) {
         message.error('New word must unique');
      }
      else {
         dispatch(validationWord(inputWord));
      }
   }

   return (
      <div>
         <LayoutComponent selectedKey='1' breadcrumb='Thêm từ mới'>
            <div className="site-layout-background" style={{ minHeight: 360 }}>
               <Form onFinish={handleSubmit} form={form}>
                  <Form.Item
                     label='Thêm từ mới'
                     name='inputWord'
                     rules={[{ required: true, message: 'Please input new word!' }]}
                  >

                     <Content style={{ display: 'flex' }}>
                        <Input name='inputWord' value={inputWord} onChange={handleChange} placeholder='Thêm từ mới' autoComplete='off' />
                        <Button onClick={handleSubmit} style={{ marginLeft: 10 }} type='primary' danger>ADD</Button>
                     </Content>
                  </Form.Item>
               </Form>

               <Layout>

                  <TableWords setIsDelete={setIsDelete} dataSource={dataSource} />

               </Layout>
            </div>
         </LayoutComponent>
      </div>
   )
}
export default AddWord



