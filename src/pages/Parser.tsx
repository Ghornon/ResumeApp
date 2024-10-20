import { Box, Button, Input } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { parseResumeFromPdf } from '../lib/parse-resume-from-pdf';

const Parser = () => {
    const [file, setFile] = useState<File>();
    const [url, setUrl] = useState('');

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                setUrl(reader.result);
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };

            await handleResumeParse();
        }
    };

    const handleResumeParse = async () => {
        const resume = await parseResumeFromPdf(url);

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
            <Button variant="outlined" component="label">
                Upload File
                <input type="file" hidden onChange={handleFileChange} />
            </Button>

            <Box>
                {file?.name} - {file?.type}
            </Box>

            <Button variant="outlined" component="label" onClick={handleResumeParse}>
                Run
            </Button>
        </Box>
    );
};

export default Parser;
