import { Box, Container, TextField, Typography } from '@mui/material';
import { DocumentSnapshot } from 'firebase/firestore';
import { useState } from 'react';

const EditorForms = ({ resumeSnapshot }: { resumeSnapshot: DocumentSnapshot }) => {
    const [formData, setFormData] = useState({});
    const handleFormChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
        event,
    ) => {
        console.log(event);
        // const { name, value } = event.target;
        // setFormData({
        //     ...formData,
        //     [name]: value,
        // });
    };

    return (
        <Box
            component="form"
            sx={{
                overflowY: 'scroll',
                maxHeight: '100vh',
                paddingY: 2,
            }}
            width={{ xs: '100%', md: '50%' }}>
            <Container
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    // minHeight: '1000px',
                }}>
                <Typography
                    variant="h6"
                    sx={{
                        flex: '1 1 100%',
                        textTransform: 'uppercase',
                        color: 'primary',
                        fontWeight: 'bold',
                    }}>
                    Personal Detail
                </Typography>
                <TextField
                    margin="dense"
                    // required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="email"
                    // autoComplete="email"
                    autoFocus
                    onChange={handleFormChange}
                    sx={{
                        minWidth: '200px',
                        flex: '1 1 0',
                    }}
                />
                <TextField
                    margin="dense"
                    // required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    // autoComplete="email"
                    autoFocus
                    onChange={handleFormChange}
                    sx={{
                        minWidth: '200px',
                        flex: '1 1 0',
                    }}
                />
                <TextField
                    margin="dense"
                    // required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    // autoComplete="email"
                    autoFocus
                    onChange={handleFormChange}
                    sx={{
                        minWidth: '200px',
                        flex: '1 1 0',
                    }}
                />
                <TextField
                    margin="dense"
                    // required
                    fullWidth
                    id="phone"
                    label="Phone"
                    name="phone"
                    // autoComplete="email"
                    autoFocus
                    onChange={handleFormChange}
                    sx={{
                        minWidth: '200px',
                        flex: '1 1 0',
                    }}
                />
                <TextField
                    margin="dense"
                    // required
                    fullWidth
                    id="country"
                    label="Country"
                    name="country"
                    // autoComplete="email"
                    autoFocus
                    onChange={handleFormChange}
                    sx={{
                        minWidth: '200px',
                        flex: '1 1 0',
                    }}
                />
                <TextField
                    margin="dense"
                    // required
                    fullWidth
                    id="city"
                    label="City"
                    name="city"
                    // autoComplete="email"
                    autoFocus
                    onChange={handleFormChange}
                    sx={{
                        minWidth: '200px',
                        flex: '1 1 0',
                    }}
                />
            </Container>
            <Box sx={{ my: 3 }}></Box>
            <Container
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    // minHeight: '1000px',
                }}>
                <Typography
                    variant="h6"
                    sx={{
                        flex: '1 1 100%',
                        textTransform: 'uppercase',
                        color: 'primary',
                        fontWeight: 'bold',
                    }}>
                    Professional Summary
                </Typography>
                <textarea
                    // margin="dense"
                    // required
                    // fullWidth
                    id="summary"
                    // label="First Name"
                    name="summary"
                    // autoComplete="email"
                    autoFocus
                    onChange={handleFormChange}
                    style={{ flex: '1 1 0' }}
                />
            </Container>
        </Box>
    );
};

export default EditorForms;
