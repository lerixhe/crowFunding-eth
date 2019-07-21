import React from 'react'
import { Card, Image, Icon ,List ,Progress} from 'semantic-ui-react'

// 本组件为card列表，里面有若干自定义cards,数量由众筹数确定,由母组件tab的details属性传递进props。
const CardList = (props) => {
    const { details } = props;
    let unFixedCards = details.map((detail, i) => {
        return <CustomizeCard key={i} detail={detail} />
    })
    return (
        <Card.Group itemsPerRow={5}>
            {unFixedCards}
        </Card.Group>
    )
}
// 本组件为自定义card，内容由众筹详情确定，由母组件list的detail属性传递进props
const src = '/images/elliot.jpg'
const CustomizeCard = (props) => {
    let {detail} = props
    // let { funding, creator, projectName, supportBalance, targetBalance, endTime, currentBalance, investorsCount } = detail
    let {projectName,  targetBalance, endTime, currentBalance, investorsCount } = detail
    // 计算百分比
    let percentage = (parseFloat(currentBalance)/parseFloat(targetBalance)).toFixed(2)*100 
    return (
        // <Card color='red' image={src} />
        <Card color='blue'>
            <Image src={src} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{projectName}</Card.Header>
                <Card.Meta>
                    <span className='date'> 截止日期：{endTime}</span>
                    {/* 进度条 */}
                    <Progress indicating percent={percentage} size='small' />
                </Card.Meta> 
                <Card.Description>
                    时间有限，速速参与！
                </Card.Description>
            </Card.Content>
            <Card.Content  textAlign='center'>
                <List divided horizontal style={{display:'flex',justifyContent:'space-around',}}>
                <List.Item>
                <List.Content>
                    <List.Header>已筹</List.Header>
                    <List.Description>{currentBalance}/{targetBalance} eth</List.Description>
                </List.Content>
                </List.Item>
                <List.Item>
                <List.Content>
                    <List.Header>已达</List.Header>
                    <List.Description>{percentage} %</List.Description>
                </List.Content>
                </List.Item>
                <List.Item>
                <List.Content>
                    <List.Header>参与人数</List.Header>
                    <List.Description><Icon name='user' />{investorsCount} 人</List.Description>
                </List.Content>
                </List.Item>
            </List>    
            </Card.Content>
        </Card>
    )
}

export default CardList
