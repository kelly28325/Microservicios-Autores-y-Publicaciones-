import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, CircularProgress, FormControl, InputLabel, Select, MenuItem, Alert } from '@mui/material';
import { authorService } from '../api/authorService';
const PublicationForm = ({ open, onClose, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({ title: '', authorId: '' });
  const [authors, setAuthors] = useState([]);
  const [loadingAuthors, setLoadingAuthors] = useState(false);
  useEffect(() => { if (open) fetchAuthors(); }, [open]);
  const fetchAuthors = async () => {
    try { setLoadingAuthors(true); const data = await authorService.getAllAuthors(); setAuthors(data); }
    catch (err) { }
    finally { setLoadingAuthors(false); }
  };
  const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };
  const handleSubmit = async () => { if (!formData.title.trim() || !formData.authorId) { alert('Completa todos los campos'); return; } await onSubmit({ title: formData.title, authorId: parseInt(formData.authorId), status: 'DRAFT' }); setFormData({ title: '', authorId: '' }); };
  const handleClose = () => { setFormData({ title: '', authorId: '' }); onClose(); };
  return (<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth><DialogTitle>Crear Nueva Publicación</DialogTitle><DialogContent><Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}><TextField label="Título" name="title" value={formData.title} onChange={handleChange} fullWidth variant="outlined" disabled={isLoading} /><FormControl fullWidth disabled={isLoading || loadingAuthors}><InputLabel>Autor</InputLabel><Select name="authorId" value={formData.authorId} onChange={handleChange} label="Autor"><MenuItem value=""><em>Selecciona un autor</em></MenuItem>{authors.map((author) => (<MenuItem key={author.id} value={author.id}>{author.name}</MenuItem>))}</Select></FormControl></Box></DialogContent><DialogActions><Button onClick={handleClose} disabled={isLoading}>Cancelar</Button><Button onClick={handleSubmit} variant="contained" color="primary" disabled={isLoading || authors.length === 0}>Crear</Button></DialogActions></Dialog>);
};
export default PublicationForm;
