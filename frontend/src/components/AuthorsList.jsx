import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, CircularProgress, Alert, Grid, Typography, Paper, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import AuthorForm from './AuthorForm';
import { authorService } from '../api/authorService';
const AuthorsList = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => { fetchAuthors(); }, []);
  const fetchAuthors = async () => {
    try { setLoading(true); setError(null); const data = await authorService.getAllAuthors(); setAuthors(data); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };
  const handleCreateAuthor = async (formData) => {
    try { setSubmitting(true); await authorService.createAuthor(formData); setOpenForm(false); fetchAuthors(); }
    catch (err) { alert('Error: ' + err.message); }
    finally { setSubmitting(false); }
  };
  return (<Box sx={{ width: '100%' }}><Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}><Typography variant="h5" sx={{ fontWeight: 'bold' }}>Gestión de Autores</Typography><Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setOpenForm(true)}>Nuevo Autor</Button></Box>{error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}{loading ? <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box> : authors.length === 0 ? <Paper sx={{ p: 3, textAlign: 'center' }}><Typography color="textSecondary">No hay autores. ¡Crea uno!</Typography></Paper> : <Grid container spacing={2}>{authors.map((author) => (<Grid item xs={12} sm={6} md={4} key={author.id}><Card sx={{ boxShadow: 2 }}><CardContent><Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}><PersonIcon color="primary" /><Typography variant="h6" sx={{ fontWeight: 'bold' }}>{author.name}</Typography></Box><Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}><EmailIcon fontSize="small" /><Typography variant="body2">{author.email}</Typography></Box><Box sx={{ mt: 2 }}><Chip label={`ID: ${author.id}`} size="small" variant="outlined" /></Box></CardContent></Card></Grid>))}</Grid>}<AuthorForm open={openForm} onClose={() => setOpenForm(false)} onSubmit={handleCreateAuthor} isLoading={submitting} /></Box>);
};
export default AuthorsList;
