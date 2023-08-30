import React from "react";
import { Link } from "react-router-dom";
import { Card, CardText, CardTitle } from "reactstrap";
import "./CompanyCard.css"

const CompanyCard = ({ company  }) => {
    return (
        <Link className="CompanyLink" to={`/companies/${company.handle}`}>
            <Card className="CompanyCard">
                <CardTitle>{company.name}</CardTitle>
                <CardText>{company.description}</CardText>
            </Card>
        </Link>
    );
}

export default CompanyCard;