// import npm packge
import React, { useState } from "react";
import { UncontrolledCollapse, Toast, ToastHeader, ToastBody, InputGroup, Input, Button, Badge, //
        UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
// import service api
//
// import core class
import Util from '../../core/util';
// import com page
//
// import modal tool
//
// import style media
import { MdOutlineSearch, MdMoveToInbox, MdOutlineVisibility, MdOutlineCalendarMonth, MdOutlineCheckCircleOutline, MdOutlineMore, MdFullscreen
} from "react-icons/md";
import "./default.css";
function MainFilter($this) {
    return (
        <UncontrolledCollapse horizontal navbar toggler="#wms-advance-filter"
            style={{
                width: 'var(--pix-w-308)',
                height: '100%',
            }}
            className={`position-absolute panel-activity-filter bg-dark`}>
            <Toast className={`bg-transparent min-vh-100`}>
                <ToastHeader className={`bg-dark bg-gradient rounded-0 text-white`}>
                    Advance Filter
                </ToastHeader>
                <ToastBody>
                    <InputGroup size="sm" className={`w-auto`} title={`Searching Task`}>
                        <Button size="sm" color={`light`} className={`hover-effect-border bg-light shadow-none`}>
                            <MdOutlineSearch size="19" className={``}/>
                        </Button>
                        <Input placeholder="Searching Task" />
                    </InputGroup>
                    <div
                        className={`d-flex justify-content-start mt-3 gap-3`}
                    >
                        <label className={`me-auto d-flex align-self-center lh-lg`}>
                            <Badge color="skip" pill>
                                <MdMoveToInbox size="19"/>
                            </Badge>
                            Stage
                        </label>
                        <UncontrolledDropdown>
                            <DropdownToggle caret size="sm" color="skip" className={`bg-secondary text-white h-100`}>
                                Current Name
                            </DropdownToggle>
                            <DropdownMenu end flip className={`border-0 rounded-0 py-0`}>
                                <DropdownItem size="sm" className={`hover-opacity-5per text-mute`}>Stage 1</DropdownItem>
                                <DropdownItem size="sm" className={`hover-opacity-5per text-mute`}>Stage 2</DropdownItem>
                                <DropdownItem size="sm" className={`hover-opacity-5per text-mute`}>Stage 3</DropdownItem>
                                <DropdownItem size="sm" className={`hover-opacity-5per text-mute`}>Stage 4</DropdownItem>
                                <DropdownItem size="sm" className={`hover-opacity-5per text-mute`}>Stage 5</DropdownItem>
                            </DropdownMenu >
                        </UncontrolledDropdown>
                    </div>
                    <div
                        className={`d-flex justify-content-start mt-3 gap-3`}
                    >
                        <label className={`me-auto d-flex align-self-center lh-lg`}>
                            <Badge color="skip" pill>
                                <MdOutlineMore size="19" />
                            </Badge>
                            Tags
                        </label>
                        <Input placeholder="Replace Input Tags" bsSize="sm" className={`h-100`} />
                    </div>
                    <div
                        className={`d-flex justify-content-start mt-3 gap-3`}
                    >
                        <label className={`me-auto d-flex align-self-center lh-lg`}>
                            <Badge color="skip" pill>
                                <MdOutlineVisibility size="19" />
                            </Badge>
                            Watched
                        </label>
                        <Input placeholder="Replace Member" bsSize="sm" className={`h-100`} />
                    </div>
                    <div
                        className={`d-flex justify-content-start mt-3 gap-3`}
                    >
                        <label className={`me-auto d-flex align-self-center lh-lg`}>
                            <Badge color="skip" pill>
                                <MdOutlineCalendarMonth size="19" />
                            </Badge>
                            Due date
                        </label>
                        <UncontrolledDropdown>
                            {/*{define constants}*/}
                            <DropdownToggle caret size="sm" color="skip" className={`bg-secondary text-white h-100`}>
                                Current Selected
                            </DropdownToggle>
                            <DropdownMenu end flip className={`border-0 rounded-0 py-0`}>
                                <DropdownItem size="sm" className={`hover-opacity-5per text-mute`}>Option 1</DropdownItem>
                                <DropdownItem size="sm" className={`hover-opacity-5per text-mute`}>Option 2</DropdownItem>
                                <DropdownItem size="sm" className={`hover-opacity-5per text-mute`}>Option 3</DropdownItem>
                                <DropdownItem size="sm" className={`hover-opacity-5per text-mute`}>Option 4</DropdownItem>
                                <DropdownItem size="sm" className={`hover-opacity-5per text-mute`}>Option 5</DropdownItem>
                                <DropdownItem size="sm" className={`hover-opacity-5per text-mute`}>Option 6</DropdownItem>
                            </DropdownMenu >
                        </UncontrolledDropdown>
                    </div>
                    <div
                        className={`d-flex justify-content-start mt-3 gap-3`}
                    >
                        <label className={`me-auto d-flex align-self-center lh-lg`}>
                            <Badge color="skip" pill>
                                <MdOutlineCheckCircleOutline size="19" />
                            </Badge>
                            Status
                        </label>
                        <UncontrolledDropdown>
                            <DropdownToggle caret size="sm" color="skip" className={`bg-secondary text-white h-100`}>
                                Current Selected
                            </DropdownToggle>
                            <DropdownMenu end flip className={`border-0 rounded-0 py-0`}>
                                <DropdownItem size="sm" className={`hover-opacity-5per text-mute`}>Option 1</DropdownItem>
                                <DropdownItem size="sm" className={`hover-opacity-5per text-mute`}>Option 2</DropdownItem>
                                <DropdownItem size="sm" className={`hover-opacity-5per text-mute`}>Option 3</DropdownItem>
                                <DropdownItem size="sm" className={`hover-opacity-5per text-mute`}>Option 4</DropdownItem>
                                <DropdownItem size="sm" className={`hover-opacity-5per text-mute`}>Option 5</DropdownItem>
                                <DropdownItem size="sm" className={`hover-opacity-5per text-mute`}>Option 6</DropdownItem>
                            </DropdownMenu >
                        </UncontrolledDropdown>
                    </div>
                    <div
                        className={`d-flex justify-content-start mt-3 gap-3`}
                    >
                        <label className={`me-auto d-flex align-self-center lh-lg`}>
                            <Badge color="skip" pill>
                                <MdFullscreen size="19" />
                            </Badge>
                            Result
                        </label>
                        <UncontrolledDropdown>
                            <DropdownToggle caret size="sm" color="skip" className={`bg-secondary text-white h-100`}>
                                Current Selected
                            </DropdownToggle>
                            <DropdownMenu end flip className={`border-0 rounded-0 py-0`}>
                                <DropdownItem size="sm" className={`hover-opacity-5per text-mute`}>Option 1</DropdownItem>
                                <DropdownItem size="sm" className={`hover-opacity-5per text-mute`}>Option 2</DropdownItem>
                                <DropdownItem size="sm" className={`hover-opacity-5per text-mute`}>Option 3</DropdownItem>
                                <DropdownItem size="sm" className={`hover-opacity-5per text-mute`}>Option 4</DropdownItem>
                                <DropdownItem size="sm" className={`hover-opacity-5per text-mute`}>Option 5</DropdownItem>
                                <DropdownItem size="sm" className={`hover-opacity-5per text-mute`}>Option 6</DropdownItem>
                            </DropdownMenu >
                        </UncontrolledDropdown>
                    </div>
                    <div
                        className={`d-flex flex-row-reverse mt-3`}
                    >
                        <Badge pill color="skip" href="#" className={`p-0`}>
                            Reset all filters
                        </Badge>
                    </div>
                </ToastBody>
          </Toast>
        </UncontrolledCollapse>
    );
};
export { MainFilter };