import React, { useState, useEffect } from 'react';
import {
  Container,
 
  
  Button,
  Modal,
  Form,
  ButtonGroup,
 
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const FoodTable = () => {
  const [data, setData] = useState([]);
  const [showModal, setShow] = useState(false);
  const [title, setTitle] = useState('title');
  const [description, setDescription] = useState('description');
 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

  useEffect(() => {
    fetch('https://7804df12d71d.ngrok.io/v1/to-do-lists')
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        
      });
  }, []);

const submit = (e) => {
    if (title !== '' && description !== '') {
      e.preventDefault();
      fetch('https://7804df12d71d.ngrok.io/v1/to-do-lists', {
        method: 'POST',
        body: JSON.stringify({
          title,
          description,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((response) => {
          const newData = [...data];
          newData.push(response);
          setData(newData);
          setShow(false);
        });
    } else {
      // return false
      alert('title or description can not be blank');
    }
  };

  return (
    <Container>
      <Row>
       

        <React.Fragment>
         
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit" onClick={submit}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </React.Fragment>
      </Row>
    </Container>
  );
};
