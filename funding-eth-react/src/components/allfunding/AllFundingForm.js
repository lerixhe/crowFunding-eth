// 实现在页面创建众筹
import React from 'react'
import { investFunding } from '../../eth/interaction'
import { Dimmer, Form, Label, Loader, Segment } from 'semantic-ui-react';

class AllFundingForm extends React.Component {
    constructor(props) {
        super(props)
        const { selectedFunding } = props
        this.state = {
            active: false,
            selectedFunding
        }
    }
    componentWillReceiveProps(props) {
        const { selectedFunding } = props
        if (selectedFunding === undefined) {
            console.log(`空的`)
            return
        } else {
            console.log(`获取到了`)
            console.table(selectedFunding)
            this.setState({ selectedFunding })
        }
    }
    // 参与众筹
    handleCreate = async () => {
        const { funding, supportBalance } = this.state.selectedFunding
        let r = /^\d+(\.\d{1,18})?$/
        // 校验为数字
        if (!r.test(supportBalance)) {
            alert(`输入的数据不合法！`)
            return
        }
        this.setState({ active: true })
        // 开始参与合约
        try {
            let result = await investFunding(funding, supportBalance, (error) => {
                if (error !== false) {
                    alert(`参与失败：${error}`)
                    this.setState({ active: false })
                } else {
                    alert(`创建成功`)
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
        let { active } = this.state
        return (
            <div>
                <Dimmer.Dimmable as={Segment} dimmed={active}>
                    <Dimmer inverted active={active}>
                        <Loader>支持中</Loader>
                    </Dimmer>
                    <Form onSubmit={this.handleCreate}>
                        <Form.Input required type='text' placeholder='项目名称' label='项目名称' name='projectName' value={this.state.selectedFunding.projectName || ''} />
                        <Form.Input required type='text' placeholder='项目地址' label='项目地址' name='funding' value={this.state.selectedFunding.funding || ''} />
                        <Form.Input required type='text' placeholder='支持金额' label='支持金额' name='supportBalance' value={this.state.selectedFunding.supportBalance || ''} labelPosition="left" >
                            <Label basic>eth</Label>
                            <input />
                        </Form.Input>
                        <Form.Button primary content='参与众筹' />
                    </Form>
                </Dimmer.Dimmable>
            </div>
        )
    }
}
export default AllFundingForm