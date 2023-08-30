import React, { useState } from "react";
import { Button, Card, CardText, CardTitle, CardSubtitle, CardBody, Col, Row } from "reactstrap";
import "./JobCard.css" 

const JobCard = ({ job, apply, applied }) => {
    const [applications, setApplications] = useState(applied);

    const applyJob = async () => {
        await apply(job);
        setApplications(()=>[...applications, job.id])
    }

    return (
        <Card className="JobCard my-2">
            <CardTitle>{job.title}</CardTitle>
            <CardSubtitle>{job.companyName}</CardSubtitle>
            <CardBody>
                <Row>
                    <Col>
                        <CardText>Salary: {job.salary || "unknown"}</CardText>
                        <CardText>Equity: {job.equity || "unknown"}</CardText>
                    </Col>
                    <Col>
                        {applications.includes(job.id) ? 
                        <Button color="danger" disabled>Applied</Button>
                        :<Button color="danger" onClick={applyJob}>Apply</Button>}
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default JobCard;