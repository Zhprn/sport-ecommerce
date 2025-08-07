import React from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { Star, CheckCircle } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah M.",
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    name: "Alex K.",
    text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
  },
  {
    name: "James L.",
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
];

const TestimonialSection = () => {
  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">OUR HAPPY CUSTOMERS</h2>
      </div>
      <Row xs={1} md={3} className="g-4">
        {testimonials.map((item, index) => (
          <Col key={index}>
            <Card className="h-100 shadow-sm rounded-4 border-0 p-3">
              <div className="d-flex mb-2 text-warning">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <Card.Title className="fw-semibold">
                {item.name} <CheckCircle size={16} className="text-success ms-1" />
              </Card.Title>
              <Card.Text className="text-muted" style={{ fontSize: '0.9rem' }}>
                “{item.text}”
              </Card.Text>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TestimonialSection;
