// import npm packge
import React, { useState } from "react";
import { CardBody, CardImg } from 'reactstrap';
// import service api
//
// import core class
import Util from '../../core/util';
// import com page
//
// import modal tool
//
// import style media
function AvatarCom($this) {
	const _name_array = String($this.member.fullname).split();
	const _name_str = String($this.member.fullname).substring(0, 2).toUpperCase();
	const width = ($this.width ? $this.width : 90) + 'px';
	const height = ($this.height ? $this.height : 90) + 'px';
	return (
        <div className={`text-center`}>
            {$this.member.avatar ? (
                <CardBody className={`py-0 px-0`}>
                    <CardImg
                        alt="Your profile"
                        src={$this.member.avatar}
                        style={{
                            width: width,
                            height: height
                        }}
                        className={`rounded-circle border border-info border-3`}
                        />
                </CardBody>
            ) : (
                <p className={`rounded-circle bg-light border small display-name-profile`} style={{
                    width: width,
                    height: height,
                    lineHeight: height
                }}>{_name_str}</p>
            )}
        </div>
    );
};

export { AvatarCom };