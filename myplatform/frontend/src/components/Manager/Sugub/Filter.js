import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {Button, ControlLabel, FlexboxGrid, Form, Icon, Panel} from 'rsuite';
import store from "../../../store";
import SearchField from "react-search-field";
import {Col, Row} from "reactstrap";
import Select from "react-select";
import styled from 'styled-components';

const slimText = {
    color: '#97969B',
    cursor: 'pointer',
};
const area0 = ["서울","인천","대전","광주","대구","울산","부산","경기","강원","충북","충남","전북","전남","경북","경남","제주"];
const Style_ul = styled.ul`
  display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0;
                
`;
const Style_li = styled.li`
  list-style: none;
    display: flex;
    margin: 0 5px 5px 0;
`;

const Label = styled.label`
    margin: 0;
      padding: 5px 15px;
      box-sizing: border-box;
      position: relative;
      display: inline-block;
      border: solid 1px #DDD;
      background-color: #FFF;
      line-height: 140%;
      text-align: center;
      box-shadow: 0 0 0 rgba(255, 255, 255, 0);
      transition: border-color .15s ease-out,  color .25s ease-out,  background-color .15s ease-out, box-shadow .15s ease-out;
      cursor: pointer;
`
const Label1 = styled.label`
   margin: 0;
    padding: 0 15px;
    box-sizing: border-box;
    position: relative;
    display: inline-block;
    border: solid 1px #DDD;
    background-color: #FFF;
    line-height: 28px;
    text-align: center;
    box-shadow: 0 0 0 rgb(255 255 255 / 0%);
    transition: border-color .15s ease-out, color .25s ease-out, background-color .15s ease-out, box-shadow .15s ease-out;
    cursor: pointer;
    border-radius: 24px;
    height: 30px;
    font-size: 14px;
`
const RadioInput = styled.input`
    width: 0;
  height: 0;
  position: absolute;
  left: -9999px;
  &:checked + ${Label}{
        background-color: #4B9DEA;
      color: #FFF;
      box-shadow: 0 0 10px rgba(102, 179, 251, 0.5);
      border-color: #4B9DEA;
      z-index: 1;
  }
  &:checked + ${Label1}{
        background-color: #4B9DEA;
      color: #FFF;
      box-shadow: 0 0 10px rgba(102, 179, 251, 0.5);
      border-color: #4B9DEA;
      z-index: 1;
  }
`
const Filter = props => {
    const {filter,setFilter,paginate,loading} = props;
    const [comCode, setComcode] = useState([]);
    const [jikM, setJikM] = useState([]);
    const [jikS, setJikS] = useState([]);
    const [onFilter, setOnFilter] = useState(false);
    const [filterToggle, setFilterToggle] = useState(false);
    const [checkedItems, setCheckedItems] = useState([]);
    useEffect(() => {
        setComcode(store.getState().comcode.comcode);
    }, [])
    const selectOptions = useMemo(()=>comCode.filter(v =>v.code_topidx === 'AA' && v.code_topcd === null).map((v,index) =>{
        return {'label': v.code_name, 'value': v.code_name, 'id' : v.code_id}
    }),[comCode]);
    const areaOptions = useMemo(()=>area0.map((v,index) =>{
        return {'label': v, 'value': index}
    }),[area0]);

    const test = useCallback((nam,v) => {
        setFilter(filter => ({...filter,[nam]:v,page : 1}))
        paginate(1)
    },[paginate]);
    const handleChange = useCallback((item) => {
        if(item !== null) {
            setJikM(comCode.filter(v => v.code_topcd === item.id).map((v, index) => {
                return {'label': v.code_name, 'value': v.code_name, 'id': v.code_id}
            }))
        } else {
            item = {'id':''};
        }
        test('sugub_jikjong_top', item.id)
    },[jikM,comCode]);
    const handleChange1 = useCallback((item) => {
        if(item !== null) {
            setJikS(comCode.filter(v=>v.code_topcd === item.id).map((v,index) =>{
                return {'label': v.code_name, 'value': v.code_name, 'id' : v.code_id}
            }))
        } else{
            item = {'id':''};
        }
        test('sugub_jikjong_mid',item.id)
    },[jikS,comCode]);
    const handleTextChange = useCallback((v) => {
        test('sugub_title',v)
    },[test]);
    const handleResetFilter = useCallback(() => {
        setFilter({page : 1});
        paginate(1);
        setOnFilter(!onFilter)
        setCheckedItems([])
        setTimeout(()=> {
            setOnFilter(false)
        },500)
    },[paginate]);
    const handleOnFilter = useCallback(() => {
        // setFilterToggle(!filterToggle)
        document.getElementById('filterBox').classList.toggle('show')
    },[]);
    const test1 = (id,isChecked,name) => {
        if(checkedItems[name] === undefined){
            checkedItems[name] = []
        }
        if (isChecked) {
            checkedItems[name].push(id);
            setCheckedItems(checkedItems);
        } else if (!isChecked && checkedItems[name].indexOf(id) !== -1) {
            checkedItems[name].splice(checkedItems[name].indexOf(id),1);
            setCheckedItems(checkedItems);
        }
        console.log(checkedItems)
        test(name,checkedItems[name])
    }
    const handleSubmit = (event) => {
        console.log('A name was submitted: ',event);
    }

    return (
        <>
            <style jsx>{`
                .rs-form-inline > *{
                margin-bottom: 0px;
                }
                .rs-dropdown-menu{
                width:100%;
                }
                .rs-dropdown{
                position:static;
                }
                .searchField { width: 100%; }
                #filterBox .show {
                display:''
                }
            `}</style>
            <div style={{marginBottom:20}}>
                <br/>
                <Row>
                    <Col  className="col-md-4 col-auto">
                        <SearchField
                            placeholder="키워드를 입력해주세요"
                            onSearchClick={handleTextChange}
                            classNames="searchField"
                            style={{width:'200px'}}
                        />
                    </Col>
                    <Col className="col-md-8">
                        <div className="text-right">
                            {/*<Button appearance="primary" onClick={()=>setOnFilter(!onFilter)}><Icon icon="filter"/> 상세검색</Button>*/}
                            <Button appearance="primary" onClick={handleOnFilter}><Icon icon="filter"/> 상세검색</Button>
                        </div>
                    </Col>
                </Row>
            </div>
            {!onFilter && <Panel className="filterBox" id="filterBox" bordered style={(loading || !filterToggle) ?
                {display:'none',
                    background: 'white',
                    marginBottom: 30,
                    marginTop: 30,
                    borderColor: '#3498ff',
                    overflow: 'visible'
                } :
                {display:'',
                    background: 'white',
                    marginBottom: 30,
                    marginTop: 30,
                    borderColor: '#3498ff',
                    overflow: 'visible'
                }}
            >
                <Form >
                    <FlexboxGrid justify="start">
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={2}>
                            <ControlLabel>수급진행상태 </ControlLabel>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={10}>
                            <Style_ul onChange={(v)=>test('sugub_status', v.target.value)}>
                                <Style_li>
                                    <RadioInput type="radio" id="option11" name="radioList"
                                                value="CC0200000" />
                                    <Label1 htmlFor="option11">진행중</Label1>
                                </Style_li>
                                <Style_li>
                                    <RadioInput type="radio" id="option21" name="radioList" value="CC0300000" />
                                    <Label1 htmlFor="option21">종료</Label1>
                                </Style_li>
                            </Style_ul>
                        </FlexboxGrid.Item>

                    </FlexboxGrid>
                    <FlexboxGrid justify="start">
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={2}>
                            <ControlLabel>경력</ControlLabel>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={10}>
                            <Style_ul onChange={(v)=>test1(v.target.value, v.target.checked,"sugub_career_gb")}>
                                {comCode.filter(v => v.code_topidx === 'AB' && v.code_topcd === null).map(v => {
                                    return(
                                        <Style_li>
                                            <RadioInput type="checkbox" id={v.code_id} name="sugub_career_gb"
                                                        value={v.code_id}/>
                                            <Label htmlFor={v.code_id}>{v.code_name}</Label>
                                        </Style_li>
                                    )
                                })
                                }
                            </Style_ul>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>

                    <FlexboxGrid justify="start">
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={2}>
                            <ControlLabel>학력 </ControlLabel>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={10}>
                            <Style_ul onChange={(v)=>test('education_cd', v.target.value)}>
                                {comCode.filter(v => v.code_topidx === 'AO' && v.code_topcd === null).map(v => {
                                    return(
                                        <>
                                            <Style_li>
                                                <RadioInput type="radio" id={v.code_id} name="education_cd"
                                                            value={v.code_id} />
                                                <Label1 htmlFor={v.code_id}>{v.code_name}</Label1>
                                            </Style_li>
                                        </>)
                                })
                                }
                            </Style_ul>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>

                    <FlexboxGrid justify="start">
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={2}>
                            <ControlLabel>채용형태</ControlLabel>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={10}>
                            <Style_ul onChange={(v)=>test1(v.target.value, v.target.checked,"chae_cd")}>
                                {comCode.filter(v => v.code_topidx === 'AC' && v.code_topcd === null).map(v => {
                                    return(
                                        <Style_li>
                                            <RadioInput type="checkbox" id={v.code_id} name="chae_cd"
                                                        value={v.code_id}/>
                                            <Label htmlFor={v.code_id}>{v.code_name}</Label>
                                        </Style_li>
                                    )
                                })
                                }
                            </Style_ul>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>

                    <FlexboxGrid justify="start">
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={2}>
                            <ControlLabel>직종</ControlLabel>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={10}>
                            <Select
                                className="basic1-single"
                                classNamePrefix="select"
                                options={selectOptions}
                                placeholder="직종(대)"
                                isClearable={true}
                                onChange={(item) => handleChange(item)}
                            />
                            <Select
                                className="basic1-single"
                                classNamePrefix="select"
                                options={jikM}
                                placeholder="직종(중)"
                                isClearable={true}
                                onChange={(item) => handleChange1(item)}
                            />

                        </FlexboxGrid.Item>

                    </FlexboxGrid>

                    <FlexboxGrid justify="start" style={{marginTop:5}}>

                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={2}>
                            <ControlLabel>지역(x)</ControlLabel>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={8}>
                            <Select
                                className="basic1-single"
                                classNamePrefix="select"
                                // defaultValue={selectData[0]}
                                options={areaOptions}
                                placeholder="지역(x)"
                            />
                            {/*<TagPicker data={areaOptions} size="sm" style={{ minWidth:100,width:"auto",marginLeft:'9px' }}*/}
                            {/*           placeholder="선택"/>*/}
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item componentClass={Col} colspan={24} md={2}  style={{textAlign: '-webkit-right'}}>
                            <ControlLabel style={{...slimText}} onClick={() => handleResetFilter()}><Icon
                                icon="reload"/>초기화</ControlLabel>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                    {/*<input type="submit" value="Submit" />*/}
                </Form>
            </Panel>}
        </>
    )
}

export default React.memo(Filter)
