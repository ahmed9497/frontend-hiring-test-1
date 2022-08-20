import { Layout, Space, Typography, Table, Input, Button, Modal, Col, Row, Divider, Select, message } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import Logo from '../../assests/images/TT Logo.png'
import { addNote, fetchCallList } from '../../services/helper.service';
import dayjs from "dayjs";
import Pusher from "pusher-js";


const { TextArea } = Input;
const { Title } = Typography;
const PUSHER_AUTH_ENDPOINT =process.env.REACT_APP_PUSHER_AUTH_ENDPOINT;
const APP_KEY = process.env.REACT_APP_PUSHER_APP_KEY ;
const APP_CLUSTER =process.env.REACT_APP_PUSHER_APP_CLUSTER
const Home = () => {

    const [data, setData] = useState({});
    const [dataSource, setDataSource] = useState([])
    const [total, setTotal] = useState(0);
    const [paginate, setPaginate] = useState({
        limit: 10,
        offset: 0
    })
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [record, setRecord] = useState({});
    const [note, setNote] = useState('');
    const columns = [
        {
            title: 'Call type',
            dataIndex: 'call_type',
            key: 'id',
            render: (text) => {
                return (
                    <>
                        {text === "voicemail" && <Title style={{ fontSize: 14, color: '#1890ff' }} >Voice Mail</Title>}
                        {text === "missed" && <Title style={{ fontSize: 14 }} type="danger">Missed</Title>}
                        {text === "answered" && <Title style={{ fontSize: 14 }} type="success">Answered</Title>}
                    </>
                )
            },
        },
        {
            title: 'Direction',
            dataIndex: 'direction',
            key: 'id',
            render: (text) => <div className='text-capitalize'>{text}</div>
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'id',
            render: (text) => <div>{durationFormat(text)} <br />
                <span style={{ color: '#1890ff' }}>({text} seconds)</span></div>
        },
        {
            title: 'From',
            dataIndex: 'from',
            key: 'id',
        },
        {
            title: 'To',
            dataIndex: 'to',
            key: 'id',
        },
        {
            title: 'Via',
            dataIndex: 'via',
            key: 'id',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'id',
            render: (text) => (dayjs(text).format('DD-MM-YYYY'))
        },
        {
            title: 'Status ',
            dataIndex: 'is_archived',
            key: 'id',
            render: (text) => (
                text ?
                    <div className='archive'>Archived</div> : <div className='unarchive'>Unarchive</div>
            )
        },
        // {
        //   title: 'Tags',
        //   key: 'tags',
        //   dataIndex: 'tags',
        //   render: (tags) => (
        //     <span>
        //       {tags.map((tag) => {
        //         let color = tag.length > 5 ? 'geekblue' : 'green';

        //         if (tag === 'loser') {
        //           color = 'volcano';
        //         }

        //         return (
        //           <Tag color={color} key={tag}>
        //             {tag.toUpperCase()}
        //           </Tag>
        //         );
        //       })}
        //     </span>
        //   ),
        // },
        {
            title: 'Action',
            key: 'id',
            render: (_, record) => (
                <Space size="middle">
                    <Button type='primary' onClick={() => showModal(record)}>Add Note</Button>
                </Space>
            ),
        },
    ];


    useEffect(() => {
        const getCallList = async () => {
            try {
                const res = await fetchCallList(paginate.offset, paginate.limit);
                console.log(res);
                if (res.statusCode === 200) {

                    setData(res);
                    setDataSource(res.nodes);
                    setTotal(res.totalCount)
                }

            } catch (error) {

            }
        }
        getCallList();
    }, [paginate])

    useEffect(() => {
        Pusher.logToConsole = true;

        const pusher = new Pusher(APP_KEY, {
            cluster: APP_CLUSTER,
            encrypted: true,
            channelAuthorization: {
                endpoint: PUSHER_AUTH_ENDPOINT
            },
           
        });
        

        const channel = pusher.subscribe('private-aircall');
        channel.bind('update-call', function (data) {
            console.log(data)
        });
    }, []);

    const showModal = (rec) => {
        setRecord(rec)
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleChange = (pagination, filters, sorter) => {
        const offset = pagination.current * pagination.pageSize - pagination.pageSize;
        const limit = pagination.pageSize;
        // const params = {};

        // if (sorter.hasOwnProperty("column")) {
        //   params.order = { field: sorter.field, dir: sorter.order };
        // }
        console.log(data)
        setPaginate({ offset: offset, limit: limit });
    };
    const durationFormat = (e) => {
        // const h = Math.floor(e / 3600).toString().padStart(2,'0'),
        const m = Math.floor(e % 3600 / 60).toString().padStart(2, '0'),
            s = Math.floor(e % 60).toString().padStart(2, '0');

        return `${m} minutes ${s} seconds`;
        //return `${h}:${m}:${s}`;
    }
    const save = async () => {

        if (!note) return;

        try {
            let req = {
                id: record.id,
                content: note
            }
            const res = await addNote(req);

            if (res.statusCode === 201) {
                setNote('');
                setRecord({});
                handleOk();
                message.success('Successfully Note Added')
            }
        } catch (error) {

        }
    }
    const onFilterChange = (e) => {

        const { nodes } = data;

        let temp = nodes;
        temp = temp?.filter(i => i.is_archived == e);


        setDataSource(temp)
    }
    return (
        <Fragment>

            <Title style={{ margin: '20px 0' }} level={3}>Turing Technologies Frontend Test</Title>
            <Row>
                <Title level={5}>Filter by </Title>
                <Select
                    // defaultValue="Status"
                    placeholder="Status"
                    style={{
                        width: 140,
                        color: "#1890ff"
                    }}
                    bordered={false}
                    onChange={(e) => onFilterChange(e)}
                >
                    {/* <Select.Option value="0"><Title level={5}>Status</Title></Select.Option> */}
                    <Select.Option value={true}><Title level={5}>Archieved</Title></Select.Option>
                    <Select.Option value={false}><Title level={5}>Unarchieved</Title></Select.Option>
                </Select>
            </Row>
            <Table

                rowKey={'id'}
                columns={columns}

                onChange={handleChange}
                size="large"
                pagination={{
                    total: data.totalCount, // total count returned from backend
                    // pageSizeOptions:false
                    showSizeChanger: data.totalCount > data.totalCount,

                    position: ['bottomCenter'],
                    showQuickJumper: false,
                }}
                dataSource={dataSource || []}
            />


            {/* Modale to add note */}


            <Modal footer={false} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div>ADD Notes</div>
                <p>Call ID {record.id}</p>

                <div>
                    <Row gutter={[12, 12]}>
                        <Col span={6}>Call type</Col>
                        <Col>{record.call_type}</Col>
                    </Row>
                    <Row gutter={[12, 16]}>
                        <Col span={6}>Duration</Col>
                        <Col>{durationFormat(record.duration)}</Col></Row>
                    <Row gutter={[12, 16]}>
                        <Col span={6}>From</Col>
                        <Col>{record.from}</Col></Row>
                    <Row gutter={[12, 16]}>
                        <Col span={6}>To</Col>
                        <Col>{record.to}</Col></Row>
                    <Row gutter={[12, 16]}>
                        <Col span={6}>Via</Col>
                        <Col>{record.via}</Col></Row>
                </div>
                <div style={{ marginTop: 5 }}>
                    <div>Notes</div>
                    <TextArea rows={4} value={note}
                        onChange={(e) => setNote(e.target.value)} placeholder="Add Notes" />
                </div>
                <Divider />
                <Button block type='primary' onClick={() => save()}>Save</Button>
            </Modal>
        </Fragment>
    )
}

export default Home