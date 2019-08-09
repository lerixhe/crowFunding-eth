import React from 'react'
import { Tab } from 'semantic-ui-react'
import AllFundingTab from './allfunding/AllFundingTab'
import CreatorFundingTab from './creatorfunding/CreatorFundingTab'
import InvestorFundingTab from './investorfunding/InvestorFundingTab'

const panes = [
  { menuItem: '所有众筹', render: () => <Tab.Pane><AllFundingTab /></Tab.Pane> },
  { menuItem: '我发起的', render: () => <Tab.Pane><CreatorFundingTab /></Tab.Pane> },
  { menuItem: '我参与的', render: () => <Tab.Pane><InvestorFundingTab /></Tab.Pane> },
]

const TabCenter = () => <Tab panes={panes} />

export default TabCenter
