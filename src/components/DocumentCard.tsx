import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

const DocumentCard = () => {
    return (
        <Card sx={{ width: 210 }} variant="outlined">
            <CardMedia
                sx={{ height: 297 }}
                image="https://pivle.com/wp-content/uploads/2019/12/Business-Administrator-Resume-1-1086x1536.jpg"
                title="Resume"
            />
        </Card>
    );
};

export default DocumentCard;
