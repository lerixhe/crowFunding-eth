import React from 'react'
import { Table,Button} from 'semantic-ui-react'

const RequestList = (props) => {
    const {requestDetails,investorCount,onApproveClick,onFinalizeClick,pageKey} = props
    console.table(props)
    // 遍历请求，并分别包装秤jsx对象
    let requestRow = requestDetails.map((request,index)=>{
        // 得到单个请求进行解构
        console.table(request)
        let {0:purpose,1:cost,2:shopAddress,3:voteCount,4:status} = request
        // 处理数据
        cost = cost.toString()
        shopAddress = shopAddress.toString()
        voteCount= voteCount.toString()
        let showStatus
        if(status===0){
            showStatus='投票中'
        }else if(investorCount<voteCount*2){
            status=1
            showStatus='已批准'
        }else {
            status=2
            showStatus='已完成'
        }
        // 填充到jsx对象中并返回
        return (
          <Table.Row key={index}>
            <Table.Cell>{purpose}</Table.Cell>
            <Table.Cell>{cost}</Table.Cell>
            <Table.Cell>{shopAddress}</Table.Cell>
            <Table.Cell>{voteCount}/{investorCount}</Table.Cell>
            <Table.Cell>{showStatus}</Table.Cell>
            <Table.Cell>
                {
                    (pageKey===2)?(
                        <Button disabled={status===1||status===2} onClick={()=>onFinalizeClick(index)}>解冻并支付</Button>
                    ):(
                        <Button disabled={status===2} onClick={()=>onApproveClick(index)}>批准申请</Button>                   
                    )
                }
            </Table.Cell>
          </Table.Row>
        )
    })

    return(
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>用途描述</Table.HeaderCell>
              <Table.HeaderCell>支出金额</Table.HeaderCell>
              <Table.HeaderCell>商家地址</Table.HeaderCell>
              <Table.HeaderCell>当前赞成人数</Table.HeaderCell>
              <Table.HeaderCell>当前状态</Table.HeaderCell>
              <Table.HeaderCell>操作</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
      
          <Table.Body>
            {requestRow}
          </Table.Body>
        </Table>
      )
      
}

  export default RequestList
  