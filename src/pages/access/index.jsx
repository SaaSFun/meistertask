// import npm packge
import React, {  } from 'react';
// import service api
//
// import core class
//
// import com page
import Access from '../../components/Access';
// import modal tool
//
// import style media
import "./default.css";
// coding
export class Paccess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        }
    };
    componentWillMount() {
        //
    };
    componentDidMount() {
        //
    };
    /*etc https://viblo.asia/p/vong-doi-cua-component-trong-react-gGJ59XaJlX2*/
    render() {
        return (
            <section className="p-4 text-center mb-4 w-100">
                <div className="container d-flex flex-column w-50">
                    <Access />
                </div>
            </section>
        );
    };
}