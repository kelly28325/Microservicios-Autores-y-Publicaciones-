import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, CircularProgress, Alert, Grid, Typography, Paper, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PublicationForm from './PublicationForm';
import PublicationDetailModal from './PublicationDetailModal';
import { publicationService } from '../api/publicationService';
const PublicationsList = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  useEffect(() => { fetchPublications(); }, []);
  const fetchPublications = async () => {
    try { setLoading(true); setError(null); const data = await publicationService.getAllPublications(); setPublications(data); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };
  const handleCreatePublication = async (formData) => {
    try { setSubmitting(true); await publicationService.createPublication(formData); setOpenForm(false); fetchPublications(); }
    catch (err) { alert('Error: ' + err.message); }
    finally { setSubmitting(false); }
  };
  const handleStatusChange = async (publicationId, newStatus) => {
    try { setStatusLoading(true); await publicationService.changePublicationStatus(publicationId, newStatus); setOpenDetail(false); fetchPublications(); }
    catch (err) { alert('Error: ' + err.message); }
    finally { setStatusLoading(false); }
  };
  const getStatusColor = (status) => ({ DRAFT: 'default', IN_REVIEW: 'warning', APPROVED: 'success', PUBLISHED: 'primary', REJECTED: 'error' }[status] || 'default');
  const getStatusLabel = (status) => ({ DRAFT: 'Borrador', IN_REVIEW: 'En Revisión', APPROVED: 'Aprobado', PUBLISHED: 'Publicado', REJECTED: 'Rechazado' }[status] || status);
  return (<Box sx={{ width: '100%' }}><Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}><Typography variant="h5" sx={{ fontWeight: 'bold' }}>Gestión de Publicaciones</Typography><Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setOpenForm(true)}>Nueva</Button></Box>{error && <Alert severity="error">{error}</Alert>}{loading ? <CircularProgress /> : publications.length === 0 ? <Typography>No hay publicaciones</Typography> : <Grid container spacing={2}>{publications.map((pub) => (<Grid item xs={12} sm={6} md={4} key={pub.id}><Card><CardContent><Typography variant="h6">{pub.title}</Typography><Chip label={getStatusLabel(pub.status)} color={getStatusColor(pub.status)} size="small" /><Button size="small" fullWidth sx={{ mt: 2 }} onClick={() => { setSelectedPublication(pub); setOpenDetail(true); }}>Ver Detalle</Button></CardContent></Card></Grid>))}</Grid>}<PublicationForm open={openForm} onClose={() => setOpenForm(false)} onSubmit={handleCreatePublication} isLoading={submitting} /><PublicationDetailModal open={openDetail} publication={selectedPublication} onClose={() => setOpenDetail(false)} onStatusChange={handleStatusChange} isLoading={statusLoading} /></Box>);
};
export default PublicationsList;
