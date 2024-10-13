import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import Poster from './Poster';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { getTemplateStylesDoc } from '../helpers/getTemplateStylesDoc';

const TemplateTab = ({
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
            const templateStyles = await getTemplateStylesDoc(templateId);

            const resume = await addDoc(collection(db, 'resumes'), {
                uid: user?.uid,
                name: 'New Resume',
                templateId,
                template: name,
                posterUrl,
                timestamp: Timestamp.now(),
                templateStyles,
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
                    boxShadow: 'inset 0 -100px 100px -80px rgb(217, 217, 217)',
                }}>
                <Poster posterUrl={posterUrl} title={name} variant="elevation" />
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

export default TemplateTab;
