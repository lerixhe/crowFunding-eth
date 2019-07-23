// 实现在页面创建众筹
import React from 'react'
import { createRequet } from '../../eth/interaction'
import { Dimmer, Form, Label, Loader, Segment } from 'semantic-ui-react';

class CreatorRequestForm extends React.Component {
    constructor(props) {
        super(props)
        const { selectedFunding } = props
        this.state = {
            active: false,
            selectedFunding
        }
    }

    componentWillReceiveProps(props) {
        // 传入的自定义参数更新时（用户点击item触发），拿到并存储
        const { selectedFunding } = props
        console.table(selectedFunding)
        // 存到state，以便写入表单,表单用的时候需要现在构造函数初始化，避免获取空值出错
        this.setState({ selectedFunding })

    }
    // 表单变化时
    handleChange = (e, { name, value }) => this.setState({ [name]: value })
    // 创建申请
    handleCreate = async () => {
        const { requestDesc, requestBalance, requestAddress } = this.state
        const { currentBalance, funding } = this.state.selectedFunding
        // let r = /^\+?[1-9][0-9]*$/;
        let r = /^\d+(\.\d{1,18})?$/
        // 校验为数字
        if (!r.test(currentBalance) || parseFloat(requestBalance) > parseFloat(currentBalance)) {
            alert(`输入的数据不合法！`)
            return
        }
        this.setState({ active: true })
        // 开始创建合约
        try {
            let result = await createRequet(funding, requestDesc, requestBalance, requestAddress, (error) => {
                if (error !== false) {
                    alert(`申请失败${error}`)
                    this.setState({ active: false })
                } else {
                    alert(`提交申请成功，请等待投票`)
                    window.location.reload(true)
                }
            })
            console.table(result)
        } catch (error) {
            this.setState({ active: false })
            console.log(`创建失败,${error}`)
        }
    }


    render() {
        const { active } = this.state
        const { currentBalance, funding, projectName } = this.state.selectedFunding
        return (
            <div>
                <Dimmer.Dimmable as={Segment} dimmed={active}>
                    <Dimmer inverted active={active}>
                        <Loader>正在创建申请</Loader>
                    </Dimmer>
                    <Segment>
                        <h4>当前项目名称：{projectName}</h4>
                        <h4>项目地址：{funding}</h4>
                        <h4>已申请到众筹金额：{currentBalance}eth</h4>
                    </Segment>
                    <Form onSubmit={this.handleCreate}>
                        <Form.Input required type='text' placeholder='请求描述' label='请求描述' name='requestDesc' onChange={this.handleChange} />
                        <Form.Input required type='text' placeholder='花费金额' label='花费金额' name='requestBalance' onChange={this.handleChange} labelPosition="left" >
                            <Label basic>eth</Label>
                            <input />
                        </Form.Input>
                        <Form.Input required type='text' placeholder='商家地址' label='商家地址' name='requestAddress' onChange={this.handleChange} />
                        <Form.Button primary content='发出申请' />
                    </Form>
                </Dimmer.Dimmable>
            </div>
        )
    }
}
export default CreatorRequestForm