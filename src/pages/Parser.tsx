import { Box, Button, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { parseResumeFromPdf } from '../lib/parse-resume-from-pdf';
import { Close, FileUploadRounded } from '@mui/icons-material';

const defaultFileState = {
    name: '',
    size: 0,
    fileUrl: '',
};

const Parser = () => {
    const [file, setFile] = useState(defaultFileState);
    const [isHoveredOnDropzone, setIsHoveredOnDropzone] = useState(false);

    const hasFile = Boolean(file.name);

    const setNewFile = (newFile: File) => {
        if (file.fileUrl) {
            URL.revokeObjectURL(file.fileUrl);
        }

        const { name, size } = newFile;
        const fileUrl = URL.createObjectURL(newFile);
        setFile({ name, size, fileUrl });
    };

    const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const newFile = event.dataTransfer.files[0];
        if (newFile.name.endsWith('.pdf')) {
            setNewFile(newFile);
        }
        setIsHoveredOnDropzone(false);
    };

    const onInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        const newFile = files[0];
        setNewFile(newFile);
    };

    const onRemove = () => {
        setFile(defaultFileState);
    };

    const onImportClick = async () => {
        const resume = await parseResumeFromPdf(file.fileUrl);

        console.info('Parsed data: ', resume);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="flex-start"
            minHeight="100vh"
            sx={{ pt: '20px' }}>
            <Box
                sx={{
                    maxWidth: 700,
                    minWidth: 300,
                    width: '100%',
                    height: 200,
                    border: `3px dashed ${isHoveredOnDropzone ? '#2196f3' : '#9e9e9e'}`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                }}
                onDragOver={(event) => {
                    event.preventDefault();
                    setIsHoveredOnDropzone(true);
                }}
                onDragLeave={() => setIsHoveredOnDropzone(false)}
                onDrop={onDrop}>
                {!hasFile ? (
                    <>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 1,
                            }}>
                            <FileUploadRounded />
                            <Typography variant="h6">Browse a pdf file or drop it here</Typography>
                        </Box>
                        <Button component="label">
                            Upload File
                            <input type="file" hidden onChange={onInputChange} />
                        </Button>
                    </>
                ) : (
                    <>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 1,
                            }}>
                            <Typography variant="subtitle1">{file.name}</Typography>
                            <IconButton onClick={onRemove}>
                                <Close />
                            </IconButton>
                        </Box>
                        <Button variant="outlined" onClick={onImportClick}>
                            Import
                        </Button>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default Parser;
