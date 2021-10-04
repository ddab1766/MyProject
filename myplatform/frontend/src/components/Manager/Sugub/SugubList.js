import React, {useEffect, useState,useCallback} from "react";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {getHrSugub} from "../../../actions/sugubActions";
import {connect} from "react-redux";
import JobApDrawer from "./JobApDrawer"
import Filter from "./Filter"
import Filter_Mobile from "./Filter_Mobile"
import {Panel, FlexboxGrid, SelectPicker, Loader, Steps, Icon, Button} from "rsuite"
import SugubCard from "./SugubCard"
import defaultClient from "../../../utils/defaultClient";
import {vUrls} from "../../../constants/urls";
import store from "../../../store";
import qs from "qs"
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CardContent from "@material-ui/core/CardContent";
import {Col, Row} from "reactstrap";
import Paginations from "./Paginations";
import Nothing from "../../Common/Nothing";
import LoaderSpinner from "../../Etc/LoaderSpinner";
import Box from "@material-ui/core/Box";
import SearchField from "react-search-field";
import axios from "axios";
import StepsPanel from "./Steps"
import MySugubList from "./MySugubList"
import { useObserver } from 'mobx-react';
import useStore from './useStore';
import {isMobile} from "react-device-detect"
import Select from "react-select";
import UpButton_manager from "../../../components/Common/UpButton_manager";
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <span>{children}</span>
                </Box>
            )}
        </div>
    );
}
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const selectData = [
    {
        "label": "최신 등록 순",
        "value": 1,
    },
    {
        "label": "마감 임박 순",
        "value": 2,
    },
    {
        "label": "지원자 순",
        "value": 3,
    },
]
const SugubList = (props) => {
    const [sugubs, setSugubs] = useState();
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [tabValue, setTabValue] = useState(0);
    const [step, setStep] = useState(0);
    const { sugub } = useStore();


    const getData = useCallback((tab) => {
        var url
        if(tab === 0){
            url =  vUrls.HR_SUGUB;
        } else if(tab === 1){
            url = vUrls.HR_MY_SUGUB
        } else if(tab === 2){
            url = vUrls.HR_FAVORITE_SUGUB
        }
        sugub.getInterest();
        setLoading(true);
        document.getElementsByClassName('wrapper')[0].scrollTop = 0
        axios.get(url, {
            headers: {
                authorization: 'Token ' + store.getState().auth.token
            },
            params:{ ...filter},
            paramsSerializer: params => {
                return qs.stringify(params, {arrayFormat: 'repeat'})
            }
        })
            .then(({data}) => {
                console.log(data.results)
                setSugubs(data.results)
                sugub.sugubs = data.results;
                setTotalPosts(data.count)
                setLoading(false);
            })
            .catch(error => {
                console.log('getSugub error', error);
                setLoading(false);
            });
    },[loading,filter,sugub,sugubs,totalPosts])
    useEffect(() => {
        getData(tabValue);
    }, [filter]);
    const handleTabChange = useCallback((e,v) =>{
        setTabValue(v);
        // setFilter({page : 1});
        setCurrentPage(1);
        getData(v);
    },[]);
    const handleSortChange = useCallback((v) => {
        setFilter({...filter,['ordering']:v.value});
    },[filter])
    console.log('filter', filter)

    return  (
        <>
            <style jsx>{`
            .rs-checkbox label, .rs-radio label {color:gray;  }
            .basic-single > div {
                border:0px
            }
            .btn-up {
                position: fixed; 
                  bottom: 2%; 
                  z-index:9999;
                  opacity: .5;
                  cursor:pointer;
            }
            `}</style>
            <UpButton_manager />
            <FlexboxGrid justify="center">
                <FlexboxGrid.Item colspan={isMobile ? 24 : 18}>
                    <Panel style={{background:'white'}} >
                        {isMobile ? <Filter_Mobile loading={loading} setSugubs={setSugubs} setFilter={setFilter} filter={filter} paginate={setCurrentPage}/>
                            : <Filter loading={loading} setSugubs={setSugubs} setFilter={setFilter} filter={filter} paginate={setCurrentPage}/>}
                        <Tabs value={tabValue} onChange={handleTabChange} aria-label="simple tabs example"
                              indicatorColor="primary" variant="fullWidth"
                              style={{borderTop: '1px solid lightgray',
                                  borderBottom: '1px solid lightgray', marginBottom:'15px'}}>
                            <Tab label={`전체 ${tabValue ===0 ? '(' + sugub.sugubs.length+')' : ''}`} {...a11yProps(0)} disabled={loading}/>
                            <Tab label={`접수중인 목록`} {...a11yProps(1)} disabled={loading} />
                            <Tab label={`찜한 목록`} {...a11yProps(2)} disabled={loading}/>
                        </Tabs>
                        <FlexboxGrid justify="end">
                            <FlexboxGrid.Item colspan={isMobile ? 10 : 4}>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    defaultValue={selectData[0]}
                                    options={selectData}
                                    onChange={handleSortChange}
                                />

                                {/*<SelectPicker*/}
                                {/*    data={selectData}*/}
                                {/*    defaultValue={1}*/}
                                {/*    appearance="subtle"*/}
                                {/*    searchable={false}*/}
                                {/*    style={{ width: 'auto' }}*/}
                                {/*    cleanable={false}*/}
                                {/*    onChange={handleSortChange}*/}
                                {/*/>*/}
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                        <TabPanel>
                            {/* 접수중인 목록 */}
                            {tabValue === 1 ?
                                !loading ?
                                    sugubs && sugubs.length > 0 ?
                                        (<>
                                            <StepsPanel />
                                            <hr />
                                            <MySugubList />
                                        </>) : (<Nothing text={'해당내역이 없습니다.'}/>)
                                    : <div style={{textAlign:'center'}}><Loader content="로딩중..." vertical /></div>
                                :
                                //전체, 찜한 목록
                                !loading ?
                                    sugubs && sugubs.length > 0 ?
                                        (<>
                                            <SugubCard sugubs={sugubs}/>
                                        </>) : (<Nothing text={'해당내역이 없습니다.'}/>)
                                    : <div style={{textAlign:'center'}}><Loader content="로딩중..." vertical /></div>
                            }
                            <hr />
                            <Paginations totalPosts = {totalPosts} postsPerPage={postsPerPage}
                                         current={currentPage} paginate={setCurrentPage}
                                         setFilter={setFilter} filter={filter} ></Paginations>
                        </TabPanel>

                    </Panel>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </>
    )
}
//export default SugubList;
function mapStateToProps(state) {
    return {
        hr: state.auth.hr,
        user: state.auth.user,
        token: state.auth.token,
        comcode:state.comcode.comcode,
    }
}

export default React.memo(connect(mapStateToProps)(SugubList));

