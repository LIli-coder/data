import React, { useState, useEffect } from 'react';
import { Container, Row, Table, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const FoodTable = () => {
  const [data, setData] = useState([]);
  const [showModal, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch('http://d0726c1f98a8.ngrok.io/v1/to-do-lists')
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
      })
      .then((resData) => console.log(resData));
  }, []);

  const remove = (id) => {
    fetch(`http://d0726c1f98a8.ngrok.io/v1/to-do-lists/${id}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.ok) {
        setData(data.filter((user) => user.id !== id));
      }
    });
  };

  const ChekedArray = data.filter((v) => {
    return v.is_checked === 1;
  });

 

  const handleChange = (e) => {
    fetch(`http://d0726c1f98a8.ngrok.io/v1/to-do-lists/${e.target.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        is_checked: +e.target.checked,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const newData = data.map((v) => {
          if (v.id === res.id) {
            return res;
          } else {
            return v;
          }
        });
        <textDecoration />;
        setData(newData);
        console.log('new data', newData);
      });
  };

  const submit = (e) => {
    if (title !== '' && description !== '') {
      e.preventDefault();
      fetch('http://d0726c1f98a8.ngrok.io/v1/to-do-lists', {
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
      alert('title or description can not be blank');
    }
  };

  // console.log('All data: ', data);
  return (
    <Container>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Is Checked</th>
              <th>Settings</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dbData, index) => {
              return (
                <tr
                  key={index}
                  style={{
                    textDecoration: dbData.is_checked ? 'line-through' : '',
                  }}
                >
                  <td>{dbData.id}</td>
                  <td

                  //   style={{
                  //     textDecoration
                  //  }}
                  >
                    {dbData.title}
                  </td>
                  <td

                  // style={{
                  //   textDecoration: ChekedArray.length ? 'line-through' : '',
                  // }}
                  >
                    {dbData.description}
                  </td>
                  <td>
                    <Form.Check
                      type="checkbox"
                      id={dbData.id}
                      checked={dbData.is_checked}
                      onChange={handleChange}
                      // onClick={() => setEditing(true)}>
                    />
                  </td>
                  <td>
                    <Button variant="danger" onClick={() => remove(dbData.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <React.Fragment>
          <div>
            Counter:{data.length}/{ChekedArray.length}
          </div>

          <Button variant="success" onClick={handleShow}>
            Add New Todo
          </Button>

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
                    // value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    // value={description}
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
