import { useState, useEffect } from 'react';
import {
  Container,
  Tabs,
  Tab,
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  Chip,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Modal,
  Divider,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import BookIcon from '@mui/icons-material/Book';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import { authorService } from './api/authorService';
import { publicationService } from './api/publicationService';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    success: {
      main: '#4caf50',
    },
    warning: {
      main: '#ff9800',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const PUBLICATION_STATUSES = [
  { value: 'DRAFT', label: '📝 Borrador', color: 'default' },
  { value: 'SUBMITTED', label: '📤 Enviado', color: 'warning' },
  { value: 'PUBLISHED', label: '✅ Publicado', color: 'success' },
  { value: 'REJECTED', label: '❌ Rechazado', color: 'error' },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function App() {
  const [tabValue, setTabValue] = useState(0);
  const [authors, setAuthors] = useState([]);
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Diálogos
  const [openAuthorForm, setOpenAuthorForm] = useState(false);
  const [openPublicationForm, setOpenPublicationForm] = useState(false);
  const [openPublicationDetail, setOpenPublicationDetail] = useState(false);
  
  // Datos de formularios
  const [formData, setFormData] = useState({});
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Cargar autores al montar
  useEffect(() => {
    loadAuthors();
  }, []);

  const loadAuthors = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await authorService.getAllAuthors();
      setAuthors(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Error al cargar autores: ' + err.message);
      setAuthors([]);
    } finally {
      setLoading(false);
    }
  };

  const loadPublications = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await publicationService.getAllPublications();
      setPublications(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Error al cargar publicaciones: ' + err.message);
      setPublications([]);
    } finally {
      setLoading(false);
    }
  };

  // ==================== AUTORES ====================
  const handleAddAuthor = async () => {
    if (!formData.name || !formData.email) {
      setError('Por favor completa todos los campos');
      return;
    }

    try {
      setLoading(true);
      if (editingId) {
        // Editar autor (si el backend lo soporta)
        await authorService.createAuthor({ ...formData, id: editingId });
        setSuccess('Autor actualizado correctamente');
      } else {
        await authorService.createAuthor(formData);
        setSuccess('Autor creado correctamente');
      }
      setOpenAuthorForm(false);
      setFormData({});
      setEditingId(null);
      await loadAuthors();
      setError('');
    } catch (err) {
      setError('Error al guardar autor: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAuthor = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este autor?')) {
      try {
        await authorService.deleteAuthor(id);
        setSuccess('Autor eliminado correctamente');
        await loadAuthors();
      } catch (err) {
        setError('Error al eliminar autor: ' + err.message);
      }
    }
  };

  const handleEditAuthor = (author) => {
    setFormData(author);
    setEditingId(author.id);
    setOpenAuthorForm(true);
  };

  // ==================== PUBLICACIONES ====================
  const handleAddPublication = async () => {
    if (!formData.title || !formData.authorId) {
      setError('Por favor completa los campos requeridos');
      return;
    }

    try {
      setLoading(true);
      await publicationService.createPublication(formData);
      setSuccess('Publicación creada correctamente');
      setOpenPublicationForm(false);
      setFormData({});
      await loadPublications();
      setError('');
    } catch (err) {
      setError('Error al crear publicación: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePublicationStatus = async (id, newStatus) => {
    try {
      setLoading(true);
      await publicationService.changePublicationStatus(id, newStatus);
      setSuccess('Estado actualizado correctamente');
      await loadPublications();
      setError('');
    } catch (err) {
      setError('Error al cambiar estado: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewPublicationDetail = (publication) => {
    setSelectedPublication(publication);
    setOpenPublicationDetail(true);
  };

  const getAuthorName = (authorId) => {
    const author = authors.find(a => a.id === authorId);
    return author ? author.name : 'Desconocido';
  };

  const getAuthorEmail = (authorId) => {
    const author = authors.find(a => a.id === authorId);
    return author ? author.email : 'N/A';
  };

  const getStatusInfo = (status) => {
    return PUBLICATION_STATUSES.find(s => s.value === status) || PUBLICATION_STATUSES[0];
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 1) {
      loadPublications();
    }
    setError('');
    setSuccess('');
  };

  const closeAuthorForm = () => {
    setOpenAuthorForm(false);
    setFormData({});
    setEditingId(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper sx={{ p: 3 }}>
          {/* HEADER */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
            <BookIcon sx={{ fontSize: 40, color: 'primary.main' }} />
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Gestión de Autores y Publicaciones
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Plataforma Editorial
              </Typography>
            </Box>
          </Box>

          {/* MENSAJES */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
              {success}
            </Alert>
          )}

          {/* TABS */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="navigation tabs"
            >
              <Tab 
                label="👥 Autores" 
                id="tab-0" 
                aria-controls="tabpanel-0"
                icon={<PersonIcon />}
                iconPosition="start"
              />
              <Tab
                label="📚 Publicaciones"
                id="tab-1"
                aria-controls="tabpanel-1"
                icon={<MenuBookIcon />}
                iconPosition="start"
              />
            </Tabs>
          </Box>

          {/* ==================== TAB 1: AUTORES ==================== */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ mb: 3 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => {
                  setFormData({});
                  setEditingId(null);
                  setOpenAuthorForm(true);
                }}
                size="large"
              >
                Nuevo Autor
              </Button>
            </Box>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : authors.length === 0 ? (
              <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
                <PersonIcon sx={{ fontSize: 60, color: 'textSecondary', mb: 2 }} />
                <Typography color="textSecondary" variant="h6">
                  No hay autores registrados
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  ¡Crea tu primer autor para comenzar!
                </Typography>
              </Paper>
            ) : (
              <Grid container spacing={2}>
                {authors.map((author) => (
                  <Grid item xs={12} sm={6} md={4} key={author.id}>
                    <Card sx={{ boxShadow: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mb: 2,
                          }}
                        >
                          <PersonIcon color="primary" />
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {author.name}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mb: 2,
                          }}
                        >
                          <EmailIcon fontSize="small" />
                          <Typography variant="body2">{author.email}</Typography>
                        </Box>

                        <Chip
                          label={`ID: ${author.id}`}
                          size="small"
                          variant="outlined"
                          sx={{ mb: 2 }}
                        />
                      </CardContent>

                      <Divider />

                      <CardActions sx={{ gap: 1 }}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleEditAuthor(author)}
                          title="Editar"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteAuthor(author.id)}
                          title="Eliminar"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </TabPanel>

          {/* ==================== TAB 2: PUBLICACIONES ==================== */}
          <TabPanel value={tabValue} index={1}>
            <Box sx={{ mb: 3 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => {
                  setFormData({ status: 'DRAFT' });
                  setOpenPublicationForm(true);
                }}
                size="large"
              >
                Nueva Publicación
              </Button>
            </Box>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : publications.length === 0 ? (
              <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
                <MenuBookIcon sx={{ fontSize: 60, color: 'textSecondary', mb: 2 }} />
                <Typography color="textSecondary" variant="h6">
                  No hay publicaciones registradas
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  ¡Crea tu primera publicación para comenzar!
                </Typography>
              </Paper>
            ) : (
              <Grid container spacing={2}>
                {publications.map((pub) => {
                  const statusInfo = getStatusInfo(pub.status || 'DRAFT');
                  return (
                    <Grid item xs={12} sm={6} md={4} key={pub.id}>
                      <Card sx={{ boxShadow: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              mb: 2,
                            }}
                          >
                            <MenuBookIcon color="primary" />
                            <Typography variant="h6" sx={{ fontWeight: 'bold', flex: 1 }}>
                              {pub.title}
                            </Typography>
                          </Box>

                          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                            <strong>Autor:</strong> {getAuthorName(pub.authorId)}
                          </Typography>

                          {pub.description && (
                            <Typography variant="body2" sx={{ mb: 2 }}>
                              {pub.description.substring(0, 100)}...
                            </Typography>
                          )}

                          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                            <Chip
                              label={`ID: ${pub.id}`}
                              size="small"
                              variant="outlined"
                            />
                            <Chip
                              label={statusInfo.label}
                              size="small"
                              color={statusInfo.color}
                              variant="filled"
                            />
                          </Box>
                        </CardContent>

                        <Divider />

                        <CardActions sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                          <IconButton
                            size="small"
                            color="info"
                            onClick={() => handleViewPublicationDetail(pub)}
                            title="Ver detalles"
                          >
                            <InfoIcon />
                          </IconButton>

                          <FormControl size="small" sx={{ minWidth: 150 }}>
                            <Select
                              value={pub.status || 'DRAFT'}
                              onChange={(e) =>
                                handleChangePublicationStatus(pub.id, e.target.value)
                              }
                              sx={{ height: 32 }}
                            >
                              {PUBLICATION_STATUSES.map((status) => (
                                <MenuItem key={status.value} value={status.value}>
                                  {status.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </TabPanel>
        </Paper>

        {/* ==================== DIALOG: CREAR/EDITAR AUTOR ==================== */}
        <Dialog open={openAuthorForm} onClose={closeAuthorForm} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingId ? 'Editar Autor' : 'Crear Nuevo Autor'}
          </DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Nombre"
              margin="normal"
              value={formData.name || ''}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              value={formData.email || ''}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeAuthorForm}>Cancelar</Button>
            <Button
              onClick={handleAddAuthor}
              variant="contained"
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* ==================== DIALOG: CREAR PUBLICACIÓN ==================== */}
        <Dialog open={openPublicationForm} onClose={() => setOpenPublicationForm(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Crear Nueva Publicación</DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Título"
              margin="normal"
              value={formData.title || ''}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />

            <FormControl fullWidth margin="normal" required>
              <InputLabel>Autor</InputLabel>
              <Select
                value={formData.authorId || ''}
                label="Autor"
                onChange={(e) =>
                  setFormData({ ...formData, authorId: e.target.value })
                }
              >
                <MenuItem value="">-- Seleccionar Autor --</MenuItem>
                {authors.map((author) => (
                  <MenuItem key={author.id} value={author.id}>
                    {author.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Descripción"
              margin="normal"
              multiline
              rows={3}
              value={formData.description || ''}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Estado</InputLabel>
              <Select
                value={formData.status || 'DRAFT'}
                label="Estado"
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                {PUBLICATION_STATUSES.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenPublicationForm(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleAddPublication}
              variant="contained"
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* ==================== MODAL: DETALLE PUBLICACIÓN ==================== */}
        <Modal open={openPublicationDetail} onClose={() => setOpenPublicationDetail(false)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', sm: '80%', md: 600 },
              maxHeight: '90vh',
              overflow: 'auto',
              backgroundColor: 'white',
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            {selectedPublication && (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {selectedPublication.title}
                  </Typography>
                  <IconButton
                    onClick={() => setOpenPublicationDetail(false)}
                    size="small"
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>

                <Divider sx={{ mb: 2 }} />

                {/* Estado */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Estado Editorial
                  </Typography>
                  <Chip
                    label={getStatusInfo(selectedPublication.status).label}
                    color={getStatusInfo(selectedPublication.status).color}
                    variant="filled"
                  />
                </Box>

                {/* Información del Autor */}
                <Paper sx={{ p: 2, mb: 3, backgroundColor: '#f5f5f5' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    ℹ️ Información del Autor
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <PersonIcon fontSize="small" color="primary" />
                    <Typography variant="body2">
                      <strong>Nombre:</strong> {getAuthorName(selectedPublication.authorId)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EmailIcon fontSize="small" color="primary" />
                    <Typography variant="body2">
                      <strong>Email:</strong> {getAuthorEmail(selectedPublication.authorId)}
                    </Typography>
                  </Box>
                </Paper>

                {/* ID */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    ID de Publicación
                  </Typography>
                  <Chip label={selectedPublication.id} variant="outlined" />
                </Box>

                {/* Descripción */}
                {selectedPublication.description && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Descripción
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {selectedPublication.description}
                    </Typography>
                  </Box>
                )}

                <Divider sx={{ my: 2 }} />

                {/* Botones */}
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <Button onClick={() => setOpenPublicationDetail(false)}>
                    Cerrar
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
}

export default App;