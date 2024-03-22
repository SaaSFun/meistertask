// import npm packge
import { Tooltip } from "antd";
import React, { Component } from "react";
import _ from 'lodash';
import { Button, UncontrolledCollapse, Badge, Card, CardBody, CardSubtitle } from 'reactstrap';
// import service api
//
// import core class
import Util from '../../core/util';
// import com page
//
// import modal tool
//
// import style media
import SVG from 'react-inlinesvg';
// coding
function ColorWMSPicker($this) {
	function bindEvent() {
    	//
    };
	return (
		<div className={`wstage-color d-flex align-items-center flex-wrap py-2 px-2 gap-2 mt-1`}>
			{
				$this.react.state.lstColors.map((item, index)=>{
					// need for className style with on-selected
					return [
						<Badge color="skip" key={`wstage-color` + item.id} id={`wstage-color` + item.id} tag="button" pill className={`hover-opacity-7per border-1 border-light ${$this.stage && $this.stage.background == item.hexcode ? 'on-selected' : ''}`} title={item.name} 
							style={{
								backgroundColor: item.hexcode,
							}}
							onClick={(e) => $this.stage && $this.header_self ? $this.header_self.onClickColor($this.stage, item) : (e)}
						>&nbsp;</Badge>
					]
				})
			}
        </div>
		
	);
};
function IconWMSPicker($this) {
	function bindEvent() {
		//
    };
   	function MoreIcons() {
   		const lstmoreicon = Util.listIconBy($this.react.state.lstIcons, "more");
    	return (
    		<Card className={`border-0`}> {
    			lstmoreicon.map((data, indexct)=>{
					const lsteachcate = Util.listIconBy($this.react.state.lstIcons, 'each', data.name);
					return [
						<CardBody key={`cateicon-` + data.id} className={`p-2 pb-0`}>
							<CardSubtitle className="text-muted" tag="h6" >
								{data.name}
							</CardSubtitle>
						</CardBody>,
    					<EachCateIcons key={`detailicon-` + data.id} data={lsteachcate} />
					]
				})
    		}
    		</Card>
			
    	)
    };
    function EachCateIcons($onthis) {
    	return (
			<div className={`wstage-icon d-flex align-items-center flex-wrap py-2 px-2 gap-2`}>
				{
					$onthis.data.map((item, index)=>{
						// need for className style with on-selected
						return $this.moreicon || item.catename == 'Default' || (item.catename != 'Default' && $this.stage && $this.stage.image == item.path) ? [
							<Badge color={`light`}
								key={`wstage-icon` + item.id} id={`wstage-icon` + item.id} tag="button" title={item.name} 
								className={`text-muted hover-opacity-7per border-1 border-light ${$this.stage && $this.stage.image == item.path ? 'on-selected' : ''}`}
								onClick={(e) => $this.stage && $this.header_self ? $this.header_self.onClickIcon($this.stage, item) : (e)}
							>
								<SVG src={item.path}
									width={24}
							        height={24}
							        title={item.name}
							        className={`text-muted`}
								/>
							</Badge>,
						] : []
					})
				}
	        </div>
		);
    };
    if($this.moreicon){
    	return <MoreIcons />
    }
    else {
    	const lstmoreicon = Util.listIconBy($this.react.state.lstIcons, "more");
    	const lsteachcate = [];
    	_.forEach(lstmoreicon, function(value) {
	    	_.forEach(value.items, function(item) {
	    		item.catename = value.name;
	    		lsteachcate.push(item);
			});
		});
    	return <EachCateIcons data={lsteachcate} />
    }
};
export {ColorWMSPicker, IconWMSPicker};