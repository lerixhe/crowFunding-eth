// 实现在页面创建众筹
import React from 'react'
import { createFunding } from '../../eth/interaction'
import { Dimmer, Form, Label, Loader,Segment } from 'semantic-ui-react';

class CreatorFundingForm extends React.Component {
    constructor(){
        super()
        this.state={
            active:false
        }
    }
    // 表单变化时
    handleChange = (e,{name,value})=>this.setState({[name]:value})
    // 创建众筹
    handleCreate = async() => {
        const {projectName,supportBalance,targetBalance,duration  } = this.state
        // let r = /^\+?[1-9][0-9]*$/;
        let r = /^\d+(\.\d{1,18})?$/
        let r2 = /^[1-9]\d*$/
        // 校验为数字
        if(!r.test(supportBalance)||!r.test(targetBalance)||!r2.test(duration)||parseFloat(supportBalance) > parseFloat(targetBalance) ){
            alert(`输入的数据不合法！`)
            // alert(r.test(supportBalance))
            // alert(r.test(targetBalance))
            // alert(r2.test(duration))
            return
        }
        this.setState({active:true})
        // 开始创建合约
        try {
           let result = await createFunding(projectName,supportBalance,targetBalance,duration,(error)=>{
               if(error!==false){
                alert(`创建失败${error}`)
                this.setState({active:false})
               }else{
                alert(`创建成功`)
                window.location.reload(true)
               }
           })
           console.table(result)
        } catch (error) {
            this.setState({active:false})
            console.log(`创建失败,${error}`)
        }
      }
    
    render(){
        let {active,projectName,supportBalance,targetBalance,duration} = this.state
        return(
            <div>
                <Dimmer.Dimmable as={Segment} dimmed={active}>
                    <Dimmer inverted active={active}>
                        <Loader>正在创建众筹合约</Loader>
                    </Dimmer>
                    <Form onSubmit={this.handleCreate}>
                            <Form.Input required type='text' placeholder='项目名称' label='项目名称' name='projectName' value={projectName || ''} onChange={this.handleChange}/>
                            <Form.Input required type='text' placeholder='支持金额' label='支持金额' name='supportBalance' value={supportBalance || ''} onChange={this.handleChange} labelPosition="left" >
                                <Label basic>eth</Label>
                                <input />
                            </Form.Input>
                            <Form.Input required type='text' placeholder='目标金额' label='目标金额' name='targetBalance' value={targetBalance || ''} onChange={this.handleChange} labelPosition="left" >
                                <Label basic>eth</Label>
                                <input />
                            </Form.Input>
                            <Form.Input required type='text' placeholder='众筹时间' label='众筹时间' name='duration' value={duration || ''} onChange={this.handleChange} labelPosition="left" >
                                <Label basic>秒</Label>
                                <input />
                            </Form.Input>
                            <Form.Button primary content='创建众筹' />
                    </Form>
                </Dimmer.Dimmable>
            </div>
        )
    }
}
export default CreatorFundingForm