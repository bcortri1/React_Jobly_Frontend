import React, { useState } from "react";
import { Button, Form, Input, Row, Col } from "reactstrap";
import JoblyApi from "./api";

const SearchBar = ({ type, setTypeData }) => {
    const initialState = {
        search: "",
    };
    const [formData, setFormData] = useState(initialState);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((data) => ({
            ...data,
            [name]: value
        }))
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        async function getResponse() {
            let res;
            if (type === "companies") {
                res = await JoblyApi.searchAllCompanies(formData.search);
            }
            else if (type === "jobs") {
                res = await JoblyApi.searchAllJobs(formData.search);
            }
            else {
                throw new Error("Search type was invalid")
            }
            setTypeData(() => res[type]);
        }
        getResponse();
    };

    return (
        <Form id="search-form" onSubmit={handleSubmit}>
            <Row>
                <Col className="col-6">
                    <Input
                        id="search"
                        name="search"
                        type="text"
                        placeholder="Enter a search term.."
                        value={formData.search}
                        onChange={handleChange}
                        required
                    />
                </Col>
                <Col className="col-auto">
                    <Button color="primary" id="search-btn"><b>Search</b></Button>
                </Col>
            </Row>
        </Form>
    );

}

export default SearchBar;