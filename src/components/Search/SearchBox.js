import React from 'react';
import { Form, Row, Col, ButtonGroup, Button, InputGroup, FormControl, Dropdown, DropdownButton, DropdownItem } from 'react-bootstrap';
import "react-dates/initialize";
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import "react-dates/lib/css/_datepicker.css";
import {HOME_PAGE_LOADED, HOME_PAGE_UNLOADED} from "../../constants/actionTypes";
import {connect} from "react-redux";
import { Formik, Field } from 'formik';

const mapStateToProps = state => ({
    config: state.common.config,
});

const mapDispatchToProps = dispatch => ({
    // onLoad: (tab, pager, payload) =>
    //     dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
    // onUnload: () =>
    //     dispatch({  type: HOME_PAGE_UNLOADED })
});

class SearchBox extends React.Component {
    componentWillMount() {
        // const tab = this.props.token ? 'feed' : 'all';
        // const articlesPromise = this.props.token ?
        //   agent.Articles.feed :
        //   agent.Articles.all;
        //
        // this.props.onLoad(tab, articlesPromise, Promise.all([agent.Tags.getAll(), articlesPromise()]));
    }

    componentWillUnmount() {
    }

    state = {
        focused: false,
        date: null
    };

    onFocusChange = value => {
        this.setState({ focused: !this.state.focused });
    };
    render() {
        if (!this.props.config) {
            return null;
        }

        return (
            <div className="container-fluid">
                <ul className="nav nav-tabs d-flex justify-content-center" id="myTab" role="tablist">
                    {
                        this.props.config.cargoTypes.map((cargoType, index) => {
                            const className = index === 0 ? "align-items-center nav-link active" : "align-items-center nav-link";
                            const ariaSelected = index === 0 ? "true" : "false";
                            const href = "#" + cargoType.type;
                            const imageSource = cargoType.type + ".png";
                            return (
                                <li key={cargoType.id}>
                                    <a href={href}
                                       data-toggle="tab"
                                       role="tab"
                                       aria-controls={cargoType.type}
                                       aria-selected={ariaSelected}
                                       className={className}
                                       id={cargoType.id}>
                                        <img src={imageSource} width={70} style={{padding: 10}}/>
                                        {cargoType.displayName}
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
                <div style={{padding: 30, borderRadius: 10, boxShadow: "5px 5px 10px grey"}}>
                    <Formik
                        // validationSchema={schema}
                        onSubmit={console.log}
                        initialValues={{
                            "bulkType": "NOT_USED",
                            "estimatedDeparture": null
                        }}
                    >
                        {({
                              handleSubmit,
                              handleChange,
                              handleBlur,
                              values,
                              touched,
                              isValid,
                              errors,
                          }) => (
                        <Form
                            noValidate
                            validated={true}
                            onSubmit={handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} xs md="2" controlId="quantity">
                                    <div className="align-items-center p-2">
                                        <Form.Control
                                            required
                                            name="quantity"
                                            value={values.quantity}
                                            onChange={handleChange}
                                            type="number"
                                            placeholder="Quantity"
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </div>
                                </Form.Group>
                                <Form.Group as={Col} md="10" controlId="cargoType">
                                    <div className="tab-content p-2">
                                        {
                                            this.props.config.cargoTypes.map((cargoType, index) => {
                                                const className = index === 0 ? "tab-pane active" : "tab-pane";
                                                const ariaLabelledBy = cargoType.type + "-tab";
                                                switch (cargoType.type) {
                                                    case "FCL":
                                                        return <FCL className={className} id={cargoType.type} key={cargoType.id}
                                                                    role="tabpanel" aria-labelledby={ariaLabelledBy}
                                                                    containerTypes={this.props.config.containerTypes}
                                                                    values={values} handleChange={handleChange}/>;
                                                    case "LCL":
                                                        return <LCL className={className} id={cargoType.type} key={cargoType.id}
                                                                    role="tabpanel" aria-labelledby={ariaLabelledBy}
                                                                    values={values} handleChange={handleChange}/>;
                                                    case "Bulk":
                                                        return <Bulk className={className} id={cargoType.type} key={cargoType.id}
                                                                     role="tabpanel" aria-labelledby={ariaLabelledBy}
                                                                     bulkTypes={this.props.config.bulkTypes}
                                                                     values={values} handleChange={handleChange}/>;
                                                    default:
                                                        return null;
                                                }
                                            })
                                        }
                                    </div>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="estimatedDeparture">
                                    <SingleDatePicker
                                        numberOfMonths={1}
                                        showDefaultInputIcon={true}
                                        date={this.state.date} // momentPropTypes.momentObj or null
                                        onDateChange={(date) => {
                                            this.setState({ date: date });
                                            values.estimatedDeparture = date._d.valueOf();
                                        }} // PropTypes.func.isRequired
                                        focused={this.state.focused} // PropTypes.bool
                                        onFocusChange={({ focused }) => {
                                            this.onFocusChange(focused);
                                        }} // PropTypes.func.isRequired
                                        placeholder="Departure"
                                        id="estimatedDeparture" // PropTypes.string.isRequired,
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="origin">
                                    <Form.Label>Origin</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="City"
                                        value={values.origin}
                                        onChange={handleChange}
                                        required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid city.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="destination">
                                    <Form.Label>Destination</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="City"
                                        value={values.destination}
                                        onChange={handleChange}
                                        required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid city.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Group>
                                <Form.Check
                                    required
                                    label="Agree to terms and conditions"
                                    feedback="You must agree before submitting."
                                />
                            </Form.Group>
                            <Button type="submit">Submit form</Button>
                        </Form>
                            )}
                    </Formik>
                </div>
            </div>
        )
    }
}

const FCL = ({ containerTypes, values, handleChange }) => {
    if (!containerTypes) return null;
    return (
        <div className="container tab-pane active" id="FCL">
            <Form.Row>
                {
                    containerTypes.map(containerType => {
                        return (
                            <Form.Group as={Col} controlId="containerType">
                                <Form.Control
                                    as="input"
                                    type="button"
                                    value={containerType.displayName}
                                    onChange={handleChange}
                                    key={containerType.id}
                                    onClick={() => values.containerType=containerType.displayName}
                                />
                            </Form.Group>

                        )
                    })
                }
            </Form.Row>
        </div>
    );
};

const LCL = ({ values, handleChange }) => {
    return (
        <div className="container tab-pane" id="LCL">
            <Form.Row>
                <Form.Group as={Col} xs="8" md={{ span: 2, offset: 1 }} controlId="weight">
                    <Form.Control
                        required
                        type="number"
                        placeholder="Weight"
                        value={values.weight}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group as={Col} xs="4" md="1" controlId="weightUnit">
                    <Form.Control
                        as="select"
                        value={values.weightUnit}
                        onChange={handleChange}
                    >
                        <option>KG</option>
                        <option>TON</option>
                        <option>LB</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} xs="8" md={{ span: 2, offset: 1 }} controlId="length">
                    <Form.Control
                        required
                        type="number"
                        placeholder="Length"
                        value={values.length}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group as={Col} xs="8" md="2" controlId="width">
                    <Form.Control
                        required
                        type="number"
                        placeholder="Width"
                        value={values.width}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group as={Col} xs="8" md="2" controlId="height">
                    <Form.Control
                        required
                        type="number"
                        placeholder="Height"
                        value={values.height}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group as={Col} xs="4" md="1" controlId="dimensionUnit">
                    <Form.Control
                        as="select"
                        value={values.dimensionUnit}
                        onChange={handleChange}
                    >
                        <option>CM</option>
                        <option>M</option>
                        <option>IN</option>
                        <option>FT</option>
                    </Form.Control>
                </Form.Group>
            </Form.Row>
        </div>
    )
};

const Bulk = ({ bulkTypes, values, handleChange }) => {
    if (!bulkTypes) return null;

    return (
        <div className="container tab-pane" id="Bulk">
            <Form.Row>
                <Form.Group as={Col} xs="8" md={{ span: 2, offset: 1 }} controlId="weight">
                    <Form.Control
                        required
                        type="number"
                        placeholder="Weight"
                        value={values.weight}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group as={Col} xs="4" md="1" controlId="weightUnit">
                    <Form.Control
                        as="select"
                        value={values.weightUnit}
                        onChange={handleChange}
                    >
                        <option>KG</option>
                        <option>TON</option>
                        <option>LB</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} md={{ span: 7, offset: 1 }} controlId="bulkType">
                    <Form.Control
                        as="select"
                        value={values.bulkType}
                        onChange={handleChange}
                    >
                        <option key="NOT_USED">Type of Cargo..</option>
                        {
                            bulkTypes.map(bulkType => {
                                return (
                                    <option key={bulkType.id}>{bulkType.displayName}</option>
                                )
                            })
                        }
                    </Form.Control>
                </Form.Group>
            </Form.Row>
        </div>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
