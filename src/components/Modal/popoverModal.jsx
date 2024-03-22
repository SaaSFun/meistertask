// import npm packge
import React from "react";
import bootstrap from 'bootstrap/dist/js/bootstrap';
import SVG from 'react-inlinesvg';
import { UncontrolledPopover, PopoverHeader, PopoverBody, } from 'reactstrap';
import CoolTabs from 'react-cool-tabs';
// import service api
//
// import core class
import { WIDTH_COOLTAB, HEIGHT_COOLTAB } from '../../core/constant';
// import com page
//
// import modal tool
//
// import style media
import "./default.css";
// coding
const { useState, useEffect, useRef } = React;
const { Popover, Toast } = bootstrap;
function PopoverDemo(e) {
    const popoverRef = useRef();  
    useEffect(() => {
        var popover = new Popover(popoverRef.current, {
            content: "Hello popover content!",
            // title: "My Popover",
            trigger: 'click',
            placement: 'bottom'
        })
    })
    return (
        <div className="py-2">
            <button className="btn btn-danger" ref={popoverRef}>
                Hover for popover
            </button>
        </div>
    )
}
function PopoverStyle($this) {
    return (
        <UncontrolledPopover
			placement="bottom"
			target={$this.target}
			trigger="legacy"
			delay={{show: 150, hide: 0 }}
			animation="true"
			className="stage-popover"
		>
		    <PopoverHeader className="bg-transparent">
		      	{$this.header ? $this.header : "Preferences"}
		    </PopoverHeader>
		    <PopoverBody className="p-2">
				<div style={{ overflow: "hidden", width: "100%" }}>
					<CoolTabs
						tabKey={'1'}
						className="mt-1"
						style={{ maxHeight: 'calc(100vh - 175px)', width: $this.width ? $this.width : WIDTH_COOLTAB, height: $this.height ? $this.height : HEIGHT_COOLTAB}}
						tabsHeaderClassName=""
						tabsHeaderStyle={{}}
						activeTabClassName="active"
						activeTabStyle={{}}
						unActiveClassName=""
						unActiveTabStyle={{}}
						leftTabClassName="btn btn-light hover-effect"
						leftTabStyle={{}}
						rightTabClassName="btn btn-light hover-effect"
						rightTabStyle={{}}
						leftTabTitleClassName="text-secondary fw-bolder"
						leftTabTitleStyle={{}}
						rightTabTitleClassName="text-secondary fw-bolder"
						rightTabTitleStyle={{}}
						tabsBorderBottomClassName="bg-light"
						tabsBorderBottomStyle={{ height: 1 }}
						contentContainerClassName="stg-content"
						contentContainerStyle={{height: '80%'}}
						activeLeftTabBorderBottomClassName="active"
						activeLeftTabBorderBottomStyle={{ height: 1 }}
						activeRightTabBorderBottomClassName="active"
						activeRightTabBorderBottomStyle={{ height: 1 }}
						leftContentClassName="stg-lcontent"
						leftContentStyle={{}}
						rightContentClassName="stg-rcontent"
						rightContentStyle={{}}
						leftTabTitle={'Select Style'}
						rightTabTitle={'More Icons'}
						leftContent={$this.lcontent ? $this.lcontent : "Never content"}
						rightContent={$this.rcontent ? $this.rcontent : "Never content"}
						contentTransitionStyle={'transform 0.2s ease-in'}
						borderTransitionStyle={'all 0.2s ease-in'} />
				</div>
		    </PopoverBody>
	  	</UncontrolledPopover>
    )
}
export {PopoverDemo, PopoverStyle};