// import npm packge
import React, { useState } from "react";
import {
    CardImg,
    CardBody,
    Input
} from 'reactstrap';
// import service api
import ServiceFile  from '../../services/ServiceFile';
// import core class
import Util from '../../core/util';
// import com page
//
// import modal tool
//
// import style media
//
// coding
function UploadAndDisplayImage($this) {
    const [selectedImage, setSelectedImage] = useState($this.wms_class.comStage.workflowman.objData.profiles.avatar);
    const dataURLtoFile = (dataurl, filename) => {
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
        while(n--){
            u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], filename, {type:mime});
    }
    const handleLoadAvatar = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = (e) => {
            var img = document.createElement("img");
            img.onload = () => {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                var MAX_WIDTH = 300;
                var MAX_HEIGHT = 300;
                var width = img.width;
                var height = img.height;
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
                var dataurl = canvas.toDataURL("image/png");
                ServiceFile.instance.uploadavatar({uid: $this.wms_class.comStage.workflowman.objData.profiles.uid}, [dataURLtoFile(dataurl, file.name)])
                .then(({ data }) => {
                    if (data.status) {
                        $this.wms_class.objData.profiles.avatar = data.path;
                        const profileStage = {
                            ...$this.wms_class.comStage.state,
                            objData: {
                                ...$this.wms_class.comStage.state.objData,
                                profiles: $this.wms_class.objData.profiles
                            }
                        }
                        $this.wms_class.comStage.setState(profileStage);
                        $this.wms_class.react.setState({ wms_class: $this.wms_class.comStage });
                        setSelectedImage(data.path)
                    } else {
                        Util.toast(data.error, 'error')
                    }
                })
            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
    const _name_str = String($this.wms_class.comStage.workflowman.objData.profiles.fullname).substring(0, 2).toUpperCase();
    return (
        <div className={`text-center`}>
            {selectedImage && (
                <CardBody className={`py-0 px-0`}>
                    <CardImg
                        alt="Your profile"
                        src={selectedImage}
                        style={{
                            width: 150,
                            height: 150
                        }}
                        className={`rounded-circle border border-info border-3`}
                        />
                </CardBody>
            )}
            {!selectedImage && (
                <CardBody className={`py-0 px-0`}>
                    <div
                        style={{
                            width: 150,
                            height: 150
                        }}
                        className={`rounded-circle border border-info border-3`}>
                        {_name_str}
                        </div>
                </CardBody>
            )}
            <br />
            <Input type="file" accept="image/*" id="customFileUpload" name="customFile" onChange={(event) => handleLoadAvatar(event)} />
        </div>
    );
};
export { UploadAndDisplayImage };