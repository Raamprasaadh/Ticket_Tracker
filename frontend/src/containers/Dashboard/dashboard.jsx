import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, TextField, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
// Styles for the Dashboard component
const useStyles = makeStyles({
  container: {
    marginTop: '2rem',
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  button: {
    marginTop: '1rem',
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const [tickets, setTickets] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [formValues, setFormValues] = useState({ title: '', description: '', status: '' });
  const navigate = useNavigate();
  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get('http://localhost:4000/tickets/getAllTickets');
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const handleOpen = (ticket = null) => {
    setEditingTicket(ticket);
    setFormValues(ticket || { title: '', description: '', status: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingTicket(null);
  };

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingTicket) {
        // Update existing ticket
        await axios.put(`http://localhost:4000/tickets/editTicket/`, {
          id: editingTicket._id,
          ...formValues
        });
      } else {
        // Create new ticket
        await axios.post('http://localhost:4000/tickets/createTicket/', formValues);
      }
      fetchTickets();
      handleClose();
    } catch (error) {
      console.error('Error saving ticket:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/tickets/deleteTicket/${id}`,);
      fetchTickets();
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:4000/logout');
      // Redirect to login or home page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  return (
    <Container className={classes.container}>
      <Box sx={{'display': 'flex', 'flexDirection':'row', 'justifyContent':'space-between'}}>
      <Typography variant="h4" gutterBottom>
        Ticket Dashboard
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()} style={{ marginBottom: '1rem' }}>
      Create New Ticket
      </Button>
      <Button variant="contained" color="secondary" onClick={() => handleLogout()} style={{ marginBottom: '1rem' }}>
      Logout
      </Button>
      </Box>
        {(tickets?.length > 0)?
        <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket._id}>
                <TableCell>{ticket.title}</TableCell>
                <TableCell>{ticket.description}</TableCell>
                <TableCell>{ticket.status}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleOpen(ticket)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(ticket._id)} style={{ marginLeft: '0.5rem' }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>:
      <Box>Sorry no records found ! please add records !</Box>
      }
      
      <Modal open={open} onClose={handleClose}>
        <Box className={classes.modal}>
          <Typography variant="h6" gutterBottom>
            {editingTicket ? 'Edit Ticket' : 'Create Ticket'}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              label="Title"
              name="title"
              value={formValues.title}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Description"
              name="description"
              value={formValues.description}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              required
            />
            <TextField
              label="Status"
              name="status"
              value={formValues.status}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
              {editingTicket ? 'Update Ticket' : 'Create Ticket'}
            </Button>
          </form>
        </Box>
      </Modal>
    </Container>
  );
};

export default Dashboard;
