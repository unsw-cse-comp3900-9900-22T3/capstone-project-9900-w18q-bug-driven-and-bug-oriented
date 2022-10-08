import React, { Component } from 'react';
import tableau from 'tableau-api';
 
class Visualization extends Component {
  componentDidMount() {
    this.initTableau()
  }
 
  initTableau() {
    const vizUrl = 'https://public.tableau.com/views/wait_management_dashboard/Dashboard1?:language=zh-CN&publish=yes&:display_count=n&:origin=viz_share_link';
    const vizContainer = this.vizContainer;
    let viz = new window.tableau.Viz(vizContainer, vizUrl)
  }
 
  render() {
    return (
      <div ref={(div) => { this.vizContainer = div }}>
      </div>
    )
  }
}
 
export default Visualization;