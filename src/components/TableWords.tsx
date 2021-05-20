
import React, { useEffect } from 'react'

import { Button, Tag, Table } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons'

interface Prop {
   dataSource: [],
   setIsDelete: Function
}

type itemOptiontable = {
   dataSource: [],
   pagination: {
      pageSize: number
   },
   scroll: {
      y: number
   },
   borered: boolean,
   rowSelection: {
      type: 'checkbox' | 'radio'
   },
}

const TableWords: React.FC<Prop> = ({ setIsDelete, dataSource }) => {

   const optionsTable: itemOptiontable = {
      dataSource,
      pagination: {
         pageSize: 10
      },
      scroll: {
         y: 200
      },
      borered: true,
      rowSelection: {
         type: "checkbox"
      }
   };

   const handleClickBtnPlay = (id: string): void => {
      setIsDelete(false);
      const audios: any = document.getElementsByClassName('audio');
      if (audios) {
         for (let i = 0; i < audios.length; i++) {
            const datasetID = audios[i]['dataset']['id'];
            if (id === datasetID) {
               audios[i].play();
               console.log(audios[i].duration);
               return;
            }
         }
      }
   }

   const colorTag = (typeName: string): string => {
      const types: string[] = ['adjective', 'noun', 'transitive verb', 'verb', 'exclamation', 'adverb'];
      const colors: string[] = ['magenta', 'cyan', 'lime', 'volcano', 'geekblue', 'orange'];

      const indexType = types.findIndex((val: string) => val === typeName);
      return indexType !== -1 ? colors[indexType] : 'purple';
   }

   // definition of columns table
   const columnsProp: object[] = [
      {
         title: 'Name',
         dataIndex: 'name',
         key: 'name',
         align: 'center',
         width: 100,
         className: 'colums colums-table',
      },
      {
         title: 'IPA',
         dataIndex: 'IPA',
         key: 'IPA',
         align: 'center',
         width: 100,
         className: 'colums',
      },
      {
         title: 'Audio',
         dataIndex: 'audio',
         key: 'audio',
         align: 'center',
         width: 100,
         className: 'colums colums-table',
         render: (src: string) => (
            <div>
               <audio data-id={src} controls style={{ outline: 'none', display: 'none' }} preload='auto' className='audio'>
                  <source src={src} type="audio/mpeg" />
                  Your browser does not support the audio element.
               </audio>

               <Button type="primary" onClick={() => handleClickBtnPlay(src)} danger icon={< CaretRightOutlined />} size='middle' />
            </div>
         ),
      },
      {
         title: 'Type',
         dataIndex: 'type',
         key: 'type',
         align: 'center',
         width: 100,
         className: 'colums colums-table',
         render: (type: string) => <Tag color={colorTag(type)}>{type}</Tag>
      },
      {
         title: 'Definitions',
         dataIndex: 'definitions',
         key: 'definitions',
         align: 'center',
         width: 220,
         className: 'colums',
      },
      {
         title: 'Vietnamese',
         dataIndex: 'vi',
         key: 'vi',
         align: 'center',
         width: 180,
         className: 'colums-table',
      },
      {
         title: 'Delete',
         idDelete: 'delete',
         key: 'delete',
         align: 'center',
         width: 80,
         className: 'colums-table',
         render: (idDelete: string) => <Button onClick={() => handleDeleteWord(idDelete)} className='btn-delete' type='primary' danger size='middle'>Delete</Button>,
      },
   ];

   const handleDeleteWord = (name: any) => {
      const local = localStorage.getItem('words');
      console.log(name['name']);
      setIsDelete(true);
      if (local) {
         let datas = JSON.parse(local);
         datas = datas.filter((val: any) => val['word'] !== name['name']);

         localStorage.setItem('words', JSON.stringify(datas));
      }
   }

   useEffect(() => {
      const audios: any = document.getElementsByClassName('audio');
      if (audios) {
         for (let i = 0; i < audios.length; i++) {
            audios[i].load();
         }
      }

      return () => { }
   }, [dataSource])


   return (
      <div>
         {console.log('table rendered')}
         <Table size='middle' columns={columnsProp}
            dataSource={optionsTable['dataSource']}
            pagination={{ pageSize: optionsTable['pagination']['pageSize'] }}
            bordered={optionsTable['borered']}
            rowSelection={{
               type: optionsTable['rowSelection']['type'],
            }}
         />
      </div>
   )
}

export default React.memo(TableWords)
