import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import DocumentCard from './DocumentCard';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const TemplatePane = ({
    name,
    description,
    posterUrl,
    tags,
    templateId,
}: {
    name: string;
    description: string;
    posterUrl: string;
    tags: [string];
    templateId: string;
}) => {
    const [show, setShow] = useState(false);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const handleUseThisTemplate = async () => {
        try {
            const resume = await addDoc(collection(db, 'resumes'), {
                uid: user?.uid,
                name: 'New Resume',
                templateId,
                template: name,
                posterUrl,
                timestamp: Timestamp.now(),
            });

            if (resume) navigate(`/editor/${resume.id}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box onMouseOver={() => setShow(true)} onMouseOut={() => setShow(false)}>
            <Box
                sx={{
                    width: '100%',
                    backgroundColor: blueGrey[50],
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 6,
                    position: 'relative',
                }}>
                <DocumentCard posterUrl={posterUrl} title={name} variant="elevation" />
                {show ? (
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<CreateIcon />}
                        sx={{
                            position: 'absolute',
                        }}
                        onClick={handleUseThisTemplate}>
                        Use this template
                    </Button>
                ) : (
                    ''
                )}
                {tags.length ? (
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            position: 'absolute',
                            bottom: 12,
                            right: 12,
                        }}>
                        {tags.map((tag) => (
                            <Chip
                                label={tag}
                                color="primary"
                                size="small"
                                variant="outlined"
                                key={tag}
                            />
                        ))}
                    </Stack>
                ) : (
                    ''
                )}
            </Box>
            <Box sx={{ padding: 1 }}>
                <Typography variant="h6">{name}</Typography>
                <Typography variant="body1">{description}</Typography>
            </Box>
        </Box>
    );
};

export default TemplatePane;
